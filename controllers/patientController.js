const Patient = require("../models/patientModel");

const isKosong = (nilai) =>
  nilai === undefined || nilai === null || (typeof nilai === "string" && nilai.trim() === "");

function validasiPasien(body) {
  const { noRekamMedis, nama, tanggalLahir, jenisKelamin, alamat } = body;
  if (isKosong(noRekamMedis)) return "Field noRekamMedis wajib diisi";
  if (isKosong(nama)) return "Field nama wajib diisi";
  if (isKosong(tanggalLahir)) return "Field tanggalLahir wajib diisi";
  if (isKosong(jenisKelamin)) return "Field jenisKelamin wajib diisi";
  if (typeof noRekamMedis !== "string") return "Field noRekamMedis harus berupa teks";
  if (typeof nama !== "string") return "Field nama harus berupa teks";
  if (typeof tanggalLahir !== "string") return "Field tanggalLahir harus berupa teks";
  if (alamat !== undefined && typeof alamat !== "string") return "Field alamat harus berupa teks";
  const formatTanggal = /^\d{4}-\d{2}-\d{2}$/;
  if (!formatTanggal.test(tanggalLahir) || isNaN(new Date(tanggalLahir).getTime())) {
    return "Field tanggalLahir harus berformat YYYY-MM-DD";
  }
  if (jenisKelamin !== "L" && jenisKelamin !== "P") {
    return 'Field jenisKelamin harus "L" atau "P"';
  }
  return null;
}

const tidakDitemukan = (res, idParam) =>
  res.status(404).json({
    status: "error",
    message: `Data dengan id ${idParam} tidak ditemukan`,
    data: null,
  });

exports.getAllPatients = (req, res) => {
  res.status(200).json(Patient.getAll(req.query.jenisKelamin));
};

exports.getPatientById = (req, res) => {
  const pasien = Patient.getById(parseInt(req.params.id));
  if (!pasien) return tidakDitemukan(res, req.params.id);
  res.status(200).json(pasien);
};

exports.createPatient = (req, res) => {
  const body = req.body || {};
  const pesanError = validasiPasien(body);
  if (pesanError) {
    return res.status(400).json({ status: "error", message: pesanError, data: null });
  }
  const baru = Patient.create(body);
  res.status(201).json({ status: "success", message: "Data pasien berhasil ditambahkan", data: baru });
};

exports.updatePatient = (req, res) => {
  const id = parseInt(req.params.id);
  if (!Patient.getById(id)) return tidakDitemukan(res, req.params.id);
  const body = req.body || {};
  const pesanError = validasiPasien(body);
  if (pesanError) {
    return res.status(400).json({ status: "error", message: pesanError, data: null });
  }
  const hasil = Patient.update(id, body);
  res.status(200).json({ status: "success", message: "Data pasien berhasil diubah", data: hasil });
};

exports.deletePatient = (req, res) => {
  const id = parseInt(req.params.id);
  if (!Patient.remove(id)) return tidakDitemukan(res, req.params.id);
  res.status(200).json({ status: "success", message: `Data pasien dengan id ${id} berhasil dihapus`, data: null });
};