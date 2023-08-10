
export const ProjectFields = ({ title, description }: { title: string, description: string }) => {
    return (
        <div className="row mt-3">
            <div className="col-12">
                <h3 className="sgp-lb sgp-lb--h3">{title}</h3>
                <p className='sgp-lb sgp-lb--md'>
                    {description}
                </p>
            </div>
        </div>
    )
}
