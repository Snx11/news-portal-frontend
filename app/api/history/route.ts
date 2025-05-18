import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const userId = searchParams.get("userId") || "anonymous"

  try {
    // Try to fetch from the backend with updated port 8081
    const response = await fetch(`http://localhost:8081/api/history?userId=${userId}`, {
      next: { revalidate: 10 }, // Don't cache history
    })

    if (!response.ok) {
      throw new Error(`Backend responded with status: ${response.status}`)
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.log("Error fetching history from backend:", error)
    // Return empty array if backend is unavailable
    return NextResponse.json([])
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Try to post to the backend with updated port 8081
    const response = await fetch("http://localhost:8081/api/history", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })

    if (!response.ok) {
      throw new Error(`Backend responded with status: ${response.status}`)
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.log("Error posting history to backend:", error)
    // Return success anyway to not block the user
    return NextResponse.json({ success: false, error: "Failed to save history" })
  }
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url)
  const userId = searchParams.get("userId") || "anonymous"

  try {
    // Try to delete from the backend with updated port 8081
    const response = await fetch(`https://news-portal-backend-4.onrender.com/api/history?userId=${userId}`, {
      method: "DELETE",
    })

    if (!response.ok) {
      throw new Error(`Backend responded with status: ${response.status}`)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.log("Error deleting history from backend:", error)
    // Return success anyway to not block the user
    return NextResponse.json({ success: false, error: "Failed to clear history" })
  }
}
