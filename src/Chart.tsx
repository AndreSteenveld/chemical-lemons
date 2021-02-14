import { Component } from "react";
import { Scatter, Line } from "react-chartjs-2";
import { Entry } from "./domain";

interface IChartProperties {
    entries: Entry[];
    calibrationCurve: Entry[];
}

export class Chart extends Component<IChartProperties> {
    get entries(): any {
        return [];
    }

    get calibrationCurve(): any {
        return [];
    }

    get chart(): any {
        return {
            datasets: [
                { type: "scatter", data: this.entries },
                { type: "line", data: this.calibrationCurve }
            ]
        };
    }

    render() {
        return <Scatter data={this.chart} />;
    }
}
