import { Outlet } from "react-router"
import Navbar from "../components/Navbar"
import Cookies from "js-cookie"
import { useDispatch } from "react-redux"
import axios from "axios"
import backend_ref from "../components/BackendRef"
import { login } from "../Store/slice/userSlice"

const HomeRoute = () => {
    const credentials = ((Cookies.get('echoChamberCred')))
    const dispatch = useDispatch()

    const checkCookiedata = async (data) => {
        let check = await axios.post(backend_ref + '/verify', data)
        console.log(check);
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
            <Outlet />
        </>
    )
}
export default HomeRoute