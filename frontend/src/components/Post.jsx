import './PostStyles.css'
import { useState } from "react"
import { IoMdArrowDropdown } from 'react-icons/io'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Post = () => {
    const allPosts = useSelector((store) => store.posts.data)
    console.log(allPosts);
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

    const listItems = ["All Posts", "Your Posts", "Other's Posts"];

    return (
        <div className='posts'>
            <div className='posts-child'>
                {viewport ? null :
                    <div className='post-368'>
                        <p>Posts: {allPosts.length}</p>
                    </div>
                }
                <div className='ul-div-wrapper'>
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
                </div>
                {(viewport) ?
                    <div className='create-post'>
                        <span role='button' onClick={handleClickDrop} className={dropDown ? 'clicked span-1' : 'span-1'}>Create a Post <IoMdArrowDropdown /></span>
                        <ul style={{display:dropDown?'flex':'none'}}>
                            <Link onClick={handleClickDrop}>
                                <li>Image</li>
                            </Link>
                            <hr />
                            <Link onClick={handleClickDrop}>
                                <li>Text</li>
                            </Link>
                        </ul>
                    </div> : null
                }
            </div>
            {(viewport) ?
                <hr className='posts-hr'/> :
                <Link to={'/login'}>
                    <span className='write-post-mob' />
                </Link>
            }

        </div >
    )
}
export default Post