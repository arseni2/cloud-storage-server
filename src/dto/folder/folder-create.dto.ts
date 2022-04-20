import { UniqueOnDB } from "src/validators/unique-validator/unique-validator";
import {FolderEntity} from "../../entities/folder.entity";

export class FolderCreateDto {
    @UniqueOnDB(FolderEntity, {
        message: 'Folder title must be unique',
    })
    title: string
    parent_title: string | null
}