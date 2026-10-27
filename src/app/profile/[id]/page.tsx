import { profiles } from "@/lib/data";
import SkillBadge from "@/components/SkillBadge";
import Link from "next/link";
import {
  ArrowLeft,
  GraduationCap,
  BookOpen,
  Mail,
  Calendar,
} from "lucide-react";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return profiles.map((p) => ({ id: p.id }));
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ProfileDetailPage({ params }: PageProps) {
  const { id } = await params;
  const profile = profiles.find((p) => p.id === id);

  if (!profile) {
    notFound();
  }

  const teachingSkills = profile.skills.filter((s) => s.type === "teaching");
  const learningSkills = profile.skills.filter((s) => s.type === "learning");
  const initials = profile.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link
        href="/profiles"
        className="inline-flex items-center gap-2 text-gray-600 hover:text-indigo-600 mb-6 text-sm font-medium"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Profiles
      </Link>

      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 px-8 py-10">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-white font-bold text-2xl border-2 border-white/30">
              {initials}
            </div>
            <div className="text-white">
              <h1 className="text-3xl font-bold">{profile.name}</h1>
              <div className="flex items-center gap-4 mt-2 text-indigo-100">
                <span className="flex items-center gap-1">
                  <GraduationCap className="h-4 w-4" />
                  {profile.branch}
                </span>
                <span className="flex items-center gap-1">
                  <BookOpen className="h-4 w-4" />
                  Semester {profile.semester}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 space-y-8">
          {/* Bio */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">About</h2>
            <p className="text-gray-600 leading-relaxed">{profile.bio}</p>
          </div>

          {/* Info */}
          <div className="flex flex-wrap gap-6 text-sm text-gray-600">
            <span className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-gray-400" />
              {profile.email}
            </span>
            <span className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-gray-400" />
              Joined {profile.createdAt}
            </span>
          </div>

          {/* Teaching Skills */}
          {teachingSkills.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">
                Skills — Can Teach
              </h2>
              <div className="flex flex-wrap gap-2">
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

          {/* Learning Skills */}
          {learningSkills.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">
                Skills — Wants to Learn
              </h2>
              <div className="flex flex-wrap gap-2">
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

          {/* Interests */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">
              Interests
            </h2>
            <div className="flex flex-wrap gap-2">
              {profile.interests.map((interest) => (
                <span
                  key={interest}
                  className="px-3 py-1 rounded-full text-sm bg-indigo-50 text-indigo-700 font-medium"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
