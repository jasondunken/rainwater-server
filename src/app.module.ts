import { Module } from '@nestjs/common';

import { DataController } from './data/data/data.controller';
import { LocationController } from './location/location/location.controller';

import { DataService } from './data/data/data.service';
import { LocationService } from './location/location/location.service';
import { DataValidationService } from './services/data-validation/data-validation.service';
import { NotificationService } from './services/notification/notification.service';

@Module({
    imports: [],
    controllers: [DataController, LocationController],
    providers: [DataService, LocationService, DataValidationService, NotificationService],
})
export class AppModule {}
