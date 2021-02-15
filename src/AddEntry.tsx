import { Component, ChangeEvent } from "react";
import { Entry } from "./domain";

interface IProperties {
    scale: number;

    extrapolateConcentration(measurement: number, scale?: number): number;
    calibratedValue(concentration: number): number;
    onEntryAdded(entry: Entry): void;
}

interface IState {
    extrapolatedConcentration: number | string;
    concentration: number | undefined;
    calibrated: number | undefined;
    measurement: number | undefined;
    scale: number | undefined;
}

export class AddEntry extends Component<IProperties, IState> {
    state: IState = {
        extrapolatedConcentration: "",
        concentration: undefined,
        calibrated: undefined,
        measurement: undefined,
        scale: undefined
    };

    changeConcentration = (event: ChangeEvent<HTMLInputElement>) => {
        const concentration = event.target.valueAsNumber;

        this.setState({
            concentration,
            calibrated: this.props.calibratedValue(concentration)
        });
    };

    changeMeasurement = (event: ChangeEvent<HTMLInputElement>) => {
        const measurement = event.target.valueAsNumber;

        this.setState({
            measurement,
            extrapolatedConcentration: this.props.extrapolateConcentration(
                measurement,
                this.state.scale || this.props.scale
            )
        });
    };

    changeScale = (event: ChangeEvent<HTMLInputElement>) => {
        const scale = event.target.valueAsNumber;
        const { measurement, concentration } = this.state;

        // TODO: Fix for the proper behaviiour with extrapolated values
        if ("number" === typeof measurement) {
            const extrapolatedConcentration = concentration || this.props.extrapolateConcentration(measurement, scale);

            this.setState({
                scale,
                extrapolatedConcentration,
                calibrated: this.props.calibratedValue(extrapolatedConcentration)
            });
        } else {
            this.setState({ scale });
        }
    };

    clear = () => {
        this.setState({
            extrapolatedConcentration: "",
            concentration: undefined,
            measurement: undefined,
            scale: undefined
        });
    };

    addEntry = () => {
        const { measurement, concentration = null, calibrated = null, scale } = this.state;

        this.props.onEntryAdded({
            concentration,
            calibrated,
            measurement: measurement as number,
            scale: scale as number
        });
    };

    render() {
        return (
            <div className="row row-cols-auto g-1 align-items-center justify-content-around">
                <div className="col">
                    <button className="btn btn-sm btn-outline-danger" onClick={this.clear}>
                        X
                    </button>
                </div>

                <div className="col">
                    <div className="input-group">
                        <span className="input-group-text">X:</span>
                        <input
                            type="number"
                            name="concentration"
                            className="form-control"
                            placeholder={this.state.extrapolatedConcentration.toString()}
                            onChange={this.changeConcentration}
                        />
                    </div>
                </div>

                <div className="col">
                    <div className="input-group">
                        <span className="input-group-text">Y:</span>
                        <input
                            type="number"
                            name="measurement"
                            className="form-control"
                            onChange={this.changeMeasurement}
                        />
                    </div>
                </div>

                <div className="col">
                    <button className="btn btn-success" onClick={this.addEntry}>
                        Add
                    </button>
                </div>

                <div className="col">
                    <div className="input-group">
                        <span className="input-group-text">Scale:</span>
                        <input
                            type="number"
                            name="scale"
                            className="form-control"
                            placeholder={(1).toExponential(this.props.scale)}
                            onChange={this.changeScale}
                        />
                    </div>
                </div>
            </div>
        );
    }
}
