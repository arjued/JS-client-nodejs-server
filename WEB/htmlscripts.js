var logid
var connId

async function test(id, callback) {
    document.getElementById("loginId").innerText = "User  : " + id;
    logid = await id;
    callback();
}

async function getType() {
    var newReq = await confirm("Accept to enter requirement");
    if (newReq) {
        connId = await sendNewRequest(prompt("Enter tool required"), logid)
    } else{
        connId = await getConnId(logid)
    }
}

test(prompt("Please enter login id"), getType);
setInterval(function () { getMessage(logid) }, 1000);