import { Injectable } from '@nestjs/common';

@Injectable()
export class NotificationService {
    notify(): void {
        // notify the admin of the site that there is an issue with the data
        // provide siteId, site name, and summary of invalid data
        // time-spans?
        console.log('the admiin has been notified!');
    }
}
