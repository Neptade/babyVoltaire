const express = require('express');
const router = express.Router();
const memberRepo = require("../repositories/member.repository");
const path = require('path');

router.get("/", (request, response)=> {
    const filePath = path.join(process.env.rootDirectory, "/views/pages/home.ejs")
    response.render(filePath)
})
router.get("/list", memberListAction);
router.get("/membreData")

async function memberListAction(request, response){
    var membres = await memberRepo.getAllMembers()
    const filePath = path.join(process.env.rootDirectory, "/views/pages/membresInfo.ejs");
    response.render(filePath, {"membres": membres});
}

async function memberDataListAction(request, response){
    var member = await memberRepo.getMemberData(request.params.mID);
    
}

module.exports = router;