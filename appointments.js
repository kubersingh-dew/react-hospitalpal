const conn = require("./connection");

async function addAppointments(req, res) {
    const {u_id, d_id, a_time} = req.body;
    let sql =`insert into appointments (u_id,d_id,a_time) VALUES(?, ?, ?)`;
    let values = [u_id, d_id, a_time];
    conn.query(sql, values, (err, results) => {
        if (err) {
          console.error('Error executing SQL query:', err);
          res.status(500).send('Internal Server Error');
          return;
        }
        res.status(201).json({ message: 'Appointment Done' });
    });
}

async function getAppointments(req, res) {
    const {u_id} = req.query;
    let sql =`select a.*,d.* from appointments a LEFT JOIN doctors d ON a.d_id=d.id WHERE u_id=? ORDER BY a_time desc`;
    let values = [u_id];
    conn.query(sql, values, (err, results) => {
        if (err) {
          console.error('Error executing SQL query:', err);
          res.status(500).send('Internal Server Error');
          return;
        }
        res.status(200).json(results);
    });
}



module.exports = {
    addAppointments: addAppointments,
    getAppointments: getAppointments,
}