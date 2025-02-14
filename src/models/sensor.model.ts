export class AddSensorDTO {
    id: string;
    alert_lower: number;
    alert_upper: number;
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
}
