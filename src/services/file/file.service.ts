import {ConsoleLogger, HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {FileEntity} from "../../entities/file.entity";
import {Repository} from "typeorm";
import * as fs from "fs";
import {FileUpdateDto} from "../../dto/file/file-update.dto";
import {extname, join} from 'path';
import {FolderEntity} from "../../entities/folder.entity";
import {Response} from "express";

@Injectable()
export class FileService {
    constructor(
        @InjectRepository(FileEntity)
        private repository: Repository<FileEntity>,
        @InjectRepository(FolderEntity)
        private folderRepository: Repository<FolderEntity>
    ) {
    }

    async upload(files: Array<Express.Multer.File>) {
        let files_db
        try {
            files_db = await this.repository.save(files)
        } catch (e) {
            if (e.code === '23505') {
                throw new HttpException('file name must be unique', HttpStatus.BAD_REQUEST)
            }
        }
        files_db.map(file => {
            delete file.fieldname
            delete file.originalname
            delete file.encoding
            delete file.destination
            delete file.path
            delete file.size
        })
        return files_db
    }

    async delete(filename: string) {
        fs.unlink(`./upload/${filename}`, (err) => {
            console.log(err)
        })
        return this.repository.delete({filename})
    }

    async update(dto: FileUpdateDto, filename) {
        let file_name_with_extension: string;

        if(extname(dto.title)) file_name_with_extension = dto.title
        else file_name_with_extension = dto.title + extname(filename)   

        const file = await this.repository.update({filename}, {
            filename: file_name_with_extension
        })
        if (file.affected === 0) return new HttpException('not found', HttpStatus.BAD_REQUEST)
        fs.rename(
            `./upload/${filename}`,
            `./upload/${file_name_with_extension}`,
            () => {
            }
        );
        return this.repository.findOne({filename: file_name_with_extension})
    }

    async move(folder_title: string, filename: string) {
        const file = await this.repository.findOne({filename})
        file.folder = await this.folderRepository.findOne({title: folder_title})
        return this.repository.save(file)
    }

    async detail(filename: string, res: Response) {
        const path = join(process.cwd(), 'upload/' + filename)
        return res.sendFile(path)
    }
}
