const express = require("express");
const app = express();
const path = require("path");
const Router = require("./routes/indexrouter");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", Router);

PORT = 3000;
app.listen(PORT, () => {
  console.log(`server running in port ${PORT}`);
});
