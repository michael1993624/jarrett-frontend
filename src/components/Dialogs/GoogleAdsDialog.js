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
import { GOOGLE_TOKEN } from "../../libs/contants";

const GoogleAdsDialog = ({ open, setOpen, customers, setGoogleAds }) => {
  const { account } = useSelector((state) => state.auth);
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const connectGoogleAds = async () => {
    try {
      setLoading(true);
      const selectedCustomer =
        customers[customers.findIndex((cus) => cus.id === customer)];
      const formData = {
        customer_id: selectedCustomer.id,
        ads_name: selectedCustomer.name,
        manager_id: selectedCustomer.m_id,
        refresh_token: localStorage.getItem(GOOGLE_TOKEN)
      };
      const data = await apis.connectGoogleAds(account, formData);
      if (data.success) {
        setGoogleAds(data.google);
        localStorage.removeItem(GOOGLE_TOKEN);
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
      setCustomer(customers[0].id);
    }
  }, [customers]);

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Google Ads Connection</DialogTitle>
      <DialogContent sx={{ minWidth: 500 }}>
        <Typography variant="h4">{customer ? customer.m_id : ""}</Typography>
        <FormControl fullWidth>
          <Select
            labelId="customer"
            id="customer_select"
            value={customer}
            onChange={handleChange}
          >
            {customers.map((cus) => (
              <MenuItem value={cus.id} key={cus.id}>
                {cus.name} ({cus.id})
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
          onClick={connectGoogleAds}
        >
          Connect
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default GoogleAdsDialog;
