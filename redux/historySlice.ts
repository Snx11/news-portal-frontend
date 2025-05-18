import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface HistoryItem {
  id: number
  title: string
  viewedAt: string
}

interface HistoryState {
  items: HistoryItem[]
}

// Try to load history from localStorage if available
const loadHistoryFromStorage = (): HistoryItem[] => {
  if (typeof window !== "undefined") {
    const savedHistory = localStorage.getItem("newsHistory")
    if (savedHistory) {
      try {
        return JSON.parse(savedHistory)
      } catch (e) {
        console.error("Failed to parse history from localStorage", e)
      }
    }
  }
  return []
}

// Save history to localStorage
const saveHistoryToStorage = (history: HistoryItem[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("newsHistory", JSON.stringify(history))
  }
}

const initialState: HistoryState = {
  items: loadHistoryFromStorage(),
}

export const historySlice = createSlice({
  name: "history",
  initialState,
  reducers: {
    addToHistory: (state, action: PayloadAction<HistoryItem>) => {
      // Remove any existing entry with the same ID
      state.items = state.items.filter((item) => item.id !== action.payload.id)

      // Add the new item at the beginning
      state.items.unshift(action.payload)

      // Keep only the last 20 items
      if (state.items.length > 20) {
        state.items = state.items.slice(0, 20)
      }

      // Save to localStorage
      saveHistoryToStorage(state.items)
    },
    clearHistory: (state) => {
      state.items = []
      saveHistoryToStorage([])
    },
  },
})

export const { addToHistory, clearHistory } = historySlice.actions

export default historySlice.reducer
