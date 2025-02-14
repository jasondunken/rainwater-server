import { ApiProperty } from '@nestjs/swagger';

export class AddSondeDTO {
    @ApiProperty({ example: 'UUID' })
    UUID!: string;
    // @ApiProperty({ example: 5 }) // expected time in seconds between sonde reports to server
    // reportingInterval!: number;
}

export class SondeRegistrationDTO {
    @ApiProperty({ example: 'UUID' })
    UUID!: string;

    @ApiProperty({ example: 'v-sonde-pw' })
    password!: string;
}

// TODO - maybe allow sonde to register its own sensors
export class AddSondeSensorDTO {
    @ApiProperty({ example: 'UUID' })
    UUID!: string;

    @ApiProperty({ example: 'Meter_Hydros21_Cond' })
    sensor!: string;
}

export class SondeReportDTO {
    @ApiProperty({ example: 'UUID' })
    sondeId!: string;

    @ApiProperty({ example: 'v-sonde-pw' })
    sondePw!: string;

    @ApiProperty({
        example: [
            '2024-01-18 18:15:00', // datetime
            '-5', // utc offset
            '2024-01-18 13:15:00', // datetime + offset
            '0.0', // conductance
            '-4.3', // water depth
            '22.2', // temp
            '4.67', // batt voltage - sensor
            '17.74', // humidity - sensor
            '25.59', // temp - sensor
            '100.0', // signal percent - sensor
        ],
    })
    data!: string[];
}

// TODO dashboard - get from backend
export const DEFAULT_SENSOR_TYPES = [
    'EnviroDIY_Mayfly_Batt',
    'Sensirion_SHT40_Humidity',
    'Sensirion_SHT40_Temperature',
    'EnviroDIY_LTEB_SignalPercent',
];

export const AVAILABLE_SENSOR_TYPES = [
    'Meter_Hydros21_Cond',
    'Meter_Hydros21_Depth',
    'Meter_Hydros21_Temp',
];

// TODO dashboard - get from backend
// this isn't something that will be inplemented as is.
export const SONDE_GLOBAL_RULES = [
    'the missing timestep is greater than 15-minutes',
    'any data not valid for type',
];
