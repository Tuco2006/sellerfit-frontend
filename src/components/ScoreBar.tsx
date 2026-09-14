export function ScoreBar({ score }: { score: number }) {
  const cor =
    score >= 70 ? "from-emerald-400 to-accent-400" : score >= 40 ? "from-amber-400 to-orange-400" : "from-slate-500 to-slate-400";

  return (
    <div className="flex items-center gap-3">
      <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/10">
        <div
          className={`h-full rounded-full bg-gradient-to-r ${cor} transition-all`}
          style={{ width: `${Math.min(score, 100)}%` }}
        />
      </div>
      <span className="w-12 text-right text-sm font-semibold text-white">{score}%</span>
    </div>
  );
}
