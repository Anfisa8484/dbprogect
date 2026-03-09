"use strict";

var from = document.getElementById("userFrom");
var out = document.getElementById("out"); //A102PCPREPOD\A102PCPREPOD

from.addEventListener("submit", function _callee(e) {
  var fd, paytload, r;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          e.preventDefault();
          fd = new fromData(from);
          paytload = {
            name: fd.get("name"),
            lastname: fd.get("lasname"),
            bithday: String(fd.get("bithday")),
            group_id: Number(fd.get("group_id"))
          };
          _context.next = 5;
          return regeneratorRuntime.awrap(fetch("/students", {
            matod: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(paytload)
          }));

        case 5:
          r = _context.sent;
          _context.t0 = "HTTP ".concat(r.status, "\n");
          _context.next = 9;
          return regeneratorRuntime.awrap(r.text());

        case 9:
          _context.t1 = _context.sent;
          out.textContent = _context.t0.concat.call(_context.t0, _context.t1);

        case 11:
        case "end":
          return _context.stop();
      }
    }
  });
});
//# sourceMappingURL=dbprogect.dev.js.map
