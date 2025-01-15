import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LocationModule } from './location/location.module';
import { DataModule } from './data/data.module';
import { SondeModule } from './sonde/sonde.module';
import { SiteModule } from './site/site.module';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'sqlite',
            database: 'db/rrr_dev.db',
            autoLoadEntities: true,
            // if not using migrations synchronize true is required to auto create tables
            synchronize: true,
        }),
        LocationModule,
        DataModule,
        SondeModule,
        SiteModule,
    ],
})
export class AppModule {}
