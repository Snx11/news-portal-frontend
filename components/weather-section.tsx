"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Cloud, CloudRain, CloudSun, Sun } from "lucide-react"

interface Weather {
  id: number
  date: string
  temperature: number
  condition: string
  icon: string
  city: string
}

export default function WeatherSection() {
  const [weatherData, setWeatherData] = useState<Record<string, Weather[]>>({})
  const [loading, setLoading] = useState(true)
  const [selectedCity, setSelectedCity] = useState("Istanbul")
  const cities = ["Istanbul", "Ankara", "Izmir", "Antalya", "Bursa"]

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const weatherByCity: Record<string, Weather[]> = {}

        // Fetch weather data for each city using our API route
        for (const city of cities) {
          const response = await fetch(`https://news-portal-backend-4.onrender.com//api/weather?city=${city}`)
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
    switch (condition?.toLowerCase()) {
      case "sunny":
        return <Sun className="h-6 w-6 text-yellow-500" />
      case "partly cloudy":
        return <CloudSun className="h-6 w-6 text-blue-400" />
      case "cloudy":
        return <Cloud className="h-6 w-6 text-gray-400" />
      case "rainy":
        return <CloudRain className="h-6 w-6 text-blue-600" />
      default:
        return <Sun className="h-6 w-6 text-yellow-500" />
    }
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Hava Durumu</CardTitle>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-8 w-full mb-4" />
          <div className="grid grid-cols-5 gap-2">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-24 w-full" />
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Hava Durumu</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue={selectedCity} onValueChange={setSelectedCity}>
          <TabsList className="grid grid-cols-5 mb-4">
            {cities.map((city) => (
              <TabsTrigger key={city} value={city}>
                {city}
              </TabsTrigger>
            ))}
          </TabsList>

          {cities.map((city) => (
            <TabsContent key={city} value={city}>
              {weatherData[city] && weatherData[city].length > 0 ? (
                <div className="grid grid-cols-5 gap-2">
                  {weatherData[city].slice(0, 5).map((day, index) => (
                    <div
                      key={index}
                      className="flex flex-col items-center justify-center p-2 rounded-md border text-center"
                    >
                      <div className="text-xs font-medium mb-1">{day.date}</div>
                      <div className="mb-1">{getWeatherIcon(day.condition)}</div>
                      <div className="text-lg font-bold">{day.temperature}°C</div>
                      <div className="text-xs text-muted-foreground">{day.condition}</div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-muted-foreground">Bu şehir için hava durumu verisi bulunamadı.</p>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  )
}
