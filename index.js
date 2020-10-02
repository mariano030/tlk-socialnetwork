const express = require("express");
const app = express();
const compression = require("compression");

const db = require("./db.js");
const { compare, hash } = require("./bc"); //
const cookieSession = require("cookie-session");
const csurf = require("csurf");
const { send } = require("./ses");
const bodyParser = require("body-parser");

const cryptoRandomString = require("crypto-random-string"); // for reset code
//const { json } = require("express");
const secretCode = cryptoRandomString({
    length: 2,
});

// for upload s3
const multer = require("multer");
const uidSafe = require("uid-safe"); // for random filename
const path = require("path");

const s3 = require("./s3");
const config = require("./config");

const diskStorage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, __dirname + "/uploads");
    },
    filename: function (req, file, callback) {
        uidSafe(24).then(function (uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    },
});

const uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2097152,
    },
});

// body parser
app.use(bodyParser.urlencoded({ extended: true })); // with extended:true you can hand over an object to the POST route (or any)!!!
// the extended: true specifies that the req.body object will contain values of any type instead of just strings.

app.use(express.json());

app.use(
    cookieSession({
        secret:
            process.env.SESSION_SECRET ||
            `The fat is in the fire, a fryer made of chicken wire.`,
        maxAge: 1000 * 60 * 60 * 24 * 14,
    })
);

app.use(csurf());

app.use((req, res, next) => {
    res.set("x-frame-options", "DENY");
    res.cookie("mytoken", req.csrfToken());
    next();
});

app.use(compression());
// ### info / loggin middleware
app.use(function (req, res, next) {
    console.log("### method: ", req.method, "destination", req.url);
    if (req.session) {
        console.log("req.session.id", req.session.id);
    }
    if (req.body) {
        console.log(req.body);
    }
    next();
});

