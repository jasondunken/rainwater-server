import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';

import { SondeService } from './sonde.service';

import { Sonde } from './sonde.entity';

@Controller('sonde')
export class SondeController {
    constructor(private sondeService: SondeService) {}

    @Post('/register')
    @ApiBody({ type: Sonde })
    registerSonde(@Body() sonde: any) {
        console.log('register: ', sonde);
        this.sondeService.registerSonde(sonde);
        return ['sonde registered!'];
    }

    @Post('/report')
    addData(@Body() data: any) {
        console.log('data: ', data);
        this.sondeService.addData(data);
        return ['some data was received! thanks for the data!'];
    }
}
