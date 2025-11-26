import { BattlePlanDay } from '@/data/initialTimeGestionData';

// Convertir de formato API a formato UI
export function convertFromAPI(apiPlans: any[]): BattlePlanDay[] {
  // Si no hay datos en la API, retornar array vacío
  if (!apiPlans || apiPlans.length === 0) return [];
  
  return apiPlans.map(plan => ({
    day: parseInt(plan.day),
    phase: '', // Se puede calcular según el día
    type: plan.type === 'WAR' ? 'Lunes-Viernes' : 'Sábado-Domingo',
    title: plan.tasks[0] || 'Sin título',
    mission: plan.tasks[1] || '',
    kpi: plan.tasks[2] || '',
    routine: plan.tasks.slice(3) || []
  }));
}

// Convertir de formato UI a formato API
export function convertToAPI(day: number, planData: BattlePlanDay) {
  const type = planData.routine && planData.routine.length > 10 ? 'WAR' : 'REGEN';
  
  const tasks = [
    planData.title,
    planData.mission,
    planData.kpi,
    ...(planData.routine || [])
  ];

  return {
    day: day.toString(),
    type,
    tasks
  };
}

// Guardar un plan individual
export async function saveBattlePlan(day: number, planData: BattlePlanDay) {
  const apiData = convertToAPI(day, planData);
  
  const response = await fetch('/api/battleplans', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(apiData)
  });

  if (!response.ok) {
    throw new Error('Error al guardar el plan');
  }

  return response.json();
}

// Cargar todos los planes
export async function loadBattlePlans(): Promise<BattlePlanDay[]> {
  try {
    const response = await fetch('/api/battleplans');
    
    if (!response.ok) {
      console.log('No battle plans found, returning empty array');
      return [];
    }

    const data = await response.json();
    return convertFromAPI(data);
  } catch (error) {
    console.error('Error loading battle plans:', error);
    return [];
  }
}
