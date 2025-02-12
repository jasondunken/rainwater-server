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

@Entity()
export class SiteMetadata {
    @PrimaryColumn()
    @ApiProperty({ example: 'UUID' })
    siteId!: string;

    @Column()
    @ApiProperty({ example: 'R-RWH' })
    code!: string;

    @Column()
    @ApiProperty({ example: 'This is test data collection site.' })
    description!: string;

    @Column({ type: 'float' })
    @ApiProperty({ example: 216.0 })
    elevation!: number;

    @Column()
    @ApiProperty({ example: 'MSL' })
    verticalDatum!: string;

    @Column()
    @ApiProperty({ example: 'Other' })
    siteType!: string;

    @Column()
    @ApiProperty({
        example:
            'This is demo data collection. Provisional data subject to review.',
    })
    siteNotes!: string;

    @Column()
    @ApiProperty({ example: 'http://url-to-the-source-code-for-sonde' })
    sourceLink!: string;
}
