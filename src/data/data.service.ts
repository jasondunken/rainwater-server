import { Injectable } from '@nestjs/common';

import { DataValidationService } from 'src/data/data-validation.service';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Data } from './data.entity';

@Injectable()
export class DataService {
    constructor(
        @InjectRepository(Data)
        private dataRepository: Repository<Data>,
        private dataValidationService: DataValidationService,
    ) {}

    getSondeData(sondeUUID: string): Promise<any> {
        return this.dataRepository.findBy({ sondeUUID });
    }

    addSondeData(data: any): Promise<any> {
        this.dataValidationService.validateDataRow(data);
        // sqlite doesn't like arrays
        data.data = JSON.stringify(data.data);
        data.invalidValueIndices = JSON.stringify(data.invalidValueIndices);
        return this.dataRepository.save(data);
    }
}
