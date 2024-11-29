export const getURL = (path: string = '') => {
    let url = process.env.NEXT_PUBLIC_SITE_URL?.trim() || "";
    if (!url) url = process.env.NEXT_PUBLIC_VERCEL_URL?.trim() || "";
    if (!url) url = 'http://localhost:3000/';

    // Trim the URL and remove trailing slash if exists.
    url = url.replace(/\/+$/, '');
    // Make sure to include `https://` when not localhost.
    url = url.includes('http') ? url : `https://${url}`;
    // Ensure path starts without a slash to avoid double slashes in the final URL.
    path = path.replace(/^\/+/, '');

    return path ? `${url}/${path}` : url;
};

export const toDateTime = (secs: number) => {
    var t = new Date(+0); // Unix epoch start.
    t.setSeconds(secs);
    return t;
};

export const calculateTrialEndUnixTimestamp = (
    trialPeriodDays: number | null | undefined
) => {
    if (
        trialPeriodDays === null ||
        trialPeriodDays === undefined ||
        trialPeriodDays < 2
    ) {
        return undefined;
    }

    const currentDate = new Date();
    const trialEnd = new Date(
        currentDate.getTime() + (trialPeriodDays + 1) * 24 * 60 * 60 * 1000
    ); // Add trial days
    return Math.floor(trialEnd.getTime() / 1000); // Convert to Unix timestamp in seconds
};


/**
 * Format price
 * @param amount 
 * @param currency 
 * @returns 
 */
export function formatPrice(amount: number, currency: string = 'USD'): string {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 2,
    }).format(amount / 100);
}

