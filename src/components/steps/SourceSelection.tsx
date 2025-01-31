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
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold mb-6">Select Source</h2>
      <div className="grid md:grid-cols-2 gap-6">
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
  );
};