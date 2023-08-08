export interface ProductsResponseInterface {
    status: string;
    msg: string;
    data: Array<ProductInterface>;
}

export interface ProductInterface {
    id: number;
    titulo_producto: string;
    tipo_producto: string;
    url_repo: string;
    fecha: string;
    proyecto: number;
}