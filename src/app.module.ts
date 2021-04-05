import { Module } from '@nestjs/common';
import {MongooseModule   } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import {ProductsModule} from './products/products.module'

@Module({
  imports: [ProductsModule, MongooseModule.forRoot('mongodb://localhost:27017/CrudDB')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

//mongodb+srv://Cebo:oniyance@cluster0.kq1no.mongodb.net/myFirstDatabase?retryWrites=true&w=majority