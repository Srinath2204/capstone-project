const express = require("express");
const dbConfig = require("./src/config/db.config");
const db = require("./src/models");


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const connectDB = async () => {
    try {
        await db.mongoose.
            connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            });
        console.log("Successfully connected to Database");
    } catch (error) {
        console.error("Error occurred while connecting to Database", error);
        process.exit();
    }
};
connectDB();

require("./src/routes/auth.routes")(app);
require("./src/routes/book.routes")(app);

const PORT = process.env.port || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port : http://localhost:${PORT}`);

})