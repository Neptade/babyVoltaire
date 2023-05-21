pool = require("../db.js")

module.exports = {
    async getAllMembers(){
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

    async getOneMembre(mID){
        try{
            let conn = await pool.getConnection();
            let sql = "select mID, email from membres where mID = ?";
            const [rows, fields] = await conn.execute(sql,[mID]);
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
            let sql = "select membres.mID, email, tempsVerbe, scoreMoyen, quantiteTravail from membres join travail on membres.mID = travail.mID where membres.mID = ?";
            const [rows, fields] = await conn.execute(sql,[mID]);
            conn.release();
            return rows;
        } 
        catch (err) {
            console.log(err);
            throw err;
        }
    },

    async areValidCredentials(username, password) {
        try {
          let conn = await pool.getConnection();
          let sql = "SELECT email FROM membres WHERE email = ? AND password COLLATE utf8mb4_general_ci  = sha2(?, 224) COLLATE utf8mb4_general_ci "; //for now no salt
          // TODO: better salt+pw hash - COLLATE usually not needed
          const [rows, fields] = await conn.execute(sql, [username, password]);
          conn.release();
          if (rows.length == 1 && rows[0].email == username) {
            return true;
          } else {
            return false;
          }
        } catch (err) {
          console.log(err);
          throw err;
        }
      },

      async getOneMemberByEmail(email){
        try{
            let conn = await pool.getConnection();
            let sql = "select mID, email from membres where email = ?";
            const [rows, fields] = await conn.execute(sql,[email]);
            conn.release();
            return rows;
        } 
        catch (err) {
            console.log(err);
            throw err;
        }
    },
}