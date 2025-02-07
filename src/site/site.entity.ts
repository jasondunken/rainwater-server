import { ApiProperty } from '@nestjs/swagger';

import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Site {
    @PrimaryColumn()
    @ApiProperty({ example: 'UUID' })
    id!: string;

    @Column()
    @ApiProperty({ example: 'test-site' })
    name!: string;

    @Column()
    @ApiProperty({ example: 'location-id' })
    locationId!: string;

    @Column()
    @ApiProperty({ example: '["1i24bi2bgfg34i2b4", "wjenr3kjnrkjwnker"]' })
    sondes!: string;
}
