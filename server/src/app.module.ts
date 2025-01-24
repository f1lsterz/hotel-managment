import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { UserModule } from "./user/user.module";
import { RoomModule } from "./room/room.module";
import { BookingModule } from "./booking/booking.module";
import { PaymentModule } from "./payment/payment.module";
import { ReviewModule } from "./review/review.module";
import { NotificationModule } from "./notification/notification.module";
import { ReportModule } from "./report/report.module";
import { ChatModule } from "./chat/chat.module";
import { ConfigModule } from "@nestjs/config";
import config from "./config/config";

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
      isGlobal: true,
    }),
    AuthModule,
    UserModule,
    RoomModule,
    BookingModule,
    PaymentModule,
    ReviewModule,
    NotificationModule,
    ReportModule,
    ChatModule,
  ],
})
export class AppModule {}
