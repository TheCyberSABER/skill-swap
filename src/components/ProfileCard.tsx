import Link from "next/link";
import { UserProfile } from "@/lib/types";
import SkillBadge from "./SkillBadge";
import { MapPin, BookOpen, GraduationCap } from "lucide-react";

interface ProfileCardProps {
  profile: UserProfile;
}

export default function ProfileCard({ profile }: ProfileCardProps) {
  const teachingSkills = profile.skills.filter((s) => s.type === "teaching");
  const learningSkills = profile.skills.filter((s) => s.type === "learning");
  const initials = profile.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <Link href={`/profile/${profile.id}`}>
      <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg hover:border-indigo-200 transition-all cursor-pointer group">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-lg shrink-0 group-hover:bg-indigo-200 transition-colors">
            {initials}
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
              {profile.name}
            </h3>
            <div className="flex items-center gap-3 text-sm text-gray-500 mt-1">
              <span className="flex items-center gap-1">
                <GraduationCap className="h-3.5 w-3.5" />
                {profile.branch}
              </span>
              <span className="flex items-center gap-1">
                <BookOpen className="h-3.5 w-3.5" />
                Sem {profile.semester}
              </span>
            </div>
          </div>
        </div>

        <p className="text-sm text-gray-600 mt-3 line-clamp-2">{profile.bio}</p>

        {teachingSkills.length > 0 && (
          <div className="mt-4">
            <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-2">
              Can Teach
            </p>
            <div className="flex flex-wrap gap-1.5">
              {teachingSkills.map((s) => (
                <SkillBadge
                  key={s.skill.id}
                  name={s.skill.name}
                  type="teaching"
                  proficiency={s.proficiency}
                />
              ))}
            </div>
          </div>
        )}

        {learningSkills.length > 0 && (
          <div className="mt-3">
            <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-2">
              Wants to Learn
            </p>
            <div className="flex flex-wrap gap-1.5">
              {learningSkills.map((s) => (
                <SkillBadge
                  key={s.skill.id}
                  name={s.skill.name}
                  type="learning"
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </Link>
  );
}
