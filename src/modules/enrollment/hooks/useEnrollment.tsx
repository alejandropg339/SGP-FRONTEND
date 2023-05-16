import { useNavigate } from "react-router-dom";
import { useErrorManagement } from "../../../commons/hooks/UseErrorMagament";
import { CommonRoutesEnum } from "../../../enums/commonRoutes.enum";
import { RepositoryApiNoAuth } from "../../../repositories/repositoryFactory";
import { EnrollmentRequestInterface } from "../interfaces/EnrollmentService.interface";
import { useMutation } from "@tanstack/react-query";
import { EnrollmentFormInterface } from "../interfaces/EnrollmentForm.interface";
import { useLogin } from "../../login/hooks/useLogin";
import { handleModal } from "../../../commons/helpers/modalManagagemnt";
import { useEffect } from "react";
import { useGlobal } from "../../../store/global.store";

const enrollUser = async (body: EnrollmentFormInterface) => {
    const parsedRequest: EnrollmentRequestInterface = {
        cedula: body.numberId,
        apellidos: body.lastName,
        cod_universitario: Number(body.code),
        contrasena: body.password,
        correo_est: body.email,
        correo_personal: body.personalEmail,
        nombres: body.name,
        programa_id: String(body.program),
        telefono: body.phone,
    }

    return await RepositoryApiNoAuth.authentication.enrollment(parsedRequest);
}

export const useEnrollment = () => {
    const errorManagement = useErrorManagement();
    const { mutation: login } = useLogin();
    const { setLoading } = useGlobal(); 
    const navigate = useNavigate();

    const mutation = useMutation({
        mutationFn: enrollUser,
        onSuccess: (_, { email, password }) => {
            login.mutate({ email, password })
            handleModal('success', 'Felicidades!', 'Has sido registrado exitosament', true, false, false);
            navigate(CommonRoutesEnum.MyAccount)
        }, onError: (error: any) => {
            if (error.status === '0' && error.msg) {
                handleModal('error', 'Por favor revisa los datos ingresados', error.msg, false, false);
            } else {
                errorManagement(error)
            }
        },
    });

    useEffect(() => {
        setLoading(mutation.isLoading)
    },[mutation.isLoading])

    return {
        mutation
    }
}