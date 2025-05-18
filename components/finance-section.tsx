"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { TrendingDown, TrendingUp } from "lucide-react"

interface Finance {
  id: number
  name: string
  value: number
  change: number
  changePercent: number
}

export default function FinanceSection() {
  const [financeData, setFinanceData] = useState<Finance[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchFinanceData = async () => {
      try {
        // Use our Next.js API route instead of directly calling the backend
        const response = await fetch("/api/finance")
        if (!response.ok) {
          throw new Error(`Failed to fetch finance data: ${response.statusText}`)
        }
        const data = await response.json()
        setFinanceData(data)
      } catch (error) {
        console.error("Error fetching finance data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchFinanceData()
  }, [])

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Finans</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex justify-between items-center">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-16" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Finans</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-3 text-sm font-medium text-muted-foreground">
            <div>Birim</div>
            <div className="text-right">Değer</div>
            <div className="text-right">Değişim</div>
          </div>
          <div className="space-y-2">
            {financeData.map((item) => (
              <div key={item.id} className="grid grid-cols-3 items-center py-1">
                <div className="font-medium">{item.name}</div>
                <div className="text-right">{item.value.toFixed(2)}</div>
                <div className="flex items-center justify-end">
                  <span className={`flex items-center ${item.change >= 0 ? "text-green-600" : "text-red-600"}`}>
                    {item.change >= 0 ? (
                      <TrendingUp className="h-3 w-3 mr-1" />
                    ) : (
                      <TrendingDown className="h-3 w-3 mr-1" />
                    )}
                    {item.changePercent.toFixed(2)}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
