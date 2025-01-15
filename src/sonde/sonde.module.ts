import { Module } from '@nestjs/common';
import { SondeController } from './sonde.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Data } from 'src/data/data/data.entity';
import { SondeService } from './sonde.service';
import { Sonde } from './sonde.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Data]),
        TypeOrmModule.forFeature([Sonde]),
    ],
    providers: [SondeService],
    controllers: [SondeController],
})
export class SondeModule {}
