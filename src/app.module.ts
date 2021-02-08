import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LgpdModule } from './lgpd/lgpd.module';

@Module({
  imports: [LgpdModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
