import { NextResponse } from "next/server"
import { fallbackFinance } from "@/lib/fallback-data"

export async function GET() {
  try {
    const response = await fetch("http://localhost:8081/api/finance", {
      next: { revalidate: 300 },
    })

    if (!response.ok) {
      throw new Error(`Backend responded with status: ${response.status}`)
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Finance API route error:", error)
    return NextResponse.json(fallbackFinance)
  }
}
