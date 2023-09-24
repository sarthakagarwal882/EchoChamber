import { Outlet } from "react-router"
import Navbar from "../components/Navbar"
import Home from "../components/Home"

const HomeRoute = () => {

    return (
        <>
            <Navbar />
            <Home />
            <Outlet />
        </>
    )
}
export default HomeRoute