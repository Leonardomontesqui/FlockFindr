"use client";
import React, { useEffect, useRef } from "react";
import { Chart, LineElement, LineController, CategoryScale, LinearScale, Tooltip, Title, PointElement } from "chart.js";
import { fetchRecentTimes, fetchRecentCounts } from "@/lib/supabase/useRestaurant";

// Register required Chart.js components
Chart.register(LineElement, LineController, CategoryScale, LinearScale, Tooltip, Title, PointElement);

const CustomerLineGraph: React.FC = () => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    const generateChartData = async () => {
      try {
        // Fetch data from the API
        const labels = await fetchRecentTimes();
        const values = await fetchRecentCounts();

        // Render the chart
        renderChart({ labels, values });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const renderChart = (data: { labels: string[]; values: number[] }) => {
      if (chartRef.current) {
        // Destroy existing chart instance if it exists
        if (chartInstance.current) {
          chartInstance.current.destroy();
        }

        // Create a new Chart.js instance
        chartInstance.current = new Chart(chartRef.current, {
          type: "line",
          data: {
            labels: data.labels,
            datasets: [
              {
                label: "Number of Customers",
                data: data.values,
                borderColor: "rgba(75, 192, 192, 1)",
                backgroundColor: "rgba(75, 192, 192, 0.2)", // Optional fill color under the line
                borderWidth: 2,
                tension: 0.4, // Smooth the line
                pointRadius: 4, // Adjust point size
                fill: true, // Fill area under the line
              },
            ],
          },
          options: {
            responsive: true,
            plugins: {
              title: {
                display: true,
                text: "Number of Customers Over Time",
              },
              tooltip: {
                enabled: true,
              },
            },
            scales: {
              x: {
                title: {
                  display: true,
                  text: "Time",
                },
              },
              y: {
                title: {
                  display: true,
                  text: "Number of Customers",
                },
                beginAtZero: true,
              },
            },
          },
        });
      }
    };

    // Initialize the chart with data
    generateChartData();

    // Update the chart every 5 minutes
    const intervalId = setInterval(() => {
      generateChartData();
    }, 5 * 60 * 1000); // 5 minutes

    // Cleanup function to destroy the chart instance and clear interval
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
        chartInstance.current = null;
      }
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Customer Trends</h2>
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default CustomerLineGraph;
