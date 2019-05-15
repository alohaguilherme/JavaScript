var conn = require('./db');

module.exports = {
    getCriancas() {
        return new Promise((resolve, reject)=>{

            conn.query(`
            
                SELECT nome, reponsavel, endereco FROM tb_criancas ORDER BY nome
            
            `, (err, results)=>{

                if (err) {
                    reject(err);
                } 
                
                resolve(results);
            
            });

        });
    }

}