import { Controller, Get, Param } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { LgpdResponse } from './lgpd.response';
import { LgpdService } from './lgpd.service';

@Controller('lgpd')
export class LgpdController {

    constructor(private lgpdService: LgpdService) { }

    @Get(':id')
    @ApiOkResponse({type: LgpdResponse})
    async getById(@Param('id') id: number) : Promise<any> {
        return this.lgpdService.getById(id);
    }

}
