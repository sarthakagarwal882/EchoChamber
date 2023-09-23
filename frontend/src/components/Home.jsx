import Post from "./Post"
import './HomeStyles.css'
import Card from "./Card"
import axios from 'axios'
import backend_ref from './BackendRef'
import { useEffect, useState } from "react"
const Home = () => {
    const [posts, setPosts] = useState([])
    useEffect(() => {

        const getPosts = async () => {
            const data = await axios.get(backend_ref + '/getData');
            setPosts(data.data);
            console.log(data.data);
        }
        getPosts()
    }  , [])

    return (
        <div className="home">
            <Post />
            <>
                {(posts.length > 0) &&
                    (posts).map((item) => {return (<Card key={item._id} id={item.post.uniqueId} username={item.post.username} post={item.post.post} likes={item.post.likes} date={item.post.date} gender={item.post.gender} comments={item.post.comments} />) })
                }
            </>
        </div>
    )
}

export default Home