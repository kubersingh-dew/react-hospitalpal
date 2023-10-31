const express = require("express");
const cors = require("cors");

const app = express();

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "404 error." });
});

const doctorApi = require("./doctorApi");
const userApi = require("./users");
const appointmentApi = require("./appointments");
const chatApi = require("./chats");
const reviewApi = require("./reviews");

// set port, listen for requests
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

app.get("/v1/getDoctors", doctorApi.getAllDoctors)
app.get("/v1/getTopDoctors", doctorApi.getTopDoctors)
app.post("/v1/addDoctors", doctorApi.addDoctors)
app.get("/v1/getDoctor", doctorApi.getDoctor)

app.post("/v1/register", userApi.register)
app.post("/v1/login", userApi.login)
app.get("/v1/getuser", userApi.getData)

app.post("/v1/addAppointments", appointmentApi.addAppointments)
app.get("/v1/getAppointments", appointmentApi.getAppointments)

app.post("/v1/addChat", chatApi.addChat)
app.get("/v1/getChat", chatApi.getChat)
app.get("/v1/getAllUserChats", chatApi.getAllUserChats)

app.post("/v1/addReview", reviewApi.addReview)
app.get("/v1/getDoctorReview", reviewApi.getDoctorReview)


