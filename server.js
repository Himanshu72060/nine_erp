const express =
    require("express");

const http =
    require("http");

const { Server } =
    require("socket.io");

const dotenv =
    require("dotenv");

const cors =
    require("cors");

dotenv.config();

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
    require("./routes/admissionRoutes");

const liveClassRoutes =
    require("./routes/liveClassRoutes");

const feeStructureRoutes =
    require("./routes/feeStructureRoutes");

const feeReportRoutes =
    require("./routes/feeReportRoutes");

const chatRoutes =
    require("./routes/chatRoutes");

const reportCardRoutes =
    require(
        "./routes/reportCardRoutes"
    );    


// DATABASE

connectDB();


// EXPRESS APP

const app =
    express();


// HTTP SERVER

const server =
    http.createServer(app);


// SOCKET.IO

const io =
    new Server(server, {

        cors: {
            origin: "*",
            methods: [
                "GET",
                "POST"
            ]
        }

    });

require(
    "./socket/socket"
)(io);


// MIDDLEWARE

app.use(cors());

app.use(express.json());

app.use(
    express.urlencoded({
        extended: true
    })
);


// STATIC

app.use(
    "/uploads",
    express.static(
        "uploads"
    )
);


// ROUTES

app.use(
    "/api/report-cards",
    reportCardRoutes
);

app.use(
    "/api/auth",
    authRoutes
);

app.use(
    "/api/student",
    studentRoutes
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

app.use(
    "/api/live-classes",
    liveClassRoutes
);

app.use(
    "/api/fee-structures",
    feeStructureRoutes
);

app.use(
    "/api/fee-reports",
    feeReportRoutes
);

app.use(
    "/api/chat",
    chatRoutes
);


// HOME ROUTE

app.get(
    "/",
    (req, res) => {

        res.json({

            success: true,

            message:
                "School Management API Running"

        });

    }
);


// START SERVER

const PORT =
    process.env.PORT || 5000;

server.listen(
    PORT,
    () => {

        console.log(
            `Server Running On Port ${PORT}`
        );

    }
);