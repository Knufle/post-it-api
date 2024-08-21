import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('sticky_notes')
export default class StickyNote {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    title: string;
    
    @Column()
    description: string;
}