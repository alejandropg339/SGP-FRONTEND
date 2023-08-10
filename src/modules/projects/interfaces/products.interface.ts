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
    comentarios: Array<ProductCommentInterface>;
}

export interface ProductCommentInterface {
    id: number;
    comentario: string;
    calificacion: string | null;
    fase: string;
    nivel: string;
    fecha: string;
    producto_id: number;
    usuario_id: string;
    nombres: string;
    apellidos: string;
}