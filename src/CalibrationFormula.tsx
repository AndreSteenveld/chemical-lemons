import { ChangeEvent, Component } from "react";
import { CalibrationConstants } from "./domain";

interface IProperties {
    scale: number;
    constants: CalibrationConstants;
    disabled: boolean;
    onScaleChange(scale: number): void;
    onFormulaChange(constants: CalibrationConstants): void;
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
            [event.target.name]: event.target.valueAsNumber
        });
    };

    render() {
        return (
            <div className="row g-1">
                <div className="col-6 ms-auto text-end">
                    <span className="h4">
                        Calibration formula: <i>y = a * x + b</i>
                    </span>
                </div>

                <div className="col-4 align-self-start order-first">
                    <div className="input-group">
                        <span className="input-group-text">A:</span>
                        <input
                            className="form-control"
                            type="number"
                            name="a"
                            value={this.props.constants.a}
                            onChange={this.changeConstant}
                            disabled={this.props.disabled}
                        />
                    </div>
                </div>

                <div className="w-100" />

                <div className="col-4 align-self-start">
                    <div className="input-group">
                        <span className="input-group-text">B:</span>
                        <input
                            className="form-control"
                            type="number"
                            name="b"
                            value={this.props.constants.b}
                            onChange={this.changeConstant}
                            disabled={this.props.disabled}
                        />
                    </div>
                </div>

                <div className="w-100" />

                <div className="col-4 align-self-start">
                    <div className="input-group">
                        <span className="input-group-text">Scale:</span>
                        <input
                            className="form-control"
                            type="number"
                            name="scale"
                            value={this.props.scale}
                            onChange={this.changeScale}
                        />
                    </div>
                </div>
            </div>
        );
    }
}
