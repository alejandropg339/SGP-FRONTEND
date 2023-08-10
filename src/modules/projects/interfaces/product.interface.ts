export interface NewProductFormInterface {
    name: string;
    productType: string;
    link: string;
    file: File | null | string;
}

export interface NewProductResponseInterface {
    status: string;
    msg: string;
    data: Array<any>;
}

export interface DeleteProductResponseInterface {
    status: string;
    msg: string;
    data: Array<any>;
}