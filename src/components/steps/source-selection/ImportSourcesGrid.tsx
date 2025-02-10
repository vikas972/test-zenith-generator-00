
import { Globe, Cloud, FileText, Database } from "lucide-react";
import { SourceCard } from "../../SourceCard";
import { useRef } from "react";

interface ImportSourcesGridProps {
  selectedSource: string | null;
  onSourceSelect: (sourceId: string) => void;
  onFileSelect: (file: File) => void;
}

export const ImportSourcesGrid = ({ 
  selectedSource, 
  onSourceSelect,
  onFileSelect 
}: ImportSourcesGridProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSourceClick = (sourceId: string) => {
    onSourceSelect(sourceId);
    
    if (sourceId === "local" && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onFileSelect(file);
    }
  };

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
    <>
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileChange}
        accept=".doc,.docx,.pdf,.txt"
      />
      <div className="grid md:grid-cols-2 gap-6 mb-12">
        {sources.map((source) => (
          <SourceCard
            key={source.id}
            title={source.title}
            description={source.description}
            icon={source.icon}
            selected={selectedSource === source.id}
            onClick={() => handleSourceClick(source.id)}
          />
        ))}
      </div>
    </>
  );
};
