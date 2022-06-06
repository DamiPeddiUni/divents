const app = require("./app.js")
const mongoose = require("mongoose")

const port = process.env.PORT || 3000

app.locals.db = mongoose.connect("mongodb+srv://DamianoPedoni:Mongo1234@supercluster.cigtt.mongodb.net/diventsDB?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true})
.then( () => {
    console.log("Connected to DB.")
    app.listen(port, () => {
        console.log("Server started.")
    })
})


