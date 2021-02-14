import { Component } from "react";
import { CalibrationConstants, Entry } from "./domain";
import { Grid } from "./Grid";
import { Chart } from "./Chart";
import { CalibrationFormula } from "./CalibrationFormula";
import { AddEntry } from "./AddEntry";
import "./styles.css";

interface IAppState {
    scale: Number;
    constants: CalibrationConstants;
    entries: Entry[];
}

export class App extends Component<{}, IAppState> {
    constructor(props: {}) {
        super(props);

        this.onScaleChange = this.onScaleChange.bind(this);
        this.onFormulaChange = this.onFormulaChange.bind(this);
        this.onEntryAdded = this.onEntryAdded.bind(this);

        this.state = {
            scale: 1,
            constants: [null, null],
            entries: []
        };
    }

    extrapolateConcentration(measurement: Number, scale: Number = this.state.scale): Number {
        return -1;
    }

    calibratedValue(concentration: Number, scale: Number = this.state.scale): Number {
        return -1;
    }

    onScaleChange(scale: Number) {
        this.setState({ scale });
    }

    onFormulaChange(constants: CalibrationConstants) {
        this.setState({ constants });
    }

    onEntryAdded(entry: Entry) {
        this.setState({ entries: [...this.state.entries, entry] });
    }

    get measurements(): Entry[] {
        return []; //this.state.entries.map(({ concentration: x, measurement: y }) => ({ x, y, c: -1 }));
    }

    get calibrationCurve(): Entry[] {
        return [];
    }

    render() {
        return (
            <div>
                <CalibrationFormula onScaleChange={this.onScaleChange} onFormulaChange={this.onFormulaChange} />
                <hr />
                <Grid entries={this.measurements} extrapolateConcentration={this.extrapolateConcentration} />
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
