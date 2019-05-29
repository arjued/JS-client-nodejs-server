async function sendMessage(request, response, db){
    let obj = request.body;
    console.log("insert into messages (message, sender, connId) values ('" + obj["message"] + "','" + obj["loginId"] + "','" + obj["connId"] + "')")
    db.query("insert into messages (message, sender, connId) values ('" + obj["message"] + "','" + obj["loginId"] + "','" + obj["connId"] + "')", function (error, results) {
        if (error) {
            response.status(400).send('Error in database operation');
        } else {
            // console.log("resp sent")
            response.setHeader('Access-Control-Allow-Origin', '*');
            response.status(200);
            console.log("req :: " + request.body, "code :", response.statusCode)
            response.send({ "status": "success" });
        }
    });
}

module.exports.sendMessage = sendMessage;