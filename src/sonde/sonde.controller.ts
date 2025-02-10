import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOperation } from '@nestjs/swagger';

import { SondeService } from './sonde.service';

import { Sonde, SondeReport } from './sonde.entity';
import { SondeRegistrationDTO, SondeReportDTO } from 'src/models/sonde.model';

@Controller('sondes')
export class SondeController {
    constructor(private sondeService: SondeService) {}

    @Post('/register')
    @ApiOperation({
        summary: 'Register a sonde',
        description: 'This endpoint registers a sonde.',
    })
    @ApiBody({ type: SondeRegistrationDTO })
    registerSonde(@Body() sonde: SondeRegistrationDTO) {
        this.sondeService.registerSonde(sonde);
        return ['sonde registered!'];
    }

    @Post('/report')
    @ApiOperation({
        summary: 'Report new data',
        description: 'This endpoint stores sonde data in the db.',
    })
    @ApiBody({ type: SondeReportDTO })
    addData(@Body() report: SondeReportDTO) {
        this.sondeService.addData(report);
        return ['some data was received! thanks for the data!'];
    }
}
