import { ApiProperty } from '@nestjs/swagger';

export type SiteObj = {
    id: number;
    site: SiteInformation | undefined;
    features: string[] | undefined;
    rows: string[][] | undefined;
};

export type SiteInformation = {
    SiteCode: string;
    SiteName: string;
    SiteDescription: Description;
    VariableInfo: VariableInformation[];
    source: SourceInfo;
};

export type Description = {
    Latitude: number;
    Longitude: number;
    Elevation: number;
    VerticalDatum: string;
    SiteType: string;
    SiteNotes: string;
};

export type VariableInformation = {
    VariableCode: string;
    VariableName: string;
    ValueType: string;
    DataType: string;
    GeneralCategory: string;
    SampleMedium: string;
    VariableUnitName: string;
    VariableUnitType: string;
    VariableUnitAbbr: string;
    NoDataValue: number;
    TimeSupport: string;
    TimeSuppUnitAbbr: string;
    TimeSupportUnitName: string;
    TimeSupportUnitType: string;
    MethodDesctiption: string;
    MethodLink: string;
    VerticalOffset: number;
    SensorNotes: string;
};

export type SourceInfo = {
    Organization: string;
    SourceLink: string;
    Citation: string;
};

export type Location = {
    name: string;
    icon: string;
    lat: number;
    lng: number;
};

export type SondeReport = {
    sondeId: string;
    sondePw: string;
    data: string[];
};

export type DataRow = {
    id: string;
    data: string[];
    invalidValueIndices?: number[];
};

export type Sonde = {
    id: string;
    siteId: string;
};

export class CreateLocationDTO {
    @ApiProperty({ example: 'a name' })
    name!: string;
    @ApiProperty({ example: -33.1234 })
    lat!: number;
    @ApiProperty({ example: 80.1234 })
    lng!: number;
}

export class CreateSiteDTO {
    @ApiProperty({ example: 'a name' })
    name!: string;
    @ApiProperty({ example: -33.1234 })
    lat!: number;
    @ApiProperty({ example: 80.1234 })
    lng!: number;
}

export class UpdateSiteMetadataDTO {
    @ApiProperty({ example: 'UUID' })
    siteId!: string;
    @ApiProperty({ example: 'R-RWH' })
    code!: string;
    @ApiProperty({ example: 'This is test data collection site.' })
    description!: string;
    @ApiProperty({ example: 216.1 })
    elevation!: number;
    @ApiProperty({ example: 'MSL' })
    verticalDatum!: string;
    @ApiProperty({ example: 'Other' })
    siteType!: string;
    @ApiProperty({
        example:
            'This is demo data collection. Provisional data subject to review.',
    })
    siteNotes!: string;
    @ApiProperty({ example: 'http://url-to-the-source-code-for-sonde' })
    sourceLink!: string;
}

export class AddSiteSondeDTO {
    @ApiProperty({ example: 'abcd1234' })
    siteId!: string;
    @ApiProperty({ example: 'abcd1234' })
    sondeId!: string;
}
