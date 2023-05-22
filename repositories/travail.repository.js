pool = require("../db.js")

module.exports = {
    async getOneMemTemp(mID, temps){
        try{
            let conn = await pool.getConnection();
            let sql = "Select * from travail where mID = ? and tempsVerbe = ?";
            const [rows, fields] = await conn.execute(sql, [mID, temps]);
            conn.release();
            return (rows);
        } catch (err) {
            console.log(err);
            throw err;
        }
    },

    async updateOneMemTemp(mID, temps, avg, total){
        try{
            let conn = await pool.getConnection();
            let sql = "update travail set scoreMoyen=?, quantiteTravail=? where mID = ? and tempsVerbe = ?";
            const [rows, fields] = await conn.execute(sql, [avg, total, mID, temps]);
            conn.release();
            return (rows);
        } catch (err) {
            console.log(err);
            throw err;
        }
    },

    async addOneMemTemp(mID, temps){
        try{
            let conn = await pool.getConnection();
            let sql = "insert into travail value (?,?,0,0)";
            const [rows, fields] = await conn.execute(sql, [mID, temps]);
            conn.release();
            return (rows);
        } catch (err) {
            console.log(err);
            throw err;
        }
    }
}
