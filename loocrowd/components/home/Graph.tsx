"use client";
import React, { useEffect, useState } from "react";
import { Chart, LineElement, LineController, CategoryScale, LinearScale, Tooltip, Title, PointElement } from "chart.js";
import { fetchRecentTimes, fetchRecentCounts } from "@/lib/supabase/useRestaurant";

// Register required Chart.js components
Chart.register(LineElement, LineController, CategoryScale, LinearScale, Tooltip, Title, PointElement);

const CustomerLineGraph: React.FC = () => {
  const [isPanelOpen, setIsPanelOpen] = useState(false); // Panel visibility
  const chartRefs = React.useRef<Map<string, HTMLCanvasElement>>(new Map());
  const chartInstances = React.useRef<Map<string, Chart>>(new Map());

  // List of restaurants
  const restaurants = ["Timmies", "RCH"];

  useEffect(() => {
    const generateChartData = async (restaurant: string) => {
      try {
        // Fetch data for the given restaurant
        const labels = await fetchRecentTimes(restaurant);
        const values = await fetchRecentCounts(restaurant);

        // Render the chart for the given restaurant
        renderChart(restaurant, { labels, values });
      } catch (error) {
        console.error(`Error fetching data for ${restaurant}:`, error);
      }
    };

    const renderChart = (restaurant: string, data: { labels: string[]; values: number[] }) => {
      const canvas = chartRefs.current.get(restaurant);

      if (canvas) {
        // Destroy existing chart instance for the restaurant, if any
        if (chartInstances.current.has(restaurant)) {
          chartInstances.current.get(restaurant)?.destroy();
        }

        // Create a new Chart.js instance for the restaurant
        const chart = new Chart(canvas, {
          type: "line",
          data: {
            labels: data.labels,
            datasets: [
              {
                label: `Customer Trends: ${restaurant}`,
                data: data.values,
                borderColor: "rgba(75, 192, 192, 1)",
                backgroundColor: "rgba(75, 192, 192, 0.2)",
                borderWidth: 2,
                tension: 0.4,
                pointRadius: 4,
                fill: true,
              },
            ],
          },
          options: {
            responsive: true,
            plugins: {
              title: {
                display: true,
                text: `Number of Customers Over Time - ${restaurant}`,
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

        // Store the chart instance for the restaurant
        chartInstances.current.set(restaurant, chart);
      }
    };

    // Generate charts for all restaurants
    restaurants.forEach((restaurant) => generateChartData(restaurant));

    // Update the charts every 5 minutes
    const intervalId = setInterval(() => {
      restaurants.forEach((restaurant) => generateChartData(restaurant));
    }, 5 * 60 * 1000);

    // Destroy all chart instances and clear interval
    return () => {
      chartInstances.current.forEach((chart) => chart.destroy());
      chartInstances.current.clear();
      clearInterval(intervalId);
    };
  }, [restaurants]);

  return (
    <div>
      <button
        className="absolute top-4 right-4 z-50 bg-[#C20032] text-white px-4 py-2 rounded shadow-lg"
        onClick={() => setIsPanelOpen((prev) => !prev)}
      >
        {isPanelOpen ? "Close Chart Panel" : "Open Chart Panel"}
      </button>

      <div
        style={{ width: "600px" }}
        className={`fixed top-0 right-0 h-full bg-white shadow-xl transform transition-transform duration-300 z-40 ${
          isPanelOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-4 space-y-6">
          <h2 className="text-xl font-semibold">Customer Trends</h2>

          {restaurants.map((restaurant) => (
            <div key={restaurant}>
              <h3 className="text-lg font-medium mb-2">{restaurant}</h3>
              <canvas
                ref={(el) => {if (el) {chartRefs.current.set(restaurant, el);}}}                  
                className="w-full h-64"
              ></canvas>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CustomerLineGraph;
