import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import DoneAllIcon from "@mui/icons-material/DoneAll";

import Grid from "@mui/material/Grid";
import ReceiptIcon from "@mui/icons-material/Receipt";
import "../App.css";
import { Chip, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const Supplier = () => {
  const [open, setOpen] = React.useState<any>(false);
  const [buyerVerifiedForms, setBuyerVerifiedForms] = React.useState<any>();
  const [supplierForm, setSupplierForm] = React.useState<any>({
    laboratory: "1",
    sub_name: "",
    sub_address: "",
    sub_proof: null,
    product_name: "",
    product_image: null,
    certificate_image: null,
    accreditation_image: null,
    agency_name: "",
    accreditation_id: "",
    accreditation_name: "startupindia",
    accreditation_active_status: false
  });

  const data = [
    { id: 1, name: " Advanced Materials Testing Laboratory" },
    { id: 2, name: "Materials Analysis and Testing Laboratory" },
    { id: 3, name: "Precision Testing Solutions" },
    { id: 4, name: "Metallurgical Testing Services" },
    { id: 5, name: "Composite Materials Testing Laboratory" },
    { id: 6, name: "Structural Integrity Testing Lab" },
    { id: 7, name: "National Test House for Chemicals" },
    { id: 8, name: "TUV Rheinland" },
    { id: 9, name: "Intertek" },
    { id: 10, name: "Central Manufacturing Technology Institute" },
    // Add more objects as needed
  ];

  const getRandomObject = () => {
    const randomIndex = Math.floor(Math.random() * data.length);
    return data[randomIndex];
  };

  const randomObject = getRandomObject();
  console.log(randomObject);

  const handleChangeHandler = (e: any) => {
    setSupplierForm((prevState:any) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  const fileHandler = (e: any) => {
    e.preventDefault();
    const file = e.target.files[0];

    if (file) {
      setSupplierForm((prevState:any) => ({
        ...prevState,
        [e.target.name]: file
      }));
    }
  };

  const submitHandler = async (e:any) => {
    e.preventDefault();
    const formData = new FormData();

    // Append all the form values to the FormData object
    Object.keys(supplierForm).forEach((key: any) => {
      if (supplierForm[key] !== null) {
        formData.append(key, supplierForm[key]);
      }
    });

    formData.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });
    try {
      const res:any= await axios.post(
        "https://bccp.onrender.com/send_supplier_form",
        formData
      );
      console.log(res.data);
      window.alert("form is submitted");
    } catch (err) {
      console.log(err);
    }
  };

  const handleClickOpen = () => {
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
      const response:any = await axios.get(
        `https://bccp.onrender.com/get_verified_buyer`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json" // Set the appropriate content type for your request
          }
        }
      );
      setBuyerVerifiedForms(response.data);
    } catch (error) {
      // Handle any errors
      console.error(error);
    }
  };

  React.useEffect(() => {
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
            <Button color="inherit" onClick={handleClickOpen}>
              Add Supplier
            </Button>
            <Button onClick={handleLogout} color="inherit">
              Logout
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
      {/* <Box>
        {buyerVerifiedForms.map((data)=>(
          <p>{data.verified_buyer}</p>
        ))}
      </Box> */}

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>SUPPLIER</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To add supplier to this website, please enter following details
            here. We will send updates occasionally.
          </DialogContentText>
          <Box
            component="form"
            onSubmit={submitHandler}
            noValidate
            sx={{ mt: 1 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  margin="normal"
                  size="small"
                  required
                  fullWidth
                  label="Supplier Name"
                  name="sub_name"
                  autoComplete="email"
                  autoFocus
                  value={supplierForm.sub_name}
                  onChange={handleChangeHandler}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  margin="normal"
                  size="small"
                  required
                  fullWidth
                  name="product_name"
                  label="Product Name"
                  type="text"
                  value={supplierForm.product_name}
                  onChange={handleChangeHandler}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  margin="normal"
                  size="small"
                  required
                  fullWidth
                  name="agency_name"
                  label="Agency Name"
                  type="text"
                  value={supplierForm.agency_name}
                  onChange={handleChangeHandler}
                />
              </Grid>

              <Grid className="mt-3" item xs={6}>
                <FormControl size="small" sx={{ width: "100%" }}>
                  <InputLabel id="demo-simple-select-autowidth-label">
                    Accredition Status
                  </InputLabel>
                  <Select
                    fullWidth
                    labelId="demo-simple-select-autowidth-label"
                    id="demo-simple-select-autowidth"
                    autoWidth
                    label="Select User"
                    value={supplierForm.accreditation_active_status}
                    onChange={(e) => {
                      setSupplierForm({
                        ...supplierForm,
                        accreditation_active_status: e.target.value
                      });
                    }}
                  >
                    <MenuItem value={String(true)}>Active</MenuItem>
                    <MenuItem value={String(false)}>Inactive</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  margin="normal"
                  size="small"
                  required
                  fullWidth
                  name="accreditation_id"
                  label="Accredition ID"
                  type="text"
                  value={supplierForm.accreditation_id}
                  onChange={handleChangeHandler}
                />
              </Grid>
              <Grid className="mt-3" item xs={6}>
                <FormControl size="small" sx={{ width: "100%" }}>
                  <InputLabel id="demo-simple-select-autowidth-label">
                    Accredition Choice
                  </InputLabel>
                  <Select
                    fullWidth
                    labelId="demo-simple-select-autowidth-label"
                    id="demo-simple-select-autowidth"
                    value={supplierForm.accreditation_name}
                    autoWidth
                    label="Select User"
                    onChange={(e) => {
                      setSupplierForm({
                        ...supplierForm,
                        accreditation_name: e.target.value
                      });
                    }}
                  >
                    <MenuItem value="startupindia">Startup India</MenuItem>
                    <MenuItem value="asme">Asme</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  margin="normal"
                  size="small"
                  required
                  fullWidth
                  name="sub_address"
                  label="Supplier Address"
                  type="text"
                  value={supplierForm.sub_address}
                  onChange={handleChangeHandler}
                />
              </Grid>
              <Grid className="mt-3" item xs={6}>
                <FormControl size="small" sx={{ width: "100%" }}>
                  <InputLabel id="demo-simple-select-autowidth-label">
                    laboratory
                  </InputLabel>
                  <Select
                    fullWidth
                    labelId="demo-simple-select-autowidth-label"
                    id="demo-simple-select-autowidth"
                    value={supplierForm.laboratory}
                    autoWidth
                    label="Select User"
                    onChange={(e) => {
                      setSupplierForm({
                        ...supplierForm,
                        laboratory: e.target.value
                      });
                    }}
                  >
                    <MenuItem value={randomObject.id}>
                      {randomObject.name}
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <div className="form-group">
                  <label>Product Image</label>
                  <input
                    type="file"
                    name="product_image"
                    className="form-control-file"
                    id="exampleFormControlFile1"
                    onChange={fileHandler}
                  />
                </div>
              </Grid>

              <Grid item xs={6}>
                <div className="form-group">
                  <label>Certificate Image</label>
                  <input
                    name="certificate_image"
                    type="file"
                    className="form-control-file"
                    id="exampleFormControlFile1"
                    onChange={fileHandler}
                  />
                </div>
              </Grid>
              <Grid item xs={6}>
                <div className="form-group">
                  <label>Supplier proof</label>
                  <input
                    type="file"
                    name="sub_proof"
                    className="form-control-file"
                    id="exampleFormControlFile1"
                    onChange={fileHandler}
                  />
                </div>
              </Grid>
              <Grid item xs={6}>
                <div className="form-group">
                  <label>Accredition Image</label>
                  <input
                    type="file"
                    name="accreditation_image"
                    className="form-control-file"
                    id="exampleFormControlFile1"
                    onChange={fileHandler}
                  />
                </div>
              </Grid>
            </Grid>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button type="submit">Save</Button>
            </DialogActions>
          </Box>
        </DialogContent>
      </Dialog>

      <Box p={3} sx={{ display: "flex" }}>
        {buyerVerifiedForms?.map((formData: any) => (
          <Box
            className="rounded align-items-center"
            key={formData.id}
            m={2}
            p={4}
            sx={{ background: "white", height: "120px", width: "400px" }}
          >
            <Box p={2}>
              <div className="float-right">
                <Chip color="primary" icon={<DoneAllIcon />} label="Verified Buyer" />
              </div>
              <p>{formData.product_name}</p>
              
            </Box>
          </Box>
        ))}
      </Box>
    </>
  );
};
