import { ChangeEvent, Component } from "react";
import { CalibrationConstants } from "./domain";

interface IProperties {
    scale: number;
    constants: CalibrationConstants;
    onScaleChange(scale: number): void;
    onFormulaChange(constants: CalibrationConstants);
}

interface IState {
    scale: number;
    constants: CalibrationConstants;
}

export class CalibrationFormula extends Component<IProperties, IState> {
    constructor(props: IProperties) {
        super(props);

        const { scale, constants } = props;

        this.state = { scale, constants };
    }

    changeScale = (event: ChangeEvent<HTMLInputElement>) => {
        this.props.onScaleChange(event.target.valueAsNumber);
    };

    changeConstant = (event: ChangeEvent<HTMLInputElement>) => {
        this.props.onFormulaChange({
            ...this.props.constants,
            [event.target.id]: event.target.valueAsNumber
        });
    };

    render() {
        return (
            <div className="row justify-content-between">
                <div className="col-5">
                    <div className="row p-1">
                        <label className="col-4 text-end col-form-label" htmlFor="a">
                            A:
                        </label>
                        <input
                            className="col-8"
                            type="number"
                            id="a"
                            value={this.props.constants.a}
                            onChange={this.changeConstant}
                        />
                    </div>

                    <div className="row p-1">
                        <label className="col-4 text-end col-form-label" htmlFor="b">
                            B:
                        </label>
                        <input
                            className="col-8"
                            type="number"
                            id="b"
                            value={this.props.constants.b}
                            onChange={this.changeConstant}
                        />
                    </div>

                    <div className="row p-1">
                        <label className="col-4 text-end col-form-label" htmlFor="scale">
                            Measurement scale:
                        </label>
                        <input
                            className="col-8"
                            type="number"
                            name="scale"
                            value={this.props.scale}
                            onChange={this.changeScale}
                        />
                    </div>
                </div>

                <div className="col-4">
                    <span className="">
                        Calibration formula: <i>y = a * x + b</i>
                    </span>
                </div>
            </div>
        );
    }
}
