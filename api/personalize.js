export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({error: 'Solo POST'});
  
  const { feedback, currentPlan } = req.body;
  
  const ajuste = feedback.includes('pesado') || feedback.includes('RPE9') 
    ? { peso: -0.05, rpe: 8 }
    : { peso: +0.02, rpe: 8.5 };
  
  const nuevoPlan = {
    plan: {
      week1: [{name: `Squat 5x5@${(75 + (75*ajuste.peso)).toFixed(0)}%`, rpe: ajuste.rpe}],
      week2: [{name: `Squat 5x5@${(80 + (80*ajuste.peso)).toFixed(0)}%`, rpe: ajuste.rpe}],
      week3: [{name: `Squat 4x5@${(85 + (85*ajuste.peso)).toFixed(0)}%`, rpe: ajuste.rpe}],
      week4: [{name: `Squat 3x3@${(90 + (90*ajuste.peso)).toFixed(0)}%`, rpe: ajuste.rpe}]
    },
    message: `✅ Ajustado por "${feedback}". Nuevos % squat: ${(75 + (75*ajuste.peso)).toFixed(0)}-90% + RPE${ajuste.rpe}`
  };
  
  res.json(nuevoPlan);
}
