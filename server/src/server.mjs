// import dotenv from "dotenv";
// import Graceful from "@ladjs/graceful";
// import Bree from "bree";
import express from "express";
import mime from "mime-types";

// import twilio from "twilio";

// import affirmationsRouter from "./affirmationsRouter.mjs";
import jwtCheck from "./jwtCheck.mjs";
// 2nd API
import quoteRouter from "./quoteRouter.mjs";
import smsRouter from "./smsRouter.mjs";
import taskRouter from "./taskRouter.mjs";
import userRouter from "./userRouter.mjs";

const app = express();

// Twilio
// dotenv.config();

// const accountSid = process.env.TWILIO_ACCOUNT_SID;
// const authToken = process.env.TWILIO_AUTH_TOKEN;
// let client = twilio(accountSid, authToken);

// const phone = await db.getPhone(request.user.sub);
// response.json(tasks);

// comment
// client.messages.create({
//   body: "Howdy!",
//   from: "+12178852760",
//   to: "+12246027354",
// });
// .then(message => console.log(message.sid));

// app.use("/api/affirmations", jwtCheck, affirmationsRouter);
app.use("/api/tasks", jwtCheck, taskRouter);
app.use("/api/users", jwtCheck, userRouter);
app.use("/api/sms", jwtCheck, smsRouter);
// 2nd API
app.use("/api/quote", jwtCheck, quoteRouter);

// Do not comment out or delete this end point. The React development server won't start until it pings this end point successfully.
app.get("/api/ping", (request, response) =>
  response.json({ response: "pong" }),
);

// console.log("process.env:" + process.env?.SERVE_REACT?.toLowerCase());

if (process.env?.SERVE_REACT?.toLowerCase() === "true") {
  app.use(
    express.static("/app", {
      maxAge: "1d",
      setHeaders: (res, path) =>
        ["application/json", "text/html"].includes(mime.lookup(path)) &&
        res.setHeader("Cache-Control", "public, max-age=0"),
    }),
  );

  app.get("*", (req, res) => {
    res.sendFile("/app/index.html");
  });
}

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.info(`Example server listening at http://localhost:${port}`);
});

// const bree = new Bree({
//   jobs: [{ name: "twilio-scheduler", interval: "every 5 minutes" }],
// });
// // handle graceful reloads, pm2 support, and events like SIGHUP, SIGINT, etc.
// const graceful = new Graceful({ brees: [bree] });
// graceful.listen();
// bree.start();
// console.log("in the bottom of server.mjs");
// everything works in this file, maybe
