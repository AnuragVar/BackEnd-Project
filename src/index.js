import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";

dotenv.config({
  path: "./.env",
});

const port = process.env.PORT || 8000;
connectDB()
  .then(() => {
    app.on("error", (error) => {
      console.log("ERRR: ", error);
      throw new Error();
    });
    app.listen(port);
  })
  .catch((err) => {
    console.log("MONGO DB connection failed ", err);
  });
/*
const app = express();
(async()=>{
   try{ 
    await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
    
    app.on("errror",(error)=>{
        console.log("ERRR: ",error);
        throw new Error();
    })
    app.listen(process.env.PORT,()=>{
        console.log(`App is listening on port ${process.env.PORT}`);
    })
    }
    catch(error){
        console.error("Error in connecting Database",error)
        throw error
        //OR process exit(1);
    }

})()
*/

// async await letting database is in another continent

// try catch for error handling

//node give reference to the current process
//whenever you are dealing with database ,use try and catch and async and await

//do not attach database in only one line
// we mainly do it in IIFE using async await and try and catch
// we mainly place ; in front of IIFE , so as to place it if not placed in code above it

//dotenv express and mongoose is always needed

//better to put all connection code of db in another file and calling it in index.js

//in proffesional codes , we write console.log("Something known..") in error statements , to get knowledge of place of error

//manyatimes you need to put .js extension also while importing the functions or constants in your file

//you should not put additional / in the url given by mongoDB placed in environmental variable file

// if error is Cannot find module .children..........
// 1 first check your import statements
// 2. then check for the value of constants(in another file) ,url that was imported from another file

//firstly we connect our database with index.js

//read about
/*
mongoose
express
mongoDB
process.exit(1);
connectionInstance
*/
