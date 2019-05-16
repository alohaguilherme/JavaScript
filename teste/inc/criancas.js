var conn = require('./db');

module.exports = {
    getCriancas() {
        return new Promise((resolve, reject)=>{

            conn.query(`
            
                SELECT id_crianca, nome, reponsavel, endereco,dt_nascimento FROM tb_criancas ORDER BY nome
            
            `, (err, results)=>{

                if (err) {
                    reject(err);
                } 
                
                resolve(results);
            
            });

        });
    },

    save(fields) {

        return new Promise((resolve, reject)=>{


            let query, params;
            
            if (parseInt(fields.id_crianca) > 0) {
                query = `
                    UPDATE tb_criancas
                    SET nome = ?,
                        reponsavel = ?,
                        endereco  = ?           
                    WHERE id_crianca = ?
                    `;                    
                params = [
                    fields.nome,
                    fields.reponsavel,
                    fields.endereco,                    
                    fields.id_crianca
                ];
                
            } else {

                query = `
                    INSERT INTO tb_criancas (nome, reponsavel, endereco, dt_nascimento,uf,cpf)
                    VALUES(?, ?, ?, ?,"SC","065.456.789-11")
                `;
                params = [
                    fields.name,
                    fields.responsavel,
                    fields.endereco,
                    fields.datanasc
                ];


            }
            console.log(query);
            conn.query(query,params, (err, results)=>{

                if(err){
                    reject(err);
                } else {
                    console.log(results);
                    resolve(results);
                }
            });
        });
    },

    delete(id){

        return new Promise((resolve, reject)=>{

            conn.query(`DELETE FROM tb_criancas WHERE id_crianca = ?
            `, [
                id
            ], (err, results)=>{

                if (err) {
                    reject(err);
                }else{
                    resolve(results);
                }

            });
        })

    }

}