const { response } = require("express");
const express = require("express");
const app = express();


const listener = app.listen(process.env.PORT || 3000, () =>{
  console.log(`Your app is listening on port ${listener.address().port}`);
});

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(express.static("css"));
app.use(express.static("public"));

const multer = require("multer");
const upload = multer();


app.get("/", (request, response) => {
  response.sendFile(`${__dirname}/views/index.html`);
});

app.get("/ex1", (request, response) => {
  response.sendFile(`${__dirname}/views/ex1.html`);
});

app.post("/ex1", upload.array(), (request, response) => {
  const name = request.body.name;
  const email = request.body.email;
  response.send(`Hello ${name}, Thank you for your order. We will keep you posted on delivery status at ${email}`);
});

const countries = {
  name: "Chelsea",
  countries: [
    {
      name: "Ecuador",
      year: 2003
    },
    {
      model: "Portugal",
      color: 2004
    },
    {
      model: "Russia",
      color: 2016
    }
  ]
};

app.get("/api/ex2", (request, response) => {
  response.json(countries);
});

