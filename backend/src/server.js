import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import app from "./app.js";
import ApiResponse from "./utils/apiResponse.js";

dotenv.config();
const PORT = Number(process.env.PORT) || 5000;

app.get("/testing", (req, res) => {
  return res.status(201).json(new ApiResponse(200, "Hello dhannu"));
});

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`server is running on PORT : ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("Mongodb connection failed", error);
  });
