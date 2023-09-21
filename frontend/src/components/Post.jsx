import './PostStyles.css'
import { useState } from "react"
import { IoMdArrowDropdown } from 'react-icons/io'
import { Link } from 'react-router-dom'

const Post = () => {
    const [liClicked, setLiClicked] = useState(0)
    const [dropDown, setDropdown] = useState(false)
    const [viewport, setViewport] = useState((window.innerWidth <= 1000) ? false : true)
    const [isOpen, setIsOpen] = useState(null);
    const [liFilter, setLiFilter] = useState('All')


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

    const listItems = [viewport ? 'All Posts(32)' : 'All', 'Article', 'Event', 'Education', 'job'];

    return (
        <div className='posts'>
            <div className='posts-child'>
                {viewport ? null :
                    <div className='post-368'>
                        <p>Posts(368)</p>
                    </div>
                }
                <div className='ul-div-wrapper'>
                    {
                        viewport ? null :
                            <button className="dropbtn" onClick={toggleDropdown}>Filter: {liFilter}<IoMdArrowDropdown className={isOpen&&'rotate-180'} /></button>
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
                    <div>
                        <span onClick={handleClickDrop} className={dropDown ? 'clicked span-1' : 'span-1'}>Write a Post <IoMdArrowDropdown /></span>
                        <span className='span-2'><span className='join-group' />Join Group</span>
                    </div> : null
                }
            </div>
            {(viewport) ?
                <hr /> :
                <Link to={'/login'}>
                <span className='write-post-mob' />
                </Link>
            }

        </div >
    )
}
export default Post