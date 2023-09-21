/* eslint-disable no-unused-vars */
import { useState } from "react";
import axios from "axios";
import './LoginStyles.css'
import Spinner from "../Spinner/Spinner";
import { useDispatch } from "react-redux"
import { login } from '../../Store/slice/userSlice'
import Cookies from "js-cookie";
import backend_ref from "../BackendRef";
import { Link ,Outlet, useNavigate} from "react-router-dom";

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
                alert('Invalid username or password')
            }
        }
        catch (error) {
            console.log(error);
        }
    };



    return (
        <div className="wrapper">
            <div className="login">
                <h1>InstaBook</h1>
                <form onSubmit={handleSubmit}>
                    <div className="login-form-div">
                        <input onChange={handleChange} name="username" type="text" value={credentials.username} placeholder="User Name" />
                    </div>
                    <div className="login-form-div">
                        <input onChange={handleChange} name="password" type="password" value={credentials.password} placeholder="Password" />
                    </div>
                    {submitState ?
                        <button className="btn-login" type="submit">Login
                        </button>
                        :
                        <Spinner></Spinner>
                    }
                    <Link to={'/signup'}>
                        <button>Dont have an account? Sign up!</button>
                    </Link>
                </form>
            </div>
            <Outlet/>
        </div>
    );
};

export default Login;