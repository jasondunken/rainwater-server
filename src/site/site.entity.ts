import { ApiProperty } from '@nestjs/swagger';

import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Site {
    @PrimaryColumn()
    @ApiProperty({ example: 'UUID' })
    siteId: string;

    @Column()
    @ApiProperty({ example: 'location-id' })
    locationId: string;

    @Column()
    @ApiProperty({ example: 'sonde-id' })
    sondeId: string;
}
