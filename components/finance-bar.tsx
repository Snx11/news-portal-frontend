"use client"

import { useEffect, useState } from "react"
import { TrendingDown, TrendingUp } from "lucide-react"

interface Finance {
  id: number
  name: string
  value: number
  change: number
  changePercent: number
}

export default function FinanceBar() {
  const [financeData, setFinanceData] = useState<Finance[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchFinanceData = async () => {
      try {
        const response = await fetch("https://news-portal-backend-4.onrender.com//api/finance")
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
      <div className="w-full bg-white py-2 overflow-hidden border-b border-gray-200">
        <div className="container mx-auto">
          <div className="animate-pulse flex space-x-8 overflow-x-auto">
            {[...Array(7)].map((_, i) => (
              <div key={i} className="h-4 bg-gray-200 rounded w-24"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full bg-white py-2 overflow-hidden border-b border-gray-200">
      <div className="container mx-auto">
        <div className="flex space-x-8 overflow-x-auto whitespace-nowrap px-4">
          {financeData.map((item) => (
            <div key={item.id} className="flex items-center space-x-2">
              <span className="font-medium text-gray-800 text-sm">{item.name}</span>
              <span className="font-medium text-sm">{item.value.toFixed(2)}</span>
              <span
                className={`flex items-center text-xs ${item.changePercent >= 0 ? "text-green-600" : "text-red-600"}`}
              >
                {item.changePercent >= 0 ? (
                  <>
                    <TrendingUp className="h-3 w-3 mr-1" />
                    <span>%{item.changePercent.toFixed(2)}</span>
                  </>
                ) : (
                  <>
                    <TrendingDown className="h-3 w-3 mr-1" />
                    <span>%{Math.abs(item.changePercent).toFixed(2)}</span>
                  </>
                )}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
