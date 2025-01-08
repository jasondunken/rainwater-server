import { Body, Controller, Get, Post } from '@nestjs/common';

import { LocationService } from './location.service';
import { MapLocation } from '../../../../rainwater-types/site.model';

@Controller('location')
export class LocationController {
    constructor(private locationService: LocationService) {}

    @Get('/test-locations')
    getTestData() {
        return this.locationService.getLocations();
    }

    @Post('/')
    addNewLocation(@Body() location: MapLocation) {
        this.locationService.addNewLocation(location);
        return this.locationService.getLocations();
    }
}
