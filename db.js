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

// e.target.files[0]
