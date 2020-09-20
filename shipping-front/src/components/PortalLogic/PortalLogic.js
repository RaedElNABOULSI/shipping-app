import React, { useEffect } from "react";
import "./PortalLogic.scss";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";

export default function PortalHeader() {
  const [openCreateDialog, setOpenCreateDialog] = React.useState(false);
  const [openUpdateDialog, setOpenUpdateDialog] = React.useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);
  const [customerName, setCustomerName] = React.useState([]);
  const [customerAddress, setCustomerAddress] = React.useState([]);
  const [phoneNumber, setPhoneNumber] = React.useState([]);
  const [waybill, setWaybill] = React.useState([]);
  const [customers, setCustomers] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [shipmentId, setShipmentId] = React.useState([]);

  useEffect(() => {
    const user_id = parseInt(localStorage.getItem("user_id"));
    axios
      .get(`http://127.0.0.1:8000/api/shipment?id=${user_id}`)
      .then(function (response) {
        // handle success
        console.log("customers are", response.data);
        setCustomers(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }, []);

  // close dialogs
  const closeCreateDialog = () => {
    setOpenCreateDialog(false);
    clearState();
  };

  const closeDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  const closeUpdateDialog = () => {
    setOpenUpdateDialog(false);
    setCustomerAddress([]);
    setPhoneNumber([]);
    setWaybill([]);
  };

  // onchange
  const handleShipmentId = (e) => {
    console.log(e.target.value);
    setShipmentId(e.target.value);
  };
  const handleCustomerName = (e) => {
    console.log(e.target.value);
    setCustomerName(e.target.value);
  };
  const handleCustomerAddress = (e) => {
    setCustomerAddress(e.target.value);
  };
  const handlePhoneNumber = (e) => {
    setPhoneNumber(e.target.value);
  };
  const handleWaybill = (e) => {
    setWaybill(e.target.value);
  };

  // on Submit
  const handleUpdateShipment = (e) => {
    e.preventDefault();
    axios
      .put(`http://127.0.0.1:8000/api/shipment/${customerName}`, {
        customer_address: customerAddress,
        phone_number: phoneNumber,
        waybill: waybill,
      })
      .then(function (response) {
        setOpenUpdateDialog(true);
        console.log(response);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  const handleDeleteShipment = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .delete(`http://127.0.0.1:8000/api/shipment/${shipmentId}`)
      .then(function (response) {
        setLoading(false);
        console.log(response);
        setOpenDeleteDialog(true);
      })
      .catch(function (error) {
        setLoading(false);
        console.error(error);
      });
  };

  const handleCreateShipment = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post("http://127.0.0.1:8000/api/shipment", {
        customer_name: customerName,
        customer_address: customerAddress,
        phone_number: phoneNumber,
        waybill: waybill,
        username: localStorage.getItem("username"),
      })
      .then((response) => {
        setLoading(false);
        console.log(response);
        setOpenCreateDialog(true);
      })
      .catch((error) => {
        setLoading(false);
        console.error(error);
      });
  };

  const clearState = () => {
    setCustomerName([]);
    setCustomerAddress([]);
    setPhoneNumber([]);
    setWaybill([]);
  };

  return (
    <div className="portalLogic">
      <Tabs className="tab">
        <TabList>
          <Tab>Create Shipment</Tab>
          <Tab>Update Shipment</Tab>
          <Tab>View Shipments</Tab>
          <Tab>Delete Shipment</Tab>
        </TabList>

        {/* start - create shipment ------- */}
        <TabPanel>
          <h2>
            <form autoComplete="off" onSubmit={(e) => handleCreateShipment(e)}>
              <TextField
                label="Customer Name"
                name="customerName"
                onChange={(e) => handleCustomerName(e)}
                value={customerName}
                required
              />
              <br />
              <TextField
                label="Customer Address"
                name="customerAddress"
                onChange={(e) => handleCustomerAddress(e)}
                value={customerAddress}
                required
              />
              <br />
              <TextField
                label="Customer Phone Number"
                name="phoneNumber"
                onChange={(e) => handlePhoneNumber(e)}
                value={phoneNumber}
                required
              />
              <br />
              <TextField
                label="Waybill"
                name="waybill"
                onChange={(e) => handleWaybill(e)}
                value={waybill}
                required
              />
              <br />
              <br />
              <Button variant="contained" color="primary" type="submit">
                Create Shipment
              </Button>
              <br />
              <br />
              {loading && <CircularProgress />}
            </form>
          </h2>
        </TabPanel>
        {/* end - create shipment ------- */}

        {/* start - update shipment ------- */}
        <TabPanel>
          <div className="update-shipment">
            <div className="customer-to-update">
              <label for="cars">
                Choose a customer to update shipment info:
              </label>
              &nbsp;
              <select onChange={(e) => handleCustomerName(e)}>
                <option value="Choose">Choose customer</option>
                {customers.map((item) => (
                  <option value={item.customer_name}>
                    {item.customer_name}
                  </option>
                ))}
              </select>
            </div>
            <form autoComplete="off" onSubmit={(e) => handleUpdateShipment(e)}>
              <TextField
                label="Customer Address"
                name="customerAddress"
                onChange={(e) => handleCustomerAddress(e)}
                value={customerAddress}
                required
              />
              <br />
              <TextField
                label="Customer Phone Number"
                name="phoneNumber"
                onChange={(e) => handlePhoneNumber(e)}
                value={phoneNumber}
                required
              />
              <br />
              <TextField
                label="Waybill"
                name="waybill"
                onChange={(e) => handleWaybill(e)}
                value={waybill}
                required
              />
              <br />
              <br />
              <Button variant="contained" color="primary" type="submit">
                Update Shipment
              </Button>
              <br />
              <br />
              {loading && <CircularProgress />}
            </form>
          </div>
        </TabPanel>
        {/* end - update shipment ------- */}

        {/* start - view shipment ------- */}
        <TabPanel>
          {customers.map((item) => (
            <div className="view-shipments">
              <img
                src={require("../../assets/images/customer.png")}
                className="customer-image"
              />
              <div className="customer-info">
                <div className="key">
                  <p>
                    <strong>Customer name:</strong>{" "}
                  </p>
                  <br />
                  <p>
                    <strong>Customer address:</strong>{" "}
                  </p>
                  <br />
                  <p>
                    <strong>Phone number:</strong>{" "}
                  </p>
                  <br />
                  <p>
                    <strong>Waybill:</strong>{" "}
                  </p>
                </div>
                <div className="value">
                  <p>{item.customer_name}</p>
                  <br />
                  <p>{item.customer_address}</p>
                  <br />
                  <p> {item.phone_number}</p>
                  <br />
                  <p>{item.waybill}</p>
                </div>
              </div>
            </div>
          ))}
        </TabPanel>
        {/* end - update shipment ------- */}

        {/* start - delete shipment ------- */}
        <TabPanel>
          <div className="delete-shipment">
            <label>Choose a customer to delete shipment info:</label>
            &nbsp;
            <select onChange={(e) => handleShipmentId(e)}>
              <option value="Choose">Choose customer</option>
              {customers.map((item) => (
                <option value={item.id}>{item.customer_name}</option>
              ))}
            </select>
            <br />
            <br />
            <form onSubmit={(e) => handleDeleteShipment(e)}>
              <Button variant="contained" color="primary" type="submit">
                Delete Shipment
              </Button>
              <br />
              <br />
              {loading && <CircularProgress />}
            </form>
          </div>
        </TabPanel>
        {/* end - delete shipment ------- */}
      </Tabs>
      {/* create shipment dialog */}
      <Dialog
        open={openCreateDialog}
        onClose={closeCreateDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Shipment created successfully !"}
        </DialogTitle>
        <DialogActions>
          <Button onClick={closeCreateDialog} color="primary" autoFocus>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
      {/* update shipment dialog  */}
      <Dialog
        open={openUpdateDialog}
        onClose={closeUpdateDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Shipment Updated successfully !"}
        </DialogTitle>
        <DialogActions>
          <Button onClick={closeUpdateDialog} color="primary" autoFocus>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
      {/* delete shipment dialog  */}
      <Dialog
        open={openDeleteDialog}
        onClose={closeDeleteDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Shipment deleted successfully !"}
        </DialogTitle>
        <DialogActions>
          <Button onClick={closeDeleteDialog} color="primary" autoFocus>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
