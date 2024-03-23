import "./Profile.scss";
import { useEffect } from "react";
import $ from "jquery";
import MainContent from "../components/MainContent";
import {FaEye, FaEyeSlash} from "react-icons/fa";
import { useState } from "react";
import Swal from "sweetalert2";
import { jwtDecode } from "jwt-decode";
import { CURRENT_USER } from "../libs/contants";
import { apis } from "../apis";
import { useSelector } from "react-redux";

const ProfileBlock = () => {
  const { currentUser, accessToken } = useSelector(state => state.auth);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const validateInput = (username, email, password) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!username) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Username cannot be empty!',
      });
      return false;
    } else if (!emailRegex.test(email)) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: "Please enter a valid email address!",
      });
      return false;
    }/* 
    else if(!password) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: "Empty password not allowed!",
      });
      return false;
    } */
    return true;
  }
  const updateProfile = async () => {
    const data = {
      username: username,
      email: email,
      password: password
    }
    if (validateInput(username, email, password)) {
      const decoded = jwtDecode(accessToken);
      const response = await apis.updateUser(decoded.id, data)
      if(response.success) {
        localStorage.setItem(CURRENT_USER, JSON.stringify(response.user));
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: "Profile successfully updated.",
        });
        // window.location.reload();
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops',
          text: response.data.message,
        });
      }
    } else {
      console.log("validate error");
    }
    
  }
  const handleClickBtn = (e) => {
    if (isEditable) {
      updateProfile();
      setIsEditable(!isEditable);
    } else {
      setIsEditable(!isEditable);
    }
  }

  useEffect(() => {
    if(currentUser) {
      setEmail(currentUser.email);
      setUsername(currentUser.username);
    }
  }, []);
  return (
    <>
      <div className="profile-block">
        <div className="block-item">
          <label>Username</label>
          <input value={username} onChange={(e) => setUsername(e.target.value)} type="text" disabled={!isEditable}/>
        </div>
        <div className="block-item">
          <label>Email</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" disabled={!isEditable}/>
        </div>
        <div className="block-item">
          <label>Password</label>
            {passwordVisible? 
              (<>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} disabled={!isEditable}/>
                <FaEye style={{
                  color: "#555", 
                  position: "absolute", 
                  right:"5px", 
                  cursor:"pointer"}}
                  onClick={() => setPasswordVisible(!passwordVisible)}/>
              </>)
              :
              (<>
                <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} disabled={!isEditable}/>
                <FaEyeSlash style={{
                  color: "#555", 
                  position: "absolute", 
                  right:"5px", 
                  cursor:"pointer"}}
                  onClick={() => setPasswordVisible(!passwordVisible)}/>
              </>)
            }            
        </div>
        <div className="block-item">
          <button id="changeBtn" onClick={handleClickBtn}>{isEditable? "Save":"Edit"}</button>
        </div>
      </div>
    </>
  );
}

const Profile = () => {
  useEffect(() => {
    $("#nav-profile").addClass("active");
  }, []);
  return (
    <>
      <MainContent content={<ProfileBlock />} />
    </>
  );
}

export default Profile;