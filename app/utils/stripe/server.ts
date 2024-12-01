'use server';

import Stripe from 'stripe';
import { stripe } from '@/utils/stripe/config';
import { createClient } from '@/utils/supabase/server';
import { createOrRetrieveCustomer } from '@/utils/supabase/admin';
import {
    getURL,
    calculateTrialEndUnixTimestamp
} from '@/utils/helpers';
import { getErrorRedirect, getToastRedirect } from '../redirect-toaster-helpers';
import type { Tables } from '@/types/database.types';

type CheckoutResponse = {
    errorRedirect?: string;
    sessionId?: string;
};

type Price = Tables<'prices'>;

export async function checkoutWithStripe(
    price: Price,
    redirectPath: string = '/dashboard'
): Promise<CheckoutResponse> {
    try {
        // Get the user from Supabase auth
        const supabase = await createClient();
        const {
            error,
            data: { user }
        } = await supabase.auth.getUser();

        if (error || !user) {
            console.error(error);
            throw new Error('Could not get user session.');
        }

        // Retrieve or create the customer in Stripe
        let customer: string;
        try {
            customer = await createOrRetrieveCustomer({
                uuid: user?.id || '',
                email: user?.email || ''
            });
        } catch (err) {
            console.error(err);
            throw new Error('Unable to access customer record.');
        }

        let params: Stripe.Checkout.SessionCreateParams = {
            allow_promotion_codes: true,
            billing_address_collection: 'required',
            customer,
            customer_update: {
                address: 'auto'
            },
            line_items: [
                {
                    price: price.id,
                    quantity: 1
                }
            ],
            cancel_url: getURL(),
            success_url: getURL(redirectPath)
        };

        console.log(
            'Trial end:',
            calculateTrialEndUnixTimestamp(price.trial_period_days)
        );
        if (price.type === 'recurring') {
            params = {
                ...params,
                mode: 'subscription',
                subscription_data: {
                    trial_end: calculateTrialEndUnixTimestamp(price.trial_period_days)
                }
            };
        } else if (price.type === 'one_time') {
            params = {
                ...params,
                mode: 'payment'
            };
        }

        // Create a checkout session in Stripe
        let session;
        try {
            session = await stripe.checkout.sessions.create(params);
        } catch (err) {
            console.error(err);
            throw new Error('Unable to create checkout session.');
        }

        // Instead of returning a Response, just return the data or error.
        if (session) {
            return { sessionId: session.id };
        } else {
            throw new Error('Unable to create checkout session.');
        }
    } catch (error) {
        if (error instanceof Error) {
            return {
                errorRedirect: getErrorRedirect(
                    redirectPath,
                    error.message,
                    'Please try again later or contact a system administrator.'
                )
            };
        } else {
            return {
                errorRedirect: getErrorRedirect(
                    redirectPath,
                    'An unknown error occurred.',
                    'Please try again later or contact a system administrator.'
                )
            };
        }
    }
}

export async function createStripePortal(currentPath: string): Promise<string> {
    try {
        const supabase = await createClient();
        const {
            error,
            data: { user }
        } = await supabase.auth.getUser();

        if (!user) {
            if (error) {
                console.error(error);
            }
            throw new Error('Could not get user session.');
        }

        let customer;
        try {
            customer = await createOrRetrieveCustomer({
                uuid: user.id || '',
                email: user.email || ''
            });
        } catch (err) {
            console.error(err);
            throw new Error('Unable to access customer record.');
        }

        if (!customer) {
            throw new Error('Could not get customer.');
        }

        try {
            const { url } = await stripe.billingPortal.sessions.create({
                customer,
                return_url: getURL(currentPath)
            });
            if (!url) {
                throw new Error('Could not create billing portal');
            }
            return url;
        } catch (err) {
            console.error(err);
            throw new Error('Could not create billing portal');
        }
    } catch (error) {
        if (error instanceof Error) {
            console.error(error);
            return getErrorRedirect(
                currentPath,
                error.message,
                'Please try again later or contact a system administrator.'
            );
        } else {
            return getErrorRedirect(
                currentPath,
                'An unknown error occurred.',
                'Please try again later or contact a system administrator.'
            );
        }
    }
}


type SubscriptionChangeResponse = {
    sessionId?: string;
    redirectPath?: string;
    errorRedirect?: string;
};

