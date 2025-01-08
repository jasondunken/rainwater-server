import { Injectable } from '@nestjs/common';

import { NotificationService } from '../notification/notification.service';

import { DataRow } from '../../../../rainwater-types/site.model';

@Injectable()
export class DataValidationService {
    constructor(private notificationService: NotificationService) {}

    validateDataRow(row: DataRow): number[] {
        return this.indexMissingValues(row);
    }

    indexMissingValues(row: DataRow): number[] {
        // date, utc offset, and date w/offset are columns 0-2
        // sensor values are columns 3-...

        // CURRENTLY ONLY LOOKS FOR 'undefined' VALUES
        // TODO: check for out of range or other non valid values
        /**
         * here are the criteria when the rainwater missing data Alert App should send an alert to user via (email and/or text), if:
         * 1. the missing timestep is greater than 15-minutes for depth, conductivity, or temperature
         * 2. any data not-a-number
         * 3. water depth in the rain barrel <25 mm
         * 4. water depth in the rain barrel >890 mm (barrel max. height)
         * 5. conductivity < 2 µS/cm and > 1000 µS/cm
         * 6. temperature below 0 °C, and temperature beyond -40 °C to +60 °C
         */
        const invalidValuesIndices: number[] = [];
        for (let i = 0; i < row.data.length; i++) {
            if (row.data[i] == undefined) {
                invalidValuesIndices.push(i);
            }
        }
        if (invalidValuesIndices.length > 0) {
            this.notificationService.notify();
        }
        return invalidValuesIndices;
    }
}
