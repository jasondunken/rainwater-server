import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOperation } from '@nestjs/swagger';

import { SondeService } from './sonde.service';

import { Sonde, SondeReport } from './sonde.entity';

@Controller('sondes')
export class SondeController {
    constructor(private sondeService: SondeService) {}

    @Post('/register')
    @ApiOperation({
        summary: 'Register a sonde',
        description: 'This endpoint registers a sonde.',
    })
    @ApiBody({ type: Sonde })
    registerSonde(@Body() sonde: Sonde) {
        this.sondeService.registerSonde(sonde);
        return ['sonde registered!'];
    }

    @Post('/report')
    @ApiOperation({
        summary: 'Report new data',
        description: 'This endpoint stores sonde data in the db.',
    })
    @ApiBody({ type: SondeReport })
    addData(@Body() data: any) {
        this.sondeService.addData(data);
        return ['some data was received! thanks for the data!'];
    }
}
