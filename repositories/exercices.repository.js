pool = require("../db.js")

module.exports = {
    async getExercice(tps_exo){
        try{
            let conn = await pool.getConnection();
            let sql = "Select qID, ennonce, reponse from questions where tempsVerbe = ?";
            const [rows, fields] = await conn.execute(sql, [tps_exo]);
            conn.release();
            return rows;
        } catch (err) {
            console.log(err);
            throw err;
        }
    },

    async checkExercice(id, answer){
        try{
            let conn = await pool.getConnection();
            let sql = "Select reponse from questions where qID = ?";
            const [rows, fields] = await conn.execute(sql, [id]);
            conn.release();
            return (rows[0].reponse == answer);
        } catch (err) {
            console.log(err);
            throw err;
        }
    }
}