const express = require("express");
const dbConfig = require("./src/config/db.config");
const db = require("./src/models");
const Role = db.role;

const app = express();

const { connectRedis } = require("./src/utils/redisClient");

const connectRedisDB = async () => {
  await connectRedis();
}
connectRedisDB();

global.__basedir = __dirname;
require('dotenv').config();
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

const setInitialRolesInDB = async () => {
    try {
        const count = await Role.estimatedDocumentCount();
        if(count === 0){
            await new Role({ name: "Admin" }).save();
            console.log("'Admin' role created successfully");

            await new Role({ name: "User" }).save();
            console.log("'User' role created successfully");
        }
    } catch (error) {
        console.error("Error in setting initial roles:", error);
    }
}
connectDB();
setInitialRolesInDB();

require("./src/routes/auth.routes")(app);
require("./src/routes/book.routes")(app);
require("./src/routes/review.routes")(app);
require("./src/routes/admin.routes")(app);
require("./src/routes/file.routes")(app);

const PORT = process.env.port || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port : http://localhost:${PORT}`);

})