"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { ChevronRight } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Weather {
  id: number
  date: string
  temperature: number
  condition: string
  icon: string
  city: string
}

export default function WeatherWidget() {
  const [weatherData, setWeatherData] = useState<Record<string, Weather[]>>({})
  const [loading, setLoading] = useState(true)
  const [selectedCity, setSelectedCity] = useState("Izmir")
  const cities = ["Istanbul", "Ankara", "Izmir", "Antalya", "Bursa"]

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const weatherByCity: Record<string, Weather[]> = {}

        // Fetch weather data for each city
        for (const city of cities) {
          const response = await fetch(`/api/weather?city=${city}`)
          if (!response.ok) {
            throw new Error(`Failed to fetch weather data for ${city}: ${response.statusText}`)
          }
          const data = await response.json()
          weatherByCity[city] = data
        }

        setWeatherData(weatherByCity)
      } catch (error) {
        console.error("Error fetching weather data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchWeatherData()
  }, [])

  const getWeatherIcon = (condition: string) => {
    const iconPath = "/weather-icons/"
    switch (condition?.toLowerCase()) {
      case "sunny":
        return `${iconPath}sunny.png`
      case "partly cloudy":
        return `${iconPath}partly-cloudy.png`
      case "cloudy":
        return `${iconPath}cloudy.png`
      case "rainy":
        return `${iconPath}rainy.png`
      default:
        return `${iconPath}sunny.png`
    }
  }

  const getDayName = (dateStr: string) => {
    const days = ["Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz"]
    const date = new Date(dateStr)
    return days[date.getDay() === 0 ? 6 : date.getDay() - 1]
  }

  if (loading) {
    return (
      <Card>
        <CardContent className="p-4">
          <Skeleton className="h-8 w-full mb-4" />
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-16 w-full" />
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Select value={selectedCity} onValueChange={setSelectedCity}>
              <SelectTrigger className="w-[100px] bg-transparent border-none text-white focus:ring-0">
                <SelectValue placeholder="Şehir Seç" />
              </SelectTrigger>
              <SelectContent>
                {cities.map((city) => (
                  <SelectItem key={city} value={city}>
                    {city}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <ChevronRight className="h-4 w-4 text-white" />
          </div>
          <div className="flex items-center">
            <div className="text-3xl font-bold text-white">{weatherData[selectedCity]?.[0]?.temperature || "--"}°C</div>
            <img
              src={getWeatherIcon(weatherData[selectedCity]?.[0]?.condition || "sunny")}
              alt="Weather"
              className="w-16 h-16"
            />
          </div>
        </div>

        <div className="p-2 text-xs text-gray-500">
          <div className="flex justify-between items-center mb-2">
            <span>Sıcaklık (°C)</span>
            <div className="flex items-center">
              <span>Günlük: Gelecek Cuma</span>
              <ChevronRight className="h-4 w-4 ml-1" />
            </div>
          </div>

          <div className="grid grid-cols-5 gap-2 text-center">
            {weatherData[selectedCity]?.slice(0, 5).map((day, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="font-medium text-xs">{index === 0 ? "Bugün" : getDayName(day.date)}</div>
                <img
                  src={getWeatherIcon(day.condition) || "/placeholder.svg"}
                  alt={day.condition}
                  className="w-7 h-7 my-1"
                />
                <div className="font-bold text-xs">{day.temperature}°</div>
                <div className="text-gray-400 text-xs">{Math.round(day.temperature - 4)}°</div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
