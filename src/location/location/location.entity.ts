import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Location {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    lat: number;

    @Column()
    lng: number;
}
