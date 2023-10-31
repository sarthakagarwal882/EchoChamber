import "./PostStyles.css";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Post = () => {
  const user = useSelector((store) => store.user.data);
  const allPosts = useSelector((store) => store.posts.data);
  const navigateTo = useNavigate();
  const [dropDown, setDropdown] = useState(false);
  const [viewport, setViewport] = useState(
    window.innerWidth <= 1000 ? false : true
  );

  const handleClickDrop = () => {
    setDropdown(!dropDown);
  };

  const handleViewport = () => {
    if (window.innerWidth <= 1000) {
      setViewport(false);
    } else {
      setViewport(true);
    }
  };

  window.addEventListener("resize", handleViewport);

  const handleCreatePost = () => {
    if ("username" in user) navigateTo("/create");
    else {
      toast("Login first!");
      navigateTo("/login");
    }
  };

  return (
    <div className="posts">
      <div className="posts-child">
        {viewport ? null : (
          <div className="post-368">
            <p>Posts: {allPosts.length}</p>
          </div>
        )}

        {viewport ? (
          <div className="create-post" onClick={handleCreatePost}>
            <span
              role="button"
              onClick={handleClickDrop}
              className={dropDown ? "clicked span-1" : "span-1"}
            >
              Create a Post
            </span>
          </div>
        ) : null}
      </div>
      {viewport ? (
        <hr className="posts-hr" />
      ) : (
        <span onClick={handleCreatePost} className="write-post-mob" />
      )}{" "}
    </div>
  );
};
export default Post;
