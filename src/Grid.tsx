import { Component } from "react";
import { Entry } from "./domain";

interface IGridProperties {
    entries: Entry[];
    extrapolateConcentration(measurement: number, scale?: number): number;
    calibratedValue(concentration: number): number;
}

export class Grid extends Component<IGridProperties> {
    render() {
        const empty = (
            <tr className="empty">
                <td colSpan={3}>
                    <i>empty</i>
                </td>
            </tr>
        );

        const entries = this.props.entries.map((entry, index) => {
            var { measurement, concentration, calibrated, scale } = entry;
            const extrapolate = null === entry.concentration;

            if (extrapolate) {
                concentration = this.props.extrapolateConcentration(measurement, scale);
                calibrated = this.props.calibratedValue(concentration);
            }

            return (
                <tr key={index} className={`${extrapolate ? "extrapolated" : ""}`}>
                    <td headers="concentration">{concentration}</td>
                    <td headers="calibrated">{calibrated}</td>
                    <td headers="measurement">{measurement}</td>
                </tr>
            );
        });

        return (
            <table>
                <thead>
                    <tr>
                        <th scope="col" id="concentration">
                            X Concentration
                        </th>
                        <th scope="col" id="calibrated">
                            Y (Theorectical)
                        </th>
                        <th scope="col" id="measurement">
                            Y (Measured)
                        </th>
                    </tr>
                </thead>

                <tbody>{entries.length ? entries : empty}</tbody>
            </table>
        );
    }
}
