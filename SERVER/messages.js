async function getMessage(request, response, db) {
    let obj = request.body;

    db.query(`SELECT message, sender FROM (select m.id, m.message, m.sender from messages m inner join chatroom c on m.connId = c.connId where c.users like '%${obj["loginId"]}%' order by id desc LIMIT 15) sub ORDER BY id`, function (error, results) {
        if (error) {
            console.log(`Error in database operation`)
            response.status(500).send('Error in database operation');
        } else {
            response.status(200).send({ "messages": results });
        }
    });
}

function sendMessage(request, response, db) {
    let obj = request.body;
    db.query(`insert into messages (message, sender, connId) values ('${obj["message"]}', '${obj["loginId"]}', '${obj["connId"]}')`, function (error, results) {
        if (error) {
            console.log(`Error in database operation`)
            response.status(500).send('Error in database operation');
        } else {
            response.status(204).send();
        }
    });
}

async function newRequirement(request, response, db) {
    let obj = request.body;
    var hash
    var list = []
    // console.log(obj)
    db.query(`select loginId from users where tool like '%${obj["req"]}%'`, async function (error, results) {
        if (error) {
            console.log(`Error in database operation`)
            response.status(500).send('Error in database operation');
        } else {
            response.status(200);
            const crypto = require('crypto')
            hash = crypto.createHash('md5').update(JSON.stringify(results + new Date().getTime())).digest("hex")
            for (var i = 0; i < results.length; i++) {
                list.push(results[i]["loginId"])
            }
            list.push(obj["loginId"])
            await insertConnectionId((hash), JSON.stringify(list), db)

            response.status(200).send({ "connId": (hash) });
        }
    });
}

function insertConnectionId(hash, list, db) {
    db.query(`INSERT INTO chatroom (connId, users) VALUES ('${hash}', '${list}')`, async function (error, results) {
        if (error) {
            console.log('Error in database operation');
        } else {
            return true;
        }
    });
}



module.exports.newRequirement = newRequirement;
module.exports.sendMessage = sendMessage;
module.exports.getMessage = getMessage;