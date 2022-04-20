import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {FolderEntity} from "../../entities/folder.entity";
import {Repository} from "typeorm";
import {FileEntity} from "../../entities/file.entity";

@Injectable()
export class CloudService {
    constructor(
        @InjectRepository(FolderEntity)
        private folderRepository: Repository<FolderEntity>,
        @InjectRepository(FileEntity)
        private fileRepository: Repository<FileEntity>,
    ) {}

    async all() {
        const folder = await this.folderRepository.find({
            where: {
                parent: null
            }
        })
        const file = await this.fileRepository.find({
            where: {
                folder: null
            }
        })

        return {folders: folder, files: file}
    }
}
