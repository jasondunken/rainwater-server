import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';

import { LocationController } from './location.controller';
import { LocationService } from './location.service';

import { Location } from './location.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Location])],
    providers: [LocationService],
    controllers: [LocationController],
})
export class LocationModule {}
