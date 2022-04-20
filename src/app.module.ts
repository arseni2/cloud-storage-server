import { Module } from '@nestjs/common';
import {FolderService} from "./services/folder/folder.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {FolderEntity} from "./entities/folder.entity";
import {FileEntity} from "./entities/file.entity";
import {FileController} from "./controllers/file/file.controller";
import {FileService} from "./services/file/file.service";
import {MulterModule} from "@nestjs/platform-express";
import {diskStorage} from "multer";
import {FolderController} from "./controllers/folder/folder.controller";
import {CloudService} from "./services/cloud/cloud.service";
import {CloudController} from "./controllers/cloud/cloud.controller";

@Module({
  imports: [
      TypeOrmModule.forRoot({
          type: 'postgres',
          host: 'localhost',
          port: 5432,
          username: 'postgres',
          password: '123',
          database: 'cloud',
          entities: [__dirname + "/entities/*.{js,ts}"],
          synchronize: true
      }),
      TypeOrmModule.forFeature([FolderEntity, FileEntity]),
      MulterModule.register({
          storage: diskStorage({
              destination: './upload/',
              filename: (req, file, cb) => {
                  return cb(null, file.originalname)
              }
          })
      })
  ],
  controllers: [FolderController, FileController, CloudController],
  providers: [FolderService, FileService, CloudService],
})
export class AppModule {}
