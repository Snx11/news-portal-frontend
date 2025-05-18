"use client"

import { useSelector, useDispatch } from "react-redux"
import { clearHistory } from "@/redux/historySlice"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"
import Link from "next/link"
import type { RootState } from "@/redux/store"

export default function HistoryPage() {
  const history = useSelector((state: RootState) => state.history.items)
  const dispatch = useDispatch()

  const handleClearHistory = () => {
    dispatch(clearHistory())

    // Also clear history in backend via our API route
    fetch("/api/history", {
      method: "DELETE",
    }).catch((error) => {
      console.error("Error clearing history from backend:", error)
    })
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleString("tr-TR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-xl">Geçmiş</CardTitle>
          {history.length > 0 && (
            <Button variant="outline" size="sm" onClick={handleClearHistory} className="h-8 gap-1">
              <Trash2 className="h-4 w-4" />
              <span>Geçmişi Temizle</span>
            </Button>
          )}
        </CardHeader>
        <CardContent>
          {history.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">Henüz görüntülenen haber bulunmamaktadır.</p>
              <p className="text-sm text-muted-foreground mt-2">Haberler görüntüledikçe burada listelenecektir.</p>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground mb-4">
                Son görüntülediğiniz {Math.min(history.length, 10)} haber
              </p>
              <ul className="divide-y">
                {history.slice(0, 10).map((item) => (
                  <li key={`${item.id}-${item.viewedAt}`} className="py-3">
                    <Link href={`/news/${item.id}`} className="block hover:bg-gray-50 rounded-md p-2 -mx-2">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                        <span className="font-medium text-sm">{item.title}</span>
                        <span className="text-xs text-muted-foreground">{formatDate(item.viewedAt)}</span>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
