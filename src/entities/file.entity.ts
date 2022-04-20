import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {FolderEntity} from "./folder.entity";

@Entity('file')
export class FileEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    filename: string;

    @Column()
    mimetype: string

    @ManyToOne(() => FolderEntity, folder => folder.folders, {onDelete: 'CASCADE'})
    folder: FolderEntity;
}