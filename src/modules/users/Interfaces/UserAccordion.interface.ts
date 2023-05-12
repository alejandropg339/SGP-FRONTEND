import { UserResponseDataInterface } from "../../../commons/interfaces/user.interface";

export interface UserAccordionProps {
    user: Partial<UserResponseDataInterface>,
    index: number
}