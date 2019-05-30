var logid
var connId
async function test(id, callback) {
    document.getElementById("loginId").innerText = "User  : " + id;
    logid = await id;
    callback();
}
test(prompt("Please enter login id"), getType);
async function getType() {
    var newReq = await confirm("Accept to enter requirement");
    if (newReq) {
        connId = await sendNewRequest(prompt("Enter tool required"), logid)
    } else{
        connId = await getConnId(logid)
    }
}

setInterval(function () { getMessage(logid) }, 2000);