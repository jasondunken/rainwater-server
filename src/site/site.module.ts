import { Module } from '@nestjs/common';
import { SiteService } from './site.service';
import { SiteController } from './site.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Site, SiteMetadata } from './site.entity';
import { LocationModule } from 'src/location/location.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Site]),
        TypeOrmModule.forFeature([SiteMetadata]),
        LocationModule,
    ],
    providers: [SiteService],
    controllers: [SiteController],
})
export class SiteModule {}
