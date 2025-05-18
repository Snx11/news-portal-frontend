"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { useDispatch } from "react-redux"
import { addToHistory } from "@/redux/historySlice"

interface News {
  id: number
  title: string
  content: string
  image: string
  category: string
  author: string
  date: string
}

export default function LatestNews() {
  const [news, setNews] = useState<News[]>([])
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch("/api/news")
        if (!response.ok) {
          throw new Error(`Failed to fetch news: ${response.statusText}`)
        }
        const data = await response.json()
        setNews(data)
      } catch (error) {
        console.error("Error fetching news:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchNews()
  }, [])

  const handleNewsClick = (newsItem: News) => {
    dispatch(
      addToHistory({
        id: newsItem.id,
        title: newsItem.title,
        viewedAt: new Date().toISOString(),
      }),
    )

    // Also add to backend history
    fetch("/api/history", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        newsId: newsItem.id,
        title: newsItem.title,
        userId: "anonymous",
      }),
    }).catch((error) => {
      console.error("Error adding to history:", error)
    })
  }

  if (loading) {
    return (
      <div>
        <h2 className="text-xl font-bold mb-4">Son Haberler</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[...Array(6)].map((_, i) => (
            <Card key={i}>
              <CardContent className="p-0">
                <div className="flex flex-col sm:flex-row">
                  <Skeleton className="h-40 w-full sm:w-1/3" />
                  <div className="p-4 w-full sm:w-2/3">
                    <Skeleton className="h-4 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-1/2 mb-4" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-2/3" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Son Haberler</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {news.slice(0, 6).map((item) => (
          <Card key={item.id} className="overflow-hidden hover:shadow-md transition-shadow">
            <CardContent className="p-0">
              <Link
                href={`/news/${item.id}`}
                className="flex flex-col sm:flex-row"
                onClick={() => handleNewsClick(item)}
              >
                <div className="relative h-40 w-full sm:w-1/3">
                  <img
                    src={item.image || "/placeholder.svg?height=160&width=200&query=news"}
                    alt={item.title}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute top-0 left-0 bg-red-600 text-white px-2 py-1 text-xs">{item.category}</div>
                </div>
                <div className="p-4 w-full sm:w-2/3">
                  <h3 className="font-bold text-base mb-2 line-clamp-2">{item.title}</h3>
                  <p className="text-sm text-gray-500 mb-2">{item.date}</p>
                  <p className="text-sm text-gray-700 line-clamp-3">{item.content}</p>
                </div>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
