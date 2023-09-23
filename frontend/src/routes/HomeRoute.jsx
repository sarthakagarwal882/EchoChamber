import { Outlet } from "react-router"
import Navbar from "../components/Navbar"
import backend_ref from "../components/BackendRef"
import Home from "../components/Home"
import Cookies from "js-cookie"
import { useDispatch } from "react-redux"
import axios from "axios"
import { login } from "../Store/slice/userSlice"

const HomeRoute = () => {
    const credentials = ((Cookies.get('echoChamberCred')))
    const dispatch = useDispatch()

    const checkCookiedata = async (data) => {
        let check = await axios.post(backend_ref + '/verify', data)
        if (check.data === undefined)
            null
        else
            dispatch(login(check.data))
    }

    if (credentials !== undefined)
        checkCookiedata(JSON.parse(credentials))

    return (
        <>
            <Navbar />
            <Home/>
            <Outlet />
        </>
    )
}
export default HomeRoute