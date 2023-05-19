import { Navigate, Route, Routes } from "react-router-dom"
import Login from "../modules/login/pages/Login.page"
import Enrollment from "../modules/enrollment/pages/Enrollment.page"
import MyAccount from "../modules/myAccount/pages/MyAccount.page"
import Users from "../modules/users/pages/Users.page"
import { Sidebar } from "../commons/components/sidebar/Sidebar.component"
import PrivateRoute from "./PrivateRoutes"
import PublicRoute from "./PublicRoutes"
import EditUser from "../modules/users/pages/EditUser.page"
import { useGlobal } from "../store/global.store"
import Loading from "../commons/components/Loading/Loading.component"
import NewProject from "../modules/projects/pages/newProject/NewProject.page"
import AllProjects from "../modules/projects/pages/allProjects/AllProjects.page"

export const AppRouter = () => {
    const { showLoading } =  useGlobal()
    return (
        <>
        { showLoading && <Loading/> }
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
                    <div className="row">
                        <div className="col-1 p-0 w-100">
                            <Sidebar />
                        </div>
                        <div className="col">
                            <PrivateRoute>
                                <Routes>
                                    <Route path="my-account" element={<MyAccount />}></Route>
                                    <Route path="users" element={<Users />}></Route>
                                    <Route path="edit-user/:userId" element={<EditUser />}></Route>
                                    <Route path="projects/create" element={<NewProject />}></Route>
                                    <Route path="projects/search" element={<AllProjects />}></Route>
                                    <Route path="*" element={<Navigate to="/users" replace />}></Route>
                                </Routes>
                            </PrivateRoute>
                        </div>
                    </div>
                } />
            </Routes>
        </>
    )
}