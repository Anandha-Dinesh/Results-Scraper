const express = require("express");
const app = express();
const fileupload = require("express-fileupload");
app.use(express.static("Public"));

const manageFiles = require("./actions/manageFileUpload");
const PORT = 5000;

app.use(fileupload());

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/Public/index.html");
});

app.post("/", manageFiles);

app.get("/Download", (req, res) => {
  res.sendFile(__dirname + "/Public/outputpage.html");
});

app.get("/Download:result.xlsx", (req, res) => {
  const filePath = __dirname + "/Finaloutput.xlsx";
  res.download(filePath, "Result.xlsx", (err) => {
    if (err) {
      res.send({
        error: err,
        msg: "Problem downloading the file",
      });
    }
  });
});

app.listen(PORT, () => {
  console.log(`server is running at port ${PORT}.... `);
});
