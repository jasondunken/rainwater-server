import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Location {
    @PrimaryColumn()
    id: string;

    @Column()
    lat: number;

    @Column()
    lng: number;
}
