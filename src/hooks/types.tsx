export interface Specification {
    attribute: string;
    value: string;
}

export interface Product {
    id?: number;
    name: string;
    description: string;
    price: number;
    date: string;
    picture: string[];
    specifications: Specification[];
}
export interface ProductSelected {
    id: number;
    name: string;
    description: string;
    price: number;
    date: string;
    picture: string[];
    specifications: Specification[];
}