if (process.env.NODE_ENV != "production") {
    app.use(
        "/bundle.js",
        require("http-proxy-middleware")({
            target: "http://localhost:8081/",
        })
    );
} else {
    app.use("/bundle.js", (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}

app.use(express.static("public"));

//// ### POST ++++ ROUTES
app.post("/uploader", (req, res) => {
    console.log();
    res.sendStatus(200);
});

app.post("/password/reset/start", (req, res) => {
    console.log("reset route hit");
    console.log("req.body", req.body);
    const secretCode = cryptoRandomString({
        length: 6,
    });

    const { email } = req.body;
    db.addResetCode(email, secretCode)
        .then((result) => {
            console.log("email & reset code added to db");
            console.log("RESET CODE IS", secretCode);
            /////////// CHANGE AFTER TESTING EMAIL VARIABLE
            send(
                "mail@marianheidbreder.de",
                "confirmation code for password reset",
                secretCode
            ).then(
                res.json({
                    success: true,
                })
            );
        })
        .catch(console.log("could not add RestCode to db or snd mail"));
});

app.post("/profile", uploader.single("file"), s3.upload, async (req, res) => {
    console.log("req.body", req.body);
    const imageUrl = req.body.file;
    try {
        const imageRows = await db.updateUserImage(req.session.id, imageUrl);
        res.json(imageRows[0]);
    } catch (err) {
        console.log(err);
        res.json({ error: true });
    }
});

app.post("/password/reset/code", async (req, res) => {
    console.log("/password/reset/code route hit");
    console.log("req.body", req.body);
    //const q1 = db.getResetCode(req.body.email);
    try {
        const { rows } = await db.getResetCode(req.body.email);
        console.log("code obtaines from db");
        console.log("rows[0].code", rows[0].code);
        console.log("rows[0].code", rows[0].code);
        console.log("req.body.code", req.body.code);
        if (rows[0].code == req.body.code) {
            console.log("correct code entered!");
            hash(req.body.newPass)
                .then((hashedPw) => {
                    db.updateUserPw(req.body.email, hashedPw)
                        .then((result) => {
                            console.log("pw updated");
                            if (result.rows.length > 0) {
                                console.log("result.rows.length > 0");
                                res.json({ display: 3 });
                            } else {
                                console.log("!result.rows.length > 0");
                            }
                        })
                        .catch((err) => console.log(err));
                })
                .catch((err) => console.log(err));
        } else {
            console.log("else part");
            res.json({ display: 2, error: "Incorect Code: Please try again!" });
        }
    } catch (e) {
        console.log(e);
        res.json({ success: false });
    }
});

app.post("/login", (req, res) => {
    console.log("login route hit!");
    console.log("req.body::", req.body);
    console.log("checking condition");
    const { email, password } = req.body;
    if (!email || !password) {
        console.log("no email or password entered");
        //
        res.json({
            success: false,
            error: "please enter a vaild email and password data",
        });
    } else {
        console.log("@what?");
        db.getUserPw(email)
            .then((result) => {
                if (result.rows.length == 0) {
                    console.log("no user found");
                    res.json({ error: false });
                } else {
                    console.log("result.rows", result.rows);
                    const { password: hashedPw } = result.rows[0];
                    console.log("hashedPw ", hashedPw);
                    console.log(result.rows[0].id);
                    compare(password, hashedPw)
                        .then((result2) => {
                            console.log(result);
                            if (result2) {
                                console.log("login successful");
                                req.session.userId = result.rows[0].id;
                                res.json({ success: true });
                            } else {
                                res.json({ success: false });
                            }
                        })
                        .catch((err) => {
                            console.log("passwords did not match ", err);
                            res.json({ success: false });
                        });
                }
            })
            .catch((err) => {
                console.log("error retriving user with email ", err);
                res.json({
                    success: false,
                    error: "please enter a vaild email and password data",
                });
            });
    }
});

app.post("/register", (req, res) => {
    console.log("req.body", req.body);
    const { first, last, email, password } = req.body;
    console.log(first, last, email, password);
    console.log("checking data for criteria");
    if (
        !password ||
        !email ||
        !first ||
        !last ||
        password.length <= 1 ||
        // !email.includes("@") ||
        // !includes(".") ||
        email.length <= 1 ||
        first.length <= 1 ||
        last.length <= 1
    ) {
        console.log("data did not meet criteria");
        res.json({ success: false });
        return;
    } else {
        hash(password)
            .then((hashedPw) => {
                // create user now
                console.log("pw hashed");
                db.createUser(first, last, email, hashedPw)
                    .then((data) => {
                        //user added
                        console.log("user added - id", data.rows[0].id);
                        // // create a session
                        req.session.userId = data.rows[0].id;
                        console.log(
                            "req.session.userId is ",
                            req.session.userId
                        );
                        res.json({ success: true });
                    })
                    .catch((err) => {
                        // problem adding user
                        //console.log("2 res", res);
                        console.log("could not add to db:", err);
                        res.json({
                            success: false,
                        });
                    });
            })
            .catch((err) => {
                // cant't hash
                console.log("error hashing pw: ", err);
                //console.log("3 res", res);
                res.json({
                    success: false,
                    error: "An error occured, please try again. Hash?",
                });
            });
    }
});

//// ### GET ++++ ROUTES

app.get("/user", async (req, res) => {
    console.log(" loading user data ");
    try {
        const { data } = await db.getUserData(req.session.id);
        res.json({ data });
    } catch (e) {
        console.log(e);
        res.json({ error: true });
    }
});

app.get("/welcome", function (req, res) {
    if (req.session.userId) {
        res.redirect("/login");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

// app.get("/login", function (req, res) {
//     if (req.session.userId) {
//         res.sendFile(__dirname + "/index.html");
//     } else {
//         res.redirect("/");
//     }
// });

// star route must be at the bottom not to overwrite the others (top route get's hit first)!!

app.get("*", function (req, res) {
    if (!req.session.userId) {
        res.redirect("/welcome");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

app.listen(8080, function () {
    console.log("I'm listening.");
});
