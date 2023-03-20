const db = require("./db");
const { v4: uuid4 } = require("uuid");

/*

User Model:

  id TEXT PRIMARY KEY,
  username TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
	avatar TEXT NOT NULL,
  isAdmin BOOLEAN DEFAULT 0

*/

class User {
  constructor(username, email, password) {
    this.username = username;
    this.email = email;
    this.password = password;
    this.avatar = `https://api.dicebear.com/5.x/thumbs/svg?seed=${username
      .split(" ")
      .join("")}`;
  }

  // create a new user
  static create(newUser, callback) {
    const id = uuid4();

    const query = `
    INSERT INTO users (id, username, email, password, avatar)
    VALUES (?, ?, ?, ?, ?)
    returning *;`;

    db.run(
      query,
      [id, newUser.username, newUser.email, newUser.password, newUser.avatar],
      function (err) {
        if (err) {
          return callback(err);
        }
        return callback(null);
      }
    );
  }

  // find a user by email
  static findByEmail(email, callback) {
    const query = `
    SELECT * FROM users
    WHERE email = ?;`;

    db.get(query, [email], function (err, row) {
      if (err) {
        return callback(err, null);
      }

      return callback(null, row);
    });
  }

  // find a user by id
  static findById(id, callback) {
    const query = `
    SELECT * FROM users
    WHERE id = ?;`;

    db.get(query, [id], function (row, err) {
      if (err) {
        return callback(err, null);
      }
      return callback(null, row);
    });
  }

  // toggle admin status of a user
  static toggleAdmin(id, callback) {
    const query = `
    UPDATE users
    SET isAdmin = NOT isAdmin
    WHERE id = ?;`;

    db.run(query, [id], function (err) {
      if (err) {
        return callback(err);
      }
      return callback(null);
    });
  }

  // delete a user by id
  static delete(id, callback) {
    const query = `
    DELETE FROM users
    WHERE id = ?;`;

    db.run(query, [id], function (err) {
      if (err) {
        return callback(null, err);
      }
      return callback(this, null);
    });
  }
}

module.exports = User;
