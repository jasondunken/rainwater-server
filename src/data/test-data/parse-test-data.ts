import * as fs from 'fs';
import * as readline from 'readline';

import { DataRow, SiteObj } from '../../models/site.model';

export class TestDataParser {
    parseTestDataFile(path): Promise<SiteObj | undefined> {
        return new Promise(async (resolve, reject) => {
            const pathValid = await fs.existsSync(path);
            if (!pathValid) {
                reject(`Invalid path: ${path}`);
                return;
            }

            const dataStream = fs.createReadStream(path);
            dataStream.on('error', (error) => {
                reject([error.message]);
                return;
            });

            const rl = readline.createInterface(dataStream);
            const newSite: SiteObj = {
                id: 1,
                site: {
                    SiteCode: 'site code',
                    SiteName: 'site name',
                    SiteDescription: {
                        Latitude: 100,
                        Longitude: 100,
                        Elevation: 1000,
                        VerticalDatum: 'vertical datum',
                        SiteType: 'site type',
                        SiteNotes: 'site notes',
                    },
                    VariableInfo: [],
                    source: {
                        Organization: 'org',
                        SourceLink: 'link',
                        Citation: 'citation',
                    },
                },
                features: undefined,
                rows: [],
            };

            rl.on('line', (line) => {
                if (line.startsWith('#')) {
                    line = line.slice(2);
                    this.parseMetadata(line, newSite);
                } else {
                    if (!newSite.features) {
                        newSite.features = line.split(',');
                    } else {
                        newSite.rows.push(line.split(','));
                    }
                }
            });
            rl.on('close', () => {
                resolve(newSite);
            });
        });
    }

    parseMetadata(line, newSite) {
        const metaTag = line.split(': ')[0];
        let kv;
        switch (metaTag) {
            // Site Information
            case 'SiteCode':
            case 'SiteName':
                kv = this.parseSingleValue(line);
                newSite.site[kv[0]] = kv[1];
                break;
            // Site Description
            case 'Latitude':
            case 'Longitude':
            case 'Elevation':
            case 'VerticalDatum':
            case 'SiteType':
            case 'SiteNotes':
                kv = this.parseSingleValue(line);
                newSite.site.SiteDescription[kv[0]] = kv[1];
                break;
            // Variable Information
            case 'VariableCode':
                this.parseVariableInformation(line, newSite);
                break;
            // Source Information
            case 'Organization':
            case 'SourceLink':
            case 'Citation':
                kv = this.parseSingleValue(line);
                newSite.site.source[kv[0]] = kv[1];
                break;
            default:
                break;
        }
    }

    parseSingleValue(line) {
        const kv = line.split(': ');
        return kv;
    }

    parseVariableInformation(line, newSite) {
        const params = line.split(' | ');
        const varInfo = {};
        for (let param of params) {
            let kv = this.parseSingleValue(param);
            varInfo[kv[0]] = kv[1];
        }
        newSite.site.VariableInfo.push(varInfo);
    }

    formatDate(date: Date): string {
        const S = this.leftPad('' + date.getSeconds(), 2);
        const m = this.leftPad('' + date.getMinutes(), 2);
        const H = this.leftPad('' + date.getHours(), 2);
        const D = this.leftPad('' + date.getDate(), 2);
        const M = this.leftPad('' + (date.getMonth() + 1), 2);
        const Y = date.getFullYear();
        return `${Y}-${M}-${D} ${H}:${m}:${S}`;
    }

    leftPad(val: string, len: number): string {
        while (val.length < len) {
            val = '0' + val;
        }
        return val;
    }
}
