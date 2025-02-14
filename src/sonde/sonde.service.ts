import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { DataService } from 'src/data/data.service';

import { Sonde } from './sonde.entity';
import {
    AddSondeDTO,
    AddSondeSensorDTO,
    AVAILABLE_SENSOR_TYPES,
    DEFAULT_SENSOR_TYPES,
    SondeRegistrationDTO,
    SondeReportDTO,
} from 'src/models/sonde.model';
import { resolve } from 'path';
import { PostError } from 'src/models/response.model';

@Injectable()
export class SondeService {
    constructor(
        @InjectRepository(Sonde)
        private sondeRepository: Repository<Sonde>,
        private dataService: DataService,
    ) {}

    async addSonde(sonde: AddSondeDTO): Promise<Sonde> {
        const found = await this.findSonde(sonde.UUID);
        if (!found) {
            return this.sondeRepository.save(sonde);
        }
    }

    async registerSonde(sonde: SondeRegistrationDTO): Promise<any> | undefined {
        // TODO password salt and hashing
        const found = await this.findSonde(sonde.UUID);
        if (!found) {
            this.sondeRepository.save(sonde);
        }
    }

    async getSensors(): Promise<{ default: string[]; available: string[] }> {
        // TODO get available & default sensors by sonde type
        return new Promise((resolve) => {
            resolve({
                default: DEFAULT_SENSOR_TYPES,
                available: AVAILABLE_SENSOR_TYPES,
            });
        });
    }

    async getInstalledSensors(UUID: string): Promise<string[]> {
        const sonde = await this.findSonde(UUID);
        if (sonde) {
            return JSON.parse(sonde.sensors);
        }
        return [];
    }

    async addSondeSensor(
        addInfo: AddSondeSensorDTO,
    ): Promise<Sonde | PostError> {
        let sonde = await this.findSonde(addInfo.UUID);
        if (!sonde) {
            sonde = await this.addSonde({ UUID: addInfo.UUID });
        }
        let sensors = JSON.parse(sonde.sensors);
        if (sensors) {
            if (sensors.includes(addInfo.sensor)) {
                return new Promise((resolve) =>
                    resolve(new PostError('Sensor already added!')),
                );
            }
            sensors.push(addInfo.sensor);
        } else {
            sensors = [addInfo.sensor];
        }
        sonde.sensors = JSON.stringify(sensors);
        return this.sondeRepository.save(sonde);
    }

    async addData(report: SondeReportDTO) {
        // TODO sonde identity validation
        const sonde = await this.findSonde(report.sondeId);
        if (sonde && sonde.password === report.sondePw) {
            this.dataService.addSondeData({
                sondeUUID: report.sondeId,
                data: report.data,
            });
        }
    }

    // using an undefined UUID string will result in the db returning the first record
    findSonde(UUID: string = 'not-valid'): Promise<Sonde | null> {
        return this.sondeRepository.findOneBy({ UUID });
    }
}
