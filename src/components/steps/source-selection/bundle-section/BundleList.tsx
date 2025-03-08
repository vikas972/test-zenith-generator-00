
import { RequirementBundle } from "../types";
import { BundleItem } from "../components/bundle-item";
import { EmptyBundleState } from "../components/EmptyBundleState";

interface BundleListProps {
  bundles: RequirementBundle[];
  expandedBundleId: string | null;
  selectedBundleId: string | null;
  onToggleExpand: (bundleId: string) => void;
  onDeleteBundle: (bundleId: string) => void;
  onRetryBundle: (bundleId: string) => void;
  onAddFile: (bundleId: string) => void;
  onDeleteFile: (bundleId: string, fileId: string) => void;
  onSelectBundle: (bundleId: string | null) => void;
  onImportBundle: (bundleId: string) => void;
  onCreateBundle: () => void;
}

export const BundleList = ({
  bundles,
  expandedBundleId,
  selectedBundleId,
  onToggleExpand,
  onDeleteBundle,
  onRetryBundle,
  onAddFile,
  onDeleteFile,
  onSelectBundle,
  onImportBundle,
  onCreateBundle,
}: BundleListProps) => {
  if (bundles.length === 0) {
    return <EmptyBundleState onCreateBundle={onCreateBundle} />;
  }

  // Add a unique key for each bundle based on ID
  // Ensure no duplicate IDs by checking the bundle array
  const uniqueBundles = bundles.reduce<RequirementBundle[]>((acc, bundle) => {
    // If we haven't seen this ID before, add it to our accumulator
    if (!acc.some(b => b.id === bundle.id)) {
      acc.push(bundle);
    }
    return acc;
  }, []);

  return (
    <div className="space-y-4">
      {uniqueBundles.map(bundle => (
        <BundleItem
          key={`bundle-item-${bundle.id}`}
          bundle={bundle}
          isExpanded={expandedBundleId === bundle.id}
          isSelected={selectedBundleId === bundle.id}
          onToggleExpand={onToggleExpand}
          onDeleteBundle={onDeleteBundle}
          onRetryBundle={onRetryBundle}
          onAddFile={onAddFile}
          onDeleteFile={onDeleteFile}
          onSelectBundle={onSelectBundle}
          onImportBundle={onImportBundle}
        />
      ))}
    </div>
  );
};
