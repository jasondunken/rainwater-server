import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Location {
    @PrimaryColumn()
    id: string;

    @Column()
    @ApiProperty({ example: 'test-location' })
    name: string;

    @Column({ type: 'float' })
    @ApiProperty({ example: '33.924' })
    lat: number;

    @Column({ type: 'float' })
    @ApiProperty({ example: '-83.357' })
    lng: number;
}
