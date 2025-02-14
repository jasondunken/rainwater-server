import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiBody, ApiOperation } from '@nestjs/swagger';

import { SondeService } from './sonde.service';

import {
    AddSondeDTO,
    AddSondeSensorDTO,
    SondeRegistrationDTO,
    SondeReportDTO,
} from 'src/models/sonde.model';

@Controller('sondes')
export class SondeController {
    constructor(private sondeService: SondeService) {}

    @Post()
    @ApiOperation({
        summary: 'Add a sonde',
        description: 'This endpoint adds a sonde to the db.',
    })
    @ApiBody({ type: AddSondeDTO })
    addSonde(@Body() sonde: AddSondeDTO) {
        this.sondeService.addSonde(sonde);
        return ['sonde added!'];
    }

    @Post('/register')
    @ApiOperation({
        summary: 'Register a sonde',
        description:
            'This endpoint is used by a sonde to register itself with the system.',
    })
    @ApiBody({ type: SondeRegistrationDTO })
    registerSonde(@Body() sonde: SondeRegistrationDTO) {
        this.sondeService.registerSonde(sonde);
        return ['sonde registered!'];
    }

    @Post('/sensors')
    @ApiOperation({
        summary: 'Add a sensor to a sonde',
        description:
            "This endpoint adds a sensor to a sonde's list of sensors.",
    })
    @ApiBody({ type: AddSondeSensorDTO })
    addSensor(@Body() addInfo: AddSondeSensorDTO) {
        return this.sondeService.addSondeSensor(addInfo);
    }

    @Get('/sensors')
    @ApiOperation({
        summary: 'Get available sensors',
        description:
            'This endpoint returns an object of available and default sensors.',
    })
    getSensors() {
        return this.sondeService.getSensors();
    }

    @Get('/sensors/:id')
    @ApiOperation({
        summary: 'Get installed sensors',
        description:
            'This endpoint returns a list of non default sensors installed in a sonde.',
    })
    getInstalledSensors(@Param('id') id: string) {
        return this.sondeService.getInstalledSensors(id);
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
