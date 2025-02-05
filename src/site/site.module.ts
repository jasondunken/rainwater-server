import { Module } from '@nestjs/common';
import { SiteService } from './site.service';
import { SiteController } from './site.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Site } from './site.entity';
import { LocationModule } from 'src/location/location.module';

@Module({
    imports: [TypeOrmModule.forFeature([Site]), LocationModule],
    providers: [SiteService],
    controllers: [SiteController],
})
export class SiteModule {}
