/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { BsThreeDots, BsFillShareFill } from 'react-icons/bs'
import { MdOutlineLocationOn } from 'react-icons/md'
import { TbBriefcase2 } from 'react-icons/tb'
import { AiOutlineEye } from 'react-icons/ai'

import "./CardStyles.css"
import { useEffect, useState } from 'react'

const Card = (props) => {
    const [viewport, setViewport] = useState(window.innerWidth <= 1000 ? true : false)

    const [dots, setDots] = useState(false)
    const [genInfoCount, setGenInfoCount] = useState(0)

    let { img, type, header, desc, date, location, button, profileName, profileImg, company, views, buttonColor } = props
    let count = 0

    useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        count = 0;
        if (location)
            count++;
        if (company)
            count++;
        if (date)
            count++;
        setGenInfoCount(count);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleViewport = () => {
        if ((window.innerWidth) <= 1000)
            setViewport(true)
        else
            setViewport(false)
    }

    window.addEventListener('resize', handleViewport)


    const emojiType = (eventType) => {
        if (eventType == 'Education') { return '🔬' }
        if (eventType == 'Meetup') { return '🗓️' }
        if (eventType == 'Job') { return '💼' }
        if (eventType == 'Article') { return '✍️' }
    }

    const dotsDropdown = () => {
        setDots(!dots)
    }

    return (
        <div className="card">
            {
                (img) ?
                    <div className={img + "-img"}></div>
                    : null
            }

            {
                (type) ?
                    <div className="card-type"><p>{emojiType(type) + type}</p></div>
                    : null
            }

            <div className={(header) ? 'header-dots' : 'header-dots-reverse header-dots'}>
                {
                    (header) ?
                        <div className="card-header"><h3>{header}</h3></div>
                        : null
                }
                <div onClick={dotsDropdown} className={(dots) ? 'dots-clicked card-dropdown' : 'card-dropdown'}>
                    <BsThreeDots />
                    <div className='dots-dropdown' style={{ display: dots ? 'initial' : 'none' }}>
                        <ul>
                            <li><p>Edit</p></li>
                            <li><p>Report</p></li>
                            <li><p>Option 3</p></li>
                        </ul>
                    </div>
                </div>
            </div>

            {
                (genInfoCount > 0) ?
                    <div className='card-gen-info' style={{ width: (genInfoCount) * (genInfoCount === 2 ? 40 : (viewport ? 40 : 30)) + '%' }}>
                        {(company) ? <p><TbBriefcase2 />{company}</p> : null}
                        {(date) ? <p><span className='gen-info-calendar'></span>{date}</p> : null}
                        {(location) ? <p><MdOutlineLocationOn />{location}</p> : null}
                    </div> :
                    null
            }

            {
                (desc) ?
                    <div className='card-desc'>
                        <p>{desc}</p>
                    </div> :
                    null
            }

            {(button) ?
                <span className='card-btn' style={{ color: buttonColor }}>{button}</span>
                :
                null
            }

            <div className='card-footer'>
                <div className='card-profile'>
                    <img src={"/assets/" + profileImg + ".png"} alt="" />
                    {viewport ? <div>
                        <p>{profileName}</p>
                        <p><AiOutlineEye />{views} <p>&nbsp;views</p></p>
                    </div> :
                        <p>{profileName}</p>

                    }

                </div>
                <div className='card-stats' style={viewport ? { justifyContent: 'center' } : null}>
                    {viewport ?
                        null
                        :
                        <p><AiOutlineEye />{views} <p>&nbsp;views</p></p>
                    }
                    <span><BsFillShareFill />{viewport ? <p>Share</p> : null}</span>
                </div>
            </div>

        </div >
    )
}
export default Card