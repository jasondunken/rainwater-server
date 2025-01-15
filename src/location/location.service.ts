import { Injectable } from '@nestjs/common';

import { MapLocation } from '../../../rainwater-types/site.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Location } from './location.entity';

@Injectable()
export class LocationService {
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

    getLocations(): Promise<Location[]> {
        return this.locationRepository.find();
    }

    getLocationById(id: string): Promise<any> {
        return this.locationRepository.findOneBy({ id });
    }

    addNewLocation(location: MapLocation) {
        this.locationRepository.save(location);
    }
}
