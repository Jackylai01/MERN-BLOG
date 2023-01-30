import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const [allData, setAllData] = useState([]);
  const [, setError] = useState(null);
  const [moreText, setMoreText] = useState(true);

  //頁面載入第一次就去fetch一次api
  useEffect(() => {
    const getAllData = async () => {
      try {
        const res = await axios.get(`https://mern-blog-3jyl.onrender.com/api/posts`);
        setAllData(res.data);
      } catch (err) {
        setError(err);
      }
    };
    getAllData();
  }, []);

  //將文字編輯器產生的html標籤效果轉換為純text
  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  };

  //讀取更多文字-prev為自定義的上一個狀態
  //這個的用法會連帶影響全部的文章，如要個別文章顯示，邏輯需要更換，可另外將每個文字那給它index，根據它的index 位置去點選觀看更多
  const toggleBtn = () => {
    setMoreText((prev) => !prev);
  };

  return (
    <>
      <div className="home">
        <div className="posts">
          {allData?.map((post) => (
            <div className="post" key={post?._id}>
              <div className="img">
                <img src={`../upload/${post?.img}`} alt="" />
              </div>
              <div className="content">
                <Link className="link" to={`/post/${post._id}`}>
                  <h1>{post?.title}</h1>
                </Link>
                {moreText ? (
                  <p>{getText(post.desc).substring(0, 200)}</p>
                ) : (
                  <p>{getText(post.desc)}</p>
                )}
                <button onClick={toggleBtn}>Read More</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
