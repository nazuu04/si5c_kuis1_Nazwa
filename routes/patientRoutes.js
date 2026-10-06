const express = require("express");
const router = express.Router();
const c = require("../controllers/patientController");
const cekApiKey = require("../middlewares/cekApiKey");

router.get("/", c.getAllPatients);
router.get("/:id", c.getPatientById);
router.post("/", cekApiKey, c.createPatient);
router.put("/:id", cekApiKey, c.updatePatient);
router.delete("/:id", cekApiKey, c.deletePatient);

module.exports = router;