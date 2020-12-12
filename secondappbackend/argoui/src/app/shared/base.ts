export function uiUrlWithParams(uiPath: string, params: string[]): string {
    if (!params) {
        return '/' + uiPath;
    }
    return '/' + uiPath + '?' + params.join('&');
}