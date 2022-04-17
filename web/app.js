var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
var ejs = require("ejs");
const { auth, requiresAuth, claimIncludes } = require("express-openid-connect");
// const { auth, requiredScopes } = require('express-oauth2-jwt-bearer');

var index = require("./controllers/index");
var admin = require("./controllers/admin");
var sensors = require("./controllers/sensors");
var users = require("./controllers/users");
var data = require("./controllers/data");
var anomalies = require("./controllers/anomalies");
var comments = require("./controllers/comments");

var app = express();
app.set("view engine", "html");
app.engine("html", ejs.renderFile);

var corsOptions = {
  origin: "http://localhost:3030",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
};

const config = {
  authRequired: false,
  auth0Logout: true,
  baseURL: "http://localhost:3030",
  clientID: "***REMOVED***",
  issuerBaseURL: "https://***REMOVED***",
  secret: "***REMOVED***",
  routes: {
    login: false,
  },
  errorOnRequiredAuth: true,
};

// const checkJwt = auth({
//     audience: 'shm',
//     issuerBaseURL: `https://***REMOVED***/`,
//     tokenSigningAlg: 'RS256'
// });

// const checkScopes = requiredScopes('read:messages');

app.use(cors(corsOptions));
app.use(auth(config));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", index);
app.use("/admin", claimIncludes("http://localhost:3030/roles", "Admin"), admin);
app.get("/login", (req, res) => res.oidc.login({ returnTo: "/dash" }));

app.use("/api/sensors", requiresAuth(), sensors);
app.use(
  "/api/users",
  claimIncludes("http://localhost:3030/roles", "Admin"),
  users
);
app.use("/api/data", requiresAuth(), data);
app.use("/api/anomalies", requiresAuth(), anomalies);
app.use("/api/comments", requiresAuth(), comments);

app.use((req, res, next) => {
  res.status(404).render("custom_404");
});

module.exports = app;
