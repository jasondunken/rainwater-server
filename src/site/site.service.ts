import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { Site } from './site.entity';

@Injectable()
export class SiteService {
    constructor(
        @InjectRepository(Site) private siteRepository: Repository<Site>,
    ) {}

    getAllSites(): Promise<any> {
        return this.siteRepository.find();
    }

    getSite(siteId: string): Promise<any> {
        return this.siteRepository.findOneBy({ siteId });
    }

    createSite(site: Site): Promise<any> {
        site.siteId = crypto.randomUUID();
        return this.siteRepository.save(site);
    }
}
