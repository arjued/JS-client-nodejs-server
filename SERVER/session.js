function getConnId(request, response, db) {
    let obj = request.body;
    // console.log(obj)
    db.query(`select connId from  chatroom where users like '%${obj["loginId"]}%'`, async function (error, results) {
        if (error) {
            response.status(500).send('Error in database operation');
        } else {
            response.status(200);
            // console.log(results[0])
            if (results.length > 0)
                response.send({ "connId": (results[0]["connId"]) });
            else
                response.send({ "connId": "" })
        }
    });

}

module.exports.getConnId = getConnId;
