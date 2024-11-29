export const toDateTime = (secs: number) => {
    var t = new Date(+0); // Unix epoch start.
    t.setSeconds(secs);
    return t;
};

export const calculateTrialEndUnixTimestamp = (
    trialPeriodDays: number | null | undefined
) => {
    // Check if trialPeriodDays is null, undefined, or less than 2 days
    if (
        trialPeriodDays === null ||
        trialPeriodDays === undefined ||
        trialPeriodDays < 2
    ) {
        return undefined;
    }

    const currentDate = new Date(); // Current date and time
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
  
  