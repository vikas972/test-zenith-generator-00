
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { KB_CATEGORIES } from "../constants/categories"
import { EntriesGrid } from "./EntriesGrid"
import { KBEntry } from "../types"

interface CategoryTabsProps {
  selectedTab: string
  onTabChange: (value: string) => void
  entries: KBEntry[]
  onAdd: (category: string) => void
  onEdit: (entry: KBEntry) => void
  onDelete: (entryId: string) => void
}

export const CategoryTabs = ({
  selectedTab,
  onTabChange,
  entries,
  onAdd,
  onEdit,
  onDelete
}: CategoryTabsProps) => {
  // Filter entries for each category
  const getEntriesByCategory = (category: string) => {
    return entries.filter(entry => entry.category === category)
  }

  return (
    <Tabs value={selectedTab} onValueChange={onTabChange}>
      <div className="border rounded-md">
        <div className="overflow-auto">
          <TabsList className="w-full inline-flex h-auto p-0 bg-transparent">
            {KB_CATEGORIES.map(category => (
              <TabsTrigger
                key={category}
                value={category}
                className="flex-1 px-4 py-2.5 whitespace-nowrap data-[state=active]:bg-primary data-[state=active]:text-white data-[state=inactive]:text-primary border-r last:border-r-0 rounded-none"
              >
                {category}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
      </div>

      {KB_CATEGORIES.map(category => (
        <TabsContent key={category} value={category}>
          <EntriesGrid
            category={category}
            entries={getEntriesByCategory(category)}
            onAdd={onAdd}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        </TabsContent>
      ))}
    </Tabs>
  )
}
