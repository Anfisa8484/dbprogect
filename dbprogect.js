const from = document.getElementById("userFrom");
const out = document.getElementById("out");


from.addEventListener("submit", async (e) => {
    e.preventDefault();
    const fd = new fromData(from);
    const paytload = {
        name: fd.get("name"),
        lastname: fd.get("lasname"),
        bithday: String(fd.get("bithday")),
        group_id: Number(fd.get("group_i")),
    };

    const r = await fetch("http://localhost:5000/api/users", {
        matod: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(paytload),
    });
    out.textContent =`HTTP ${r.status}\n${await r. text()}`;  
});