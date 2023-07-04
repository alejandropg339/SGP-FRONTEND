
export const ProjectFields = ({ title, description }: { title: string, description: string }) => {
    return (
        <div className="row mt-3">
            <div className="col-12">
                <h3 className="sgp-lb sgp-lb--h3">{title}</h3>
                <p className='sgp-lb sgp-lb--md'>
                    {description} Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati, reiciendis! Possimus enim aspernatur fugit corporis numquam at mollitia nulla quo provident? Sunt molestias eos ut, a amet animi harum vel. Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse facilis dolores rem, atque aspernatur hic impedit totam id laborum provident harum corporis? Reprehenderit, doloribus deleniti distinctio ad consectetur harum sed.
                </p>
            </div>
        </div>
    )
}
