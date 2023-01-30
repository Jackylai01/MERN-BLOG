import React, { useState, useEffect, useContext } from "react";
import Edit from "../img/edit.png";
import Delete from "../img/delete.png";
import axios from "axios";
import moment from "moment";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Menu from "../components/Menu";
import { AuthContext } from "../context/authContext";
import { sanitize } from "dompurify";

const Single = () => {
  const [post, setPost] = useState({});
  const [error, setError] = useState(null);
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const navigate = useNavigate();

  //確認登入的狀態
  const { currentUser } = useContext(AuthContext);

  //根據id 去get該文章資料
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`https://mern-blog-3jyl.onrender.com/api/posts/${id}`);
        setPost(res.data);
      } catch (err) {
        setError(err);
      }
    };
    fetchData();
  }, [id]);

  //刪除貼文
  const handleDelete = async () => {
    try {
      await axios.delete(`https://mern-blog-3jyl.onrender.com/api/posts/${id}`);
      window.alert("刪除成功");
      navigate("/");
    } catch (err) {
      setError(err);
    }
  };

  return (
    <>
      <div className="single">
        <div className="content">
          <img src={`../upload/${post?.img}`} alt="" />
          <div className="user">
            <img
              src="https://images.pexels.com/photos/6157049/pexels-photo-6157049.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt=""
            />
            <div className="info">
              <span></span>
              <p>發表時間: {moment(post.updatedAt).format()}</p>
            </div>
            {currentUser && (
              <div className="edit">
                <Link to={`/write?edit=${id}`} state={post}>
                  <img src={Edit} alt="" />
                </Link>
                <img src={Delete} alt="" onClick={handleDelete} />
              </div>
            )}
            {error && <div>{error}</div>}
          </div>
          <h1>{post.title}</h1>
          <p dangerouslySetInnerHTML={{ __html: sanitize(post.desc) }}></p>
        </div>
        <div className="menu">
          <Menu cat={post.cat} />
        </div>
      </div>
    </>
  );
};

export default Single;
