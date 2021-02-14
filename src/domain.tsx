export type Nullable<T> = T | null;
export type CalibrationConstants = [Nullable<Number>, Nullable<Number>];
export interface Entry {
    // x - The "step"
    x: Nullable<Number>;

    // y - The actual measurement
    y: Number;

    // c - Calibration value for the step
    c?: Nullable<Number>;

    // s - Scale for all values
    s?: Nullable<Number>;
}
