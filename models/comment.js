const db = require("./db");

/*

Comment Model:

  id INTEGER PRIMARY KEY AUTOINCREMENT,
  content TEXT NOT NULL,
  author_id INTEGER NOT NULL,
  post_id INTEGER NOT NULL,
  FOREIGN KEY (author_id) REFERENCES users (id),
  FOREIGN KEY (post_id) REFERENCES posts (id)
  
*/

class Comment {
  constructor(id, text, userId, postId) {
    this.id = id;
    this.text = text;
    this.userId = userId;
    this.postId = postId;
  }

  static create(newComment, callback) {
    const query = `
    INSERT INTO comments
    (text, user_id, post_id)
    VALUES (?, ?, ?);`;
    const params = [newComment.text, newComment.userId, newComment.postId];

    db.run(
      query,
      params,
      function (err) {
        if (err) {
          return callback(null, err);
        }
        return callback(this, null);
      }
    );

    db.close();
  }

  static getAllByPostId(callback) {
    const query = `
    SELECT * FROM comments WHERE post_id = ?;`;

    db.all(
      query,
      [this.postId],
      (err, rows) => {
        if (err) {
          return callback(null, err);
        }
        return callback(rows, null);
      }
    )

    db.close();
  }

  static deleteById(id, callback) {
    const query = `
    DELETE FROM comments WHERE id = ?;`;

    db.run(
      query,
      [id],
      (err) => {
        if (err) {
          return callback(null, err);
        }
        return callback(true, null);
      }
    )

    db.close();
  }


}


module.exports = Comment;