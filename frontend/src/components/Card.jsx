/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { AiFillLike } from 'react-icons/ai'
import { BiSolidComment } from 'react-icons/bi'
import { BsDot } from 'react-icons/bs'

import "./CardStyles.css"

const Card = (props) => {
    let { date, post, gender, id, username, likes, comments } = props

    const handleLike = async (event) => {
        
    }
    const handleComment = async (event) => {
        console.log(event.target);
    }
    console.log(id);

    return (
        <div className="card">
            <div className="card-header">
                <div className='card-user'>
                    <img src={(gender === 'male') ? '/assets/man.png' : '/assets/woman.png'} alt="" />
                    <p>{username}</p>
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
                        <p>{post}</p>
                    </div>
                    <div className='like-comment'>
                        <div className='likes'>
                            <AiFillLike name='like' onClick={handleLike} />
                            <p>{likes}</p>
                        </div>
                        <div className='comments'>
                            <BiSolidComment name='comment' onClick={handleComment} />
                            <p>{comments.length}</p>
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