import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {FolderEntity} from "../../entities/folder.entity";
import {Repository} from "typeorm";
import {FolderCreateDto} from "../../dto/folder/folder-create.dto";
import {FolderUpdateDto} from "../../dto/folder/folder-update.dto";
import {FolderMoveDto} from "../../dto/folder/folder-move.dto";

@Injectable()
export class FolderService {
    constructor(
        @InjectRepository(FolderEntity)
        private repository: Repository<FolderEntity>
    ) {
    }

    async create(dto: FolderCreateDto) {
        let parent_folder;
        if(dto.parent_title) {
            parent_folder = await this.repository.findOne({title: dto.parent_title})
        }
        return this.repository.save({
            ...dto,
            parent: parent_folder
        })
    }

    async update(title: string, dto: FolderUpdateDto) {
        const folder = await this.repository.update({title}, dto)
        if (folder.affected === 0) return new HttpException('folder not found', HttpStatus.NOT_FOUND)
        return this.repository.findOne({title: dto.title}) 
    }

    remove(title: string) {
        return this.repository.delete({title})
    }

    async move(dto: FolderMoveDto) {
        const folder = await this.repository.findOne({title: dto.title})
        folder.parent = await this.repository.findOne({title: dto.title_placed})
        return this.repository.save(folder)
    }

    // all() {
    //     return getConnection().getTreeRepository(FolderEntity).findTrees({relations: ['files']})
    // }

    async detail(folder_title: string) {
        let folder = await this.repository.findOne({title: folder_title}, {relations: ['folders', 'files'], select: ['files', 'folders', 'id']})
        delete folder.id
        return folder 
    }
}
