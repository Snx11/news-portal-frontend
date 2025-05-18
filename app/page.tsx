"use client"

import { useEffect, useState } from "react"
import NewsSlider from "@/components/news-slider"
import FinanceBar from "@/components/finance-bar"
import WeatherWidget from "@/components/weather-widget"
import HistoryWidget from "@/components/history-widget"
import Advertisement from "@/components/advertisement"
import FinanceSection from "@/components/finance-section"

export default function Home() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Finance Bar */}
      <FinanceBar />

      <div className="container mx-auto px-4 py-4">
        {/* Main Content with Ads */}
        <div className="flex flex-col md:flex-row">
          {/* Left Advertisement */}
          <div className="hidden md:block md:w-[160px] mr-4">
            <Advertisement position="left" />
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <NewsSlider />
              </div>
              <div className="md:col-span-1 space-y-4">
                <HistoryWidget />
                <WeatherWidget />
                <FinanceSection />
              </div>
            </div>
          </div>

          {/* Right Advertisement */}
          <div className="hidden md:block md:w-[160px] ml-4">
            <Advertisement position="right" />
          </div>
        </div>
      </div>
    </main>
  )
}
