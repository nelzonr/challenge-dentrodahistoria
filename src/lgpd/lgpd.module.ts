import { Module, HttpModule } from '@nestjs/common';
import { LgpdController } from './lgpd.controller';
import { LgpdService } from './lgpd.service';

@Module({
  imports: [HttpModule],
  controllers: [LgpdController],
  providers: [LgpdService],
})
export class LgpdModule {}
