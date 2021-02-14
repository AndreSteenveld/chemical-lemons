import { Component } from "react";
import { CalibrationConstants, Entry } from "./domain";
import { Grid } from "./Grid";
import { Chart } from "./Chart";
import "./styles.css";
import { CalibrationFormula } from "./CalibrationFormula";
import { AddEntry } from "./AddEntry";

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

    onScaleChange(scale: Number) {
        this.setState({ scale });
    }

    onFormulaChange(constants: CalibrationConstants) {
        this.setState({ constants });
    }

    onEntryAdded(entry: Entry) {
        this.setState({ entries: [...this.state.entries, entry] });
    }

    get extrapolateEntries(): Entry[] {
        return this.state.entries.map(({ x, y }) => ({ x, y, c: -1 }));
    }

    get calibrationCurve(): Entry[] {
        return [];
    }

    render() {
        return (
            <div>
                <CalibrationFormula />
                <hr />
                <Grid
                    scale={this.state.scale}
                    constants={this.state.constants}
                    entries={this.extrapolateEntries}
                    onScaleChange={this.onScaleChange}
                    onFormulaChange={this.onFormulaChange}
                    onEntryAdded={this.onEntryAdded}
                />
                <hr />
                <AddEntry />
                <hr />
                <Chart
                    scale={this.state.scale}
                    constants={this.state.constants}
                    entries={this.extrapolateEntries}
                    calibrationCurve={this.calibrationCurve}
                />
            </div>
        );
    }
}

export default App;
