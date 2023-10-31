/* eslint-disable react-hooks/exhaustive-deps */
import Post from "./Post";
import "./HomeStyles.css";
import Card from "./Card";
import axios from "axios";
import backend_ref from "./BackendRef";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addData } from "../Store/slice/AllPostSlice";
import Cookies from "js-cookie";
import { login } from "../Store/slice/userSlice";
import Spinner from "./Spinner/Spinner";
const Home = () => {
  const credentials = Cookies.get("echoChamberCred");
  const storeData = useSelector((store) => store.posts.data);
  const dispatch = useDispatch();
  const [posts, setPosts] = useState([]);
  const [userData, setUserData] = useState({
    username: "",
    name: "",
    gender: "",
  });
  let check = undefined;

  useEffect(() => {
    const verifyUser = async () => {
      if (credentials !== undefined) {
        let credData = JSON.parse(credentials);
        check = await axios.post(backend_ref + "/verify", credData);
        if (check.data === undefined) {
          console.log("data undefined");
          null;
        } else {
          setUserData(check.data);
          dispatch(login(check.data));
        }
      }
    };
    verifyUser();
  }, []);

  useEffect(() => {
    if (storeData.length !== 0) {
      setPosts(storeData);
    } else {
      const getData = async () => {
        const data = await axios.post(backend_ref + "/getData", {
          data: { username: userData.username },
        });
        dispatch(addData(data.data));
        setPosts(data.data);
      };
      getData();
    }
  }, [storeData]);

  useEffect(() => {
    const getData = async () => {
      const data = await axios.post(backend_ref + "/getData", {
        data: { username: userData.username },
      });
      dispatch(addData(data.data));
      setPosts(data.data);
    };
    getData();
  }, [userData]);

  function formatText(post){
console.log(post)
return post;
  }


  return (
    <div className="home">
      <Post />
      <>
        {posts.length > 0 ? (
          posts.map((item) => {
            return (
              <Card
                key={item._id}
                id={item.uniqueId}
                username={item.username}
                // post={formatText(item.post)}
                post={(item.post)}
                likes={item.likes}
                date={item.date}
                gender={item.gender}
                comments={item.comments}
                commentCount={item.commentCount}
                likeCount={item.likeCount}
                liked={item.liked}
              />
            );
          })
        ) : (
          <div className="home-spinner">
            <Spinner />
          </div>
        )}
      </>
    </div>
  );
};

export default Home;
