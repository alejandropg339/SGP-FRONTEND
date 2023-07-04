import Swal, { SweetAlertIcon } from "sweetalert2"

export const handleModal = (icon: SweetAlertIcon, title: string, text?: string, timer?: boolean, showConfirmButton?: boolean, showCancelButton?: boolean, confirmButtonText?: string, cancelButtonText?: string) => {
    if(timer){
        Swal.fire({
            icon,
            title,
            text,
            timer: 1800,
            showConfirmButton,
        })
    } else{
        Swal.fire({
            icon,
            title,
            text,
            showConfirmButton,
            showCancelButton,
            confirmButtonText,
            cancelButtonText,
            customClass: {
                cancelButton: 'sgp-btn sgp-btn--secondary',
                confirmButton: 'sgp-btn sgp-btn--primary'
            },

        })
    } 
}

export const handleActionModal = (icon: SweetAlertIcon, title: string, text?: string, showConfirmButton?: boolean, showCancelButton?: boolean, confirmButtonText?: string, cancelButtonText?: string, confirmAction?: any | Promise<any>) => {
    Swal.fire({
        icon,
        title,
        text,
        showConfirmButton,
        showCancelButton,
        confirmButtonText,
        cancelButtonText,
        customClass: {
            cancelButton: 'sgp-btn sgp-btn--secondary',
            confirmButton: 'sgp-btn sgp-btn--primary'
        },

    }).then(async (result) => {
        result.isConfirmed && await confirmAction()
    })
}
