import { NextResponse } from "next/server"
import { fallbackNews } from "@/lib/fallback-data"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const id = params.id

  try {
    
    const response = await fetch(`https://news-portal-backend-4.onrender.com/api/news/${id}`, {
      next: { revalidate: 60 }, // Cache for 60 seconds
    })

    if (!response.ok) {
      throw new Error(`Backend responded with status: ${response.status}`)
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.log(`Error fetching news ${id} from backend, using fallback data:`, error)

    // Find the news item in fallback data
    const newsItem = fallbackNews.find((item) => item.id.toString() === id)

    if (newsItem) {
      return NextResponse.json(newsItem)
    } else {
      return NextResponse.json({ error: "News not found" }, { status: 404 })
    }
  }
}
