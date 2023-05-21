const express = require('express');
const router = express.Router();
const exoRepo = require("../repositories/exercices.repository");
const path = require('path');

router.get("/:tps_exo", exercicesGetExo);
router.get("/:qID/:answer", exercicesGetAnswer);

async function exercicesGetExo(request, response) {
    var exo = await exoRepo.getExercice(request.query.tps_exo);
    const filePath = path.join(process.env.rootDirectory, "/views/pages/exercices.ejs");
    response.render(filePath, {"exercices": exercices});
}

async function exercicesGetAnswer(request, response) {
    var exo = await exoRepo.getExercice(request.query.qID);
    const filePath = path.join(process.env.rootDirectory, "/views/pages/exercices.ejs");
    response.render(filePath, {"answer": answer});
}

module.exports = router;