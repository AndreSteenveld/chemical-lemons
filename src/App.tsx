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
            constants: { a: 1, b: 1 },
            entries: []
        };
    }

    extrapolateConcentration = (measurement: number, scale: number = this.state.scale): number => {
        return -1;
    };

    calibratedValue = (concentration: number): number => {
        return -1;
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

    get measurements(): Entry[] {
        return [];
    }

    get calibrationCurve(): Entry[] {
        return [];
    }

    render() {
        return (
            <div>
                <CalibrationFormula
                    scale={this.state.scale}
                    constants={this.state.constants}
                    onScaleChange={this.onScaleChange}
                    onFormulaChange={this.onFormulaChange}
                />
                <hr />
                <Grid
                    entries={this.measurements}
                    extrapolateConcentration={this.extrapolateConcentration}
                    calibratedValue={this.calibratedValue}
                />
                <hr />
                <AddEntry
                    scale={this.state.scale}
                    extrapolateConcentration={this.extrapolateConcentration}
                    calibratedValue={this.calibratedValue}
                    onEntryAdded={this.onEntryAdded}
                />
                <hr />
                <Chart entries={this.measurements} calibrationCurve={this.calibrationCurve} />
            </div>
        );
    }
}

export default App;
