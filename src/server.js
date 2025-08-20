import express from "express"; //nap express
import bodyParser from "body-parser"; //nap body-parser lay tham so tu client /user?id=7
import viewEngine from "./config/viewEngine"; //nap viewEngine
import initWebRoutes from "./routes/web"; //nap router
import connectDB from "./config/configdb";
require('dotenv').config(); //goi ham config cua dotenv de chay lenh process.env.PORT

let app = express();

//config app
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
viewEngine(app);
initWebRoutes(app);
connectDB();

let port = process.env.PORT || 6969; //tao tham so port lay tu .env
//Port === undefined => port = 6969
//chay server
app.listen(port, () => {
//callback
    console.log("Backend Nodejs is runing on the port : " + port)
});
