import { Component } from "react";
import { CalibrationConstants, Entry } from "./domain";
import { Grid } from "./Grid";
import { Chart } from "./Chart";
import { CalibrationFormula } from "./CalibrationFormula";
import { AddEntry } from "./AddEntry";
import "./styles.css";

interface IAppState {
    scale: number;
    constants: CalibrationConstants;
    entries: Entry[];
}

export class App extends Component<{}, IAppState> {
    constructor(props: {}) {
        super(props);

        this.state = {
            scale: 1,
            constants: { a: 1, b: 0 },
            entries: []
        };
    }

    extrapolateConcentration = (y: number, scale: number = this.state.scale): number => {
        const { a, b } = this.state.constants;

        return (y - b) / a;
    };

    calibratedValue = (x: number): number => {
        const { a, b } = this.state.constants;

        return a * x + b;
    };

    onScaleChange = (scale: number) => {
        this.setState({ scale });
    };

    onFormulaChange = (constants: CalibrationConstants) => {
        this.setState({ constants });
    };

    onEntryAdded = (entry: Entry) => {
        this.setState({ entries: [...this.state.entries, entry] });
    };

    get calibrationCurve(): Entry[] {
        return Array(101)
            .fill(null)
            .map((_, index) => ({
                concentration: index,
                scale: -1,
                measurement: -1,
                calibrated: this.calibratedValue(index)
            }));
    }

    render() {
        return (
            <div id="app" className="container-fluid p-1">
                <CalibrationFormula
                    scale={this.state.scale}
                    constants={this.state.constants}
                    disabled={!!this.state.entries.length}
                    onScaleChange={this.onScaleChange}
                    onFormulaChange={this.onFormulaChange}
                />
                <hr />
                <Grid
                    entries={this.state.entries}
                    extrapolateConcentration={this.extrapolateConcentration}
                    calibratedValue={this.calibratedValue}
                />
                <hr />
                <AddEntry
                    key={this.state.entries.length}
                    scale={this.state.scale}
                    extrapolateConcentration={this.extrapolateConcentration}
                    calibratedValue={this.calibratedValue}
                    onEntryAdded={this.onEntryAdded}
                />
                <hr />
                <Chart
                    entries={this.state.entries}
                    calibrationCurve={this.calibrationCurve}
                    extrapolateConcentration={this.extrapolateConcentration}
                />
            </div>
        );
    }
}

export default App;
