import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Logo from "../img/logo.png";
import { AuthContext } from "../context/authContext";

const Navbar = () => {
  const { currentUser } = useContext(AuthContext);

  const logout = () => {
    localStorage.removeItem("user");
    window.alert("登出成功");
    window.location.reload();
  };

  return (
    <>
      <div className="navbar">
        <div className="container">
          <div className="logo">
            <Link to="/">
              <img src={Logo} alt="" />
            </Link>
          </div>
          <div className="links">
            <Link className="link" to="/find/?cat=photography">
              <h6>攝影</h6>
            </Link>
            <Link className="link" to="/find/?cat=technology">
              <h6>技術</h6>
            </Link>

            <Link className="link" to="/find/?cat=blog">
              <h6>心情日記</h6>
            </Link>
            <Link className="link" to="/find/?cat=design">
              <h6>設計</h6>
            </Link>
            <Link className="link" to="/find/?cat=food">
              <h6>烹飪與美食</h6>
            </Link>
            <Link className="link" to="/find/?cat=travel">
              <h6>旅行</h6>
            </Link>
            <span>JACKY</span>
            {currentUser ? (
              <span onClick={logout}>Logout</span>
            ) : (
              <Link to="/login" className="link">
                Login
              </Link>
            )}

            {currentUser && (
              <span className="write">
                <Link to="/write" className="link">
                  Write
                </Link>
              </span>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
