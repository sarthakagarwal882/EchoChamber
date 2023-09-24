/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react'
import './DashBoardStyles.css'
import axios from 'axios'
import { useDispatch, useSelector } from "react-redux"
import backend_ref from './BackendRef'
import Cookies from 'js-cookie'
import { login } from '../Store/slice/userSlice'
import Card from './Card'
import {Link} from 'react-router-dom'

const Dashboard = () => {
    const credentials = ((Cookies.get('echoChamberCred')))
    const dispatch = useDispatch()
    const [display, setDisplay] = useState('none')
    const userState = useSelector((store) => (store.user.data))
    const [data, setdata] = useState({
        name: '',
        gender: '',
        username: '',
        email: '',
        posts: []
    })

    useEffect(() => {

        const checkCookiedata = async (data) => {
            let check = await axios.post(backend_ref + '/verify', data)
            if (check.data === undefined)
                null
            else
                dispatch(login(check.data))
        }

        if (credentials !== undefined)
            checkCookiedata(JSON.parse(credentials))

    }, [])



    const getdata = async () => {
        if (!('username' in userState))
            null
        else {
            const info = await axios.post(backend_ref + '/myinfo', { data: { username: userState.username } })
            setdata(info.data)
        }
    }
    getdata()

    return (
        <div className='dashboard'>

            <div className='user-profile'>
                <img src={(data.gender === 'male') ? '/assets/man.png' : '/assets/woman.png'} alt="" />
                <div className='user-information'>
                    <div>
                        <p>Username:</p>
                        <p>{data.username}</p>
                    </div>
                    <div>
                        <p>Name:</p>
                        <p>{data.name}</p>
                    </div>
                    <div>
                        <p>Email:</p>
                        <p>{data.email}</p>
                    </div>
                    <div>
                        <p>gender:</p>
                        <p>{data.gender}</p>
                    </div>
                </div>
            </div>
            <hr />
            <h1>Posts</h1>
            <div className='user-posts'>
                {
                    (data.posts).map(element=>(<Card key={element.uniqueId} date={element.date} post={element.post} gender={element.gender} id={element.uniqueId} username={userState.username} likes={element.likes} comments={element.comments} commentCount={element.commentCount} likeCount={element.likeCount} displayPower={'true'}/>))
                }
            </div>

        </div>
    )
}

export default Dashboard


// let { date, post, gender, id, username, likes, comments } = props