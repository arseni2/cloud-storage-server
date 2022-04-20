import {Body, Controller, Delete, Get, Param, Patch, Post} from '@nestjs/common';
import {FolderCreateDto} from "../../dto/folder/folder-create.dto";
import {FolderService} from "../../services/folder/folder.service";
import {FolderUpdateDto} from "../../dto/folder/folder-update.dto";
import {FolderMoveDto} from "../../dto/folder/folder-move.dto";

@Controller('folder')
export class FolderController {
    constructor(private readonly folderService: FolderService) {
    }

    @Patch('update/:title')
    update(@Param('title') title: string, @Body() dto: FolderUpdateDto) {
        return this.folderService.update(title, dto)
    }

    @Post('create')
    create(@Body() dto: FolderCreateDto) {
        return this.folderService.create(dto)
    }

    @Delete('delete/:title')
    remove(@Param('title') title: string) {
        return this.folderService.remove(title)
    }

    @Post('move')
    move(@Body() dto: FolderMoveDto) {
        return this.folderService.move(dto)
    }

    // @Get('all')
    // all() {
    //     return this.folderService.all()
    // }

    @Get('detail/:folder_title')
    detail(@Param('folder_title') folder_title: string) {
        return this.folderService.detail(folder_title)
    }
}
