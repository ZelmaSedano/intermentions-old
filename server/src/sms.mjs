import dotenv from "dotenv";
import twilio from "twilio";

// Twilio
dotenv.config();
// test comment
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

function createTwilioClient() {
  return twilio(accountSid, authToken);
}

export default createTwilioClient;
