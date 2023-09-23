import Post from "./Post"
import './HomeStyles.css'
import Card from "./Card"
const Home=()=>{
    //fetchPost
    return(
        <div className="home">
            <Post/>
            {/* <Card/> */}
        </div>
    )
}

export default Home