/* eslint-disable react-hooks/exhaustive-deps */
import Post from "./Post"
import './HomeStyles.css'
import Card from "./Card"
import axios from 'axios'
import backend_ref from './BackendRef'
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { addData } from "../Store/slice/AllPostSlice"
import Cookies from "js-cookie"
import { login } from "../Store/slice/userSlice"
import { useLocation } from "react-router"
const Home = () => {
    const location = useLocation()
    const credentials = ((Cookies.get('echoChamberCred')))
    const dispatch = useDispatch()
    const [posts, setPosts] = useState([])
    const [userData, setUserData] = useState({
        username: '',
        name: '',
        gender: ''
    })
    let check = undefined;

    useEffect(() => {
        const getPosts = async () => {

            if (credentials !== undefined) {
                let credData = (JSON.parse(credentials))
                check = await axios.post(backend_ref + '/verify', credData)
                if (check.data === undefined){
                    console.log('data undefined');
                    null
                }
                else {
                    console.log('dta defined');
                    setUserData(check.data)
                    dispatch(login(check.data))
                }
            }
        }
        getPosts()
    }, [location.pathname])
    console.log(location.pathname);
    
    
    useEffect(()=>{
        const getData=async ()=>{
            const data = await axios.post(backend_ref + '/getData', { data: { username: userData.username } });
            dispatch(addData(data.data))
            setPosts(data.data);
        }
        getData()
    },[userData])
    


    return (
        <div className="home">
            <Post />
            <>
                {(posts.length > 0 ) &&
                    (posts).map((item) => { return (<Card key={item._id} id={item.uniqueId} username={item.username} post={item.post} likes={item.likes} date={item.date} gender={item.gender} comments={item.comments} commentCount={item.commentCount} likeCount={item.likeCount} liked={item.liked} />) })
                }
            </>
        </div>
    )
}

export default Home