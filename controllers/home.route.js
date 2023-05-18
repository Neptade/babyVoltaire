const express = require('express');
const router = express.Router();
const memberRepo = require("../repositories/member.repository");
const path = require('path');

router.get("/", (request, response)=> {
    const filePath = path.join(process.env.rootDirectory, "/views/home.html")
    response.sendFile(filePath)
})
router.get("/list", memberListAction);


async function memberListAction(request, response){
    var members = await memberRepo.getAllMembers()

    response.send(members)
}

module.exports = router;