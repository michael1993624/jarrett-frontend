import { Link } from "react-router-dom";
import "./Signup.scss";
import { FaCircleNotch, FaPlus } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { apis } from "../apis";

const Signup = () => {
  const navigate = useNavigate();
  const [userInput, setUserInput] = useState({
    username: "",
    email: "",
    password: "",
    confirm: "",
  });
  const validateInput = (userInput) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!userInput.username) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Username cannot be empty!",
      });
      return false;
    } else if (!emailRegex.test(userInput.email)) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please enter a valid email address!",
      });
      return false;
    } else if (!userInput.password) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Empty password not allowed!",
      });
      return false;
    } else if (userInput.password !== userInput.confirm) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Passwords don't match!",
      });
      return false;
    }
    return true;
  };
  const signup = async () => {
    try {
      if (validateInput(userInput)) {
        const { username, email, password } = userInput;
        const data = { username, email, password };
        const response = await apis.register(data);
        if (response.success) {
          navigate("/signin");
        } else {
          alert(response.message);
        }
      } else {
        console.log("validate error");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="signup-page">
      <div className="left-side">
        <div className="upper-content">
          <div className="width-100">
            <Link to="/">REVITY</Link>
            <p>
              Creating a new account is completely free. Get started with 5
              projects to manage and feel free to upgrade as your business grow.
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
        <div className="widget-title">Create Account</div>
        <div className="widget-title-small">
          Get your access today in one easy step
        </div>
        <div className="signup-form">
          <input
            type="text"
            id="signup-username"
            name="signup-username"
            placeholder="Username"
            onChange={(e) => {
              setUserInput({ ...userInput, username: e.target.value });
            }}
          />
          <input
            type="text"
            id="signup-email"
            name="signup-email"
            placeholder="Email"
            onChange={(e) => {
              setUserInput({ ...userInput, email: e.target.value });
            }}
          />
          <input
            type="password"
            id="signup-password"
            name="signup-password"
            placeholder="Password"
            onChange={(e) => {
              setUserInput({ ...userInput, password: e.target.value });
            }}
          />
          <input
            type="password"
            id="signup-confirm-password"
            name="signup-confirm-password"
            placeholder="Confirm Password"
            onChange={(e) => {
              setUserInput({ ...userInput, confirm: e.target.value });
            }}
          />
          <button onClick={signup}>
            <FaPlus />
            Sign Up
          </button>
          <div>
            Already have an account? <Link to="/signin">Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
