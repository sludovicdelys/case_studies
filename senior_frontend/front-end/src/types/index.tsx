export interface Dimension {
    id: number;
    country: string;
    business_unit: string;
}

export interface Indicator {
    business_unit: string;
    country: string;
    date: string;
    dimension: number;
    indicator: string;
    value: number;
}