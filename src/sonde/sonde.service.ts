import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Data } from 'src/data/data/data.entity';

import { Repository } from 'typeorm';
import { Sonde } from './sonde.entity';

@Injectable()
export class SondeService {
    constructor(
        @InjectRepository(Sonde)
        private sondeRepository: Repository<Sonde>,
        @InjectRepository(Data)
        private dataRepository: Repository<Data>,
    ) {}

    async registerSonde(sonde: Sonde): Promise<any> | undefined {
        const found = await this.findOne(sonde.UUID);
        console.log('found: ', found);
        if (!found) {
            this.sondeRepository.save(sonde);
        }
    }

    findOne(UUID: string = 'not-valid'): Promise<Sonde | null> {
        console.log('UUID: ', UUID);
        return this.sondeRepository.findOneBy({ UUID });
    }

    addData(rawData: any) {
        this.dataRepository.save({
            sondeUUID: rawData.id,
            data: JSON.stringify(rawData.data),
        });
    }
}
