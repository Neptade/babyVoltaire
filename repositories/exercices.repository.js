pool = require("../db.js")

module.exports = {
    async getExercice(tps_exo){
        try{
            let conn = await pool.getConnection();
            let sql = "Select qID, ennonce, reponse, tempsVerbe from questions where tempsVerbe = ? ORDER BY RAND()";
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
    },

    async getOneExercise(qID){
        try{
            let conn = await pool.getConnection();
            let sql = "Select * from questions where qID = ?";
            const [rows, fields] = await conn.execute(sql, [qID]);
            conn.release();
            return (rows);
        } catch (err) {
            console.log(err);
            throw err;
        }
    }
}