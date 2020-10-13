const express = require("express");
const app = express(); // returns an obj that represents the server
const compression = require("compression");
const db = require("./db.js");
const { compare, hash } = require("./bc"); //
const cookieSession = require("cookie-session");
const csurf = require("csurf");
const { send } = require("./ses");
const bodyParser = require("body-parser");

const cryptoRandomString = require("crypto-random-string"); // for reset code
const { json } = require("express");
const secretCode = cryptoRandomString({
    length: 6,
});

// for upload s3
const multer = require("multer");
const uidSafe = require("uid-safe"); // for random filename
const path = require("path");

const s3 = require("./s3");
const config = require("./config");
// const { request } = require("http");

// socket.io:

const server = require("http").Server(app); // socket.io needs unmodified server obj - but we're handing it the express app (for anything that is not socket.io related)
const io = require("socket.io")(server, { origins: "localhost:8080" }); // add your live URL here
// server has to be handed to socket.io, give it a list of origins
// after established handshake the browser creates a header with the protocol the hostname and the port
// server can reject connection due to origins - reject other ppl from other sites
// change app.listen to server.listen

// io.on("connect", (socket) => {
//     //this function will run every time a client connects
//     // socket refers to a connection
//     // every socket is one connection
//     console.log("socket with id ", socket.id, " just connected");
//     socket.emit("weclome", {
//         funy: "chicken",
//     });

//     socket.emit("someoneJoined", {
//         day: "monday",
//     });
//     socket.on("disconnect", () => {
//         console.log(`socket iwth id ${socket.id} just disconnected`);
//     });
// });
// connection / connect / disconnect

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

const cookieSessionMiddleware = cookieSession({
    secret: `Put yourself in your own shoes and stay away from all the busted pairs of timbs you don't use`,
    maxAge: 1000 * 60 * 60 * 24 * 90,
});

app.use(cookieSessionMiddleware);
io.use(function (socket, next) {
    cookieSessionMiddleware(socket.request, socket.request.res, next);
});
//// old cookie session without sockets here
// app.use(
//     cookieSession({
//         secret:
//             process.env.SESSION_SECRET ||
//             `The fat is in the fire, a fryer made of chicken wire.`,
//         maxAge: 1000 * 60 * 60 * 24 * 14,
//     })
// );
//
app.use(csurf());

app.use((req, res, next) => {
    res.set("x-frame-options", "DENY");
    res.cookie("mytoken", req.csrfToken());
    next();
});

