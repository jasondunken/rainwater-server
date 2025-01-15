import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Sonde {
    @PrimaryColumn()
    @ApiProperty({ example: 'UUID' })
    UUID: string;

    @Column()
    @ApiProperty({ example: 'v-sonde-pw' })
    password: string;
}

export class SondeReport {
    @ApiProperty({ example: 'UUID' })
    sondeId: string;

    @ApiProperty({ example: 'v-sonde-pw' })
    sondePw: string;

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
    data: string[];
}
