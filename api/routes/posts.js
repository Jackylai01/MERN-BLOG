const router = require("express").Router();
const postCtrl = require("../controllers/post");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../middleware/verifyToken");

//獲得全部的文章
router.get("/find", postCtrl.getPosts);
router.get("/", postCtrl.getAllPosts);

//獲得單篇文章
router.get("/:id", postCtrl.getPost);

//發表新的文章
router.post("/", postCtrl.addPost);

//刪除單篇文章
router.delete("/:id", postCtrl.deletedPost);

//更新單篇文章
router.put("/:id", postCtrl.updatePost);

module.exports = router;
