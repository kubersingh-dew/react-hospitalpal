const conn = require("./connection");

// CREATE TABLE `chats` (
//     `id` int(5) NOT NULL,
//     `u_id` int(5) NOT NULL,
//     `d_id` int(5) NOT NULL,
//     `message` varchar(200) NOT NULL,
//     `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
//   ) ENGINE=InnoDB DEFAULT CHARSET=latin1;

async function addChat(req, res) {
    const {u_id, d_id, msg, send} = req.body;
    let sql =`insert into chats (u_id,d_id,message,send) VALUES(?, ?, ?, ?)`;
    let values = [u_id, d_id, msg, send];
    conn.query(sql, values, (err, results) => {
        if (err) {
          console.error('Error executing SQL query:', err);
          res.status(500).json({ error: 'Internal Server Error' });
          return;
        }
        res.status(201).json({ message: 'chat Sent' });
    });
}

async function getAllUserChats(req, res) {
    const {u_id} = req.query;
    let sql =`SELECT c.d_id, c.u_id, c.id AS id, c.created_at AS created_at, 
    c.send AS send, c.message AS message,
    d.name, d.img
    FROM chats c
    INNER JOIN (
    SELECT d_id, MAX(created_at) AS max_created_at
    FROM chats
    WHERE u_id = ?
    GROUP BY d_id
    ) subq ON c.d_id = subq.d_id AND c.created_at = subq.max_created_at
    LEFT JOIN doctors d ON c.d_id = d.id
    ORDER BY created_at DESC;`;
    let values = [u_id];
    conn.query(sql, values, (err, results) => {
        if (err) {
          console.error('Error executing SQL query:', err);
          res.status(500).json({ error: 'Internal Server Error' });
          return;
        }
        res.status(200).json({ message: 'Api Called Successfully', data: results });
    });
}

async function getChat(req, res) {
    const {u_id, d_id} = req.query;
    let sql =`select * from chats WHERE u_id=? AND d_id=?`;
    let values = [u_id, d_id];
    conn.query(sql, values, (err, results) => {
        if (err) {
          console.error('Error executing SQL query:', err);
          res.status(500).json({ error: 'Internal Server Error' });
          return;
        }
        res.status(200).json({ message: 'Api Called Successfully', data: results });
    });
}

module.exports = {
    addChat: addChat,
    getChat: getChat,
    getAllUserChats: getAllUserChats,
}