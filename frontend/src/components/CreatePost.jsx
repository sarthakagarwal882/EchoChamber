/* eslint-disable no-unused-vars */
import { useState } from "react";
import "./CreatePostStyles.css";
import { BiArrowBack } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import axios from "axios";
import backend_ref from "./BackendRef";

const CreatePost = () => {
  const user = useSelector((store) => store.user.data);
  const navigateTo = useNavigate();
  const [postData, setPostData] = useState({
    text: "",
  });

  const handleDataChange = (e) => {
    let { name, value } = e.target;
    setPostData((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
    console.log(postData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (postData.text === "") toast("Please enter text!");
    else {
      try {
        let date = new Date().toLocaleString();
        let data = {
          post: postData.text,
          username: user.username,
          date: date,
          gender: user.gender,
        };
        let send = await axios.post(backend_ref + "/postData", { data });
        if (send.data) {
          toast("Post Uploaded Successfuly");
          navigateTo("/"), 2000;
        } else {
          toast("Post upload Failed. Try again Later!");
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="createpost-wrapper">
      <div className="createpost-cover">
        <div className="createpost-header">
          <Link to={"/"}>
            <BiArrowBack />
          </Link>
          <div>
            <p>Create new post</p>
          </div>
        </div>
        <div className="createpost">
          <div className="user-info">
            <img src={`/assets/${user.gender}.png`} alt="" />
            <p>{user.username}</p>
          </div>
          <div className="createpost-form">
            <form onSubmit={handleSubmit}>
              <textarea
                name="text"
                placeholder="write post..."
                onChange={handleDataChange}
                value={postData.text}
                id=""
                cols="30"
                rows="10"
              ></textarea>
              <button className="postdata" type="submit">
                Post
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CreatePost;
