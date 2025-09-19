"use client";

import { Bar } from "react-chartjs-2";
import "@/lib/chartConfig";
import { useState, useEffect } from "react";
import axios from "axios";

type chartData = {
    labels: string[];
    datasets: {
        label: string;
        data: number[];
        backgroundColor: string;
    }[]
}


export default function BarChart() {
    const [chartData, setChartData] = useState<chartData>({
        labels: [],
        datasets: []
    })

    useEffect(() => {
        async function fetchData() {
            const response = await axios.get("/api/votes/results");
            const data = response.data.results[0]
            setChartData({
                labels: data.labels,
                datasets: [
                    {
                        label: "votes",
                        data: data.values,
                        backgroundColor: "rgba(75, 192, 192, 0.6)",
                    }
                ]
            })
        }

        fetchData();
    }, [])

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top" as const,
            },
            title: {
                display: true,
                text: "Election Results",
            },
        },
    };

    return (
        <div className="w-full max-w-xl">
            {chartData.labels.length > 0 ? (
                <Bar data={chartData} options={options} />
            ) : (
                <p>Loading chart...</p>
            )}
        </div>
    );
}
