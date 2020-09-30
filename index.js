const express = require("express");
const app = express();
const compression = require("compression");

const db = require("./db.js");
const { compare, hash } = require("./bc"); //
const cookieSession = require("cookie-session");
const csurf = require("csurf");

// do not think we need cookie parser
// app.use(require("cookie-parser")());

//const csurf = require("csurf");
const bodyParser = require("body-parser");

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

app.use(function (req, res, next) {
    res.cookie("mytoken", req.csrfToken());
    next();
});

app.use((req, res, next) => {
    res.set("x-frame-options", "DENY");
    // res.locals.csrfToken = req.csrfToken();
    next();
});

app.use(compression());

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

app.post("/login", (req, res) => {
    console.log("req.body", req.body);
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
        db.getUserPw(email)
            .then((result) => {
                console.log("result.rows[0]", result.rows[0]);
                const { password: hashedPw, id } = result.rows[0];
                console.log("hashedPw ", hashedPw);
                compare
                    .bind(password, hashedPw)
                    .then((result) => {
                        if (result) {
                            res.json({ success: true });
                        } else {
                            res.json({ success: false });
                        }
                    })
                    .catch((err) => {
                        console.log("passwords did not match ", err);
                        res.json({ success: false });
                    });
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

// star route must be at the bottom!!

app.get("*", function (req, res) {
    if (!req.session.userId) {
        res.redirect("/welcome");
    } else {
        res.redirect("/login");
        //res.sendFile(__dirname + "/index.html");
    }
});

app.listen(8080, function () {
    console.log("I'm listening.");
});
