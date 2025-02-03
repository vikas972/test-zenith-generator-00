import { FileText, Cloud, Database, Globe } from "lucide-react";
import { SourceCard } from "../SourceCard";
import { useState } from "react";

export const SourceSelection = () => {
  const [selectedSource, setSelectedSource] = useState<string | null>(null);

  const sources = [
    {
      id: "jira",
      title: "JIRA",
      description: "Import test cases from JIRA issues and epics",
      icon: <Globe className="w-6 h-6" />,
    },
    {
      id: "confluence",
      title: "Confluence",
      description: "Import from Confluence pages and spaces",
      icon: <Cloud className="w-6 h-6" />,
    },
    {
      id: "local",
      title: "Local Files",
      description: "Import from local files and directories",
      icon: <FileText className="w-6 h-6" />,
    },
    {
      id: "database",
      title: "Database",
      description: "Import from existing test databases",
      icon: <Database className="w-6 h-6" />,
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-3 animate-fade-in">Select Source</h2>
        <p className="text-gray-600 mb-8 animate-fade-in">Choose your preferred source to import test cases and begin the generation process.</p>
        <div className="grid md:grid-cols-2 gap-6 animate-fade-in">
          {sources.map((source) => (
            <SourceCard
              key={source.id}
              title={source.title}
              description={source.description}
              icon={source.icon}
              selected={selectedSource === source.id}
              onClick={() => setSelectedSource(source.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};