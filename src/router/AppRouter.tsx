import { Navigate, Route, Routes } from "react-router-dom"
import Login from "../login/pages/Login.page"
import Enrollment from "../enrollment/pages/Enrollment.page"
import MyAccount from "../modules/myAccount/pages/MyAccount.page"
import Users from "../modules/users/pages/Users.page"
import { Sidebar } from "../commons/components/sidebar/Sidebar.component"
import PrivateRoute from "./PrivateRoutes"
import PublicRoute from "./PublicRoutes"

export const AppRouter = () => {
    return (
        <>
            <div className="row">
                <div className="col-1 p-0 w-100">
                    <Sidebar />
                </div>
                <div className="col p-0">
                    <Routes>
                        <Route path="login/*" element={
                            <PublicRoute>
                                <Routes>
                                    <Route path="" element={<Login />}></Route>
                                    <Route path="enrollment" element={<Enrollment />}></Route>
                                </Routes>
                            </PublicRoute>
                        } />
                        <Route path="/*" element={
                            <PrivateRoute>
                                <Routes>
                                    <Route path="my-account" element={<MyAccount />}></Route>
                                    <Route path="users" element={<Users />}></Route>
                                    <Route path="*" element={<Navigate to="/login" replace />}></Route>
                                </Routes>
                            </PrivateRoute>
                        } />
                    </Routes>
                </div>
            </div>
        </>
    )
}