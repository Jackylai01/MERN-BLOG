const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const cors = require("cors");
const UserRoute = require("./routes/auth");
const PostsRoute = require("./routes/posts");
const multer = require("multer");

//連結資料庫
mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Mongodb Connection Successfully!");
  })
  .catch((err) => {
    console.log(err);
  });

//跨域設定-簡單請求
app.use(cors());

//中間站
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//上傳圖片設定-存在本地端public裡面，一定要存在public
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../client/public/upload"); //指定存放位置
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

//上傳圖片
const upload = multer({ storage });

//部落格全部的相片用這個api上傳，一次上傳一張，名稱取名為file
app.post("/api/upload", upload.single("file"), function (req, res) {
  const file = req.file;
  res.status(200).json(file.filename);
});

//路由
app.use("/api/auth", UserRoute);
app.use("/api/posts", PostsRoute);

const port = process.env.PORT || 6060;
//伺服器
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
