import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
// import helmet from "helmet";
import router from "./router/index.js";
import PaymentRoutes from "./router/paymentRoute.js";

const port = 4000;
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(router);

app.use("/api/payment", PaymentRoutes);

app.listen(port, () => console.log("Server run on port 4000"));
