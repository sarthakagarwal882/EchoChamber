/* eslint-disable no-unused-vars */
import { useState } from "react";
import axios from "axios";
import './LoginStyles.css'
import Spinner from "../Spinner/Spinner";
import { useDispatch } from "react-redux"
import { login } from '../../Store/slice/userSlice'
import Cookies from "js-cookie";
import backend_ref from "../BackendRef";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
    const dispatch = useDispatch()
    const [submitState, setSubmitState] = useState('true')
    const navigateTo = useNavigate();
    let [credentials, setCredentials] = useState({
        username: "",
        password: ""
    });


    const handleChange = (event) => {
        let { name, value } = event.target;
        setCredentials((prevValue) => {
            return (
                {
                    ...prevValue,
                    [name]: value
                }
            );
        });
    };


    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            setSubmitState()
            const check = await axios.post(backend_ref + '/login', { credentials });
            if (check.data.cookieData) {
                console.log(check.data.cookieData);
                dispatch(login(check.data.cookieData))
                Cookies.set('echoChamberCred', JSON.stringify({ token: check.data.token }), { expires: 30 })
                navigateTo('/')

            }
            else {
                setSubmitState('true')
                toast('Invalid username or password')
            }
        }
        catch (error) {
            console.log(error);
        }
    };



    return (
        <div className="wrapper-login">
            <div className="login-cover">
                <Link to={'/'}>
                    <img className="login-close" src="/assets/close.svg" alt="" />
                </Link>

                <div className="login">
                    <h1>Login to continue</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="login-form-div">
                            <input onChange={handleChange} name="username" type="text" value={credentials.username} placeholder="User Name" />
                        </div>
                        <div className="login-form-div">
                            <input onChange={handleChange} name="password" type="password" value={credentials.password} placeholder="Password" />
                        </div>
                        {submitState ?
                            <>
                                <button className="btn-login" type="submit">Login
                                </button>
                                <Link className="forgot-pass-link" to={'/forgot_password'} > 
                                    <p className="forgot-pass">Forgot Password?</p>
                                </Link>
                            </>
                            :
                            <Spinner></Spinner>
                        }
                        <Link className="signup-no-acc-link" to={'/signup'}>
                            <button>Dont have an account? Sign up!</button>
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;