import { Controller, Get, Param, Query } from '@nestjs/common';

import { DataService } from './data.service';

@Controller('data')
export class DataController {
    constructor(private dataService: DataService) {}

    @Get('/')
    getSimulatedRealtimeData() {
        return this.dataService.getSimulatedRealtimeData();
    }

    @Get('/add-bad')
    getBadData() {
        this.dataService.addBadData();
        return ['added bad data'];
    }

    @Get('/test-data/:id')
    getTestData(@Param('id') id: string) {
        return this.dataService.getTestData(id);
    }
}
