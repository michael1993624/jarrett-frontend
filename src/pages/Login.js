import { Link } from "react-router-dom";
import { useState } from "react";
import "./Login.scss";
import { FaCircleNotch, FaSignInAlt } from "react-icons/fa";
import leftsideBackgroundImage from "../assets/images/photo28@2x.jpg";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setToken } from "../store/slices/authSlice";
import { apis } from "../apis";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userInput, setUserInput] = useState({
    username: "",
    password: "",
  });
  const signin = async () => {
    try {
      const data = await apis.login(userInput);

      if (data.success) {
        dispatch(setToken(data.accessToken));
        navigate("/dashboard");
      } else {
        // alert(data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="login-page">
      <div
        className="left-side"
        style={{
          backgroundImage: `url(${leftsideBackgroundImage})`,
          opacity: 0.8,
          backgroundSize: "cover",
        }}
      >
        <div className="upper-content">
          <div className="width-100">
            <Link to="/">REVITY</Link>
            <p>
              Welcome to your amazing app. Feel free to login and start managing
              your projects and clients.
            </p>
          </div>
        </div>
        <div className="bottom-content">
          <p>
            <strong>REVITY 5.8 @2023</strong>
          </p>
          <ul>
            <li>
              <a href="#">Legal</a>
            </li>
            <li>
              <a href="#">Contact</a>
            </li>
            <li>
              <a href="#">Terms</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="right-side">
        <div className="circle-icon">
          <FaCircleNotch />
        </div>
        <div className="widget-title">Sign In</div>
        <div className="widget-title-small">
          Welcome, please login or <Link to="/signup">sign up</Link> for a new
          account.
        </div>
        <div className="signin-form">
          <input
            type="text"
            id="login-username"
            name="login-username"
            placeholder="Username"
            onChange={(e) => {
              setUserInput({ ...userInput, username: e.target.value });
            }}
          />
          <input
            type="password"
            id="login-password"
            name="login-password"
            placeholder="Password"
            onChange={(e) => {
              setUserInput({ ...userInput, password: e.target.value });
            }}
          />
          <button onClick={signin}>
            <FaSignInAlt style={{ marginRight: "0.5rem" }} /> Sign In
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
