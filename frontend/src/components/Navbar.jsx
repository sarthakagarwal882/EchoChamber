/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import "./NavbarStyles.css"
import { IoMdArrowDropdown } from 'react-icons/io'
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import Cookies from "js-cookie"
import { login } from "../Store/slice/userSlice"
const Navbar = () => {
    const dispatch = useDispatch()
    const navigateTo = useNavigate()
    const state = useSelector((store) => { return (store.user.data) })
    const [userState, setUserState] = useState(state)
    const [dropDown, setDropdown] = useState('none')
    const [viewport, setViewport] = useState(window.innerWidth <= 1000 ? false : true)
    const handleViewport = () => {
        if ((window.innerWidth) <= 1000)
            setViewport(false)
        else
            setViewport(true)
    }
    window.addEventListener('resize', handleViewport)

    function setProfileImg() {
        if (state.gender === 'male')
            return ('profile-img-male')
        else if (state.gender === 'female')
            return ('profile-img-female')
    }

    function setDropdownFunc() {
        setDropdown((dropDown == 'none') ? 'flex' : 'none')
    }

    function handleLogout() {
        Cookies.remove('echoChamberCred')
        dispatch(login({}))
        navigateTo('/')

    }


    return (
        <>
            < div className="navbar" >
                <Link to={'/'}>
                    <h1 className="nav-title"><img src="/assets/main.png" alt="" /> ECHO CHAMBER</h1>
                </Link>

                <div className="nav-auth">
                    {
                        ('username' in state) ?
                            <div className="nav-dropdown">
                                <div role="button" onClick={setDropdownFunc} className="profile-div">
                                    <p>{state.username}</p>
                                    <span className={setProfileImg()}></span>
                                </div>
                                <div className="nav-drop-menu" onMouseLeave={setDropdownFunc} style={{ display: dropDown }}>
                                    <div>
                                        <span>dashboard</span>
                                    </div>
                                    <hr />
                                    <div onClick={handleLogout}>
                                        <span>logout</span>
                                    </div>
                                </div>
                            </div>
                            :
                            <div className="nav-unsigned">
                                <Link className="nav-login-link" to={'/login'}>
                                    <button>Login</button>
                                </Link>
                                <Link className="nav-create-account-link" to={'/signup'}>
                                    <p className="nav-create-account-p">Create account. <span>It's free!</span></p>
                                </Link>
                            </div>
                    }

                </div>
            </div >

        </>
    )

}
export default Navbar