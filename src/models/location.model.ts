import { ApiProperty } from '@nestjs/swagger';

export class CreateLocationDTO {
    @ApiProperty({ example: 'test-location' })
    name: string;

    @ApiProperty({ example: 1 })
    lat: number;

    @ApiProperty({ example: 2 })
    lng: number;
}
