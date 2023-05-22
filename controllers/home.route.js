const express = require('express');
const router = express.Router();
const memberRepo = require("../repositories/member.repository");
const path = require('path');
const auth = require('../users.auth')

router.get("/", (request, response)=> {
    const filePath = path.join(process.env.rootDirectory, "/views/pages/home.ejs")
    response.render(filePath)
})
router.get("/list", memberListAction);
router.get("/membreData/",auth.checkAuthentication(), memberDataListAction)
// router.get("/membre/create", membreCreateAction)
// router.post("/membre/add", membreAddAction)

async function memberListAction(request, response){
    var membres = await memberRepo.getAllMembers()
    const filePath = path.join(process.env.rootDirectory, "/views/pages/membresInfo.ejs");
    response.render(filePath, {"membres": membres});
}

async function memberDataListAction(request, response){
    const mID = +(request.user.then((result) => {
        const mID = result[0].mID;
        return mID;
      }));
    var membre = await memberRepo.getMemberData(mID);
    const filePath = path.join(process.env.rootDirectory, "/views/pages/membreData.ejs");
    response.render(filePath, {"membres": membre});
}



module.exports = router;