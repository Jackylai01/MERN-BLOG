const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

const userCtrl = {
  register: async (req, res) => {
    const newUser = new User({
      ...req.body,
      username: req.body.username,
      email: req.body.email,
      password: CryptoJS.AES.encrypt(
        req.body.password,
        process.env.PASS_SEC
      ).toString(),
    });
    try {
      const savedUser = await newUser.save();
      res.status(200).json(savedUser);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  login: async (req, res) => {
    try {
      //mongodb 找尋到對應的User
      const user = await User.findOne({ username: req.body.username });
      if (!user) return res.status(401).json("User not found");

      //密碼加密
      const hashedPassword = CryptoJS.AES.decrypt(
        user.password,
        process.env.PASS_SEC
      );

      //密碼比較
      const OriginalPpassword = hashedPassword.toString(CryptoJS.enc.Utf8);
      if (OriginalPpassword !== req.body.password)
        return res.status(401).json("Wrong credentialsss!");

      //應證通過生成JWT 的TOKEN，期限為1天後，自動過期，isAdmin是為了之後網站多個管理員而設計，要做不同的權限功能區分
      const accessToken = jwt.sign(
        {
          id: user._id,
          isAdmin: user.isAdmin,
        },
        process.env.JWT_SEC,
        { expiresIn: "1d" } //登入期限3天自動登出
      );

      const { password, ...others } = user._doc;

      res.status(200).json({ ...others, accessToken });
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

module.exports = userCtrl;
