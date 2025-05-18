"use client"

import { useState } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface StickyAdProps {
  position: "left" | "right"
}

export default function StickyAd({ position }: StickyAdProps) {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) {
    return null
  }

  const adImageUrl = position === "left" ? "/advertisement-left.png" : "/advertisement-right.png"

  return (
    <div className="sticky-ad">
      <div className="relative">
        <Button
          variant="secondary"
          size="icon"
          className="absolute top-2 right-2 h-6 w-6 bg-white/80 hover:bg-white/90 z-10"
          onClick={() => setIsVisible(false)}
        >
          <X className="h-4 w-4" />
        </Button>
        <a href="https://minio.yalispor.com.tr/yalispor/images/nike-court-vision-low-erkek-spor-ayakkabi-1-1731477749.jpg" target="_blank" rel="noopener noreferrer">
          <img src={adImageUrl || "/placeholder.svg"} alt="Advertisement" className="w-full h-auto rounded-md" />
        </a>
      </div>
    </div>
  )
}
