"use strict";

var express = require("express");

var sql = require('mssql');

var POST = 3000;
var app = express();
app.use(express.json()); // const { DatabaseSync } = require("node:sqlite");
// const { ConnectionError } = require("tedious");

var dbConfig = {
  server: "A102PCPREPOD\A102PCPREPOD",
  database: "Anfisa tb",
  driver: "msnodesqlv8",
  options: {
    trustedConnection: true,
    trustServerCertificate: true
  }
};
app.get('/students', function _callee(req, res) {
  var connection, result;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(sql.connect(dbConfig));

        case 2:
          connection = _context.sent;
          _context.next = 5;
          return regeneratorRuntime.awrap(connection.request().query("SELECT * FROM dbo.students"));

        case 5:
          result = _context.sent;
          res.json(result.recordset);

        case 7:
        case "end":
          return _context.stop();
      }
    }
  });
});
app.post("/students", function _callee2(req, res) {
  var _req$body, name, lasname, bithday, group_id, connection;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _req$body = req.body, name = _req$body.name, lasname = _req$body.lasname, bithday = _req$body.bithday, group_id = _req$body.group_id;
          _context2.next = 3;
          return regeneratorRuntime.awrap(sql.connect(dbConfig));

        case 3:
          connection = _context2.sent;
          _context2.next = 6;
          return regeneratorRuntime.awrap(connection.request().input("name", sql.NVarChar, name).input("lasname", sql.NVarChar, lasname).input("bithday", sql.NVarChar, bithday).input("group_id", sql.Int, group_id).query("\n        INSERT INTO dbo.students(name, lasname, bithday, group_id)\n        VALUES (@name, @lasname, @bithday, @group_id)\n    "));

        case 6:
          res.send("OK");

        case 7:
        case "end":
          return _context2.stop();
      }
    }
  });
});
app.listen(3000, function () {
  console.log("Server started, http//localhost:3000");
});
//# sourceMappingURL=server.dev.js.map
