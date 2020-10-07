const spicedPg = require("spiced-pg");

const db = spicedPg(
    process.env.DATABASE_URL ||
        "postgres:postgres:postgres@localhost:5432/socialnetwork"
);

module.exports.createUser = (first, last, email, password) => {
    const q = `
    INSERT into users (first, last, email, password)
        values ($1, $2, $3, $4) 
    RETURNING *`;
    const params = [first, last, email, password];
    return db.query(q, params);
};

module.exports.loginUser = (email, hashedPw) => {
    const q = `
    SELECT * FROM users 
    WHERE id = $1`;
    const params = [email, hashedPw];
    return db.query(q, params);
};

module.exports.getUserPw = (email) => {
    const q = `
    SELECT password, id 
    FROM users 
    WHERE email = $1`;
    const params = [email];
    return db.query(q, params);
};

module.exports.updateUserPw = (email, password) => {
    const q = `
    UPDATE users
    SET password = $2
    WHERE email = $1
    RETURNING *
    `;
    const params = [email, password];
    return db.query(q, params);
};

module.exports.getResetCode = (email) => {
    const q = `
    SELECT * FROM password_reset_codes
    WHERE LOWER(email) = LOWER($1)
    AND CURRENT_TIMESTAMP - created_at < INTERVAL '10 minutes'
    ORDER BY created_at DESC
    LIMIT 1;`;
    const params = [email];
    return db.query(q, params);
};

module.exports.addResetCode = (email, resetCode) => {
    const q = `
    INSERT INTO password_reset_codes (email, code)
    values ($1, $2)
    `;
    const params = [email, resetCode];
    return db.query(q, params);
};

module.exports.updateUserImage = (id, imageUrl) => {
    const q = `
    UPDATE users
    SET image_url = $2
    WHERE id = $1
    RETURNING *
    `;
    const params = [id, imageUrl];
    return db.query(q, params);
};

module.exports.updateUserBio = (id, bio) => {
    const q = `
    UPDATE users
    SET bio = $2
    WHERE id = $1
    RETURNING bio`;
    const params = [id, bio];
    return db.query(q, params);
};

module.exports.getUserById = (id) => {
    const q = `
    SELECT * 
    FROM users
    WHERE id = $1`;
    const params = [id];
    return db.query(q, params);
};

// e.target.files[0]

module.exports.findUsersByIncrement = (val) => {
    return db.query(
        `SELECT id,first,last,image_url FROM users WHERE first ILIKE $1 OR last ILIKE $1;`,
        [val + "%"]
    );
};

module.exports.findMostRecentUsers = () => {
    return db.query(`
      SELECT * FROM users ORDER BY id DESC LIMIT 3;
    `);
};

module.exports.findFriendshipStatus = (userId, otherUserId) => {
    const q = `
    SELECT * FROM friendships
    WHERE (recipient_id = $1 AND sender_id = $2)
    OR (recipient_id = $2 AND sender_id = $1);`;
    const params = [userId, otherUserId];
    return db.query(q, params);
};

module.exports.insertNewFriendRequest = (userId, otherUserId) => {
    const q = `
    SELECT * FROM friendships
    WHERE (recipient_id = $1 AND sender_id = $2)
    OR (recipient_id = $2 AND sender_id = $1);`;
    const params = [userId, otherUserId];
    return db.query(q, params);
};

module.exports.updateFriendshipStatus = (userId, otherUserId) => {};

module.exports.removeFriendship = (userId, otherUserId) => {};
