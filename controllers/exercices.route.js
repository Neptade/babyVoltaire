const express = require('express');
const router = express.Router();
const exoRepo = require("../repositories/exercices.repository");
const path = require('path');

router.get("/", exercicesRootAction);
/*router.get("/:qID/:answer", exercicesGetAnswer);*/

async function exercicesRootAction(req, res) {
    const filePath = path.join(process.env.rootDirectory, "/views/pages/exercices.ejs");
    response.render(filePath, {"exercices": exercices});
}

router.get("/tps_exo", exercicesGetExo);

async function exercicesGetExo(request, response) {
    var exo = await exoRepo.getExercice(request.query.temps);
    const filePath = path.join(process.env.rootDirectory, "/views/pages/exercices_QCM.ejs");
    response.render(filePath, {"exercices": exo});
}

router.get("/")

router.post("/verification/answer", exoCheckAnswer);

async function exoCheckAnswer(request, response) {
    var id = request.body.exerciceId;
    var answer = request.body.answer;
    var correct = await exoRepo.checkExerciceAnswer(id, answer);
    if (correct) {
        const filePath = path.join(process.env.rootDirectory, "/views/pages/home.ejs");
        response.send('Bonne réponse !');
    }else{
        const filePath = path.join(process.env.rootDirectory, "/views/pages/home.ejs");
        response.send('Mauvaise réponse. Réessayez !');
    }
}


/*
async function exercicesGetAnswer(request, response) {
    var exo = await exoRepo.getExercice(request.query.qID);
    const filePath = path.join(process.env.rootDirectory, "/views/pages/exercices.ejs");
    response.render(filePath, {"answer": answer});
}
*/
module.exports = router;