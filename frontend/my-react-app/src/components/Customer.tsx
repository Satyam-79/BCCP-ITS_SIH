import axios from "axios";
import React, { useState, useEffect } from "react";
import {  useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";

import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import ReceiptIcon from "@mui/icons-material/Receipt";
import { pink } from "@mui/material/colors";
import Switch from "@mui/material/Switch";



const Customer = () => {
  const [open, setOpen] = React.useState(false);
  const [form, setForm] = useState([]);
  const [selectedFormId, setSelectedFormId] = useState(null);
  const [formInput, setFormInput] = useState({
    verified_buyer: false
  });

  const submitHandler = async (e: any) => {
    if (selectedFormId !== null) {
      e.preventDefault();
      const token = String(localStorage.getItem("token"));
      try {
        const res:any= await axios.put(
          `https://bccp.onrender.com/customer_verification/${selectedFormId}`,
          {
            verified_buyer: formInput.verified_buyer,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json", // Set the appropriate content type for your request
            },
          }
        );
        console.log(res.data);
        window.alert("form is submitted");
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleClickOpen = (formId: any) => {
    setSelectedFormId(formId);
    console.log(selectedFormId);

    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user_type");
    navigate("/");
  };

  const handleGetRequest = async () => {
    try {
      const token = String(localStorage.getItem("token"));
      const response: any= await axios.get(
        `https://bccp.onrender.com/get_verified_forms`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json" // Set the appropriate content type for your request
          }
        }
      );

      setForm(response.data);
    } catch (error) {
      // Handle any errors
      console.error(error);
    }
  };

  useEffect(() => {
    handleGetRequest();
  }, []);
  return (
    <>
      <Box
        sx={{
          flexGrow: 1
        }}
      >
        <AppBar
          sx={{
            backgroundImage:
              "linear-gradient(to right top, #3b8efc, #5e86fa, #7a7df6, #9273ef, #a768e6, #9974f0, #8a7ff8, #7a89ff, #20a4ff, #00baff, #00cbfd, #12daec)"
          }}
          position="static"
        >
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <ReceiptIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            BACP
            </Typography>
            <Button onClick={handleLogout} color="inherit">
              Logout
            </Button>
          </Toolbar>
        </AppBar>
        <Typography
          mx={3}
          mt={3}
          variant="h5"
          component="div"
          sx={{ flexGrow: 1, fontWeight: "600", color: "" }}
        >
          Customer
        </Typography>
        <Box p={3} sx={{ display: "flex" }}>
          {form?.map((formData: any) => (
            <Box
              className="rounded"
              key={formData.id}
              m={2}
              p={4}
              sx={{ background: "white", height: "250px", width: "400px" }}
            >
              <Box p={2}>
                <>
                  <h5>{formData.sub_name}</h5>
                  <p>{formData.sub_address}</p>
                  <p>{formData.product_name}</p>
                  <p>{formData.accreditation_active_status}</p>
                </>
              </Box>
              <div className="d-flex">
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => handleClickOpen(formData.id)}
                >
                  Approve Supplier
                </Button>
              </div>
            </Box>
          ))}
        </Box>

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>SUPPLIER NAME</DialogTitle>
          <DialogContent>
            {form?.map((formData: any) => (
              <div key={formData.id}>
                {selectedFormId === formData.id && (
                  <>
                    <h5>{formData.sub_name}</h5>
                    <p>{formData.sub_address}</p>
                    <p>{formData.product_name}</p>
                    <p>{formData.accreditation_active_status}</p>
                  </>
                )}
              </div>
            ))}
            <Switch sx={{ color: pink[600]}}
              checked={formInput.verified_buyer}
              onChange={() => {
                setFormInput((prevState) => ({
                  ...prevState,
                  verified_buyer: !prevState.verified_buyer
                }));
                console.log(!formInput.verified_buyer);
               
              }}
            />
            <Button onClick={submitHandler}>apply</Button>
          </DialogContent>
        </Dialog>
      </Box>
    </>
  );
};

export default Customer;
