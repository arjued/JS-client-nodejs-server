var head = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
}

async function sendMessage(id, connId) {

    var obj = {}
    obj["message"] = await document.getElementById("message").value,
        obj["loginId"] = id
        obj["connId"] = connId

    const res = await fetch("http://127.0.0.1:8000/sendMessage",
        {
            headers: head,
            method: "POST",
            body: JSON.stringify(obj)
        }).then(function (response) {
            return response.json();
        }).catch(function (error) {
            console.log("Err " + error)
        })
}

async function getMessage(logid) {
    const res = await fetch("http://127.0.0.1:8000/getMessage",
        {
            headers: head,
            method: "POST",
            body: JSON.stringify({ loginId: logid})
        }).then(function (response) {
            return response.json();
        }).catch(function (error) {
            console.log("Err " + error)
        })
    var messages = []
    
    for ( var i = 0; i < res["messages"].length; i++) {
        messages = await messages + res["messages"][i]["sender"] + " : &nbsp " + res["messages"][i]["message"] + "<br>";
    }
    // document.getElementById("test").innerHTML = document.getElementById("test").innerHTML +  resp;
    document.getElementById("test").innerHTML = await messages;
}

async function sendNewRequest(requirement, logid) {
    console.log("accepted" + logid)
    const res = await fetch("http://127.0.0.1:8000/newRequirement",
        {
            headers: head,
            method: "POST",
            body: JSON.stringify({ loginId: logid, req: requirement })
        }).then(function (response) {
            return response.json();
        }).catch(function (error) {
            console.log("Err " + error)
        })
        console.log("resp :"+(res["connId"]))
        return (res["connId"])
}

async function getConnId(loginId) {
    console.log("getting conn")
    const res = await fetch("http://127.0.0.1:8000/getConnection",
        {
            headers: head,
            method: "POST",
            body: JSON.stringify({ loginId: loginId})
        }).then(function (response) {
            return response.json();
        }).catch(function (error) {
            console.log("Err " + error)
        })
        console.log("resp :"+res["connId"])
        return (res["connId"])
}