async function getRequest(request, response, db){
    let obj = request.body;
    // console.log("get req :"+ JSON.stringify(obj["loginId"]))

    db.query("SELECT message, sender FROM (select m.id, m.message, m.sender from messages m inner join chatroom c on m.connId = c.connId where c.users like '%" + obj["loginId"] + "%' order by id desc LIMIT 15) sub ORDER BY id", function (error, results) {
        if (error) {
            response.status(400).send('Error in database operation');
        } else {
            // console.log("resp sent")
            response.setHeader('Access-Control-Allow-Origin', '*');
            response.send({ "messages": results });
        }
    });
}

module.exports.getRequest = getRequest;