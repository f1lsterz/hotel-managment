import { registerAs } from "@nestjs/config";

export default registerAs("config", () => ({
  server: {
    port: parseInt(process.env.SERVER_PORT, 10) || 3000,
    url: process.env.SERVER_URL || "http://localhost",
  },
  database: {
    url:
      process.env.DATABASE_URL ||
      "mysql://root:123456@localhost:3306/hotel_management",
  },
  secret: process.env.JWT_SECRET || "hotel_to_hotel",
  signOptions: {
    expiresIn: process.env.JWT_EXPIRES || "1d",
  },
  sockets: {
    chatPort: parseInt(process.env.CHAT_PORT, 10) || 3001,
    notificationPort: parseInt(process.env.NOTIFICATION_PORT, 10) || 3002,
  },
  client: {
    url: process.env.CLIENT_URL || "http://localhost:5173",
  },
  google: {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
  },
}));
