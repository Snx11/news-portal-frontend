"use client"

import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { addToHistory } from "@/redux/historySlice"

interface NewsDetailContentProps {
  news: {
    id: number
    title: string
    content: string
    image: string
    category: string
    author: string
    date: string
  }
}

export function NewsDetailContent({ news }: NewsDetailContentProps) {
  const dispatch = useDispatch()

  useEffect(() => {
    // Add to history in Redux
    dispatch(
      addToHistory({
        id: news.id,
        title: news.title,
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
        newsId: news.id,
        title: news.title,
        userId: "anonymous", // We could use a real user ID if we had authentication
      }),
    }).catch((error) => {
      console.error("Error adding to history:", error)
    })
  }, [news.id, news.title, dispatch])

  return (
    <>
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
    </>
  )
}
