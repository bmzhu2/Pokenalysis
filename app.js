const express = require('express');
const app = express();
const mongoose = require('mongoose');
const db = require('./config/keys').mongoURI;
const users = require("./routes/api/users");
const teams = require("./routes/api/teams");
const likes = require("./routes/api/likes");
const comments = require("./routes/api/comments");
const bodyParser = require('body-parser');
const passport = require('passport');

mongoose
.connect(db, { useNewUrlParser: true })
.then(() => console.log("Connected to MongoDB successfully"))
.catch(err => console.log(err));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(passport.initialize());
require('./config/passport')(passport);
app.use("/api/users", users);
app.use("/api/teams", teams);
app.use("/api/likes", likes);
app.use("/api/comments", comments);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on port ${port}`));

