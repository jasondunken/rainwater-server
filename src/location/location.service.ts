import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Location } from './location.entity';
import { CreateLocationDTO } from '../models/location.model';

@Injectable()
export class LocationService {
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

    async findOrCreate(
        lat: number,
        lng: number,
        name: string,
    ): Promise<Location> {
        const location: Location = await this.locationRepository.findOneBy({
            lat,
            lng,
        });
        if (!location) {
            const newLocation: Location = {
                id: crypto.randomUUID(),
                name: name,
                lat: lat,
                lng: lng,
            };
            return this.addNewLocation(newLocation);
        } else return location;
    }

    async addNewLocation(location: CreateLocationDTO): Promise<Location> {
        const newLocation = await this.locationRepository.save(location);
        return newLocation;
    }
}
