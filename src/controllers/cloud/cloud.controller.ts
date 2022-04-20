import {Controller, Get} from '@nestjs/common';
import {CloudService} from "../../services/cloud/cloud.service";

@Controller('cloud')
export class CloudController {
    constructor(private readonly cloudService: CloudService) {
    }

    @Get('all')
    all() {
        return this.cloudService.all()
    }
}
