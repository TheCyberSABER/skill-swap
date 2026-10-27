interface SkillBadgeProps {
  name: string;
  type?: "teaching" | "learning" | "needed" | "default";
  proficiency?: "beginner" | "intermediate" | "advanced";
  onClick?: () => void;
  active?: boolean;
}

const typeStyles = {
  teaching: "bg-emerald-50 text-emerald-700 border-emerald-200",
  learning: "bg-amber-50 text-amber-700 border-amber-200",
  needed: "bg-rose-50 text-rose-700 border-rose-200",
  default: "bg-gray-50 text-gray-700 border-gray-200",
};

const proficiencyDots = {
  beginner: 1,
  intermediate: 2,
  advanced: 3,
};

export default function SkillBadge({
  name,
  type = "default",
  proficiency,
  onClick,
  active,
}: SkillBadgeProps) {
  const baseStyles = onClick
    ? "cursor-pointer hover:shadow-sm transition-all"
    : "";
  const activeStyles = active
    ? "ring-2 ring-indigo-500 ring-offset-1"
    : "";

  return (
    <span
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${typeStyles[type]} ${baseStyles} ${activeStyles}`}
    >
      {name}
      {proficiency && (
        <span className="flex gap-0.5 ml-1">
          {[1, 2, 3].map((dot) => (
            <span
              key={dot}
              className={`w-1.5 h-1.5 rounded-full ${
                dot <= proficiencyDots[proficiency]
                  ? "bg-current opacity-80"
                  : "bg-current opacity-20"
              }`}
            />
          ))}
        </span>
      )}
    </span>
  );
}
