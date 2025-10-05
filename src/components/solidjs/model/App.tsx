
export interface App
{
    id: number,
    title: string,
    product_id: number
}

export interface AppVersion
{
    id: number,
    version: string,
    production: boolean,
    latest_scan: any,
    critical: number,
    high: number,
    medium: number,
    small: number,
    app_id: number
}
