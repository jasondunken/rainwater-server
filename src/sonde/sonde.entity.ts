import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Sonde {
    @PrimaryColumn()
    @ApiProperty({ example: 'UUID' })
    UUID!: string;

    @Column({ nullable: true })
    @ApiProperty({ example: 'v-sonde-pw' })
    password!: string;

    @Column({ nullable: true })
    @ApiProperty({
        example:
            '["Meter_Hydros21_Cond", "Meter_Hydros21_Depth", "Meter_Hydros21_Temp"]',
    })
    sensors!: string;
}
