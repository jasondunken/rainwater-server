import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Location } from './location.entity';
import { CreateLocationDTO } from '../models/location.model';

@Injectable()
export class LocationService {
    location: CreateLocationDTO = {
        name: 'test-location',
        lat: 33.92479,
        lng: -83.35734,
    };

    constructor(
        @InjectRepository(Location)
        private locationRepository: Repository<Location>,
    ) {
        this.locationRepository.find().then((locations) => {
            if (LocationService.length === 0) {
                this.locationRepository.save(this.location);
            }
        });
    }

    getLocations(): Promise<Location[]> {
        return this.locationRepository.find();
    }

    getLocationById(id: number): Promise<any> {
        return this.locationRepository.findOneBy({ id });
    }

    async addNewLocation(location: CreateLocationDTO): Promise<Location[]> {
        const _ = await this.locationRepository.save(location);
        return this.getLocations();
    }
}
