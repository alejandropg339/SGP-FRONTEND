import { ProductCommentInterface } from "../interfaces/products.interface"

export const CommentsList = ({ comments }: {comments: Array<ProductCommentInterface>}) => {
  return (
    <ul className="list-group list-group-flush" style={{ borderRadius: '8px' }}>
        {comments.map(({ fecha, apellidos, nombres, comentario }, index) => 
            <li className="list-group-item" key={index}>
                <div className="row">
                    <div className="col-12 d-flex justify-content-between align-items-center">
                        <p className="sgp-lb sgp-lb--lg sgp-text-orange-50 mb-0">{nombres?.toLocaleUpperCase()} {apellidos?.toLocaleUpperCase()}</p>
                        <p className="sgp-lb sgp-lb--sm sgp-text-gray-20">{fecha}</p>
                    </div>
                    <div className="col-12">
                        <p className="sgp-lb sgp-lb--md mb-0">
                            {comentario}
                        </p>
                    </div>
                </div>
            </li>
        )}
    </ul>
  )
}
