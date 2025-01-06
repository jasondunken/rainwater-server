import { Injectable } from '@nestjs/common';
import { DataRow } from '../../../../rainwater-types/site.model';

@Injectable()
export class DataValidationService {
    validateDataRow(row: DataRow): number[] {
        return this.indexMissingValues(row);
    }

    indexMissingValues(row: DataRow): number[] {
        // date, utc offset, and date w/offset are columns 0-2
        // sensor values are columns 3-...

        // CURRENTLY ONLY LOOKS FOR 'undefined' VALUES
        // TODO: check for out of range or other non valid values
        const invalidValuesIndices: number[] = [];
        for (let i = 0; i < row.data.length; i++) {
            if (row.data[i] == undefined) {
                invalidValuesIndices.push(i);
            }
        }
        return invalidValuesIndices;
    }
}
