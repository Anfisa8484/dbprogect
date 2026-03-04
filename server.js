const express = require("exsperess");
const sql = require('mssql');
const { DatabaseSync } = require("node:sqlite");
const { ConnectionError } = require("tedious");

const app = express();
add.use(express.json());

const dbConfig = {
    server: "A102PCPREPOD\A102PCPREPOD",
    database: "Anfisa tb",
    driver: "msnodesqlv8",
    options:{
        trustedConnection: true,
        trustServerCertificate: true,
    },
};

app.get('/students', async(req, res)=>{
    const connection = await sql.connect(dbConfig);

    const result = await connection.request().query("SELECT * FROM dbo.students")

    res.json(result.recordset);
});

add.post("/students", async(req, res) => {
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