import { useNavigate } from "react-router-dom";
import { UserResponseDataInterface } from "../../../commons/interfaces/user.interface";
import { useUserStore } from "../../../store/user.store";
import { CommonRoutesEnum } from "../../../enums/commonRoutes.enum";

export const useEditUser = () => {
    const userStore = useUserStore();
    const navigate = useNavigate();

    const editUser = (user: Partial<UserResponseDataInterface>) => {
        userStore.setUserToEdit(user);
        console.log(userStore.userToEditInfo)
        navigate(CommonRoutesEnum.EditUser);
    }

    return {
        editUser
    };
}