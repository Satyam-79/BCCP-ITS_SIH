import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import ReceiptIcon from "@mui/icons-material/Receipt";
import "../App.css";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

export const Supplier = () => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {};
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
              Trade Connectivity
            </Typography>
            <Button color="inherit" onClick={handleClickOpen}>
              Add Supplier
            </Button>
            <Button color="inherit">Logout</Button>
          </Toolbar>
        </AppBar>
      </Box>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>SUPPLIER</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To add supplier to this website, please enter following details
            here. We will send updates occasionally.
          </DialogContentText>
          <Box
            component="form"
            onSubmit={handleSubmit}
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
                  name="text"
                  autoComplete="email"
                  autoFocus
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  margin="normal"
                  size="small"
                  required
                  fullWidth
                  name="Supplier Address"
                  label="Supplier Address"
                  type="text"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  margin="normal"
                  size="small"
                  required
                  fullWidth
                  name="Product Name"
                  label="Product Name"
                  type="text"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  margin="normal"
                  size="small"
                  required
                  fullWidth
                  name="Agency Name"
                  label="Agency Name"
                  type="text"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  margin="normal"
                  size="small"
                  required
                  fullWidth
                  name="Accredition Name"
                  label="Accredition Name"
                  type="text"
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
                    // value={signupData.usertype}

                    autoWidth
                    label="Select User"
                  >
                    <MenuItem value="Customer">Active</MenuItem>
                    <MenuItem value="Supplier">Inactive</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  margin="normal"
                  size="small"
                  required
                  fullWidth
                  name="Accredition ID"
                  label="Accredition ID"
                  type="text"
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
                    // value={signupData.usertype}

                    autoWidth
                    label="Select User"
                  >
                    <MenuItem value="Customer">Startup India</MenuItem>
                    <MenuItem value="Supplier">Asme</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <div className="form-group">
                  <label>Product Image</label>
                  <input
                    type="file"
                    className="form-control-file"
                    id="exampleFormControlFile1"
                  />
                </div>
              </Grid>

              <Grid item xs={6}>
              <div className="form-group">
                  <label>Certificate Image</label>
                  <input
                    type="file"
                    className="form-control-file"
                    id="exampleFormControlFile1"
                  />
                </div>
              </Grid>
              <Grid item xs={6}>
              <div className="form-group">
                  <label>Supplier proof</label>
                  <input
                    type="file"
                    className="form-control-file"
                    id="exampleFormControlFile1"
                  />
                </div>
              </Grid>
              <Grid item xs={6}>
              <div className="form-group">
                  <label>Accredition Image</label>
                  <input
                    type="file"
                    className="form-control-file"
                    id="exampleFormControlFile1"
                  />
                </div>
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
