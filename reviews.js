const conn = require("./connection");

async function addReview() {
    const {u_id, d_id, rating, comment} = req.body;
    let sql =`insert into reviews (u_id,d_id,rating,comments) VALUES(?, ?, ?, ?)`;
    let values = [u_id, d_id, rating, comment];
    conn.query(sql, values, (err, results) => {
        if (err) {
          console.error('Error executing SQL query:', err);
          res.status(500).send('Internal Server Error');
          return;
        }
        res.status(201).json({ message: 'Message Sent' });
    });
}

async function getDoctorReview() {
    const {d_id} = req.query;
    let sql =`select * from reviews WHERE d_id=?`;
    let values = [d_id];
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
    addReview: addReview,
    getDoctorReview: getDoctorReview,
}
