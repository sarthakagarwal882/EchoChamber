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
    const [comment, setComment] = useState('')
    const [liked, setLiked] = useState('#ffffff');
    const [commentBar, setCommentBar] = useState('none')
    let { date, post, gender, id, username, likes, comments } = props
    const [data, setData] = useState({
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




    useEffect(() => {
        let checkLike = ((data.likes).filter(element => (element === user.username)))
        if (checkLike.length > 0)
            setLiked('#0072E8')
        else {
            setLiked('#ffffff')
        }
    }, [])



    const handleLike = async (event) => {

        if ('username' in user) {

            if (liked == '#0072E8') {
                const removeLike = await axios.post(backend_ref + '/rmlike', { data: { id: id, myUsername: user.username, postUsername: username } })
                if (removeLike.data) {
                    console.log(removeLike.data);
                    const newLikes = await axios.post(backend_ref + '/getstats', { data: { id: data.id } })
                    setData((prevValue) => ({ ...prevValue, likes: newLikes.data.likes, comments: newLikes.data.comments, likeCount: prevValue.likeCount - 1 }))

                    setLiked('#ffffff')
                }
                else {
                    toast('unlike failed! Try again Later!')
                }
            }
            else {
                const addLike = await axios.post(backend_ref + '/like', { data: { id: id, myUsername: user.username, postUsername: username } });
                if (addLike.data) {
                    setData((prevValue) => ({ ...prevValue, likeCount: data.likeCount + 1, likes: (data.likes).push(user.username) }))
                    setLiked('#0072E8')
                    console.log(data.likes);
                }
                else {
                    toast('Error! Try again later!')
                }
            }
        }

        else {
            toast('Login First!')
            navigateTo('/login')
        }

    }



    const handleComment = async (e) => {
        e.preventDefault()
        if ('username' in user) {
            const commentCheck = await axios.post(backend_ref + '/comment', { data: { id: id, myUsername: user.username, postUsername: username, comment: comment, gender: user.gender } })
            console.log(commentCheck);
        }
        else {
            toast('Login First!')
            navigateTo('/login')
        }
    }


    const handleCommentChange = (e) => {
        setComment(e.target.value)
    }


    const handleCommentBar = () => {
        if (commentBar === 'none')
            setCommentBar('flex')
        else
            setCommentBar('none')
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
                            <BiSolidComment name='comment' onClick={handleCommentBar} />
                            <p>{(data.comments).length}</p>
                        </div>
                    </div>
                </div>

                <div style={{ display: commentBar }} className='comments-cover'>
                    <form onSubmit={handleComment}>
                        <input type="text" onChange={handleCommentChange} value={comment} />
                        <button type='submit'>Post</button>
                    </form>
                    {((data.comments).map(element => {
                        return (
                            < div key={element.uniqueId} className='other-comments'>
                                <div className='other-profile'>
                                    <img src={(element.gender === 'male') ? '/assets/man.png' : '/assets/woman.png'} alt="" />
                                </div>
                                <div className='other-comment-text'>
                                    <p>{element.username}</p>
                                    <p>
                                        {element.comment}
                                    </p>
                                </div>
                            </div>
                        )
                    }))
                    }

                </div>


            </div>

        </div >
    )
}
export default Card