import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import './LoginStyles.css'
import Spinner from "../Spinner/Spinner";
import { useDispatch } from "react-redux"
import { login } from '../../Store/slice/userSlice'
import Cookies from "js-cookie";
import backend_ref from "../BackendRef";

const Login = () => {
    console.log('aaaa');
    const dispatch = useDispatch()
    const [submitState, setSubmitState] = useState('true')
    // const navigateTo = useNavigate();
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
            if (check.data.data) {
                dispatch(login(check.data.data))
                Cookies.set('instaBookCredentials',JSON.stringify({token:check.data.token}),{expires:30})
                // navigateTo('/')
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
                    <button>Dont have an account? Sign up!</button>
                </form>

            </div>
        </div>
    );
};

export default Login;