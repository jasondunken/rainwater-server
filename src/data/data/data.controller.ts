import { Controller, Get } from '@nestjs/common';

import { DataService } from './data.service';

@Controller('data')
export class DataController {
    constructor(private dataService: DataService) {}

    @Get('/test-data')
    getTestData() {
        return this.dataService.getTestData();
    }

    @Get('/')
    getSimulatedRealtimeData() {
        return this.dataService.getSimulatedRealtimeData();
    }
}
