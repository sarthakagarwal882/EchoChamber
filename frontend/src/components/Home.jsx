import Post from "./Post"
import './HomeStyles.css'
import Card from "./Card"
import axios from 'axios'
import backend_ref from './BackendRef'
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { addData } from "../Store/slice/AllPostSlice"
const Home = () => {
    const dispatch=useDispatch()
    const [posts, setPosts] = useState([])
    useEffect(() => {

        const getPosts = async () => {
            const data = await axios.get(backend_ref + '/getData');
            dispatch(addData(data.data))
            setPosts(data.data);
        }
        getPosts()
    }, [])

    return (
        <div className="home">
            <Post />
            <>
                {(posts.length > 0) &&
                    (posts).map((item) => { return (<Card key={item._id} id={item.uniqueId} username={item.username} post={item.post} likes={item.likes} date={item.date} gender={item.gender} comments={item.comments} />) })
                }
            </>
        </div>
    )
}

export default Home