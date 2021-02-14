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
            [event.target.name]: event.target.valueAsNumber
        });
    };

    render() {
        return (
            <div>
                <div>
                    A: <input type="number" name="a" value={this.props.constants.a} onChange={this.changeConstant} />
                    B: <input type="number" name="b" value={this.props.constants.b} onChange={this.changeConstant} />
                    Measurement scale:{" "}
                    <input type="number" name="scale" value={this.props.scale} onChange={this.changeScale} />
                </div>

                <div>
                    <span>
                        Calibration formula: <i>y = a * x + b</i>
                    </span>
                </div>
            </div>
        );
    }
}
