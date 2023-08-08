import { ProductForm } from "../../components/ProductForm.component"
import { LayoutFormProjects } from "../../../../commons/layout/LayoutFormProjects"
import { useGlobal } from "../../../../store/global.store";
import { useMutation } from "@tanstack/react-query";
import { NewProductFormInterface, NewProductResponseInterface } from "../../interfaces/newProductForm.interface";
import { RepositoryFactory } from "../../../../repositories/repositoryFactory";
import { useNavigate, useParams } from "react-router-dom";
import { handleActionModal } from "../../../../commons/helpers/modalManagement";
import { CommonRoutesEnum } from "../../../../enums/commonRoutes.enum";

const addProduct = async (request: NewProductFormInterface, projectId: string) => await RepositoryFactory.RepositoryApiAuth.projects.addProjectProduct(projectId, request)
const NewProduct = () => {
    const { setLoading } = useGlobal();
    const { idProject } = useParams();
    const navigate = useNavigate();

    const submit = (formValues: NewProductFormInterface) => {
        handleUploadProduct([formValues, idProject!])
    }

    const { mutate: handleUploadProduct } = useMutation<NewProductResponseInterface, any, [NewProductFormInterface, string]>(([formValues, projectId]) => addProduct(formValues, projectId), {
        onMutate: () => {
            setLoading(true);
        },
        onSuccess: () => {
            handleActionModal('success', 'Estado Actualizado correctamente.')
            navigate(`${CommonRoutesEnum.Projects}/info/${idProject}`)
        },
        onError: () => {
            handleActionModal('error', 'Error al actualizar el estado del proyecto.')
        },
        onSettled: () => {
            setLoading(false);
        }
    })

    return (
        <LayoutFormProjects
            title="Agregar Producto"
            description="Agrega un producto al proyecto"
        >
            <p className="sgp-lb sgp-lb--h5">*Por favor sube o un link o un archivo evita que sean ambos.*</p>
            <ProductForm submit={submit} />
        </LayoutFormProjects>
    )
}

export default NewProduct