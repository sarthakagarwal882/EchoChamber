import './PostStyles.css'
import { useState } from "react"
import { IoMdArrowDropdown } from 'react-icons/io'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'

const Post = () => {
    const user = useSelector((store) => store.user.data)
    const allPosts = useSelector((store) => store.posts.data)
    const navigateTo = useNavigate()
    const [liClicked, setLiClicked] = useState(0)
    const [dropDown, setDropdown] = useState(false)
    const [viewport, setViewport] = useState((window.innerWidth <= 1000) ? false : true)
    const [isOpen, setIsOpen] = useState(null);
    const [liFilter, setLiFilter] = useState('All Posts')


    const handleLiClick = (index, filter) => {
        setLiClicked(index)
        setLiFilter(filter)
        console.log(liClicked);
    }


    const handleClickDrop = () => {
        setDropdown(!dropDown)
    }



    const handleViewport = () => {
        if (window.innerWidth <= 1000) {
            setViewport(false)
        }
        else {
            setViewport(true)
        }
    }


    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    }


    window.addEventListener('resize', handleViewport)

    const handleCreatePost = () => {
        if ('username' in user)
            navigateTo('/create')
        else {
            toast('Login first!')
            navigateTo('/login')
        }

    }


    const listItems = ["All Posts"];

    return (
        <div className='posts'>
            <div className='posts-child'>
                {viewport ? null :
                    <div className='post-368'>
                        <p>Posts: {allPosts.length}</p>
                    </div>
                }
                {/* <div className='ul-div-wrapper'>
                    {
                        viewport ? null :
                            <button className="dropbtn" onClick={toggleDropdown}>Filter: {liFilter}<IoMdArrowDropdown className={isOpen && 'rotate-180'} /></button>
                    }
                    <ul className={(isOpen && !viewport) ? "toggle" : null}>
                        {listItems.map((item, index) => (
                            <li
                                key={index}
                                className={(liClicked === index && viewport) ? 'txt-li-b' : ''}
                                onClick={() => handleLiClick(index, item)}
                            >
                                {item}

                                {viewport && index === liClicked && <div className="post-li-hr"></div>}
                            </li>
                        ))}
                    </ul>
                </div> */}
                {(viewport) ?
                    <div className='create-post' onClick={handleCreatePost}>
                        <span role='button' onClick={handleClickDrop} className={dropDown ? 'clicked span-1' : 'span-1'}>Create a Post</span>
                    </div>
                    : null
                }
            </div>
            {(viewport) ?
                <hr className='posts-hr' /> :

                <span onClick={handleCreatePost} className='write-post-mob' />
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
            />
        </div >
    )
}
export default Post