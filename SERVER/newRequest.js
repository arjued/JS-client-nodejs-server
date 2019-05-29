async function newRequest(request, response, db) {
    let obj = request.body;
    var hash
    var list = []
    console.log(obj)
    await db.query("select loginId from users where tool like '%" + obj["req"] + "%'", async function (error, results) {
        if (error) {
            response.status(400).send('Error in database operation');
        } else {
            // console.log("resp sent")
            response.setHeader('Access-Control-Allow-Origin', '*');
            response.status(200);
            const crypto = require('crypto')
            hash = await crypto.createHash('md5').update(JSON.stringify(results + new Date().getTime())).digest("hex")
            for (var i = 0; i < results.length; i++) {
                await list.push(results[i]["loginId"])
            }
            await list.push(obj["loginId"])
            console.log("data " + list)
            await insCId((hash), JSON.stringify(list), db)

            await response.send({ "connId": JSON.stringify(hash) });
        }
    });
}

async function insCId(hash, list, db) {
    console.log("query :" + "INSERT INTO chatroom (connId, users) VALUES ('" + hash + "','" + list + "')")
    await db.query("INSERT INTO chatroom (connId, users) VALUES ('" + hash + "','" + list + "')", async function (error, results) {
        if (error) {
            console.log('Error in database operation');
        } else {
            return true;
        }
    });
}

async function getConnId(request, response, db) {
    let obj = request.body;
    console.log(obj)
    // console.log("select connId from  chatroom where users like '%"+ obj["loginId"] +"%'")
    db.query("select connId from  chatroom where users like '%" + obj["loginId"] + "%'", async function (error, results) {
        if (error) {
            response.status(400).send('Error in database operation');
        } else {
            // console.log("resp sent")
            response.setHeader('Access-Control-Allow-Origin', '*');
            response.status(200);
            if (results.length > 0)
                response.send({ "connId": (results[0]["connId"]) });
            else
                response.send({ "connId": "" })
        }
    });

}


module.exports.newRequest = newRequest;
module.exports.getConnId = getConnId;