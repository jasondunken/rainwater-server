import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { DataService } from 'src/data/data.service';

import { Sonde } from './sonde.entity';
import {
    AddSondeSensorDTO,
    AVAILABLE_SENSOR_TYPES,
    SondeRegistrationDTO,
    SondeReportDTO,
} from 'src/models/sonde.model';

@Injectable()
export class SondeService {
    constructor(
        @InjectRepository(Sonde)
        private sondeRepository: Repository<Sonde>,
        private dataService: DataService,
    ) {}

    async registerSonde(sonde: SondeRegistrationDTO): Promise<any> | undefined {
        const found = await this.findOne(sonde.UUID);
        if (!found) {
            this.sondeRepository.save(sonde);
        }
    }

    async getAvailableSensors(): Promise<string[]> {
        return new Promise((resolve) => {
            resolve(AVAILABLE_SENSOR_TYPES);
        });
    }

    async addSondeSensor(
        addInfo: AddSondeSensorDTO,
    ): Promise<Sonde | undefined> {
        const sonde = await this.findOne(addInfo.UUID);
        if (sonde) {
            const sensors = JSON.parse(sonde.sensors);
            if (!sensors.includes(addInfo.sensor)) {
                sensors.push(addInfo.sensor);
                sonde.sensors = JSON.stringify(sensors);
                return this.sondeRepository.save(sonde);
            }
        }
    }

    async addData(report: SondeReportDTO) {
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
