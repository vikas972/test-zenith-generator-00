import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Database, Table as TableIcon } from "lucide-react";

export const TestData = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Test Data Generation</h2>
        <Button variant="outline">
          <Database className="mr-2 h-4 w-4" />
          Connect Database
        </Button>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-6">
          <TableIcon className="h-6 w-6 text-primary" />
          <div>
            <h3 className="font-semibold text-lg">Sample Test Data</h3>
            <p className="text-sm text-gray-600">
              Edit and generate test data for your scenarios
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4">ID</th>
                <th className="text-left py-3 px-4">Username</th>
                <th className="text-left py-3 px-4">Email</th>
                <th className="text-left py-3 px-4">Role</th>
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3].map((row) => (
                <tr key={row} className="border-b">
                  <td className="py-3 px-4">
                    <Input
                      defaultValue={`TEST_${row}`}
                      className="w-24"
                    />
                  </td>
                  <td className="py-3 px-4">
                    <Input
                      defaultValue={`user${row}`}
                      className="w-32"
                    />
                  </td>
                  <td className="py-3 px-4">
                    <Input
                      defaultValue={`user${row}@example.com`}
                      className="w-48"
                    />
                  </td>
                  <td className="py-3 px-4">
                    <Input
                      defaultValue="User"
                      className="w-32"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <Button variant="outline">Generate SQL</Button>
          <Button>Save Data</Button>
        </div>
      </div>
    </div>
  );
};