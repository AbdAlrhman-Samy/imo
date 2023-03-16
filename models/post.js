const db = require("./db");

/*

Post Model:

  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT UNIQUE NOT NULL,
  subtitle TEXT NOT NULL,
  content TEXT NOT NULL,
  author_id INTEGER NOT NULL,
  thumbnail TEXT NOT NULL,
  header TEXT NOT NULL,
  created_at DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (author_id) REFERENCES users (id)

*/

class Post {
  constructor(title, subtitle, content, authorId, thubmnail, header) {
    this.title = title;
    this.subtitle = subtitle;
    this.content = content;
    this.authorId = authorId;
    this.thumbnail = thubmnail;
    this.header = header;
  }

  static create(newPost, callback) {
    const query = `
    INSERT INTO posts 
    (title, subtitle, content, author_id, thumbnail, header)
    VALUES (?, ?, ?, ?, ?, ?);`;
    const params = [
      newPost.title,
      newPost.subtitle,
      newPost.content,
      newPost.authorId,
      newPost.thumbnail,
      newPost.header,
    ];

    db.run(query, params, function (post, err) {
      if (err) {
        return callback(null, err);
      }
      return callback(this.lastID , null);
    });
  }

  static getAll(callback) {
    const query = `
    SELECT * FROM posts;`;

    db.all(query, [], (err, rows) => {
      if (err) {
        return callback(null, err);
      }
      return callback(rows, null);
    });
  }

  static getById(id, callback) {
    const query = `
    SELECT * FROM posts WHERE id = ?;`;

    db.get(query, [id], (err, row) => {
      if (err) {
        return callback(null, err);
      }
      if (!row) {
        return callback(null, { message: "Post not found" });
      }

      return callback(row, null);
    });
  }

  static updateById(id, updatedPost, callback) {
    // convert the date to the format that sqlite accepts
    updatedPost.updated_at = new Date()
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");

    const keys = Object.keys(updatedPost);
    const values = Object.values(updatedPost);

    // dynamic set query and params so it would only update the fields
    // that are passed in the updatedPost object
    const query = `
    UPDATE posts SET 
    ${keys.map((key) => `${key} = ?`).join(", ")}
      WHERE id = ?;`;

    console.log(query);

    const params = [...values, id];

    db.run(query, params, function (err) {
      if (err) {
        return callback(null, err);
      }
      return callback(this, null);
    });
  }

  static delete(id, callback) {
    const query = `DELETE FROM posts WHERE id = ?;`;

    db.run(query, [id], function (err) {
      if (err) {
        return callback(err);
      }
      return callback(null);
    });
  }
}

module.exports = Post;