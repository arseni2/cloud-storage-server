import {Column, Entity, OneToMany, PrimaryGeneratedColumn, Tree, TreeChildren, TreeParent} from "typeorm";
import {FileEntity} from "./file.entity";

@Entity('folder')
@Tree("closure-table")
export class FolderEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    title: string;

    @TreeChildren({cascade: true})
    folders: FolderEntity[];

    @TreeParent({onDelete: 'CASCADE'})
    parent: FolderEntity;

    @OneToMany(type => FileEntity, file => file.folder, {cascade: true})
    files: FileEntity[];
}