app.use(compression());
//### info / loggin middleware
app.use(function (req, res, next) {
    console.log("### method: ", req.method, "destination", req.url);
    if (req.session) {
        console.log("req.session.userId", req.session.userId);
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

///////////////////////////////////////////////////TEXT/////////////////////

const friendshipText = [
    "Send Friend Request",
    "Unfriend",
    "Cancel Request",
    "Accept Friend Request",
];
const friendshipAction = ["request", "unfriend", "cancel", "accept"];
/// wip ---
const FIRENDSHIP_TEXT = {
    SEND: "Send Friend Request",
    UNFRIEND: "Unfriend",
    CANCEL: "Cancel Request",
    ACCEPT: "Accept Friend Request",
};

const FRIENDSHIP_ACTION = {
    SEND: "request",
    UNFRIEND: "unfriend",
    CANCEL: "cancel",
    ACCEPT: "accept",
};
////////////////////////

//////////////////////////////////////// FN() ///////////////
const checkFriendship = function (rows, userId) {
    console.log("checking friendship");
    var friendshipCase = "";
    if (rows < 1) {
        console.log("!no relation!");
        friendshipCase = 0;
        //friendshipCase = "SEND";
        console.log("send friend request");
    } else {
        console.log("rows[0].accepted", rows[0].accepted);
        if (rows[0].accepted == true) {
            console.log("rows[0].accepted == true!!");
            friendshipCase = 1;
            //friendshipCase = "UNFRIEND";
            console.log("they are friends!");
            console.log("unfriend");
        } else {
            console.log("A request is pending");
            if (rows[0].recipient_id != userId) {
                console.log("button viewer is sender");
                friendshipCase = 2;
                //friendshipCase = "CANCEL";
                console.log("cancel friend request");
            } else {
                console.log("button viewer is recipient");
                friendshipCase = 3;
                //friendshipCase = "ACCEPT";
                console.log("accept friend request");
            }
        }
    }
    const buttonText = friendshipText[friendshipCase];
    const buttonAction = friendshipAction[friendshipCase];
    return [buttonText, buttonAction];
    //    return [buttonText[friendshipCase], buttonAction[friendshipCase]];
};

///////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////// ROUTES ///////////////////////////////
/////////////////////////////////////////////////////////////////////////////
//// ### POST ++++ ROUTES

app.post("/updatebio", async (req, res) => {
    console.log(req.body);
    console.log("updatebio route hit");
    console.log(" req.body.bio: ", req.body.bio);
    try {
        const result = await db.updateUserBio(req.session.userId, req.body.bio);
        res.json(result);
    } catch (err) {
        console.log(err);
        res.json({ error: true });
    }
});

app.post("/profile", uploader.single("file"), s3.upload, async (req, res) => {
    console.log("/profile hit with      POST");
    console.log("req.body", req.body);
    console.log("req.file", req.file.filename);
    console.log(req.session.userId);
    //image_url;
    //console.log("path to file?? ", config.s3Url + req.file.filename);
    const newImageUrl = config.s3Url + req.file.filename;
    console.log("newImageUrl", newImageUrl);
    try {
        const { rows } = await db.updateUserImage(
            req.session.userId,
            newImageUrl
        );
        res.json({ imageUrl: newImageUrl });
        //console.log("IMGAE ROWWWS", imageRows.rows[0].image_url);
    } catch (err) {
        console.log(err);
        res.json({ error: true });
    }
});

///// REGISTER // LOGIN // PW RESET //////////
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
        .catch(() => {
            console.log("could not add RestCode to db or snd mail");
            res.json({ error: true });
        });
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
        res.json({ success: false, error: true });
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

app.post("/api/find-users/:searchedName", async (req, res) => {
    console.log("/api/find-users/:searchTerm hit");
    console.log("req.params", req.params.searchedName);
    console.log("userInput: ", req.params.userInput);

    try {
        const results = await db.findUsersByIncrement(req.params.searchedName);
        console.log(results.rows);
        res.json(results.rows);
    } catch (err) {
        console.log("error finding usersByIncrement", err);
        res.json({ error: true });
    }
});

app.post("/api/update-friendship/", async (req, res) => {
    console.log("UPDATE FFFFRIENDSHIP");
    //console.log(req.body);
    const userId = req.session.userId;
    const otherId = req.body.params.otherId;

    try {
        const { rows } = await db.getFriendshipStatus(userId, otherId);
        const [buttonText, buttonAction] = checkFriendship(
            rows,
            req.session.userId
        );
        //const friendshipAction = ["request", "unfriend", "cancel", "accept"]
        // switch(buttonAction[friendshipCase]) ??
        switch (buttonAction) {
            case "request":
                // insert row
                const { update0 } = await db.sendFriendshipRequest(
                    userId,
                    otherId
                );
                res.json({ buttonText: friendshipText[2] });
                break;
            case "unfriend":
            case "cancel":
                // delete row
                const { update12 } = await db.removeFriendship(userId, otherId);
                res.json({ buttonText: friendshipText[0] });
                break;
            case "accept":
                //udate accepted
                const { update3 } = await db.acceptFriendship(userId, otherId);
                res.json({ buttonText: friendshipText[1] });
                // change button text
                break;
        }
    } catch (err) {
        console.log("error update-friendship", err);
        res.json({ error: true });
    }
});

//// ### GET ++++ ROUTES

app.get("/logout", (req, res) => {
    //res.clearCookie("mytoken", { path: "/login" });
    req.session.userId = null;
    res.redirect("/");
});

app.get("/api/get-friends-list", async (req, res) => {
    console.log("getting the FRIENDS_LIST");
    console.log("it's happening!!!!!!!!!! whoo hooo");
    try {
        const { rows } = await db.getFriendsList(req.session.userId);
        console.log(rows);
        res.json({ friendsRawArr: rows });
    } catch (err) {
        console.log("error getting the friends list ", err);
        res.json({ error: true });
    }
});

app.get("/api/get-friends-list", async (req, res) => {
    try {
        const { rows } = await db.getFriendsList(req.session.userId);
        console.log(rows);
    } catch (err) {
        console.log("error getting friends-list ", err);
        res.json({ error: true }); // error message??!
    }
});

app.get("/api/friendship-status/:otherId", async (req, res) => {
    console.log("req.params.otherId", req.params.otherId);
    console.log("last console log?");
    console.log("VOILA! REQ", req.session.userId, req.params.otherId);
    const userId = req.session.userId;
    const otherId = req.params.otherId;
    try {
        const { rows } = await db.getFriendshipStatus(userId, otherId);
        //console.log("data", rows);
        const [buttonText, buttonAction] = checkFriendship(
            rows,
            req.session.userId
        );
        res.json({ buttonText: buttonText });
    } catch (err) {
        console.log("error getting friendship-status/: ", err);
    }
});

app.get("/api/recent-users/", async (req, res) => {
    console.log("getting recent users...");
    try {
        const result = await db.findMostRecentUsers();
        console.log(result.rows);
        res.json(result.rows);
        console.log("results have been sent");
    } catch (err) {
        console.log("error getting recent users ", err);
    }
});

app.get("/api/other-user/:userId", async (req, res) => {
    console.log(" loading OTHER user data for ", req.body.params);
    if (req.params.userId == req.session.userId) {
        console.log(
            "this freak is trying to have an outer body experience! it this users profile!"
        );
        res.json({ same: true });
    } else {
        try {
            console.log("db querry for userId", req.params.userId);
            const result = await db.getUserById(req.params.userId);
            //console.log("other user result ", result);
            const {
                id: userId,
                first,
                last,
                image_url: imageUrl,
                bio,
                email,
            } = result.rows[0];
            console.log("other user's data received");
            //console.log("userId: ", userId, first, last, imageUrl, email, bio);
            console.log("i got the bio, no worries", bio);
            res.json({
                first: first,
                last: last,
                imageUrl: imageUrl,
                email: email,
                userId: userId,
                bio: bio,
            });
        } catch (e) {
            console.log(e);
            res.json({ error: true });
        }
    }
});

app.get("/api/user", async (req, res) => {
    console.log(" loading user data ");
    try {
        console.log("db querry for userId", req.session.userId);
        const result = await db.getUserById(req.session.userId);
        console.log(result);
        const {
            id: userId,
            first,
            last,
            image_url: imageUrl,
            bio,
            email,
        } = result.rows[0];
        console.log("userId: ", userId, first, last, imageUrl, email, bio);
        console.log("i got the bio, no worries", bio);
        res.json({
            first: first,
            last: last,
            imageUrl: imageUrl,
            email: email,
            userId: userId,
            bio: bio,
        });
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

// changed from app.listen (express) for socket.io
server.listen(8080, function () {
    console.log("I'm listening. Starting  the rockets, with sockets");
});

// SERVER SOCKET
io.on("connection", function (socket) {
    if (!socket.request.session.userId) {
        // checking for req.session cookie userId
        return socket.disconnect(true);
    }
    console.log(`socket with the id ${socket.id} is now connected`);
    const userId = socket.request.session.userId; // thanks to new middleware setup!
    console.log("UUUUUUUUUUUUUSER ID", userId);
    //now is the time to get the last 10 msgs
    console.log("SERVER GETTING LAST 10 FROM DB:");
    db.getLastTenChatMessages().then((data) => {
        console.log("data", data.rows);
        io.sockets.emit("chatMessages", data.rows); // must be something you are listening for
    });
    socket.on("newChatMsgFromClient", async (newMsg) => {
        console.log("newChatMsgFromClient", newMsg);
        console.log("emitting...");
        try {
            console.log("newChatMsgFromClient", newMsg);
            console.log("AWAIT COMING NEXT");
            console.log("userId ", userId);
            await db.addNewChatMessage(userId, newMsg);
            console.log("userId changed?", userId);
            const newMessage = await db.getNewChatMessageUserInfo(userId);
            console.log("lastMessage from db: ", newMessage.rows);
            io.sockets.emit("newChatMsgFromServer", newMessage.rows[0]); // do stuff from below
        } catch (err) {
            console.log("error adding Chat Msg to DB", err);
        }
        // get id and image
        // now we know the message, we can add it to the
        // chat table and (send it to the others?)
        // need to look up info about the user/sender
        // create a chat object
        // EMIT chat object to Everyone
        // save image_url and other data on sockets.socket.object??
    });
    /* ... */
});

// not logged in -
