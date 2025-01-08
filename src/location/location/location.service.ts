import { Injectable } from '@nestjs/common';

import { MapLocation } from '../../../../rainwater-types/site.model';

@Injectable()
export class LocationService {
    currentSiteID = 2;

    locations: MapLocation[] = [
        {
            siteId: '0',
            sondeId: '000001',
            lat: 33.92479,
            lng: -83.35734,
        },
    ];

    getLocations(): MapLocation[] {
        return this.locations;
    }

    addNewLocation(location: MapLocation) {
        this.locations.push(location);
    }
}
