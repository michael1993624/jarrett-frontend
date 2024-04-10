import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Select,
  FormControl,
  MenuItem,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import { apis } from "../../apis";
import LoadingButton from "@mui/lab/LoadingButton";
import { FACEBOOK_TOKEN } from "../../libs/contants";

const FacebookAdsDialog = ({ open, setOpen, customers, setFacebookAds }) => {
  const { account } = useSelector((state) => state.auth);
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const connectFacebookAds = async () => {
    try {
      setLoading(true);
      const selectedCustomer =
        customers[customers.findIndex((cus) => cus.account_id === customer)];
      const formData = {
        customer_id: selectedCustomer.account_id,
        refresh_token: localStorage.getItem(FACEBOOK_TOKEN),
      };
      const data = await apis.connectFacebookAds(account, formData);
      if (data.success) {
        setFacebookAds(data.facebook);
        localStorage.removeItem(FACEBOOK_TOKEN);
      }
      handleClose();
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const handleChange = (event) => {
    setCustomer(event.target.value);
  };

  useEffect(() => {
    if (customers.length) {
      setCustomer(customers[0].account_id);
    }
  }, [customers]);

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Facebook Ads Connection</DialogTitle>
      <DialogContent sx={{ minWidth: 500 }}>
        <Typography variant="h4">{customer ? customer.m_id : ""}</Typography>
        <FormControl fullWidth>
          <Select
            labelId="customer"
            id="customer_select"
            value={customer}
            onChange={handleChange}
          >
            {customers.map((cus, index) => (
              <MenuItem value={cus.account_id} key={index}>
                {cus.account_id}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="outlined">
          Cancel
        </Button>
        <LoadingButton
          variant="contained"
          loading={loading}
          onClick={connectFacebookAds}
        >
          Connect
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default FacebookAdsDialog;
