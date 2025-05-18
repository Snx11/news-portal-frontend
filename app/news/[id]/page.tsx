"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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

export default function NewsDetail() {
  const { id } = useParams()
  const [news, setNews] = useState<News | null>(null)
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchNewsDetail = async () => {
      try {
        const response = await fetch(`https://news-portal-backend-4.onrender.com/api/news/${id}`)
        if (!response.ok) {
          throw new Error("News not found")
        }
        const data = await response.json()
        setNews(data)

        // Add to history in Redux
        dispatch(
          addToHistory({
            id: data.id,
            title: data.title,
            viewedAt: new Date().toISOString(),
          }),
        )

        // Also add to backend history
        await fetch("https://news-portal-backend-4.onrender.com/api/history", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            newsId: data.id,
            title: data.title,
            userId: "anonymous", // We could use a real user ID if we had authentication
          }),
        })
      } catch (error) {
        console.error("Error fetching news detail:", error)
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchNewsDetail()
    }
  }, [id, dispatch])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Skeleton className="h-12 w-3/4 mb-4" />
        <Skeleton className="h-6 w-1/4 mb-8" />
        <Skeleton className="h-64 w-full mb-8" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    )
  }

  if (!news) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardContent className="pt-6">
            <p>Haber bulunamadı.</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl md:text-2xl">{news.title}</CardTitle>
          <div className="flex flex-col md:flex-row md:items-center text-xs text-muted-foreground mt-2 gap-2">
            <span>{news.author}</span>
            <span className="hidden md:inline">•</span>
            <span>{news.date}</span>
            <span className="hidden md:inline">•</span>
            <span className="bg-primary/10 text-primary px-2 py-1 rounded-full">{news.category}</span>
          </div>
        </CardHeader>
        <CardContent>
          {news.image && (
            <div className="mb-6">
              <img
                src={news.image || "/placeholder.svg"}
                alt={news.title}
                className="w-full h-auto rounded-md object-cover max-h-[400px]"
              />
            </div>
          )}
          <div className="prose max-w-none">
            {news.content.split("\n\n").map((paragraph, index) => (
              <p key={index} className="mb-4">
                {paragraph}
              </p>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
