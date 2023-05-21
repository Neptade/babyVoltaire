pool = require("../db.js")

module.exports = {
    async getAllMembers(){ // TODO? move to brands.repository.js
        try {
            let conn = await pool.getConnection();
            let sql = "SELECT mID, email FROM membres";
            const [rows, fields] = await conn.execute(sql);
            conn.release();
            return rows;
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    },


    async getMemberData(mID){
        try{
            let conn = await pool.getConnection();
            let sql = "select email, tempsVerbe, scoreMoyen, quantiteTravail from membres join travail on membres.mID = travail.mID where membres.mID = ?";
            const [rows, fields] = await conn.execute(sql,[mID]);
            conn.release();
            return rows;
        } 
        catch (err) {
            console.log(err);
            throw err;
        }
    }
}