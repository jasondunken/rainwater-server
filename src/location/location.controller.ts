import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiBody, ApiOperation } from '@nestjs/swagger';

import { LocationService } from './location.service';

import { Location } from './location.entity';
import { CreateLocationDTO } from '../models/location.model';

@Controller('locations')
export class LocationController {
    constructor(private locationService: LocationService) {}

    @Get()
    @ApiOperation({
        summary: 'Get all locations',
        description:
            'This endpoint returns an array containing all map locations.',
    })
    getAllLocations() {
        return this.locationService.getLocations();
    }

    @Get('/:locationId')
    @ApiOperation({
        summary: 'Get location by id',
        description: 'This endpoint returns an location by id.',
    })
    getLocationById(@Param('locationId') locationId: string) {
        return this.locationService.getLocationById(locationId);
    }

    @Post()
    @ApiOperation({
        summary: 'Create a new Location',
        description:
            'This endpoint creates a new map location and returns an array containing all map locations.',
    })
    @ApiBody({ type: CreateLocationDTO })
    addNewLocation(@Body() location: Location): Promise<Location> {
        // returns a list of all locations
        return this.locationService.addNewLocation(location);
    }
}
