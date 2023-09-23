/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { AiFillLike } from 'react-icons/ai'
import { BiSolidComment } from 'react-icons/bi'
import { BsDot } from 'react-icons/bs'

import "./CardStyles.css"

const Card = (props) => {
    // const [viewport, setViewport] = useState(window.innerWidth <= 1000 ? true : false)

    // let { img, type, header, desc, date, location, button, profileName, profileImg, company, views, buttonColor } = props

    let date = 'Sun, 24 Sep 2023, 00:00'
    let post = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
    let likes = 30
    let comments = 10


    return (
        <div className="card">
            <div className="card-header">
                <div className='card-user'>
                    <img src="/assets/man.png" alt="" />
                    <p>Yash</p>
                </div>
                <div className='card-date'>
                    <BsDot />
                    <p>{date}</p>
                </div>
            </div>
            <hr />
            <div className='card-post'>
                <div className="post-text">
                    <p>{post}</p>
                </div>
                <div className='like-comment'>
                    <div className='likes'>
                        <AiFillLike />
                        <p>{likes}</p>
                    </div>
                    <div className='comments'>
                        <BiSolidComment />
                        <p>{comments}</p>
                    </div>
                </div>
            </div>
            <div className='comments'>

            </div>

        </div >
    )
}
export default Card