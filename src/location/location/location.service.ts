import { Injectable } from '@nestjs/common';

@Injectable()
export class LocationService {
    getLocations() {
        return [
            {
                siteId: 1,
                lat: 33.92479,
                lng: -83.35734,
                icon: undefined,
            },
        ];
    }
}
