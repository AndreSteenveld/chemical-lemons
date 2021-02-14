export type Nullable<T> = T | null;
export type CalibrationConstants = [Nullable<Number>, Nullable<Number>];
export interface Entry {
    concentration: number;
    measurement: number;
    calibrated: number;
    scale: number;
}
