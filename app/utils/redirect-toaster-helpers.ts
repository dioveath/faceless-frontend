const toastKeyMap: { [key: string]: string[] } = {
    status: ['status', 'status_description'],
    error: ['error', 'error_description']
};

export const getToastRedirect = (
    path: string,
    toastType: string,
    toastName: string,
    toastDescription: string = '',
    disableButton: boolean = false,
    arbitraryParams: string = ''
): string => {
    const [nameKey, descriptionKey] = toastKeyMap[toastType];

    let redirectPath = `${path}?${nameKey}=${encodeURIComponent(toastName)}`;

    if (toastDescription) {
        redirectPath += `&${descriptionKey}=${encodeURIComponent(toastDescription)}`;
    }

    if (disableButton) {
        redirectPath += `&disable_button=true`;
    }

    if (arbitraryParams) {
        redirectPath += `&${arbitraryParams}`;
    }

    return redirectPath;
};


export const getErrorRedirect = (
    path: string,
    errorName: string,
    errorDescription: string = '',
    disableButton: boolean = false,
    arbitraryParams: string = ''
) =>
    getToastRedirect(
        path,
        'error',
        errorName,
        errorDescription,
        disableButton,
        arbitraryParams
    );