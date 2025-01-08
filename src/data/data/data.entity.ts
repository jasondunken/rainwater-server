import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Data {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    lat: number;

    @Column()
    lng: number;
}
