import * as React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { jwtDecode } from "jwt-decode";
import {
  setAccount,
  setAccounts,
  setCurrentUser,
} from "../store/slices/authSlice";
import { useSelector, useDispatch } from "react-redux";
import "./TopBar.scss";
import { ACCESS_TOKEN, ACCOUNT_ID } from "../libs/contants";
import { apis } from "../apis";

const TopBar = () => {
  const { account, accounts, accessToken } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const handleChange = (event) => {
    dispatch(setAccount(event.target.value));
    localStorage.setItem(ACCOUNT_ID, event.target.value);
  };
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(ACCOUNT_ID);
    navigate("/signin");
  };

  const get_accounts = async () => {
    try {
      const response = await apis.getAccounts();
      if (response.success) {
        dispatch(setAccounts(response.accounts));
      } else {
        alert(response.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getCurrentUser = async () => {
    try {
      let decoded = jwtDecode(accessToken);
      const response = await apis.getUser(decoded.id);
      dispatch(setCurrentUser(response.user));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (accessToken) {
      getCurrentUser();
      get_accounts();
    }
  }, [accessToken]);

  useEffect(() => {
    if (accounts.length > 0 && account === null) {
      dispatch(setAccount(accounts[0].id));
    }
  }, [accounts]);

  return (
    <>
      <div className="top-bar">
        <button id="logout-btn" type="button" onClick={logout}>
          Log Out
        </button>
        {accounts.length > 0 && account ? (
          <FormControl
            variant="standard"
            sx={{ m: 1, minWidth: 120, position: "absolute", right: "150px" }}
          >
            <InputLabel id="demo-simple-select-standard-label">
              Account
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={account}
              onChange={handleChange}
              label="Account"
            >
              {accounts.map((item, index) => {
                return (
                  <MenuItem key={index} value={item.id}>
                    {item.accountName}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        ) : null}
      </div>
    </>
  );
};

export default TopBar;
