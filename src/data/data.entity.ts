import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Data {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    sondeUUID: string;

    @Column()
    data: string;

    @Column({ nullable: true })
    invalidValueIndices: string;
}
