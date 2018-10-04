// Requires
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const cors = require("cors");

// Import Routes
const artiklerRoutes = require("./routes/artiklerRoutes");
const brugerRoutes = require("./routes/brugerRoutes");
const nyhedsbrevRoutes = require("./routes/nyhedsbrevRoutes");
const sponsorRoutes = require("./routes/sponsorRoutes");
const kontaktRoutes = require("./routes/kontaktRoutes");
const beskederRoutes = require("./routes/beskederRoutes");

// Passport Config
require("./config/passport")(passport);

// Uses
app.use(passport.initialize());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors())

// DB
const keys = require("./config/keys");
mongoose.connect(keys.db, { useNewUrlParser: true })
    .then(() => console.log("Database Connected"))
    .catch(err => console.log(err));

// Routes
app.use("/api/artikler", artiklerRoutes);
app.use("/api/brugere", brugerRoutes);
app.use("/api/nyhedsbrev", nyhedsbrevRoutes);
app.use("/api/sponsor", sponsorRoutes);
app.use("/api/kontakt", kontaktRoutes);
app.use("/api/beskeder", beskederRoutes);

// Server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log("Server is running on port: " + PORT);
});