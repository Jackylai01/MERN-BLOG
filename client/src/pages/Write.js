import React, { useState, useContext } from "react";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import moment from "moment";
import { AuthContext } from "../context/authContext";
const Write = () => {
  const state = useLocation().state || "";
  const [value, setVaule] = useState(state?.desc || "");
  const [title, setTitle] = useState(state?.title || "");
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  let { currentUser } = useContext(AuthContext);

  //如果要圖片預覽，需要給它一個變數，才能用windows.URL.reateObjectUR。參考MDN
  let displayFile = [];
  displayFile.push(file);

  //上傳圖片
  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await axios.post(
        "http://localhost:6060/api/upload",
        formData
      );
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  //新增貼文與更新貼文
  const handleClick = async (e) => {
    e.preventDefault();
    const imgUrl = await upload();
    try {
      state
        ? await axios.put(`http://localhost:6060/api/posts/${state._id}`, {
            title,
            desc: value,
            cat,
            img: file ? imgUrl : "",
            createdAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
          })
        : await axios.post("http://localhost:6060/api/posts", {
            title,
            desc: value,
            cat,
            img: file ? imgUrl : "",
            createdAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
          });
      navigate("/");
    } catch (err) {
      setError(err);
    }
  };

  return (
    <>
      {currentUser && currentUser ? (
        <>
          <div className="add">
            <div className="content">
              <input
                type="text"
                placeholder="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <div className="editorContainer">
                <ReactQuill
                  theme="snow"
                  value={value}
                  onChange={setVaule}
                  className="editor"
                />
              </div>
            </div>
            <div className="menu">
              <div className="item">
                <h1>Publish</h1>
                <span>
                  <b>id:</b>
                  {state?._id || ""}
                  <br />
                  {state && <b>Edit Page</b>}
                </span>
                <input
                  type="file"
                  id="file"
                  name=""
                  style={{ display: "none" }}
                  onChange={(e) => setFile(e.target.files[0])}
                />
                <label className="file" htmlFor="file">
                  Upload Image
                </label>
                <div className="buttons">
                  <button onClick={handleClick}>Publish</button>
                </div>
                {error && <div>{error}</div>}
              </div>
              <div className="item">
                <h1>Category</h1>
                <div className="cat">
                  <input
                    type="radio"
                    name="cat"
                    value="photography"
                    id="photography"
                    checked={cat === "photography"}
                    onChange={(e) => setCat(e.target.value)}
                  />
                  <label htmlFor="photography">Photography</label>

                  <input
                    type="radio"
                    name="cat"
                    value="blog"
                    id="blog"
                    checked={cat === "blog"}
                    onChange={(e) => setCat(e.target.value)}
                  />
                  <label htmlFor="blog">Blog</label>

                  <input
                    type="radio"
                    name="cat"
                    value="technology"
                    id="technology"
                    checked={cat === "technology"}
                    onChange={(e) => setCat(e.target.value)}
                  />
                  <label htmlFor="technology">Technology</label>

                  <input
                    type="radio"
                    name="cat"
                    value="travel"
                    id="travel"
                    checked={cat === "travel"}
                    onChange={(e) => setCat(e.target.value)}
                  />
                  <label htmlFor="travel">Travel</label>

                  <input
                    type="radio"
                    name="cat"
                    value="design"
                    id="design"
                    checked={cat === "design"}
                    onChange={(e) => setCat(e.target.value)}
                  />
                  <label htmlFor="design">Design</label>
                  <input
                    type="radio"
                    name="cat"
                    value="food"
                    id="food"
                    checked={cat === "food"}
                    onChange={(e) => setCat(e.target.value)}
                  />
                  <label htmlFor="food">Food</label>
                </div>
              </div>
            </div>
          </div>
          <div className="displayImg">
            <h3>封面圖片預覽</h3>
            <img
              src={window.URL.createObjectURL(new Blob(displayFile))}
              alt=""
            />
          </div>
        </>
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
};

export default Write;
