import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAuth } from '@/lib/session'
import { z } from 'zod'

const sheetSchema = z.object({
  sheetId: z.string().min(1),
  name: z.string().min(1),
  data: z.any(), // JSON data from CSV
})

// GET all connected sheets for current user
export async function GET() {
  try {
    const user = await requireAuth()
    
    const sheets = await prisma.connectedSheet.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json(sheets)
  } catch (error) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    )
  }
}

// POST connect new sheet
export async function POST(request: Request) {
  try {
    const user = await requireAuth()
    const body = await request.json()
    
    const validatedData = sheetSchema.parse(body)
    
    // Check if sheet already connected
    const existing = await prisma.connectedSheet.findUnique({
      where: {
        userId_sheetId: {
          userId: user.id,
          sheetId: validatedData.sheetId,
        },
      },
    })

    if (existing) {
      // Update existing sheet
      const updated = await prisma.connectedSheet.update({
        where: {
          userId_sheetId: {
            userId: user.id,
            sheetId: validatedData.sheetId,
          },
        },
        data: {
          name: validatedData.name,
          data: validatedData.data,
        },
      })
      return NextResponse.json(updated)
    }

    // Create new sheet connection
    const sheet = await prisma.connectedSheet.create({
      data: {
        sheetId: validatedData.sheetId,
        name: validatedData.name,
        data: validatedData.data || {},
        userId: user.id,
      },
    })

    return NextResponse.json(sheet, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid data', details: error.errors },
        { status: 400 }
      )
    }
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// DELETE disconnect sheet
export async function DELETE(request: Request) {
  try {
    const user = await requireAuth()
    const { searchParams } = new URL(request.url)
    const sheetId = searchParams.get('sheetId')

    if (!sheetId) {
      return NextResponse.json(
        { error: 'Sheet ID required' },
        { status: 400 }
      )
    }

    await prisma.connectedSheet.delete({
      where: {
        userId_sheetId: {
          userId: user.id,
          sheetId,
        },
      },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: 'Sheet not found or unauthorized' },
      { status: 404 }
    )
  }
}
