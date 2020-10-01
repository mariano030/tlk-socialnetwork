// asyn functions

// await can only be used in asynchronous functions
// await PAUSES the function right there where it is used
// function stops running UNTIL the promise is resolved

// rejected problems will throw an actual exception
// they can be handled with try { } catcht (e) {

// if you put everything into an async iffe so you can
// use await

app.get("/user", async (req, res) => {
    try {
        a;
    } catch (e) {}
});

class App extends React.Component {
    async componenentDidMount() {
        const { data } = axios.get("/user");
        this.setState(data);
    }
}

app.post("/profile/edit", (req, res) => {
    db.updateUser(req.body);
    db.upserteProfil(req.body);
});

// beware of doing await multiple times after another
// whithout need

const q1 = db.updateUser(req.body);
const q2 = db.upsertProfile(req.body);
await q1;
await q2;

const [q1, q2] = await Promise.all([
    db.updateUesr(req.body),
    db.upsertProfile(req.body),
]);
