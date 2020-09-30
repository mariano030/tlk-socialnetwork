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
    const params = { userId };
    return db.query(q, params);
};
