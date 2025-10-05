import type { App } from "@components/solidjs/model/App"

export interface ProductLine
{
    id: number,
    title: string,
    products: Product[]
}

export interface PoProductLine
{
    title: string
}

export interface ProductLineError
{
    title: string
}


export interface Product
{
    id: number,
    title: string,
    product_line_id: number,
    app: App[]
}

export interface ProductLineError
{
    title: string
}

export interface ProductError
{
    title: string
}