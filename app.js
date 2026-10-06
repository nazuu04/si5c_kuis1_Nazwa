require("dotenv").config();
const express = require("express");
const cors = require("cors");
const logger = require("./middlewares/logger");
const { notFound, errorHandler } = require("./middlewares/errorHandler");
const patientRoutes = require("./routes/patientRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(logger);

app.get("/", (req, res) => {
  res.status(200).json({
    nama: "Nazwa Munthaha Hendriyani Nasution",
    npm: "2428240098",
    topik: 5,
    deskripsi: "RESTful API Rumah Sakit - Pasien",
    endpoints: [
      "GET /patients",
      "GET /patients/:id",
      "GET /patients?jenisKelamin=P",
      "POST /patients",
      "PUT /patients/:id",
      "DELETE /patients/:id",
    ],
  });
});

app.use("/patients", patientRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server berjalan di http://localhost:${PORT}`));

module.exports = app;