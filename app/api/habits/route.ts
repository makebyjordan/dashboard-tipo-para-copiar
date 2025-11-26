import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAuth } from '@/lib/session'
import { z } from 'zod'

const habitSchema = z.object({
  title: z.string().min(1).max(255),
  content: z.string(),
})

// GET all habits for current user
export async function GET() {
  try {
    const user = await requireAuth()
    
    const habits = await prisma.habit.findMany({
      where: { userId: user.id as string },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json(habits)
  } catch (error) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    )
  }
}

// POST create new habit
export async function POST(request: Request) {
  try {
    const user = await requireAuth()
    const body = await request.json()
    
    const validatedData = habitSchema.parse(body)
    
    const habit = await prisma.habit.create({
      data: {
        ...validatedData,
        userId: user.id as string,
      },
    })

    return NextResponse.json(habit, { status: 201 })
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
