import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DataController } from './data.controller';
import { DataService } from './data.service';
import { Data } from './data.entity';

import { DataValidationService } from 'src/services/data-validation/data-validation.service';
import { NotificationService } from 'src/services/notification/notification.service';

@Module({
    imports: [TypeOrmModule.forFeature([Data])],
    providers: [DataService, DataValidationService, NotificationService],
    controllers: [DataController],
})
export class DataModule {}
