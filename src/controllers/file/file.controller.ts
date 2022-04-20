import {Body, Controller, Delete, Get, Param, Patch, Post, Res, UploadedFiles, UseInterceptors} from "@nestjs/common";
import {FileService} from "../../services/file/file.service";
import {AnyFilesInterceptor} from "@nestjs/platform-express";
import {FileUpdateDto} from "../../dto/file/file-update.dto";
import {Response} from "express";

@Controller('file')
export class FileController {
    constructor(private readonly fileService: FileService) {}

    @Post('upload')
    @UseInterceptors(AnyFilesInterceptor())
    upload(@UploadedFiles() files: Array<Express.Multer.File> ) {
        return this.fileService.upload(files)
    }

    @Delete('delete/:filename')
    delete(@Param('filename') filename: string) {
        return this.fileService.delete(filename)
    }

    @Patch('update/:filename')
    update(@Body() dto: FileUpdateDto, @Param('filename') filename: string) {
        return this.fileService.update(dto, filename)
    }

    @Post('move/')
    move(@Body() dto: {title: string, title_placed: string}) {
        return this.fileService.move(dto.title_placed, dto.title)
    }

    @Get('detail/:filename')
    detail(@Param('filename') filename: string, @Res() res: Response) {
        return this.fileService.detail(filename, res)
    }
}