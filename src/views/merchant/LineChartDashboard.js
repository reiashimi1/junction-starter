import {LineChart} from "@mui/x-charts";
import * as React from "react";
import Stack from "@mui/material/Stack";

const emptySeries = {
    series: [],
    margin: { top: 10, right: 10, left: 25, bottom: 25 },
    height: 150,
};

const LineChartDashboard= () => {
    return (
        <LineChart
            xAxis={[{data: [1, 2, 3, 5, 8, 10]}]}
            series={[
                {
                    data: [2, 5.5, 2, 8.5, 1.5, 5],
                },
            ]}
            height={400}
        />
    )
}


export default LineChartDashboard

