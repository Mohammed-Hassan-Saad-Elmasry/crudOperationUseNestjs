import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModel } from './modules/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './modules/user/user.module';
import { ProductModule } from './modules/product/product.module';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    AuthModel,
    MongooseModule.forRoot(
      'mongodb+srv://elmasry:ol320BYG7TwqWT3g@cluster0.knzr2ur.mongodb.net/CrudOperationUseNestJs?retryWrites=true&w=majority&appName=Cluster0',
    ),
    UserModule,
    ProductModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
