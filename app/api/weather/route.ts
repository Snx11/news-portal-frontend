import { NextResponse } from "next/server"
import { fallbackWeather } from "@/lib/fallback-data"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const city = searchParams.get("city")

  try {
    // Try to fetch from the backend with updated port 8081
    const url = city ? `https://news-portal-backend-4.onrender.com/api/weather?city=${city}` : "hhttps://news-portal-backend-4.onrender.com/api/weather"

    const response = await fetch(url, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    })

    if (!response.ok) {
      throw new Error(`Backend responded with status: ${response.status}`)
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.log("Error fetching weather data from backend, using fallback data:", error)

    // Return fallback data if backend is unavailable
    if (city) {
      const cityKey = city.toLowerCase()
      const cityData = cityKey in fallbackWeather
        ? fallbackWeather[cityKey as keyof typeof fallbackWeather]
        : fallbackWeather["istanbul"]
      return NextResponse.json(cityData)
    } else {
      return NextResponse.json(fallbackWeather["istanbul"])
    }
  }
}
