import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

import { DataService } from './data.service';

@Controller('data')
export class DataController {
    constructor(private dataService: DataService) {}

    @Get('/:sondeId')
    @ApiOperation({
        summary: 'Get reported data by sonde id',
        description:
            'This endpoint returns all reported data reported by particular sonde.',
    })
    getData(@Param('sondeId') id: string) {
        return this.dataService.getSondeData(id);
    }
}
