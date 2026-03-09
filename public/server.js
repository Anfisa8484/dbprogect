const express = require("express");
const sql = require("mssql/msnodesqlv8");
const path = require("path");

const POST = 3000;
const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));


// const { DatabaseSync } = require("node:sqlite");
// const { ConnectionError } = require("tedious");

const dbConfig = {
    connectionString:
      "Driver={SQL Server};Server=A102PCPREPOD\\A102PCPREPOD;Database=Anfisa tb;Trusted_Connection=Yes;",
    driver: "msnodesqlv8"
  };


// const dbConfig = {
//     server: "A102PCPREPOD\A102PCPREPOD",
//     database: "Anfisa tb",
//     driver: "msnodesqlv8",
//     options:{
//         trustedConnection: true,
//         trustServerCertificate: true,
//     },
// };

app.get('/students', async(req, res)=>{
    const connection = await sql.connect(dbConfig);

    const result = await connection.request().query("SELECT * FROM dbo.students")

    res.json(result.recordset);
});

app.post("/students", async(req, res) => {
    const {name, lasname, bithday, group_id} = req.body;
    const connection = await sql.connect(dbConfig);

    await connection.request()
    .input("name", sql.NVarChar, name)
    .input("lasname", sql.NVarChar, lasname)
    .input("bithday", sql.NVarChar, bithday)
    .input("group_id", sql.Int, group_id).query(`
        INSERT INTO dbo.students(name, lasname, bithday, group_id)
        VALUES (@name, @lasname, @bithday, @group_id)
    `);

    res.send("OK");
});
app.listen(3000, ()=>{
    console.log("Server started, http//localhost:3000");
});