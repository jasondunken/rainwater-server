import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { LocationService } from 'src/location/location.service';

import { Site, SiteMetadata } from './site.entity';
import {
    AddSiteSondeDTO,
    CreateSiteDTO,
    UpdateSiteMetadataDTO,
} from 'src/models/site.model';
import { Location } from 'src/location/location.entity';
import { PostError } from 'src/models/response.model';
import { SondeService } from 'src/sonde/sonde.service';

@Injectable()
export class SiteService {
    constructor(
        @InjectRepository(Site) private siteRepository: Repository<Site>,
        @InjectRepository(SiteMetadata)
        private siteMetadataRepository: Repository<SiteMetadata>,
        private locationService: LocationService,
        private sondeService: SondeService,
    ) {}

    getAllSites(): Promise<Site[]> {
        return this.siteRepository.find();
    }

    getSite(id: string): Promise<Site> {
        return this.siteRepository.findOneBy({ id });
    }

    getSiteMetadata(siteId: string): Promise<SiteMetadata> {
        return this.siteMetadataRepository.findOneBy({ siteId });
    }

    updateSiteMetadata(addInfo: UpdateSiteMetadataDTO): Promise<SiteMetadata> {
        return this.siteMetadataRepository.save(addInfo);
    }

    async createSite(site: CreateSiteDTO): Promise<Site> {
        const location: Location = await this.locationService.findOrCreate(
            site.lat,
            site.lng,
            site.name,
        );
        const newSite: Site = {
            id: crypto.randomUUID(),
            name: site.name,
            locationId: location.id,
            sondes: '[]',
        };
        return this.siteRepository.save(newSite);
    }

    getSiteId(locationId: string): Promise<Site> {
        return this.siteRepository.findOneBy({ locationId });
    }

    async addSonde(addInfo: AddSiteSondeDTO): Promise<Site | PostError> {
        // a sonde can only belong to one site, so when adding a sonde to a site,
        // we need to create a sonde entity in the db.
        // might should check if the sonde already belongs to another site,
        // but because sondes use a UUID, this is probably not an issue.
        await this.sondeService.addSonde({ UUID: addInfo.sondeId });
        return this.siteRepository
            .findOneBy({ id: addInfo.siteId })
            .then((site) => {
                if (site) {
                    const sondes = JSON.parse(site.sondes);
                    // TODO need to add sonde to sonde db table if it isn't already in there
                    if (!sondes.includes(addInfo.sondeId)) {
                        sondes.push(addInfo.sondeId);
                        site.sondes = JSON.stringify(sondes);
                        return this.siteRepository.save(site);
                    }
                    return new Promise((resolve, _) =>
                        resolve(new PostError('sonde already added to site!')),
                    );
                }
                return new Promise((resolve, _) =>
                    resolve(new PostError('site does not exist!')),
                );
            });
    }
}
