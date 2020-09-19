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

export default function PortalHeader() {
  const [openDialog, setOpenDialog] = React.useState(false);
  const [customerName, setCustomerName] = React.useState([]);
  const [customerAddress, setCustomerAddress] = React.useState([]);
  const [phoneNumber, setPhoneNumber] = React.useState([]);
  const [waybill, setWaybill] = React.useState([]);
  const [customers, setCustomers] = React.useState([]);

  useEffect(() => {
    const user_id = parseInt(localStorage.getItem("user_id"));
    axios
      .get(`http://127.0.0.1:8000/api/shipment?id=${user_id}`)
      .then(function (response) {
        // handle success
        console.log(response);
        setCustomers(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }, []);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    clearState();
  };

  // start -- onchange
  const handleCustomerName = (e) => {
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
  // end -- onchange

  const handleCreateShipment = (e) => {
    e.preventDefault();
    axios
      .post("http://127.0.0.1:8000/api/shipment", {
        customer_name: customerName,
        customer_address: customerAddress,
        phone_number: phoneNumber,
        waybill: waybill,
        username: localStorage.getItem("username"),
      })
      .then((response) => {
        console.log(response);
        handleOpenDialog();
      })
      .catch((error) => {
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
            </form>
          </h2>
        </TabPanel>
        <TabPanel>
          <h2>Any content 2</h2>
        </TabPanel>
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
        <TabPanel>
          <h2>Any content 4</h2>
        </TabPanel>
      </Tabs>
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Shipment created successfully !"}
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary" autoFocus>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
