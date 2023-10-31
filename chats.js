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
          res.status(500).send('Internal Server Error');
          return;
        }
        res.status(201).json({ message: 'chat Sent' });
    });
}

async function getAllUserChats(req, res) {
    const {u_id} = req.query;
    let sql =`select c.*,d.name, d.img from chats c left join doctors d on c.d_id=d.id WHERE
     c.u_id=? GROUP by c.d_id order by c.created_at desc`;
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

async function getChat(req, res) {
    const {u_id, d_id} = req.query;
    let sql =`select * from chats WHERE u_id=? AND d_id=?`;
    let values = [u_id, d_id];
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
    addChat: addChat,
    getChat: getChat,
    getAllUserChats: getAllUserChats,
}