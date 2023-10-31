const conn = require("./connection");

async function getAllDoctors(req, res) {
    let sql =`select * from doctors`;
    conn.query(sql, (err, results) => {
        if (err) {
          console.error('Error executing SQL query:', err);
          res.status(500).send('Internal Server Error');
          return;
        }
        res.status(200).json(results);
    });
}

async function getTopDoctors(req, res) {
    let sql =`select * from doctors ORDER BY rating desc LIMIT 3`;
    conn.query(sql, (err, results) => {
        if (err) {
          console.error('Error executing SQL query:', err);
          res.status(500).send('Internal Server Error');
          return;
        }
        res.status(200).json(results);
    });
}

async function addDoctors(req, res) {
    const {name,skill,about,exp,patients,img} = req.body;
    let sql =`insert into doctors (name,skill,about,exp,patients,img) VALUES(?, ?, ?, ?, ?, ?, ?)`;
    let values = [name,skill,about,exp,patients,img];
    conn.query(sql, values, (err, results) => {
        if (err) {
          console.error('Error executing SQL query:', err);
          res.status(500).send('Internal Server Error');
          return;
        }
        res.status(201).json({ message: 'Doctor data inserted successfully' });
    });
}

async function getDoctor(req, res) {
    const {id} = req.query;
    let sql =`select * from doctors where id=?`;
    let values = [id];
    conn.query(sql, values, (err, results) => {
        if (err) {
          console.error('Error executing SQL query:', err);
          res.status(500).send('Internal Server Error');
          return;
        }
        res.status(201).json(results[0]);
    });
}


module.exports = {
    getAllDoctors: getAllDoctors,
    getTopDoctors: getTopDoctors,
    addDoctors: addDoctors,
    getDoctor: getDoctor,
}
