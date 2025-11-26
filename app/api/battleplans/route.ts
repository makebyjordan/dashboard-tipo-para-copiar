import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAuth } from '@/lib/session'
import { z } from 'zod'
import { PlanType } from '@prisma/client'

const battlePlanSchema = z.object({
  day: z.string().min(1),
  type: z.nativeEnum(PlanType),
  tasks: z.array(z.string()),
})

// GET all battle plans for current user
export async function GET() {
  try {
    const user = await requireAuth()
    
    const battlePlans = await prisma.battlePlan.findMany({
      where: { userId: user.id },
      orderBy: { day: 'asc' },
    })

    return NextResponse.json(battlePlans)
  } catch (error) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    )
  }
}

// POST create or update battle plan
export async function POST(request: Request) {
  try {
    const user = await requireAuth()
    const body = await request.json()
    
    const validatedData = battlePlanSchema.parse(body)
    
    // Upsert: create if not exists, update if exists
    const battlePlan = await prisma.battlePlan.upsert({
      where: {
        userId_day: {
          userId: user.id,
          day: validatedData.day,
        },
      },
      update: {
        type: validatedData.type,
        tasks: validatedData.tasks,
      },
      create: {
        ...validatedData,
        userId: user.id,
      },
    })

    return NextResponse.json(battlePlan, { status: 201 })
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
