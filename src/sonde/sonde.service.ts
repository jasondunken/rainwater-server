import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { DataService } from 'src/data/data.service';

import { Sonde } from './sonde.entity';
import { SondeReport } from '../../../rainwater-types/site.model';

@Injectable()
export class SondeService {
    constructor(
        @InjectRepository(Sonde)
        private sondeRepository: Repository<Sonde>,
        private dataService: DataService,
    ) {}

    async registerSonde(sonde: Sonde): Promise<any> | undefined {
        const found = await this.findOne(sonde.UUID);
        if (!found) {
            this.sondeRepository.save(sonde);
        }
    }

    async addData(report: SondeReport) {
        const sonde = await this.findOne(report.sondeId);
        if (sonde && sonde.password === report.sondePw) {
            this.dataService.addSondeData({
                sondeUUID: report.sondeId,
                data: report.data,
            });
        }
    }

    // using an undefined UUID string will result in the db returning the first record
    findOne(UUID: string = 'not-valid'): Promise<Sonde | null> {
        return this.sondeRepository.findOneBy({ UUID });
    }
}
