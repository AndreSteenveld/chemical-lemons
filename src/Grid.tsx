import { Component, ChangeEvent, MouseEvent } from "react";
import { CalibrationConstants, Entry } from "./domain";

interface IGridProperties {
    scale: Number;
    constants: CalibrationConstants;
    entries: Entry[];

    onScaleChange(scale: Number): void;
    onFormulaChange(constants: CalibrationConstants): void;
    onEntryAdded(entry: Entry): void;
}
interface IGridState {
    //
    // Well, this isn't really great to be honest. I saw that there are several Numerical input types
    // for react available but all have a few downsides (not supported, dead project, unknown project).
    // So the quickest way around that is just make the state a catch all for everything... :(
    //
    x: any; // Nullable<Number> | String;
    y: any; // Number | String;
}

export class Grid extends Component<IGridProperties, IGridState> {
    constructor(props: IGridProperties) {
        super(props);

        this.changeScale = this.changeScale.bind(this);
        this.changeA = this.changeA.bind(this);
        this.changeB = this.changeB.bind(this);
        this.addEntry = this.addEntry.bind(this);
        this.changeEntryValue = this.changeEntryValue.bind(this);

        this.state = { x: "", y: "" };
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

        if ("" === value) this.setState({ [name]: value });
        else this.setState({ [name]: parseFloat(value) });
    }

    addEntry(event: MouseEvent<HTMLButtonElement>) {
        const { x = null, y } = this.state;

        if (undefined === y) return;

        this.props.onEntryAdded({ x, y });

        // Working on this Grid component, this line made me realize it has to be split up...
        this.setState({ x: "", y: "" });
    }

    renderEntry({ x, y, c }: Entry, index: Number) {
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
