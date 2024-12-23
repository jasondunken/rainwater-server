import { Controller, Get } from '@nestjs/common';

import { LocationService } from './location.service';

@Controller('location')
export class LocationController {
    constructor(private locationService: LocationService) {}

    @Get('/test-locations')
    getTestData() {
        return this.locationService.getLocations();
    }
}
