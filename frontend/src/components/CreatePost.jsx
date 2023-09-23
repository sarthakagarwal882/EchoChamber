/* eslint-disable no-unused-vars */
import { useState } from 'react'
import './CreatePostStyles.css'
import { BiArrowBack } from 'react-icons/bi'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';
import axios from "axios";
import backend_ref from './BackendRef';

const CreatePost = () => {
    const user = useSelector((store) => store.user.data)
    const navigateTo = useNavigate()
    const [postData, setPostData] = useState({
        text: ''
    })

    const handleDataChange = (e) => {
        let { name, value } = e.target
        setPostData((prevValue) => {
            return ({
                ...prevValue,
                [name]: value
            })
        })
        console.log(postData);
    }


    const handleSubmit = async (e) => {
        e.preventDefault()
        if (postData.text === '')
            toast('Please enter text!');
        else {
            try {
                let date = new Date().toLocaleString();
                let data = {
                    post: postData.text,
                    username: user.username,
                    date: date,
                    gender:user.gender
                }
                let send = await axios.post(backend_ref + '/postData', { data })
                if (send.data) {
                    toast('Post Uploaded Successfuly')
                    navigateTo('/'), 2000
                }
                else {
                    toast('Post upload Failed. Try again Later!')
                }
            }
            catch (err) {
                console.log(err);
            }

        }
    }

    return (
        <div className="createpost-wrapper">
            <div className="createpost-cover">
                <div className='createpost-header'>
                    <Link to={'/'}>
                        <BiArrowBack />
                    </Link>
                    <div>
                        <p >Create new post</p>
                    </div>
                </div>
                <div className="createpost">

                    <div className='user-info'>
                        <img src="/assets/man.png" alt="" />
                        <p>{user.username}</p>
                    </div>
                    <div className='createpost-form'>
                        <form onSubmit={handleSubmit}>
                            <textarea name="text" placeholder='write post...' onChange={handleDataChange} value={postData.text} id="" cols="30" rows="10"></textarea>
                            <button className='postdata' type='submit'>Post</button>
                        </form>
                    </div>
                    {/* <div className='createpost-img'>
                        {(image) &&
                            <img src={image} alt="" style={{ objectFit: imgFit }} />
                        }
                        {(!image) &&
                            <div className='input-file'>
                                <BiImageAdd />
                                <label htmlFor="file">Choose a Picture</label>
                                <input id='file' name='image' className="file" type="file" onChange={handleImgChange} />
                            </div>
                        }
                    </div>

                    <div className='createpost-post-info'>
                        <div className='user-info'>
                            <img src="/assets/man.png" alt="" />
                            <p>ksdxnawk;ndkw;</p>
                        </div>
                        <textarea value={postData.caption} onChange={handleDataChange} name="caption" id="" cols="30" rows="7" placeholder='Write a caption ...'></textarea>
                        <div className='img-fit'>
                            <p>Choose Image Fit</p>
                            <div className='img-fit-buttons'>
                                <button name='cover' onClick={handleImgFit} className={(imgFit === 'cover') ? 'btn-selected' : ''}>Cover</button>
                                <button name='contain' onClick={handleImgFit} className={(imgFit === 'contain') ? 'btn-selected' : ''}>Contain</button>
                            </div>
                        </div>
                        <div className='create-post-location'>
                            <input name='location' onChange={handleDataChange} type="text" value={postData.location} placeholder='Add location' />
                        </div>
                        <span className='postdata' onClick={submitData}>Post</span>
                    </div> */}
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
                    />

                </div>
            </div>
        </div >
    )
}
export default CreatePost