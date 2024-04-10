import "./Integrations.scss";
import MainContent from "../components/MainContent";
import Button from "@mui/material/Button";
import React, { useEffect, useState } from "react";
import $ from "jquery";
import { Avatar } from "@mui/material";
import shopifySvg from "../assets/svgs/shopify.svg";
import facebookSvg from "../assets/svgs/facebook.svg";
import googleSvg from "../assets/svgs/google.svg";
import { LinkSharp } from "@mui/icons-material";
import { useSelector } from "react-redux";
import LoadingButton from "@mui/lab/LoadingButton";
import ShopifyDialog from "../components/Dialogs/ShopifyDialog";
import GoogleAdsDialog from "../components/Dialogs/GoogleAdsDialog";
import FacebookAdsDialog from "../components/Dialogs/FacebookAdsDialog";
import { apis } from "../apis";
import { FACEBOOK_TOKEN, GOOGLE_TOKEN } from "../libs/contants";

const IntegrationsBlock = () => {
  const { account } = useSelector((state) => state.auth);
  const [integrations, setIntegrations] = useState([null, null, null]);
  const [openShopify, setOpenShopify] = useState(false);
  const [openGoogleAds, setOpenGoogleAds] = useState(false);
  const [openFacebookAds, setOpenFacebookAds] = useState(false);
  const [googleAdsCustomers, setGoogleAdsCustomers] = useState([]);
  const [facebookAdsCustomers, setFacebookAdsCustomers] = useState([]);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [facebookLoading, setFacebookLoading] = useState(false);

  const google_access_token = localStorage.getItem(GOOGLE_TOKEN);
  const facebook_access_token = localStorage.getItem(FACEBOOK_TOKEN);

  const getIntegrations = async () => {
    try {
      const response = await apis.getIntegrations(account);
      if (response.success) {
        setIntegrations(response.integrations);
      } else {
        alert(response.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const fetchGoogleAdsUserData = async (token) => {
    try {
      setGoogleLoading(true);
      const response = await apis.getGoogleAdsCustomer({ token: token });
      if (response.success) {
        setGoogleAdsCustomers(response.list);
        setOpenGoogleAds(true);
      }
      setGoogleLoading(false);
    } catch (error) {
      setGoogleLoading(false);
      console.error("Error fetching data:", error);
    }
  };

  const fetchFacebookAdsUserData = async (token) => {
    try {
      setFacebookLoading(true);
      const response = await apis.getFacebookAdsCustomer({ token: token });
      if (response.success) {
        setFacebookAdsCustomers(response.list);
        setOpenFacebookAds(true);
      }
      setFacebookLoading(false);
    } catch (error) {
      setFacebookLoading(false);
      console.error("Error fetching data:", error);
    }
  };

  // const fetchFacebookData = async (token) => {
  //   try {
  //     setFacebookLoading(true);
  //     const response = await apis.connectFacebookAds(account, { token: token });
  //     if (response.success) {
  //       let temp = [...integrations];
  //       temp[2] = response.facebook;
  //       setIntegrations(temp);
  //     }
  //     setFacebookLoading(false);
  //   } catch (error) {
  //     setFacebookLoading(false);
  //     console.error("Error fetching data:", error);
  //   }
  // };

  const AuthProvider = (provider) => {
    if (provider == "google") {
      let url = process.env.REACT_APP_SERVER + "/oauth2callbackurl";
      window.location.href = url;
    } else {
      let url = process.env.REACT_APP_SERVER + "/fb/oauth2callback";
      window.location.href = url;
    }
  };

  useEffect(() => {
    if (google_access_token) {
      fetchGoogleAdsUserData(google_access_token);
    }
  }, [google_access_token]);

  useEffect(() => {
    if (facebook_access_token) {
      fetchFacebookAdsUserData(google_access_token);
    }
  }, [facebook_access_token]);

  useEffect(() => {
    if (account) {
      getIntegrations();
    }
  }, [account]);

  return (
    <>
      <div className="integrations-block">
        <div className="block-item">
          <Avatar
            sx={{
              width: 60,
              height: 60,
              "& .MuiAvatar-img": { width: 50, height: 50 },
            }}
            src={shopifySvg}
          />
          <b className="service-title">Shopify</b>
          {integrations[0] ? (
            <b className="connected">Connected</b>
          ) : (
            <>
              <b className="unconnected">Unconnected</b>
              <Button
                sx={{
                  marginTop: "20px",
                  float: "right",
                  color: "white",
                  fontSize: "15px",
                  padding: "2px",
                  borderRadius: "10px",
                }}
                variant="contained"
                onClick={() => setOpenShopify(true)}
              >
                <LinkSharp sx={{ transform: "rotate(-30deg)" }} />
              </Button>
            </>
          )}
        </div>
        <div className="block-item">
          <Avatar
            sx={{
              width: 60,
              height: 60,
              "& .MuiAvatar-img": { width: 50, height: 50 },
            }}
            src={googleSvg}
          />
          <b className="service-title">Google Ads</b>
          {integrations[1] ? (
            <b className="connected">Connected</b>
          ) : (
            <>
              <b className="unconnected">Unconnected</b>
              <LoadingButton
                sx={{
                  marginTop: "20px",
                  float: "right",
                  color: "white",
                  fontSize: "15px",
                  padding: "2px",
                  borderRadius: "10px",
                }}
                loading={googleLoading}
                variant="contained"
                onClick={() => AuthProvider("google")}
              >
                <LinkSharp sx={{ transform: "rotate(-30deg)" }} />
              </LoadingButton>
            </>
          )}
        </div>
        <div className="block-item">
          <Avatar
            sx={{
              width: 60,
              height: 60,
              "& .MuiAvatar-img": { width: 50, height: 50 },
            }}
            src={facebookSvg}
          />
          <b className="service-title">Facebook Ads</b>
          {integrations[2] ? (
            <b className="connected">Connected</b>
          ) : (
            <>
              <b className="unconnected">Unconnected</b>
              <LoadingButton
                sx={{
                  marginTop: "20px",
                  float: "right",
                  color: "white",
                  fontSize: "15px",
                  padding: "2px",
                  borderRadius: "10px",
                }}
                variant="contained"
                loading={facebookLoading}
                onClick={() => AuthProvider("facebook")}
              >
                <LinkSharp sx={{ transform: "rotate(-30deg)" }} />
              </LoadingButton>
            </>
          )}
        </div>
      </div>
      {openShopify ? (
        <ShopifyDialog
          open={openShopify}
          setOpen={setOpenShopify}
          setShopify={(shopifyId) => {
            let temp = [...integrations];
            temp[0] = shopifyId;
            setIntegrations(temp);
          }}
        />
      ) : null}
      {openGoogleAds ? (
        <GoogleAdsDialog
          open={openGoogleAds}
          setOpen={setOpenGoogleAds}
          customers={googleAdsCustomers}
          setGoogleAds={(googleId) => {
            let temp = [...integrations];
            temp[1] = googleId;
            setIntegrations(temp);
          }}
        />
      ) : null}
      {openFacebookAds ? (
        <FacebookAdsDialog
          open={openFacebookAds}
          setOpen={setOpenFacebookAds}
          customers={facebookAdsCustomers}
          setFacebookAds={(facebooId) => {
            let temp = [...integrations];
            temp[2] = facebooId;
            setIntegrations(temp);
          }}
        />
      ) : null}
    </>
  );
};

const Integrations = () => {
  useEffect(() => {
    $("#nav-integrations").addClass("active");
  }, []);
  return (
    <>
      <MainContent content={<IntegrationsBlock />} />
    </>
  );
};

export default Integrations;
