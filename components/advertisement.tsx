"use client"

import { useState } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface AdvertisementProps {
  position: "left" | "right"
}

export default function Advertisement({ position }: AdvertisementProps) {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) {
    return null
  }

  return (
    <div className="sticky top-20 space-y-4">
      <div className="relative">
        <Button
          variant="outline"
          size="icon"
          className="absolute top-1 right-1 h-5 w-5 bg-white/80 hover:bg-white/90 z-10"
          onClick={() => setIsVisible(false)}
        >
          <X className="h-3 w-3" />
        </Button>
        <a href="https://example.com" target="_blank" rel="noopener noreferrer">
          <img src="https://minio.yalispor.com.tr/yalispor/images/nike-court-vision-low-erkek-spor-ayakkabi-1-1731477749.jpg" alt="Advertisement" className="w-full h-auto" />
          <div className="bg-green-600 text-white text-xs px-1 py-0.5 absolute top-2 left-2">%25</div>
          <div className="text-center py-1 font-bold">3.599 TL</div>
        </a>
      </div>

      <div className="relative">
        <a href="https://example.com" target="_blank" rel="noopener noreferrer">
          <img src="https://minio.yalispor.com.tr/yalispor/images/nike-court-vision-low-erkek-spor-ayakkabi-1-1731477749.jpg" alt="Advertisement" className="w-full h-auto" />
          <div className="bg-green-600 text-white text-xs px-1 py-0.5 absolute top-2 left-2">%25</div>
          <div className="text-center py-1 font-bold">3.599 TL</div>
        </a>
      </div>

      <div className="relative">
        <a href="https://example.com" target="_blank" rel="noopener noreferrer">
          <img src="https://minio.yalispor.com.tr/yalispor/images/nike-court-vision-low-erkek-spor-ayakkabi-1-1731477749.jpg" alt="Advertisement" className="w-full h-auto" />
          <div className="bg-green-600 text-white text-xs px-1 py-0.5 absolute top-2 left-2">%25</div>
          <div className="text-center py-1 font-bold">3.599 TL</div>
        </a>
      </div>
    </div>
  )
}
