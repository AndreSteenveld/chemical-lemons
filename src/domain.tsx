export type Nullable<T> = T | null;
export interface CalibrationConstants {
    a: number;
    b: number;
}
export interface Entry {
    concentration: Nullable<number>;
    measurement: number;
    calibrated: Nullable<number>;
    scale: number;
}
