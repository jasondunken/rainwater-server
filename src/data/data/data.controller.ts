import { Controller, Get } from '@nestjs/common';

import { DataService } from './data.service';

@Controller('data')
export class DataController {
    constructor(private dataService: DataService) {}

    @Get('/')
    getSimulatedRealtimeData() {
        return this.dataService.getSimulatedRealtimeData();
    }

    @Get('/test-data')
    getTestData() {
        return this.dataService.getTestData();
    }

    @Get('/test-data/bad')
    getBadData() {
        this.dataService.addBadData();
        return ['added bad data'];
    }
}
