const express = require("express");
const bp = require("body-parser");
const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "node_crud_db",
});

db.connect((err) => {
  if (err) throw err;
  console.log("Database connected!");
});

const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

app.use(bp.urlencoded({ extended: false }));

// const dummyData = [
//   { id: 1, nama: "John Doe", nohp: "1234567890" },
//   { id: 2, nama: "Jane Smith", nohp: "9876543210" },
//   { id: 3, nama: "Alice Johnson", nohp: "5555555555" },
// ];

app.get("/", (req, res) => {
  // Menampilkan list
  db.query("select * from kontak", (err, rows) => {
    if (err) throw err;
    res.render("index.ejs", { kontak: rows });
  });
});

app.get("/:id", (req, res) => {
  // Menampilkan detail
  const { id } = req.params;
  const sql = `select * from kontak where id=${id}`;
  // const kontak = dummyData.find((item) => item.id === parseInt(id));
  db.query(sql, (err, row) => {
    if (err) throw err;
    // console.log(row);

    const kontak = row[0];
    res.render("detail.ejs", { kontak });
  });
});

app.post("/", (req, res) => {
  // Membuat data
  //   console.log(req.body);
  const { nama, nohp } = req.body;
  const sql = `insert into kontak values(NULL, '${nama}', '${nohp}')`;
  db.query(sql, (err, rows) => {
    if (err) throw err;
    res.redirect("/");
  });
});

app.get("/:id/edit", (req, res) => {
  // Mengubah data
  const { id } = req.params;
  const sql = `select * from kontak where id=${id}`;
  db.query(sql, (err, row) => {
    if (err) throw err;

    const kontak = row[0];
    res.render("edit.ejs", { kontak });
  });
});

app.post("/:id/edit", (req, res) => {
  // Menyimpan data
  const { id } = req.params;
  const { nama, nohp } = req.body;
  const sql = `update kontak set nama='${nama}', nohp='${nohp}' where id=${id}`;
  db.query(sql, (err, row) => {
    if (err) throw err;
    res.redirect("/");
  });
});

app.get("/:id/delete", (req, res) => {
  // Menghapus data
  const { id } = req.params;
  const sql = `delete from kontak where id=${id}`;
  db.query(sql, (err, rows) => {
    if (err) throw err;
    res.redirect("/");
  });
});

app.listen(port, () => {
  console.log(`Running on port ${port}`);
  console.log(`http://localhost:${port}`);
});
