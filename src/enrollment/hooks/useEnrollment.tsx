import { useNavigate } from "react-router-dom";
import { useErrorManagement } from "../../commons/hooks/UseErrorMagament";
import { CommonRoutesEnum } from "../../enums/commonRoutes.enum";
import Swal from "sweetalert2";
import { RepositoryApiNoAuth } from "../../repositories/repositoryFactory";
import { EnrollmentRequestInterface } from "../interfaces/EnrollmentService.interface";
import { useMutation } from "@tanstack/react-query";
import { EnrollmentFormInterface } from "../interfaces/EnrollmentForm.interface";

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
    // const userStore = useUserStore();
    const navigate = useNavigate();

    const mutation = useMutation({
        mutationFn: enrollUser,
        onSuccess: (res) => {
            console.log(res)
            //TODO: CALL LOGIN HOOK
            // const userData: Partial<UserInterface> = {
            //     numberId: res.data.cedula,
            //     name: res.data.nombres,
            //     hotbedId: res.data.semillero_id,
            //     institutionalEmail: res.data.correo_est,
            //     lastName: res.data.apellidos,
            //     phone: res.data.telefono,
            //     visibility: res.data.visibilidad,
            //     uCode: res.data.cod_universitario,
            //     programId: res.data.programa_id,
            // }

            // userStore.setUser(userData);
            navigate(CommonRoutesEnum.Users)
        }, onError: (error: any) => {
            if (error.status === '0' && error.msg) {
                Swal.fire({
                    icon: 'error',
                    title: 'Por favor revisa los datos ingresados',
                    text: error.msg,
                })
            } else {
                errorManagement(error)
            }
        },
    });

    return {
        mutation
    }
}