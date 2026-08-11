export interface SmartCodeParams {
    version: 2.2 | 3.0;
    accountId: string;
    settingsTimeout: number;
    hideElement: string;
    hideElementStyle: string;
}
export declare function buildSmartCode(p: SmartCodeParams): string;
