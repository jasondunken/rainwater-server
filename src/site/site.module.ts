import { Module } from '@nestjs/common';
import { SiteService } from './site.service';
import { SiteController } from './site.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Site, SiteMetadata } from './site.entity';
import { LocationModule } from 'src/location/location.module';
import { SondeModule } from 'src/sonde/sonde.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Site]),
        TypeOrmModule.forFeature([SiteMetadata]),
        LocationModule,
        SondeModule,
    ],
    providers: [SiteService],
    controllers: [SiteController],
})
export class SiteModule {}
