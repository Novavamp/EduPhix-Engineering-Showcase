export interface Assessment { name: string; score: number; weight: number }
export interface GradeResult { weightedScore: number; letter: string }

export function calculateGrade(items: Assessment[]): GradeResult {
  if (items.length === 0) throw new Error("At least one assessment is required");
  const weightTotal = items.reduce((sum, item) => sum + item.weight, 0);
  if (Math.abs(weightTotal - 100) > 0.0001) throw new Error("Weights must total 100");

  for (const item of items) {
    if (!Number.isFinite(item.score) || item.score < 0 || item.score > 100) {
      throw new Error(`Invalid score for ${item.name}`);
    }
    if (!Number.isFinite(item.weight) || item.weight < 0) {
      throw new Error(`Invalid weight for ${item.name}`);
    }
  }

  const score = items.reduce((sum, item) => sum + item.score * item.weight / 100, 0);
  const letter = score >= 70 ? "A" : score >= 60 ? "B" : score >= 50 ? "C" :
    score >= 45 ? "D" : score >= 40 ? "E" : "F";
  return { weightedScore: Number(score.toFixed(2)), letter };
}
