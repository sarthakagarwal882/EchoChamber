/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { AiFillLike } from 'react-icons/ai'
import { BiSolidComment } from 'react-icons/bi'
import { BsDot } from 'react-icons/bs'

import "./CardStyles.css"
import axios from 'axios'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router'
import backend_ref from './BackendRef'
import { useEffect, useState } from 'react'

const Card = (props) => {
    const navigateTo = useNavigate()
    let user = useSelector((store) => (store.user.data))
    const [liked, setLiked] = useState('#ffffff');
    const [data, setData] = useState({
        date: '',
        post: '',
        gender: '',
        id: '',
        username: '',
        likes: [],
        comments: [],
        likeCount: 0,
        commentCount: 0
    })
    let { date, post, gender, id, username, likes, comments } = props
    useEffect(() => {
        setData({
            ...data,
            date: date,
            post: post,
            gender: gender,
            id: id,
            username: username,
            likes: likes,
            comments: comments,
            likeCount: likes.length,
            commentCount: comments.length
        })
        let checkLike = (likes.filter(element => (element === user.username)))
        if (checkLike.length > 0)
            setLiked('#0072E8')
    }, [])

    const handleLike = async (event) => {
        if ('username' in user) {
            if (liked === '#ffffff') {
                const addLike = await axios.post(backend_ref + '/like', { data: { id: id, myUsername: user.username, postUsername: username } });
                if (addLike.data) {
                    setData((prevValue) => ({ ...prevValue, likeCount: data.likeCount + 1 }))
                    setLiked('#0072E8')
                }
                else {
                    toast('Error! Try again later!')
                }
            }
            else {
                const removeLike = await axios.post(backend_ref + '/rmlike', { data: { id: id, myUsername: user.username, postUsername: username } })
                if (removeLike.data) {
                    setData((prevValue) => ({ ...prevValue, likeCount: data.likeCount - 1 }))
                    setLiked('#ffffff')
                }
                else{
                    toast('unlike failed! Try again Later!')
                }
            }
        }
        else {
            toast('Login First!')
            navigateTo('/login')
        }

    }

    const handleComment = async (event) => {
        if ('username' in user) {
            const comment = await axios.post('/comment', { data: { id: id, username: user.username } })
        }
        else {
            toast('Login First!')
            navigateTo('/login')
        }
    }

    return (
        <div className="card">
            <div className="card-header">
                <div className='card-user'>
                    <img src={(data.gender === 'male') ? '/assets/man.png' : '/assets/woman.png'} alt="" />
                    <p>{data.username}</p>
                </div>
                <div className='card-date'>
                    <BsDot />
                    <p>{date}</p>
                </div>
            </div>
            {/* <hr /> */}
            <div className='card-post-wrapper'>

                <div className='card-post'>
                    <div className="post-text">
                        <p>{data.post}</p>
                    </div>
                    <div className='like-comment'>
                        <div className='likes'>
                            <AiFillLike name='like' style={{ color: liked }} onClick={handleLike} />
                            <p>{data.likeCount}</p>
                        </div>
                        <div className='comments'>
                            <BiSolidComment name='comment' onClick={handleComment} />
                            <p>{data.comments.length}</p>
                        </div>
                    </div>
                </div>

                <div className='comments'>
                </div>

            </div>

        </div >
    )
}
export default Card