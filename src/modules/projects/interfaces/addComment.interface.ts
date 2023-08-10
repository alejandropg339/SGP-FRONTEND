export interface AddCommentResponseInterface {
    status: string;
    msg: string;
    data: Array<any>;
}

export interface ProductComments {
    status: string;
    msg: string;
    data: Array<ProductComment>;
}

export interface ProductComment {
    id: number;
    comentario: string;
    calificacion: null;
    fase: string;
    nivel: string;
    fecha: string;
    producto_id: number;
    usuario_id: string;
    nombres: string;
    apellidos: string;
}
