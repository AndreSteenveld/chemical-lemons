import { Component } from "react";
import { Scatter, Line } from "react-chartjs-2";
import { Entry } from "./domain";

interface IChartProperties {
    entries: Entry[];
    calibrationCurve: Entry[];
    extrapolateConcentration(measurement: number, scale?: number): number;
}

export class Chart extends Component<IChartProperties> {
    get entries(): Array<{ x: number; y: number }> {
        return this.props.entries.map((entry) => ({
            x: entry.measurement,
            y:
                null === entry.concentration
                    ? this.props.extrapolateConcentration(entry.measurement, entry.scale)
                    : entry.concentration
        }));
    }

    get calibrationCurve(): Array<{ x: number; y: number }> {
        return this.props.calibrationCurve.map((entry) => ({
            x: entry.calibrated as number,
            y: entry.concentration as number
        }));
    }

    get chart(): any {
        return {
            datasets: [
                {
                    label: "Measurements",
                    type: "scatter",
                    data: this.entries,
                    pointBorderWidth: 0,
                    pointRadius: 6,
                    pointBackgroundColor: "#9999EE"
                },

                {
                    label: "Calibration curve",
                    type: "line",
                    data: this.calibrationCurve,
                    pointRadius: 0,
                    fill: false,
                    borderColor: "#EEAAAA"
                }
            ]
        };
    }

    render() {
        return <Scatter data={this.chart} />;
    }
}
