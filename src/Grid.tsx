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
            <tr className="empty text-center">
                <td colSpan={4}>
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
                    <th scope="row">{index + 1}</th>
                    <td headers="concentration" className="text-end">
                        {concentration}
                    </td>
                    <td headers="calibrated" className="text-center">
                        {calibrated}
                    </td>
                    <td headers="measurement" className="text-center">
                        {measurement}
                    </td>
                </tr>
            );
        });

        return (
            <table className="table table-striped table-sm">
                <thead>
                    <tr>
                        <th scope="col" id="row-no">
                            #
                        </th>
                        <th scope="col" className="text-end" id="concentration">
                            X Concentration
                        </th>
                        <th scope="col" className="text-center" id="calibrated">
                            Y (Theorectical)
                        </th>
                        <th scope="col" className="text-center" id="measurement">
                            Y (Measured)
                        </th>
                    </tr>
                </thead>

                <tbody>{entries.length ? entries : empty}</tbody>
            </table>
        );
    }
}
