import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Code, AlertCircle } from "lucide-react";

interface TestCasesProps {
  selectedFile: { id: string; name: string; uploadTime: Date } | null;
}

export const TestCases = ({ selectedFile }: TestCasesProps) => {
  const [selectedTool] = useState("selenium");

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold mb-6">Test Case Generation</h2>

      <Tabs defaultValue={selectedTool} className="space-y-6">
        <TabsList>
          <TabsTrigger value="selenium">Selenium</TabsTrigger>
          <TabsTrigger value="cypress">Cypress</TabsTrigger>
          <TabsTrigger value="playwright">Playwright</TabsTrigger>
        </TabsList>

        <TabsContent value="selenium" className="space-y-4">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Code className="h-6 w-6 text-primary" />
                <h3 className="font-semibold text-lg">Login Test Case</h3>
              </div>
              <Button variant="outline">Copy Code</Button>
            </div>

            <div className="bg-gray-900 text-gray-100 p-4 rounded-md font-mono text-sm">
              {`@Test
public void testLoginFlow() {
    driver.get("https://example.com/login");
    WebElement username = driver.findElement(By.id("username"));
    WebElement password = driver.findElement(By.id("password"));
    
    username.sendKeys("testuser");
    password.sendKeys("password123");
    
    driver.findElement(By.id("login-button")).click();
    
    WebElement dashboard = driver.findElement(By.className("dashboard"));
    Assert.assertTrue(dashboard.isDisplayed());
}`}
            </div>

            <div className="mt-4 flex items-center gap-2 text-amber-600 bg-amber-50 p-3 rounded-md">
              <AlertCircle className="h-5 w-5" />
              <span className="text-sm">
                Consider adding wait conditions for better reliability
              </span>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="cypress">
          {/* Similar structure for Cypress */}
          <div className="text-center text-gray-600 py-8">
            Select a scenario to generate Cypress test cases
          </div>
        </TabsContent>

        <TabsContent value="playwright">
          {/* Similar structure for Playwright */}
          <div className="text-center text-gray-600 py-8">
            Select a scenario to generate Playwright test cases
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
