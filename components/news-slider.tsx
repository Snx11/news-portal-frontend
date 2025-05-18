"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Skeleton } from "@/components/ui/skeleton"
import { ChevronLeft, ChevronRight } from "lucide-react"

// Import Swiper React components and styles
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination, Autoplay } from "swiper/modules"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"

interface News {
  id: number
  title: string
  content: string
  image: string
  category: string
  author: string
  date: string
}

export default function NewsSlider() {
  const [news, setNews] = useState<News[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch("https://news-portal-backend-4.onrender.com/api/news")
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

  if (loading) {
    return (
      <div className="w-full h-[400px] rounded-lg overflow-hidden">
        <Skeleton className="w-full h-full" />
      </div>
    )
  }

  if (news.length === 0) {
    return (
      <div className="w-full h-[400px] rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
        <p className="text-gray-500">Haber bulunamadı.</p>
      </div>
    )
  }

  return (
    <div className="news-slider relative rounded-lg overflow-hidden">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        pagination={{
          clickable: true,
          el: ".swiper-pagination",
          bulletClass: "swiper-pagination-bullet",
          bulletActiveClass: "swiper-pagination-bullet-active",
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop={true}
        className="h-[400px]"
      >
        {news.map((item) => (
          <SwiperSlide key={item.id}>
            <Link href={`/news/${item.id}`}>
              <div className="relative w-full h-full">
                <img
                  src={item.image || "/placeholder.svg?height=400&width=800&query=news"}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent pt-20 pb-0">
                  <div className="bg-red-600 text-white px-4 py-2 text-sm">
                    <span>Pazartesi- Salı- Çarşamba 0'ın altında</span>
                  </div>
                  <div className="bg-black text-white px-4 py-2">
                    <h2 className="text-2xl md:text-3xl font-bold text-yellow-400">{item.title.toUpperCase()}</h2>
                  </div>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="swiper-button-prev absolute left-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white">
        <ChevronLeft className="h-6 w-6" />
      </div>
      <div className="swiper-button-next absolute right-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white">
        <ChevronRight className="h-6 w-6" />
      </div>
      <div className="swiper-pagination absolute bottom-20 left-0 right-0 z-10 flex justify-center space-x-1"></div>
    </div>
  )
}
