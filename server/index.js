

// const express = require("express");
// const app = express();

// const cookieParser = require("cookie-parser");
// const cors = require("cors");
// const fileUpload = require("express-fileupload");
// const dotenv = require("dotenv");

// const { cloudinaryConnect } = require("./config/cloudinary");
// const database = require("./config/database");

// // Routes
// const userRoutes = require("./routes/User");
// const profileRoutes = require("./routes/Profile");
// const paymentRoutes = require("./routes/Payments");
// const courseRoutes = require("./routes/Course");
// const contactUsRoute = require("./routes/Contact");

// // Load env variables
// dotenv.config();
// const PORT = process.env.PORT || 4000;

// // Connect to DB
// database.connect();

// // Middlewares
// app.use(express.json());
// app.use(cookieParser());


// const allowedOrigins = [
//   "http://localhost:3000", // local dev
//   "https://studynotion-4dre.vercel.app", // ✅ your deployed frontend domain (no trailing slash)
//   "https://studynotion-4dre-5kxv8njuz-susmita-singhs-projects.vercel.app" // ✅ also include if you're still using default vercel URL
// ];


// app.use(
//   cors({
//     origin: function (origin, callback) {
//       // allow requests with no origin (like mobile apps or curl)
//       if (!origin || allowedOrigins.includes(origin)) {
//         callback(null, true);
//       } else {
//         callback(new Error("Not allowed by CORS"));
//       }
//     },
//     credentials: true, // allow cookies and auth headers
//   })
// );
// // app.use(
// //   cors({
// //     origin: "http://localhost:3000", // allow frontend
// //     credentials: true,               // allow cookies if needed
// //   })
// // );

// app.use(
//   fileUpload({
//     useTempFiles: true,
//     tempFileDir: "/tmp",
//   })
// );

// // Cloudinary
// cloudinaryConnect();

// // Routes
// app.use("/api/v1/auth", userRoutes);
// app.use("/api/v1/profile", profileRoutes);
// app.use("/api/v1/course", courseRoutes);
// app.use("/api/v1/payment", paymentRoutes);
// app.use("/api/v1/reach", contactUsRoute);

// // Default route
// app.get("/", (req, res) => {
//   res.json({
//     success: true,
//     message: "Your server is up and running....",
//   });
// });

// // Start server
// app.listen(PORT, () => {
//   console.log(`App is running at ${PORT}`);
// });






const express = require("express");
const app = express();

const cookieParser = require("cookie-parser");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");

const { cloudinaryConnect } = require("./config/cloudinary");
const database = require("./config/database");

// Routes
const userRoutes = require("./routes/User");
const profileRoutes = require("./routes/Profile");
const paymentRoutes = require("./routes/Payments");
const courseRoutes = require("./routes/Course");
const contactUsRoute = require("./routes/Contact");

// ✅ Load env variables first
dotenv.config();
const PORT = process.env.PORT || 4000;

// ✅ Connect to DB
database.connect();

// ✅ Middlewares (ORDER IS IMPORTANT)

// 1. File upload (before express.json)
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp",
  })
);

// 2. Parse JSON
app.use(express.json());

// 3. Parse cookies
app.use(cookieParser());

// 4. CORS
const allowedOrigins = [
  "http://localhost:3000",
  "https://studynotion-4dre.vercel.app",
  "https://studynotion-4dre-5kxv8njuz-susmita-singhs-projects.vercel.app"
];
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// ✅ Cloudinary connect
cloudinaryConnect();

// ✅ Routes
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/reach", contactUsRoute);

// ✅ Default route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Your server is up and running....",
  });
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`App is running at ${PORT}`);
});
