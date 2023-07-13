import { ProductForm } from "../../components/ProductForm.component"
import { LayoutFormProjects } from "../../../../commons/layout/LayoutFormProjects"

const NewProduct = () => {
    const submit = (formValues: any) => {
        console.log(formValues)
    }

    return (
        <LayoutFormProjects
            title="Agregar Producto"
            description="Agrega un producto al proyecto"
        >
            <ProductForm submit={submit} />
        </LayoutFormProjects>
    )
}

export default NewProduct