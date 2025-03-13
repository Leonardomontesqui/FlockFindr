"use client";

import {
  Calendar,
  Clock,
  ChevronDown,
  ChevronRight,
  Users,
  HelpCircle,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Mock data for the chart
const chartData = [
  { day: "Mon", value: 30 },
  { day: "Tue", value: 45 },
  { day: "Wed", value: 55 },
  { day: "Thu", value: 55 },
  { day: "Fri", value: 25 },
];

export default function AnalyticsDashboard() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r p-4">
        <div className="mb-8">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-fgm37a3mUo5LYfp1KEjsImYmOlr0qK.png"
            alt="Occuspace Logo"
            className="h-8"
          />
        </div>
        <nav className="space-y-2">
          <div className="flex items-center gap-2 p-2 text-sm text-gray-600">
            <Users size={20} />
            <span>OccuDemo</span>
          </div>
          <div className="flex items-center gap-2 p-2 text-sm text-blue-600 bg-blue-50 rounded">
            <Users size={20} />
            <span>Austin Office</span>
            <ChevronDown className="ml-auto" size={16} />
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-2 text-gray-600 text-sm mb-4">
              <span>Analytics</span>
              <ChevronRight size={16} />
              <span>OccuDemo</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Users size={24} className="text-gray-700" />
                <h1 className="text-2xl font-semibold text-gray-900">
                  Austin Office
                </h1>
                <span className="text-sm px-2 py-1 bg-blue-50 text-blue-700 rounded">
                  Live (7/7)
                </span>
              </div>
              <div className="flex items-center gap-4">
                <Button variant="outline">Export Data</Button>
                <Button variant="outline">Space Details</Button>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="flex gap-4 mb-8">
            <Button variant="outline" className="flex items-center gap-2">
              <Calendar size={16} />
              Jul 22, 2024 - Jul 26, 2024
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Clock size={16} />
              08:00am - 05:00pm
            </Button>
            <Button variant="outline">Mon - Fri</Button>
            <Button variant="outline">Filters</Button>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-3 gap-6 mb-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-gray-600">Average Daily Occupancy</div>
                  <HelpCircle size={16} className="text-gray-400" />
                </div>
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 rounded-full border-4 border-blue-200 flex items-center justify-center">
                    <span className="text-sm text-blue-600">14%</span>
                  </div>
                  <span className="text-3xl font-semibold">42</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-gray-600">Peak Occupancy</div>
                  <HelpCircle size={16} className="text-gray-400" />
                </div>
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 rounded-full border-4 border-blue-200 flex items-center justify-center">
                    <span className="text-sm text-blue-600">29%</span>
                  </div>
                  <span className="text-3xl font-semibold">85</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-gray-600">Average Daily Visitors</div>
                  <HelpCircle size={16} className="text-gray-400" />
                </div>
                <div className="flex items-center gap-4">
                  <Users size={32} className="text-blue-600" />
                  <span className="text-3xl font-semibold">63</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Additional Metrics */}
          <div className="grid grid-cols-3 gap-6 mb-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 text-gray-600">
                  <Clock size={20} className="text-gray-400" />
                  <div>
                    <div className="flex items-center justify-between">
                      <div>Peak Hours</div>
                      <HelpCircle size={16} className="text-gray-400" />
                    </div>
                    <div className="text-gray-900 mt-2">1pm, 2pm, and 3pm</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 text-gray-600">
                  <Calendar size={20} className="text-blue-400" />
                  <div>
                    <div>Busiest Day</div>
                    <div className="text-gray-900 mt-2">Jul 25, 2024</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 text-gray-600">
                  <Calendar size={20} className="text-blue-400" />
                  <div>
                    <div>Quietest Day</div>
                    <div className="text-gray-900 mt-2">Jul 26, 2024</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Chart */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold">Daily Occupancy</h3>
                <ChevronRight size={20} className="text-gray-400" />
              </div>
              <div className="h-64">
                <div className="flex h-full items-end gap-4">
                  {chartData.map((data, i) => (
                    <div
                      key={i}
                      className="flex-1 flex flex-col items-center gap-2"
                    >
                      <div
                        className="w-full bg-blue-500 rounded-t"
                        style={{ height: `${data.value}%` }}
                      />
                      <span className="text-sm text-gray-600">{data.day}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
