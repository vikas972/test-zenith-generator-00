
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export const RelationshipsTab = () => {
  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-500">
        Manage relationships between documents, products, and domains
      </p>
      <Button variant="outline">
        <Plus className="h-4 w-4 mr-2" />
        Create Relationship
      </Button>
    </div>
  )
}
