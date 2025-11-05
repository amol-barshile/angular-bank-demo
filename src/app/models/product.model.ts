export interface Product {
    id: number
    name: string
    price: number
    description: string
    owner: number,
    createdAt?: Date
    updatedAt?: Date
}