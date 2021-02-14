import { Component, ChangeEvent } from "react";
import { Entry } from "./domain";

interface IProperties {
    scale: number;

    extrapolateConcentration(measurement: number, scale?: number): number;
    calibratedValue(concentration: number, scale?: number): number;
    onEntryAdded(entry: Entry): void;
}

interface IState {
    extrapolatedConcentration: number | undefined;
    concentration: number | undefined;
    calibrated: number | undefined;
    measurement: number | undefined;
    scale: number | undefined;
}

export class AddEntry extends Component<IProperties, IState> {
    changeConcentration = (event: ChangeEvent<HTMLInputElement>) => {
        const concentration = event.target.valueAsNumber;

        this.setState({
            concentration,
            calibrated: this.props.calibratedValue(concentration, this.state.scale || this.props.scale)
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

        if ("number" === typeof measurement) {
            const extrapolatedConcentration = concentration || this.props.extrapolateConcentration(measurement, scale);

            this.setState({
                scale,
                extrapolatedConcentration,
                calibrated: this.props.calibratedValue(extrapolatedConcentration, scale)
            });
        } else {
            this.setState({ scale });
        }
    };

    clear = () => {
        this.setState({
            extrapolatedConcentration: undefined,
            concentration: undefined,
            measurement: undefined,
            scale: undefined
        });
    };

    addEntry = () => {
        const { measurement, concentration, calibrated, scale, extrapolatedConcentration } = this.state;

        this.props.onEntryAdded({
            concentration: concentration || extrapolatedConcentration,
            measurement,
            calibrated,
            scale
        });
    };

    render() {
        return (
            <div>
                <button onClick={this.clear}>X</button>

                <input
                    type="numeric"
                    name="concentration"
                    placeholder={this.state.extrapolatedConcentration.toString()}
                    onChange={this.changeConcentration}
                />

                <input type="numeric" name="measurement" onChange={this.changeMeasurement} />

                <button onClick={this.addEntry}>Add</button>

                <input
                    type="numeric"
                    name="scale"
                    placeholder={(1).toExponential(this.props.scale)}
                    onChange={this.changeScale}
                />
            </div>
        );
    }
}
