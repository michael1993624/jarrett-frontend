import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { useSelector } from "react-redux";
import { apis } from "../../apis";

const ShopifyDialog = ({ open, setOpen, setShopify }) => {
  const { account } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  const connectShopify = async (formData) => {
    try {
      setLoading(true);
      const data = await apis.connectShopify(account, formData);
      if (data.success) {
        setShopify(data.shopify);
      }
      handleClose();
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        component: "form",
        onSubmit: (event) => {
          event.preventDefault();
          const formData = new FormData(event.currentTarget);
          const formJson = Object.fromEntries(formData.entries());
          connectShopify(formJson);
        },
      }}
    >
      <DialogTitle>Shopify Connection</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          required
          margin="dense"
          id="storeUrl"
          name="storeUrl"
          label="Shopify Store"
          type="text"
          placeholder="https://mine.myshopify.com"
          fullWidth
          variant="standard"
        />
        <TextField
          required
          margin="dense"
          id="accessToken"
          name="accessToken"
          label="Admin Access Token"
          placeholder="Admin Access Token"
          type="text"
          fullWidth
          variant="standard"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="outlined">
          Cancel
        </Button>
        <LoadingButton type="submit" variant="contained" loading={loading}>
          Connect
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default ShopifyDialog;
