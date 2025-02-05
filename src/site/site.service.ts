import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { LocationService } from 'src/location/location.service';

import { Site } from './site.entity';
import { CreateSiteDTO } from 'src/models/site.model';
import { Location } from 'src/location/location.entity';

@Injectable()
export class SiteService {
    constructor(
        @InjectRepository(Site) private siteRepository: Repository<Site>,
        private locationService: LocationService,
    ) {}

    getAllSites(): Promise<any> {
        return this.siteRepository.find();
    }

    getSiteMetadata(id: string): Promise<any> {
        return this.siteRepository.findOneBy({ id });
    }

    async createSite(site: CreateSiteDTO): Promise<any> {
        const location: Location = await this.locationService.findOrCreate(
            site.lat,
            site.lng,
        );
        const newSite: Site = {
            id: crypto.randomUUID(),
            name: site.name,
            locationId: location.id,
        };
        return this.siteRepository.save(newSite);
    }
}
