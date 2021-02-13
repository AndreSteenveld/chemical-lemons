import { Component } from "react";
import "./styles.css";

type Nullable<T> = T | null;

type CalibrationConstants = [Nullable<Number>, Nullable<Number>];
type Entry = { x: Nullable<Number>; y: Number };

interface IGridProperties {
    scale: Number;
    constants: CalibrationConstants;
    entries: Entry[];

    onScaleChange(scale: Number): void;
    onFormulaChange(constants: CalibrationConstants): void;
    onEntryAdded(entry: Entry): void;
}

export class Grid extends Component<IGridProperties> {
    setScale() {}

    setA() {}

    setB() {}

    addEntry() {}

    render() {
        return (
            <table>
                <thead>
                    <tr>
                        <td colSpan={2}>
                            Calibration formula: <i>y = a * x + b</i>
                        </td>
                        <td>
                            Input and chart scale:
                            <i>
                                1e
                                <input type="number" />
                            </i>
                        </td>
                    </tr>

                    <tr>
                        <td colSpan={3}>
                            A: <input type="number" />
                        </td>
                    </tr>

                    <tr>
                        <td colSpan={3}>
                            B: <input type="number" />
                        </td>
                    </tr>

                    <tr>
                        <th scope="col">X Concentration</th>
                        <th scope="col">Y (Theorectical)</th>
                        <th scope="col">Y (Measured)</th>
                    </tr>
                </thead>

                <tbody>
                    <tr>
                        <td colSpan={3}>
                            <i>empty</i>
                        </td>
                    </tr>
                </tbody>

                <tfoot>
                    <tr>
                        <th scope="col">
                            <input type="number" />
                        </th>
                        <th scope="col"> &nbsp; </th>
                        <th scope="col">
                            <input type="number" />
                        </th>
                    </tr>
                </tfoot>
            </table>
        );
    }
}

interface IChartProperties {
    scale: Number;
    constants: CalibrationConstants;
    entries: Entry[];
    calibrationCurve: Entry[];
}

export class Chart extends Component<IChartProperties> {
    render() {
        return (
            <div>
                <span>Chart goes here</span>
            </div>
        );
    }
}

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

    onScaleChange(scale: Number) {}

    onFormulaChange(constants: CalibrationConstants) {}

    onEntryAdded(entry: Entry) {}

    calibrationCurve(): Entry[] {
        return [];
    }

    render() {
        return (
            <div>
                <Grid
                    scale={this.state.scale}
                    constants={this.state.constants}
                    entries={this.state.entries}
                    onScaleChange={this.onScaleChange}
                    onFormulaChange={this.onFormulaChange}
                    onEntryAdded={this.onEntryAdded}
                />
                <hr />
                <Chart
                    scale={this.state.scale}
                    constants={this.state.constants}
                    entries={this.state.entries}
                    calibrationCurve={this.calibrationCurve()}
                />
            </div>
        );
    }
}

export default App;
