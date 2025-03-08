
import { useState } from "react"
import { KBEntry } from "../types"
import { mockEntries } from "../data/mockEntries"

export const useEntriesState = () => {
  const [entries, setEntries] = useState<KBEntry[]>(mockEntries)

  return {
    entries,
    setEntries
  }
}
