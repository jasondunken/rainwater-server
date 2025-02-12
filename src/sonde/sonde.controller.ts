import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiBody, ApiOperation } from '@nestjs/swagger';

import { SondeService } from './sonde.service';

import {
    AddSondeSensorDTO,
    SondeRegistrationDTO,
    SondeReportDTO,
} from 'src/models/sonde.model';

@Controller('sondes')
export class SondeController {
    constructor(private sondeService: SondeService) {}

    @Post('/register')
    @ApiOperation({
        summary: 'Register a sonde',
        description: 'This endpoint registers a sonde with the system.',
    })
    @ApiBody({ type: SondeRegistrationDTO })
    registerSonde(@Body() sonde: SondeRegistrationDTO) {
        this.sondeService.registerSonde(sonde);
        return ['sonde registered!'];
    }

    @Post('/sensor')
    @ApiOperation({
        summary: 'Add a sensor to a sonde',
        description:
            "This endpoint adds a sensor to a sonde's list of sensors.",
    })
    @ApiBody({ type: AddSondeSensorDTO })
    addSensor(@Body() addInfo: AddSondeSensorDTO) {
        this.sondeService.addSondeSensor(addInfo);
        return ['sensor added!'];
    }

    @Get('/sensors')
    @ApiOperation({
        summary: 'Get available sensors',
        description: 'This endpoint returns a list of available sensors.',
    })
    getSensors() {
        return this.sondeService.getAvailableSensors();
    }

    @Post('/report')
    @ApiOperation({
        summary: 'Report new data',
        description: 'This endpoint stores sonde data report in the db.',
    })
    @ApiBody({ type: SondeReportDTO })
    addData(@Body() report: SondeReportDTO) {
        this.sondeService.addData(report);
        return ['some data was received! thanks for the data!'];
    }
}
