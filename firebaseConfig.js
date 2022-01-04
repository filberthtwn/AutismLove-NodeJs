const fa = require("firebase-admin");
require("firebase/auth");
const serviceAccount = require("./serviceAccountKey.json");
const app = fa.initializeApp({
    credential: fa.credential.cert(serviceAccount),
    databaseURL: "https://biock-71c59-default-rtdb.firebaseio.com/",
});
module.exports = app;