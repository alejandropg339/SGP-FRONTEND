
export interface LayoutProps  { 
    children: React.ReactNode;
    title: string;
    description: string;
    imgSrc?: string;
 }
export const LayoutFormProjects: React.FC<LayoutProps> = ({ children, title, description, imgSrc }) => {

  return (
    <div className="container-fluid p-0 sgp-my-account">
      <section className="sgp-bg-white">
        <div className="py-5 ">
          <div className="row mb-4">
            <div className="col-12 text-center">
              <img src={imgSrc ?? "https://tecnosoft.ingusb.com/img/add-project.svg"} alt="avatar" className="sgp-my-account__avatar" />
            </div>
          </div>
          <div className="row d-flex justify-content-center align-items-center" >
            <div className="col-12 col-md-8 col-lg-6 col-xl-5" >
              <div className="card sgp-bg-gray-20 text-white sgp-card">
                <div className="card-body p-5 text-center">
                  <div className="mb-md-5 mt-md-4 pb-5">
                    <h2 className="sgp-lb--h1">{title}</h2>
                    <p className="text-white-50 mb-5 sgp-text-white">{description}</p>
                    { children }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