export async function handleSubscriptionChange(price: Price, redirectPath: string = "/dashboard"): Promise<SubscriptionChangeResponse> {
    try {
        const supabase = await createClient();
        const { error, data: { user } } = await supabase.auth.getUser();

        if (error || !user) {
            throw new Error('Could not get user session.');
        }
        
        const customer = await createOrRetrieveCustomer({
            uuid: user.id || '',
            email: user.email || ''
        });

        const currentSubscription = await getActiveSubscription(customer);

        if (currentSubscription) {
            const subscriptionItemId = currentSubscription.items.data[0].price.id;
            if(subscriptionItemId === price.id) {
                return {
                    errorRedirect: getToastRedirect(
                        redirectPath,
                        'status',
                        'Subscription unchanged',
                        'You are already subscribed to this plan.'
                    )
                };
            }

            if(await isUpgrade(subscriptionItemId, price.id)) {
                await upgradeSubscription(currentSubscription.id, price.id);
            } else {
                await downgradeSubscription(currentSubscription.id, price.id);
            }

            // await stripe.subscriptions.update(currentSubscription.id, {
            //     items: [{ id: subscriptionItemId, price: price.id }],
            //     proration_behavior: 'always_invoice', // Instantly prorate the subscription
            // });

            return {
                sessionId: undefined,
                redirectPath: getToastRedirect(
                    redirectPath,
                    'status',
                    'Subscription updated',
                    'Your subscription has been updated.'
                )
            };
        } else {
            // No active subscription; create a new one
            const sessionResponse = await checkoutWithStripe(price, redirectPath);
            return sessionResponse
        }
    } catch (error: any) {
        console.error(error);
        return {
            errorRedirect: getErrorRedirect(
                redirectPath,
                error?.message || 'An error occurred.',
                'Please try again later or contact support.'
            ),
        };
    }
}

async function isUpgrade(currentPriceId: string, newPriceId: string): Promise<boolean> {
    const currentPlan = await getPlanLimits(currentPriceId);
    const newPlan = await getPlanLimits(newPriceId);
    
    // compare every metric
    for (const key in currentPlan)
        if (newPlan[key as keyof UsageLimit] > currentPlan[key as keyof UsageLimit])
            return true;
    return false;
}

async function upgradeSubscription(subscriptionId: string, priceId: string): Promise<string> {
    const subscription = await stripe.subscriptions.retrieve(subscriptionId);
    const subscriptionItemId = subscription.items.data[0].id;

    await stripe.subscriptions.update(subscriptionId, {
        items: [{ id: subscriptionItemId, price: priceId }],
        proration_behavior: 'always_invoice', // Instantly prorate the subscription
    });

    return subscription.id;
}

async function downgradeSubscription(subscriptionId: string, priceId: string) {
    const subscription = await stripe.subscriptions.retrieve(subscriptionId);
    const subscriptionItemId = subscription.items.data[0].id;

    const currentUsage = await getUserUsage(subscriptionId);
    const newPlanLimits = await getPlanLimits(priceId);

    for (const metric in newPlanLimits){
        if(currentUsage[metric as keyof UsageData] > newPlanLimits[metric as keyof UsageLimit])
            throw new Error('Cannot downgrade subscription due to exceeding usage.');
    }

    await stripe.subscriptions.update(subscriptionId, {
        items: [{ id: subscriptionItemId, price: priceId }],
        proration_behavior: 'always_invoice', // Instantly prorate the subscription
    });

    return subscription.id;
}

async function getActiveSubscription(customerId: string): Promise<Stripe.Subscription | null> {
    const subscriptions = await stripe.subscriptions.list({
        customer: customerId,
        status: 'active',
    });

    return subscriptions.data.length > 0 ? subscriptions.data[0] : null;
}


type UsageData = {
    video_minutes: number;
    tts_characters: number;
}

async function getUserUsage(subscriptionId: string): Promise<UsageData> {
    const supabase = await createClient();
    const { data, error } = await supabase.from('usage_data').select('*').eq('subscription_id', subscriptionId);
    if (error) {
        throw new Error('Error fetching usage data.');
    }
    const totalMinutes = data.find((d: any) => d.metric_name === 'video_minutes')?.usage_amount || 0;
    const totalCharacters = data.find((d: any) => d.metric_name === 'tts_characters')?.usage_amount || 0;
    return {
        video_minutes: totalMinutes,
        tts_characters: totalCharacters
    }
}

type UsageLimit = {
    video_minutes: number;
    tts_characters: number;
}

async function getPlanLimits(priceId: string): Promise<UsageLimit> {
    const price = await stripe.prices.retrieve(priceId);
    const product = await stripe.products.retrieve(price.product as string);
    if(!product.metadata) return { video_minutes: 10, tts_characters: 10 };

    return {
        video_minutes: parseInt(product.metadata.video_minutes) || 10,
        tts_characters: parseInt(product.metadata.tts_characters) || 10
    }
}