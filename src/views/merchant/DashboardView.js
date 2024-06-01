"use client";

import * as React from 'react';
import {LineChart} from "@mui/x-charts";
import PieChartDashboard from "@/views/merchant/PieChartDashboard";
import LineChartDashboard from "@/views/merchant/LineChartDashboard";
import Stack from "@mui/material/Stack";


const series = [
    {
        type: 'bar',
        stack: '',
        yAxisKey: 'eco',
        data: [2, 5, 3, 4, 1],
    },
    {
        type: 'bar',
        stack: '',
        yAxisKey: 'eco',
        data: [5, 6, 2, 8, 9],
    },
    {
        type: 'line',
        yAxisKey: 'pib',
        color: 'red',
        data: [1000, 1500, 3000, 5000, 10000],
    },
];

export default function DashboardView() {

    return (

            <div style={{
                backgroundColor: 'lightblue',
                marginTop: '20%',
            }}>

                <div style={{marginBottom: '10%'}}>
                    <LineChartDashboard/>
                </div>
                <div className="flex items-center justify-center mb-2">
                    <PieChartDashboard/>
                </div>

            </div>
    );
}

