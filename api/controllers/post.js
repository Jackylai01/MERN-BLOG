const Post = require("../models/posts");

const postsCtrl = {
  //根據類別前往該類別的文章
  getPosts: async (req, res) => {
    try {
      const cat = req.query.cat;
      const data = await Post.find({ cat });
      if (!data) return res.send("沒有文章，請新增文章。");
      res.status(200).json({ data: data });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  getAllPosts: async (req, res) => {
    try {
      const data = await Post.find();
      if (!data) return res.send("沒有文章，請新增文章。");
      res.status(200).json(data);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  //發表新文章
  addPost: async (req, res) => {
    const data = new Post(req.body);
    try {
      const createData = await data.save();
      res.status(200).json(createData);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //更新單篇文章
  updatePost: async (req, res) => {
    try {
      let updateData = await Post.findById(req.params.id);

      let data = {
        title: req.body.title,
        desc: req.body.desc,
        img: req.body.img || "",
        cat: req.body.cat,
      };
      updateData = await Post.findByIdAndUpdate(req.params.id, data, {
        upsert: true,
      });

      res.status(200).json(updateData);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //刪除單篇文章
  deletedPost: async (req, res) => {
    try {
      let data = await Post.findByIdAndDelete(req.params.id);
      res.status(200).json({ msg: "刪除成功", data: data });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  //根據id 找到單一文章
  getPost: async (req, res) => {
    try {
      const data = await Post.findById(req.params.id);
      if (!data) return res.send("無此文章");
      res.json(data);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

module.exports = postsCtrl;
