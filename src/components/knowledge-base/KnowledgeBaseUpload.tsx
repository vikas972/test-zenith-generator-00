
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";

export const KnowledgeBaseUpload = () => {
  return (
    <div className="flex flex-col gap-4">
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Upload Documents</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border-2 border-dashed rounded-lg p-8 text-center">
            <div className="flex flex-col items-center gap-4">
              <div className="bg-primary/5 p-4 rounded-full">
                <Upload className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">Drag and drop your files here</h3>
                <p className="text-sm text-gray-500 mt-1">or click to browse files</p>
              </div>
              <Button variant="default" className="bg-primary hover:bg-primary/90">
                Browse Files
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
