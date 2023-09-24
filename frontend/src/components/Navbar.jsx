/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import "./NavbarStyles.css"
import { Divide as Hamburger } from 'hamburger-react'
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import Cookies from "js-cookie"
import { login } from "../Store/slice/userSlice"
const Navbar = () => {
    const dispatch = useDispatch()
    const navigateTo = useNavigate()
    const state = useSelector((store) => { return (store.user.data) })
    const [dropDown, setDropdown] = useState('none')
    const [isOpen, setOpen] = useState(false)
    const [viewport, setViewport] = useState(window.innerWidth <= 900 ? null : true)

    const handleViewport = () => {
        if ((window.innerWidth) <= 900)
            setViewport(null)
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
                    <div className="nav-title">
                        <img src="/assets/main.png" alt="" />
                        <h1> ECHO CHAMBER</h1>
                    </div>
                </Link>

                <div className="nav-auth">
                    {
                        ('username' in state) ?
                            < div className="nav-dropdown">
                                <div role="button" onClick={setDropdownFunc} className="profile-div">
                                    <p>{state.username}</p>
                                    <span className={setProfileImg()}></span>
                                </div>
                                <div className="nav-drop-menu" onMouseLeave={setDropdownFunc} style={{ display: dropDown }}>
                                    <Link to={'/dashboard'}>
                                    <div>
                                        <span>dashboard</span>
                                    </div>
                                    </Link>
                                    <hr />
                                    <div onClick={handleLogout}>
                                        <span>logout</span>
                                    </div>
                                </div>
                            </div>

                            :
                            (viewport) ?
                                <div className="nav-unsigned">
                                    <Link className="nav-login-link" to={'/login'}>
                                        <button>Login</button>
                                    </Link>
                                    <Link className="nav-create-account-link" to={'/signup'}>
                                        <p className="nav-create-account-p">Create account. <span>It's free!</span></p>
                                    </Link>
                                </div>
                                :
                                <div>
                                    <Hamburger toggled={isOpen} toggle={setOpen} />
                                    {
                                        (isOpen) &&
                                        <div className="hamburger-wrapper">
                                            <div className="hamburger-menu">
                                                <Hamburger toggled={isOpen} toggle={setOpen} />
                                                <ul>
                                                    <hr />
                                                    <Link to={'/login'} onClick={setOpen}>
                                                        <li>Login</li>
                                                    </Link>
                                                    <Link to={'/signup'} onClick={setOpen}>
                                                        <li>Signup</li>
                                                    </Link>
                                                </ul>

                                            </div>
                                        </div>

                                    }
                                </div>
                    }

                </div>
            </div >

        </>
    )

}
export default Navbar