import { Navigate, Route, Routes } from "react-router-dom"
import Login from "../login/pages/Login.page"
import Enrollment from "../enrollment/pages/Enrollment.page"
import MyAccount from "../modules/myAccount/pages/MyAccount.page"
import Users from "../modules/users/Users.page"

export const AppRouter = () => {
    return (
        <>
            <Routes>
                <Route path="login" element={<Login />}></Route>
                <Route path="enrollment" element={<Enrollment />}></Route>
                <Route path="my-account" element={<MyAccount />}></Route>
                <Route path="users" element={<Users />}></Route>
                <Route path="*" element={ <Navigate to="/login" replace/>}></Route>
            </Routes>
        </>
    )
}