import { Injectable } from '@nestjs/common';

import { MapLocation } from '../../../../rainwater-types/site.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Location } from './location.entity';

@Injectable()
export class LocationService {
    currentSiteID = 2;

    locations: MapLocation[] = [
        {
            siteId: '0',
            sondeId: '000001',
            lat: 33.92479,
            lng: -83.35734,
        },
    ];

    constructor(
        @InjectRepository(Location)
        private locationRepository: Repository<Location>,
    ) {}

    getLocations(): MapLocation[] {
        return this.locations;
    }

    addNewLocation(location: MapLocation) {
        this.locations.push(location);
        this.locationRepository.save({ id: '1', lat: 0, lng: 0 });
    }
}
