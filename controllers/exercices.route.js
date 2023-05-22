const express = require('express');
const router = express.Router();
const exoRepo = require("../repositories/exercices.repository");
const path = require('path');
const flash = require('express-flash');

router.get("/", exercicesRootAction);
/*router.get("/:qID/:answer", exercicesGetAnswer);*/

async function exercicesRootAction(request, response) {
    const filePath = path.join(process.env.rootDirectory, "/views/pages/exercices.ejs");
    response.render(filePath);
}

router.get("/tps_exo", exercicesGetExo);

async function exercicesGetExo(request, response) {
    var exo = await exoRepo.getExercice(request.query.temps);
    const filePath = path.join(process.env.rootDirectory, "/views/pages/exercices_QCM.ejs");
    response.render(filePath, {"exercices": exo});
}

router.post("/verification/answer", exoCheckAnswer);

async function exoCheckAnswer(request, response) {
    var id = request.body.exerciceId;
    var answer = request.body.answer;
    var correct = await exoRepo.checkExercice(id, answer);
    if (correct) {
        request.flash('success','Bonne réponse !');
        
    }else{
        var exo = await exoRepo.getOneExercise(id)
        request.flash('failure','Mauvaise réponse. Réessayez ! La bonne réponse est : '+exo[0].reponse);
    }
    const filePath = path.join(process.env.rootDirectory, "/views/pages/exercices.ejs");
    response.render(filePath);
}

router.get("/lecons", leconShowAction);

function leconShowAction(request, response){
    const filePath = path.join(process.env.rootDirectory, "/views/pages/Lecons.ejs");
    response.render(filePath);
}

/*
async function exercicesGetAnswer(request, response) {
    var exo = await exoRepo.getExercice(request.query.qID);
    const filePath = path.join(process.env.rootDirectory, "/views/pages/exercices.ejs");
    response.render(filePath, {"answer": answer});
}
*/
module.exports = router;