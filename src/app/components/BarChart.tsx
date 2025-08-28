"use client"; // needed if you’re using Next.js 13+ app directory

import { Bar } from "react-chartjs-2";
import "@/lib/chartConfig"; // ensures Chart.js is registered
import { useState, useEffect } from "react";
import axios from "axios";

export default function BarChart() {
    const [chartData, setChartData] = useState<any>({
        labels: [],
        datasets: []
    })

    useEffect(() => {
        async function fetchData() {
            const response = await axios.get("/api/votes/results");
            console.log(response.data.results[0])
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
