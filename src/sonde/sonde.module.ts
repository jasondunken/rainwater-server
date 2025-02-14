import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SondeService } from './sonde.service';
import { SondeController } from './sonde.controller';

import { Sonde } from './sonde.entity';
import { DataModule } from 'src/data/data.module';

@Module({
    imports: [TypeOrmModule.forFeature([Sonde]), DataModule],
    providers: [SondeService],
    controllers: [SondeController],
    exports: [SondeService],
})
export class SondeModule {}
