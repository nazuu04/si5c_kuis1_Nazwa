const patients = [
  { id: 1, noRekamMedis: "RM-000123", nama: "Dewi Lestari", tanggalLahir: "1998-04-17", jenisKelamin: "P", alamat: "Jl. Merdeka 10, Bandung" },
];

let nextId = 4;

const getAll = (jenisKelamin) => {
  if (jenisKelamin !== undefined) {
    return patients.filter(
      (p) => p.jenisKelamin.toLowerCase() === String(jenisKelamin).toLowerCase()
    );
  }
  return patients;
};

const getById = (id) => patients.find((p) => p.id === id);

const create = ({ noRekamMedis, nama, tanggalLahir, jenisKelamin, alamat }) => {
  const baru = {
    id: nextId++,
    noRekamMedis, nama, tanggalLahir, jenisKelamin,
    alamat: alamat !== undefined ? alamat : "",
  };
  patients.push(baru);
  return baru;
};

const update = (id, { noRekamMedis, nama, tanggalLahir, jenisKelamin, alamat }) => {
  const index = patients.findIndex((p) => p.id === id);
  if (index === -1) return null;
  patients[index] = {
    id, noRekamMedis, nama, tanggalLahir, jenisKelamin,
    alamat: alamat !== undefined ? alamat : "",
  };
  return patients[index];
};

const remove = (id) => {
  const index = patients.findIndex((p) => p.id === id);
  if (index === -1) return false;
  patients.splice(index, 1);
  return true;
};

module.exports = { getAll, getById, create, update, remove };