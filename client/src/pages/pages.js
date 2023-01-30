import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

const Pages = () => {
  const [posts, setPosts] = useState([]);
  const [, setError] = useState(null);
  const location = useLocation();

  const cat = location.search;

  //根據類別前往該類別的文章
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:6060/api/posts/find/${cat}`
        );
        setPosts(res.data.data);
      } catch (err) {
        setError(err);
      }
    };
    fetchData();
  }, [cat]);

  //將文字編輯器產生的html標籤效果轉換為純text
  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  };

  return (
    <>
      <div className="home">
        <div className="posts">
          {posts.map((post) => (
            <div className="post" key={post._id}>
              <div className="img">
                <img src={`../upload/${post?.img}`} alt="" />
              </div>
              <div className="content">
                <Link className="link" to={`/post/${post._id}`}>
                  <h1>{post?.title}</h1>
                </Link>
                <p>{getText(post?.desc)}</p>
                <button>Read More</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Pages;
