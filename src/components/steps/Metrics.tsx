import { Button } from "@/components/ui/button";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Download, FileDown } from "lucide-react";

const data = [
  { name: "Scenarios", total: 15, covered: 12 },
  { name: "Test Cases", total: 45, covered: 38 },
  { name: "Requirements", total: 25, covered: 22 },
  { name: "Risk Items", total: 10, covered: 7 },
];

export const Metrics = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Metrics & Export</h2>
        <Button>
          <FileDown className="mr-2 h-4 w-4" />
          Export Report
        </Button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="font-semibold text-lg mb-4">Coverage Analysis</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="total" fill="#94a3b8" name="Total" />
                <Bar dataKey="covered" fill="#0ea5e9" name="Covered" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="font-semibold text-lg mb-4">Export Options</h3>
          <div className="space-y-4">
            <div className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Full Test Suite</h4>
                  <p className="text-sm text-gray-600">
                    Export all test cases and scenarios
                  </p>
                </div>
                <Download className="h-5 w-5 text-gray-400" />
              </div>
            </div>
            <div className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Coverage Report</h4>
                  <p className="text-sm text-gray-600">
                    Detailed coverage analysis
                  </p>
                </div>
                <Download className="h-5 w-5 text-gray-400" />
              </div>
            </div>
            <div className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Test Data Scripts</h4>
                  <p className="text-sm text-gray-600">
                    SQL scripts for test data
                  </p>
                </div>
                <Download className="h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};