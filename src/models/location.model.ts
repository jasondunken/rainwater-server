import { ApiProperty } from '@nestjs/swagger';

export class CreateLocationDTO {
    @ApiProperty({ example: 'test-location' })
    name: string;

    @ApiProperty({ example: 33.924 })
    lat: number;

    @ApiProperty({ example: -83.357 })
    lng: number;
}
