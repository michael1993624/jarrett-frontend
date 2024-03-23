import "./Account.scss";
import MainContent from "../components/MainContent";
import React, { useEffect, useState } from "react";
import $ from "jquery";
import { DataGrid } from "@mui/x-data-grid";
import { Avatar, AvatarGroup } from "@mui/material";
import shopifySvg from "../assets/svgs/shopify.svg";
import facebookSvg from "../assets/svgs/facebook.svg";
import googleSvg from "../assets/svgs/google.svg";
import { createSvgIcon } from "@mui/material/utils";
import { DeleteRounded } from "@mui/icons-material";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useSelector, useDispatch } from "react-redux";
import { setAccount, setAccounts } from "../store/slices/authSlice";
import Swal from "sweetalert2";
import { ACCESS_TOKEN } from "../libs/contants";
import { apis } from "../apis";

const PlusIcon = createSvgIcon(
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2.5}
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 4.5v15m7.5-7.5h-15"
    />
  </svg>,
  "Plus"
);

const AccountBlock = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem(ACCESS_TOKEN);
  const { accounts, accessToken } = useSelector((state) => state.auth);
  const decoded = jwtDecode(token);
  const [accountName, setAccountName] = useState("");
  const columns = [
    {
      field: "accountName",
      headerName: "Account Name",
      flex: 1,
      renderCell: (params) => {
        return params.row.accountName;
      },
    },
    {
      field: "integrations",
      headerName: "Integrations",
      flex: 1,
      renderCell: (params) => {
        return (
          <Link to="/integrations">
            {params.row.integrations.length ? (
              <AvatarGroup>
                {params.row.integrations.map((integration, index) => (
                  <Avatar
                    key={index}
                    sx={{
                      width: 30,
                      height: 30,
                      "& .MuiAvatar-img": { width: 20, height: 20 },
                    }}
                    style={{
                      backgroundColor: "#DDDDDD",
                    }}
                    src={
                      integration === "shopify"
                        ? shopifySvg
                        : integration === "google"
                        ? googleSvg
                        : facebookSvg
                    }
                  />
                ))}
              </AvatarGroup>
            ) : (
              "No Integrations"
            )}
          </Link>
        );
      },
    },
    {
      field: "createdBy",
      headerName: "Created By",
      flex: 1,
    },
    {
      field: "createdOn",
      headerName: "Created On",
      flex: 1,
    },
    {
      field: "delete",
      headerName: "Action",
      flex: 0.4,
      renderCell: (params) => {
        return (
          <DeleteRounded
            onClick={() => handleDelete(params.row.id)}
            style={{ color: "#003f9b", cursor: "pointer" }}
          />
        );
      },
    },
  ];

  const handleDelete = async (id) => {
    try {
      const response = await apis.deleteAccount(id);
      if (response.success) {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Successfully Deleted!",
        });
        const updatedAccounts = accounts.filter((account) => account.id !== id);
        dispatch(setAccounts(updatedAccounts));
      } else {
        alert(response.message);
      }
    } catch (err) {
      console.log(err);
    }
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

  const handleClickAddBtn = async () => {
    try {
      const data = {
        accountName: accountName,
        createdBy: decoded.id,
      };
      const response = await apis.addAccount(data);
      if (response.success) {
        if (accounts.length === 0) {
          dispatch(setAccount(response.account.id));
        }
        const updatedAccounts = [...accounts, response.account];
        dispatch(setAccounts(updatedAccounts));
        setAccountName("");
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (accessToken) {
      get_accounts();
    }
  }, [accessToken]);

  return (
    <>
      <div className="account-block">
        <div className="account-header">
          <input
            value={accountName}
            onChange={(e) => setAccountName(e.target.value)}
            placeholder="Account name"
          ></input>
          <Button
            onClick={handleClickAddBtn}
            variant="contained"
            startIcon={<PlusIcon />}
          >
            Add
          </Button>
        </div>
        <div className="account-body">
          <DataGrid
            rows={accounts}
            autoHeight={true}
            sx={{ minheight: 100 }}
            columns={columns}
            getRowId={(params) => params.id}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 10,
                },
              },
            }}
            pageSizeOptions={[10]}
            disableRowSelectionOnClick
          />
        </div>
      </div>
    </>
  );
};

const Account = () => {
  useEffect(() => {
    $("#nav-account").addClass("active");
  }, []);
  return (
    <>
      <MainContent content={<AccountBlock />} />
    </>
  );
};

export default Account;
