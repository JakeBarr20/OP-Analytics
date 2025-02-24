const express = require("express");
const app = express();
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
const cors = require("cors");
const bodyParser = require("body-parser");

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.use(cors());

app.post("/data-by-weight-age-give-value", async (req, res) => {
  const response = await fetch(
    `https://www.openpowerlifting.org/api/rankings/raw/ipf${req.body.w}/fully-tested/${req.body.g}/${req.body.a}/full-power?start=${req.body.s}&end=50000&lang=en&units=kg`
  );
  res.json(await response.json());
});

app.post("/data-by-filters", async (req, res) => {
  let response = "";
  if (req.body.w && req.body.a && req.body.g) {
    response = await fetch(
      `https://www.openpowerlifting.org/api/rankings/raw/ipf${req.body.w}/fully-tested/${req.body.g}/${req.body.a}/full-power?start=${req.body.s}&end=50000&lang=en&units=kg`
    );
  } else if (req.body.g && req.body.w) {
    response = await fetch(
      `https://www.openpowerlifting.org/api/rankings/raw/ipf${req.body.w}/fully-tested/${req.body.g}/full-power?start=${req.body.s}&end=50000&lang=en&units=kg`
    );
  } else if (req.body.g && req.body.a) {
    response = await fetch(
      `https://www.openpowerlifting.org/api/rankings/raw/fully-tested/${req.body.g}/${req.body.a}/full-power?start=${req.body.s}&end=50000&lang=en&units=kg`
    );
  } else if (req.body.w && req.body.a) {
    response = await fetch(
      `https://www.openpowerlifting.org/api/rankings/raw/ipf${req.body.w}/fully-tested/${req.body.a}/full-power?start=${req.body.s}&end=50000&lang=en&units=kg`
    );
  } else if (req.body.w) {
    response = await fetch(
      `https://www.openpowerlifting.org/api/rankings/raw/ipf${req.body.w}/fully-tested/full-power?start=${req.body.s}&end=50000&lang=en&units=kg`
    );
  } else if (req.body.g) {
    response = await fetch(
      `https://www.openpowerlifting.org/api/rankings/raw/fully-tested/${req.body.g}/full-power?start=${req.body.s}&end=50000&lang=en&units=kg`
    );
  } else if (req.body.a) {
    response = await fetch(
      `https://www.openpowerlifting.org/api/rankings/raw/fully-tested/${req.body.a}/full-power?start=${req.body.s}&end=50000&lang=en&units=kg`
    );
  }
  res.json(await response.json());
});

app.post("/index-by-name", async (req, res) => {
  const response = await fetch(
    `https://www.openpowerlifting.org/api/search/rankings?q=${req.body.n}&start=0`
  );
  res.json(await response.json());
});

app.post("/data-by-index", async (req, res) => {
  const response = await fetch(
    `https://www.openpowerlifting.org/api/rankings?start=${req.body.i}&end=${
      req.body.i + 99
    }&lang=en&units=kg`
  );
  res.json(await response.json());
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
