// const express = require("express");
// const dotenv = require("dotenv");
// const cors = require("cors");



// const connectDB =
//     require("./config/db");

// const authRoutes =
//     require("./routes/authRoutes");

// const studentRoutes =
//     require(
//         "./routes/studentRoutes"
//     );    

// const teacherRoutes =
//     require(
//         "./routes/teacherRoutes"
//     );

// const adminRoutes =
//     require(
//         "./routes/adminRoutes"
//     );    

// dotenv.config();

// connectDB();

// const app = express();

// app.use(cors());

// app.use(express.json());

// app.use(express.urlencoded({
//     extended: true
// }));

// app.use(
//     "/api/auth",
//     authRoutes
// );

// app.use(
//     "/api/student",
//     studentRoutes
// );

// app.use(
//     "/uploads",
//     express.static(
//         "uploads"
//     )
// );

// app.use(
//     "/api/teacher",
//     teacherRoutes
// );

// app.use(
//     "/api/admin",
//     adminRoutes
// );



// app.get("/", (req, res) => {

//     res.json({
//         success: true,
//         message:
//             "School Management API Running"
//     });

// });

// const PORT =
//     process.env.PORT || 5000;

// app.listen(PORT, () => {

//     console.log(
//         `Server Running On Port ${PORT}`
//     );

// });


const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const cors = require("cors");

const connectDB =
    require("./config/db");

const authRoutes =
    require("./routes/authRoutes");

const studentRoutes =
    require("./routes/studentRoutes");

const teacherRoutes =
    require("./routes/teacherRoutes");

const adminRoutes =
    require("./routes/adminRoutes");

const admissionRoutes =
    require(
        "./routes/admissionRoutes"
    );    

connectDB();

const app = express();

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({
    extended: true
}));

app.use(
    "/api/auth",
    authRoutes
);

app.use(
    "/api/student",
    studentRoutes
);

app.use(
    "/uploads",
    express.static("uploads")
);

app.use(
    "/api/teacher",
    teacherRoutes
);

app.use(
    "/api/admin",
    adminRoutes
);

app.use(
    "/api/admissions",
    admissionRoutes
);

app.get("/", (req, res) => {

    res.json({
        success: true,
        message:
            "School Management API Running"
    });

});

const PORT =
    process.env.PORT || 5000;

app.listen(PORT, () => {

    console.log(
        `Server Running On Port ${PORT}`
    );

});