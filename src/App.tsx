import { Component, ChangeEvent, MouseEvent } from "react";
import "./styles.css";

type Nullable<T> = T | null;

type CalibrationConstants = [Nullable<Number>, Nullable<Number>];

interface Entry {
    x: Nullable<Number>;
    y: Number;
    c?: Nullable<Number>;
}

interface IGridProperties {
    scale: Number;
    constants: CalibrationConstants;
    entries: Entry[];

    onScaleChange(scale: Number): void;
    onFormulaChange(constants: CalibrationConstants): void;
    onEntryAdded(entry: Entry): void;
}

interface IGridState {
    x?: Nullable<Number>;
    y?: Number;
}

export class Grid extends Component<IGridProperties, IGridState> {
    constructor(props: IGridProperties) {
        super(props);

        this.changeScale = this.changeScale.bind(this);
        this.changeA = this.changeA.bind(this);
        this.changeB = this.changeB.bind(this);
        this.addEntry = this.addEntry.bind(this);
        this.changeEntryValue = this.changeEntryValue.bind(this);

        this.state = {};
    }

    changeScale(event: ChangeEvent<HTMLInputElement>) {
        this.props.onScaleChange(event.target.valueAsNumber);
    }

    changeA(event: ChangeEvent<HTMLInputElement>) {
        const [, b] = this.props.constants;

        this.props.onFormulaChange([event.target.valueAsNumber, b]);
    }

    changeB(event: ChangeEvent<HTMLInputElement>) {
        const [a] = this.props.constants;

        this.props.onFormulaChange([a, event.target.valueAsNumber]);
    }

    changeEntryValue(event: ChangeEvent<HTMLInputElement>) {
        const { value, name } = event.target;

        console.log("changing the value");

        if ("" === value) this.setState({ [name]: void 0 });
        else this.setState({ [name]: parseFloat(value) });
    }

    addEntry(event: MouseEvent<HTMLButtonElement>) {
        const { x = null, y } = this.state;

        console.log(this.state);
        console.log(`X: ${x}, Y:${y}`);

        if (undefined === y) return;

        this.props.onEntryAdded({ x, y });

    }

    renderEntry({ x, y, c }: Entry, index : Number ){
        return (
            <tr key={`key_${index}`}>
                <td>{null === x ? "" : x}</td>
                <td>{null === c ? "" : c}</td>
                <td>{y}</td>
            </tr>
        );
    }

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
                                <input type="number" onChange={this.changeScale} />
                            </i>
                        </td>
                    </tr>

                    <tr>
                        <td colSpan={3}>
                            A: <input type="number" onChange={this.changeA} />
                        </td>
                    </tr>

                    <tr>
                        <td colSpan={3}>
                            B: <input type="number" onChange={this.changeB} />
                        </td>
                    </tr>

                    <tr>
                        <th scope="col">X Concentration</th>
                        <th scope="col">Y (Theorectical)</th>
                        <th scope="col">Y (Measured)</th>
                    </tr>
                </thead>

                <tbody>
                    {!!this.props.entries.length ? (
                        this.props.entries.map(this.renderEntry)
                    ) : (
                        <tr>
                            <td colSpan={3}>
                                <i>empty</i>
                            </td>
                        </tr>
                    )}
                </tbody>

                <tfoot>
                    <tr>
                        <th scope="col">
                            <input type="number" name="x" value={this.state.x} onChange={this.changeEntryValue} />
                        </th>
                        <th scope="col"> &nbsp; </th>
                        <th scope="col">
                            <input type="number" name="y" value={this.state.y} onChange={this.changeEntryValue} />
                            <button onClick={this.addEntry}>Add</button>
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

    onScaleChange(scale: Number) {
        this.setState({ scale });
    }

    onFormulaChange(constants: CalibrationConstants) {
        this.setState({ constants });
    }

    onEntryAdded(entry: Entry) {
        console.log(entry);
        this.setState({ entries: [...this.state.entries, entry] });
    }

    extrapolateEntries(): Entry[] {
        return this.state.entries.map(({ x, y }) => ({ x, y, c: -1 }));
    }

    calibrationCurve(): Entry[] {
        return [];
    }

    render() {
        return (
            <div>
                <Grid
                    scale={this.state.scale}
                    constants={this.state.constants}
                    entries={this.extrapolateEntries()}
                    onScaleChange={this.onScaleChange}
                    onFormulaChange={this.onFormulaChange}
                    onEntryAdded={this.onEntryAdded}
                />
                <hr />
                <Chart
                    scale={this.state.scale}
                    constants={this.state.constants}
                    entries={this.extrapolateEntries()}
                    calibrationCurve={this.calibrationCurve()}
                />
            </div>
        );
    }
}

export default App;
