import { Component } from "react";
import "./styles.css";

export class Grid extends Component {
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

export class Chart extends Component {
    render() {
        return (
            <div>
                <span>Chart goes here</span>
            </div>
        );
    }
}

export class App extends Component {
    render() {
        return (
            <div>
                <Grid />
                <hr />
                <Chart />
            </div>
        );
    }
}

export default App;
