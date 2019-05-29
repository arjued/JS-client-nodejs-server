function getMessage() {
    var msg = document.getElementById('message').value;
    const conn = new XMLHttpRequest();
    const url = 'http://127.0.0.1:8000/'
    console.log('sending');


    conn.open("GET", url + 'get');
    // conn.setRequestHeader("Content-Type", "application/json");
    conn.onload = (res) => {
        var resp = [];

        let object1 = JSON.parse(conn.responseText);

        let i = 0;
        for (i = 0; i < object1["messages"].length; i++) {

            resp = resp + "<br>" + object1["messages"][i]["sender"] + " : &nbsp " + object1["messages"][i]["message"];
        }
        // document.getElementById("test").innerHTML = document.getElementById("test").innerHTML +  resp;
        document.getElementById("test").innerHTML = resp;
    };
    conn.send("{\"test\":\"scfsa\"}");

}
function sendMessage(id, connId) {
    console.log("id : " + id)
    var conn = new XMLHttpRequest();
    const url = 'http://127.0.0.1:8000/send'

    conn.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log("Status", conn.status)
        }
    };
    conn.open("POST", url);
    conn.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    conn.setRequestHeader("Accept", "*/*")
    // console.log("id :: " + document.getElementById("loginId").textContent)
    var obj = {}
    console.log("conn id :" , connId)
    obj["message"] = document.getElementById("message").value,
        obj["loginId"] = id
        obj["connId"] = connId

    console.log("req : " + JSON.stringify(obj));
    conn.send(JSON.stringify(obj));
}



async function getMessageF(logid) {
    const res = await fetch("http://127.0.0.1:8000/get",
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({ loginId: logid})
        }).then(function (response) {
            return response.json();
        }).catch(function (error) {
            console.log("Err " + error)
        })
    var object1 = res;
    var resp = []
    let i = 0;
    for (i = 0; i < object1["messages"].length; i++) {

        resp = await resp + object1["messages"][i]["sender"] + " : &nbsp " + object1["messages"][i]["message"] + "<br>";
    }
    // document.getElementById("test").innerHTML = document.getElementById("test").innerHTML +  resp;
    document.getElementById("test").innerHTML = await resp;
}

async function sendNewRequest(requirement, logid) {
    console.log("accepted" + logid)
    const res = await fetch("http://127.0.0.1:8000/new",
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({ loginId: logid, req: requirement })
        }).then(function (response) {
            return response.json();
        }).catch(function (error) {
            console.log("Err " + error)
        })
        console.log("resp :"+JSON.parse(res["connId"]))
        return JSON.parse(res["connId"])
}

async function getConnId(loginId) {
    console.log("getting conn")
    const res = await fetch("http://127.0.0.1:8000/con",
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
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