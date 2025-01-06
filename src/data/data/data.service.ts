import { Injectable, OnModuleInit } from '@nestjs/common';

import * as fs from 'fs';
import * as readline from 'readline';

import { DataRow, SiteObj } from '../../../../rainwater-types/site.model';
import { DataValidationService } from 'src/services/data-validation/data-validation.service';

@Injectable()
export class DataService implements OnModuleInit {
    testData: SiteObj | undefined;

    static currentRowId: number = 1000;

    static getNextId(): number {
        return DataService.currentRowId++;
    }

    static currentRow: DataRow = {
        id: '0',
        data: [
            '2024-01-18 18:15:00', // datetime
            '-5', // utc offset
            '2024-01-18 13:15:00', // datetime + offset
            '0.0', // conductance
            '-4.3', // water depth
            '22.2', // temp
            '4.67', // batt voltage - sensor
            '17.74', // humidity - sensor
            '25.59', // temp - sensor
            '100.0', // signal percent - sensor
        ],
        invalidValueIndices: [],
    };

    static cachedSimulatedData: DataRow[] = [];

    static pollingRate: number = 5000; // ms
    static dataTimer: ReturnType<typeof setInterval>;

    constructor(private dataValidationService: DataValidationService) {}

    async onModuleInit() {
        const testDataPath = './src/data/test-data/test_site_1_head.csv';
        this.testData = await this.parseTestDataFile(testDataPath).catch(
            (error) => error, // the error becomes the data!
        );

        DataService.dataTimer = setInterval(
            () => this.getNextRow(),
            DataService.pollingRate,
        );
    }

    getSimulatedRealtimeData(): DataRow[] {
        const cachedData = [...DataService.cachedSimulatedData];
        DataService.cachedSimulatedData = [];

        return cachedData;
    }

    getTestData(): SiteObj {
        return this.testData;
    }

    addBadData(): void {
        const row = this.generateNextDataRow();

        // add invalid value here
        const rndValIdx = Math.floor(Math.random() * (row.data.length - 3)) + 3;
        row.data[rndValIdx] = undefined;

        console.log('bad row: ', row);

        this.addSimulatedDataRow(row);
    }

    getNextRow(): void {
        const row = this.generateNextDataRow();
        this.addSimulatedDataRow(row);
    }

    addSimulatedDataRow(row: DataRow): void {
        const { id, data } = row;
        const invalidIndices = this.dataValidationService.validateDataRow(row);
        DataService.cachedSimulatedData.push({
            id,
            data: [...data],
            invalidValueIndices: invalidIndices,
        });
    }

    generateNextDataRow(): DataRow {
        // update the static obj
        DataService.currentRow.id = '' + DataService.getNextId();

        // update timestamps
        const lastTime: Date = new Date(DataService.currentRow.data[0]);
        lastTime.setMinutes(lastTime.getMinutes() + DataService.pollingRate);
        DataService.currentRow.data[0] = DataService.formatDate(lastTime);

        lastTime.setHours(
            lastTime.getHours() + parseInt(DataService.currentRow.data[1]),
        );
        DataService.currentRow.data[2] = DataService.formatDate(lastTime);

        return {
            id: DataService.currentRow.id,
            data: [...DataService.currentRow.data],
        };
    }

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

    static formatDate(date: Date): string {
        const S = DataService.leftPad('' + date.getSeconds(), 2);
        const m = DataService.leftPad('' + date.getMinutes(), 2);
        const H = DataService.leftPad('' + date.getHours(), 2);
        const D = DataService.leftPad('' + date.getDate(), 2);
        const M = DataService.leftPad('' + (date.getMonth() + 1), 2);
        const Y = date.getFullYear();
        return `${Y}-${M}-${D} ${H}:${m}:${S}`;
    }

    static leftPad(val: string, len: number): string {
        while (val.length < len) {
            val = '0' + val;
        }
        return val;
    }
}
