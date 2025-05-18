"use client"

import { useSelector, useDispatch } from "react-redux"
import { clearHistory } from "@/redux/historySlice"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"
import Link from "next/link"
import type { RootState } from "@/redux/store"

export default function HistorySection() {
  const history = useSelector((state: RootState) => state.history.items)
  const dispatch = useDispatch()

  const handleClearHistory = () => {
    dispatch(clearHistory())

    // Also clear history in backend via our API route
    fetch("/api/history", {
      method: "DELETE",
    }).catch((error) => {
      console.error("Error clearing history in backend:", error)
    })
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Geçmiş</CardTitle>
        {history.length > 0 && (
          <Button variant="outline" size="sm" onClick={handleClearHistory} className="h-8 gap-1">
            <Trash2 className="h-4 w-4" />
            <span className="hidden sm:inline">Temizle</span>
          </Button>
        )}
      </CardHeader>
      <CardContent>
        {history.length === 0 ? (
          <p className="text-center text-muted-foreground py-4">Henüz görüntülenen haber bulunmamaktadır.</p>
        ) : (
          <ul className="space-y-2">
            {history.slice(0, 10).map((item) => (
              <li key={`${item.id}-${item.viewedAt}`} className="border-b pb-2 last:border-0">
                <Link href={`/news/${item.id}`} className="block hover:underline">
                  <div className="flex justify-between items-start">
                    <span className="font-medium">{item.title}</span>
                    <span className="text-xs text-muted-foreground ml-2">
                      {new Date(item.viewedAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  )
}
