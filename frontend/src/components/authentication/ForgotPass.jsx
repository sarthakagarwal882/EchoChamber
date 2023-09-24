import { useState } from 'react'
import './ForgotPassStyles.css'
import { useSelector } from 'react-redux'
import axios from 'axios'
import backend_ref from '../BackendRef'
import { useNavigate } from 'react-router'
import { ToastContainer, toast } from 'react-toastify'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { Link } from 'react-router-dom'
const ForgotPass = () => {
    // eslint-disable-next-line no-unused-vars
    const navigateTo = useNavigate()
    const userData = useSelector((store) => { return (store.user.data) })
    const [otp, setOtp] = useState('')
    const [otpVerify, setOtpverify] = useState(false)
    const [otpRender, setOtprender] = useState('none')
    const [state, setState] = useState({
        email: '',
        username: ''
    })
    const [password, setpassword] = useState({
        pass: '',
        cfpass: ''
    })


    const handleChange = (e) => {
        let { name, value } = e.target
        setState((prevvalue) => ({
            ...prevvalue,
            [name]: value
        }))
    }

    const triggerOTP = async () => {
        let temp = await axios.post(backend_ref + '/otp', { data: { state } })
        if (temp.data === true) {
            setOtprender('flex')
        }
        else {
            console.log('kjabjsn');
            toast('Wrong credentials, Please try again!')
        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        triggerOTP()
    }

    const handleOtpSubmit = async (e) => {
        e.preventDefault();
        const verify = await axios.post(backend_ref + '/verifyOtp', { data: { email: state.email, username: state.username, otp: otp } })
        console.log(verify);
        if (verify.data === true) {
            setOtpverify('true')
            setOtprender('none')
        }
        else {
            toast('Wrong Otp')
        }
    }

    const hnadleOtpChange = (e) => {
        const { value } = e.target
        setOtp(value)
    }

    const handlePassChange = (e) => {
        let { name, value } = e.target
        setpassword((prevvalue) => ({
            ...prevvalue,
            [name]: value
        }))
    }

    const handlePasswordSubmit = async (e) => {
        e.preventDefault()
        console.log(password.pass === password.cfpass);
        if (password.pass === password.cfpass) {
            let changePass = await axios.post(backend_ref + '/changePass', { data: { username: state.username, newPass: password.pass } })
            if (changePass.data) {
                toast('Password changed Sucessfully! Redirecting to Home page!')
                setTimeout(() => {
                    navigateTo('/')
                }, 3000)
            }
        }
        else {
            toast('Passwords do not match!')
            setpassword({
                pass: '',
                cfpass: ''
            })
        }
    }



    return (
        <>
            {(!('username' in userData)) ?
                <>
                    {(otpRender === 'none') ?
                        <>{(otpVerify === 'true') ?
                            <div className='new-password'>
                                <Link to={'/'}>
                                    <AiOutlineCloseCircle />
                                </Link>
                                <form onSubmit={handlePasswordSubmit}>
                                    <h2>Enter new password</h2>
                                    <input name='pass' value={password.pass} type="password" onChange={handlePassChange} />
                                    <input name='cfpass' value={password.cfpass} type="password" onChange={handlePassChange} />
                                    <button>Submit</button>
                                </form>
                            </div>
                            :
                            <div className="forgotpass">
                                <Link to={'/'}>
                                    <AiOutlineCloseCircle />
                                </Link>                                <form onSubmit={handleSubmit}>
                                    <h2>Enter Email and username to continue</h2>
                                    <input name='email' value={state.email} onChange={handleChange} type="email" placeholder="Enter your Email" />
                                    <input name='username' value={state.username} onChange={handleChange} type="text" placeholder="Enter your Username" />
                                    <button type='submit'>Submit</button>
                                </form>
                            </div>
                        }
                        </>
                        :
                        <div className='otp-wrapper'>
                            <Link to={'/'}>
                                <AiOutlineCloseCircle />
                            </Link>                            <form onSubmit={handleOtpSubmit}>
                                <h2>Enter Otp Here! </h2>
                                <p>Sent in Email</p>
                                <input name='otp' value={otp} onChange={hnadleOtpChange} type="text" />
                                <button type='submit'>Submit</button>
                            </form>
                        </div>
                    }
                </>
                :
                <div className='forgotpass'>
                    <h2>Page not availible!!!</h2>
                </div>

            }
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />        </>
    )
}
export default ForgotPass