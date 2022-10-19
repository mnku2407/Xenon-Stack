var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

const app = express();

app.use(bodyParser.json());
app.use(express.static("public"));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

mongoose.connect(
  "mongodb+srv://Mayank:mayank@cluster0.neiae61.mongodb.net/?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

var db = mongoose.connection;

db.on("error", () => console.log("Error in Connecting to Database"));
db.once("open", () => console.log("Connected to Database"));

app.post("/sign_up", (req, res) => {
  var name = req.body.name;
  var password = req.body.password;

  var data = {
    name: name,

    password: password,
  };

  db.collection("users").insertOne(data, (err, collection) => {
    if (err) {
      throw err;
    }
  });
  return res.redirect("home.html");
});

app.post("/login", (req, res) => {
  var name = req.body.name;
  var password = req.body.password;
  db.collection("users").findOne({ name: name }, (err, collection) => {
    if (err) {
    window.alert('No user')  
    }
    if (collection.password == password) {
      return res.redirect("home.html");
    }
    else{
      return res.redirect("index.html")
    } 

  });
});
app.post("/contactus", (req, res) => {
  var name = req.body.name;

  var email = req.body.email;
  var query = req.body.query;

  var data = {
    name: name,
    email: email,
    query: query,
  };

  db.collection("queries").insertOne(data, (err, collection) => {
    if (err) {
      throw err;
    }
  });

  return res.redirect("home.html");
});

app
  .get("/", (req, res) => {
    res.set({
      "Allow-access-Allow-Origin": "*",
    });
    return res.redirect("index.html");
  })
  .listen(3000);

console.log("Listening on PORT 3000");
