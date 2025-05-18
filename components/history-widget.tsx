"use client"

import { useSelector } from "react-redux"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import type { RootState } from "@/redux/store"

export default function HistoryWidget() {
  const history = useSelector((state: RootState) => state.history.items)

  return (
    <Card className="overflow-hidden border-2 border-gray-300">
      <CardContent className="p-0">
        <div className="bg-gray-800 text-white p-2 font-medium text-sm flex justify-between items-center">
          <span>Geçmiş</span>
          {history.length > 11 && (
            <Link href="/history" className="text-xs text-blue-300 hover:text-blue-100">
              Tümünü Gör
            </Link>
          )}
        </div>
        <div className="p-11">
          {history.length === 0 ? (
            <p className="text-sm text-gray-500 py-2">Henüz görüntülenen haber bulunmamaktadır.</p>
          ) : (
            <ul className="space-y-2">
              {history.slice(0, 10).map((item) => (
                <li key={`${item.id}-${item.viewedAt}`} className="border-b pb-2 last:border-0">
                  <Link href={`/news/${item.id}`} className="block hover:text-blue-600">
                    <span className="text-xs font-medium line-clamp-1">{item.title}</span>
                  </Link>
                </li>
              ))}
              {history.length > 11 && (
                <li className="text-center pt-1">
                  <Link href="/history" className="text-xs text-blue-600 hover:underline">
                    Daha Fazla ({history.length - 3})
                  </Link>
                </li>
              )}
            </ul>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
