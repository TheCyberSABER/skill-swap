"use client";

import { useState } from "react";
import { skills, skillCategories } from "@/lib/data";
import SkillBadge from "@/components/SkillBadge";
import { ArrowLeft, Save, Plus, X } from "lucide-react";
import Link from "next/link";

interface SelectedSkill {
  skillId: string;
  skillName: string;
  proficiency: "beginner" | "intermediate" | "advanced";
  type: "teaching" | "learning";
}

export default function CreateProfilePage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [branch, setBranch] = useState("");
  const [semester, setSemester] = useState("");
  const [selectedSkills, setSelectedSkills] = useState<SelectedSkill[]>([]);
  const [interests, setInterests] = useState<string[]>([]);
  const [interestInput, setInterestInput] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const addSkill = (
    skillId: string,
    skillName: string,
    type: "teaching" | "learning"
  ) => {
    if (selectedSkills.some((s) => s.skillId === skillId && s.type === type)) return;
    setSelectedSkills([
      ...selectedSkills,
      { skillId, skillName, proficiency: "intermediate", type },
    ]);
  };

  const removeSkill = (skillId: string, type: string) => {
    setSelectedSkills(
      selectedSkills.filter((s) => !(s.skillId === skillId && s.type === type))
    );
  };

  const addInterest = () => {
    const trimmed = interestInput.trim();
    if (trimmed && !interests.includes(trimmed)) {
      setInterests([...interests, trimmed]);
      setInterestInput("");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would POST to /api/profiles
    console.log({
      name,
      email,
      bio,
      branch,
      semester: parseInt(semester),
      skills: selectedSkills,
      interests,
    });
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link
        href="/profiles"
        className="inline-flex items-center gap-2 text-gray-600 hover:text-indigo-600 mb-6 text-sm font-medium"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Profiles
      </Link>

      <div className="bg-white rounded-2xl border border-gray-200 p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Create Your Profile
        </h1>
        <p className="text-gray-600 mb-8">
          Tell us about yourself and the skills you bring to the table.
        </p>

        {showSuccess && (
          <div className="mb-6 p-4 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 text-sm font-medium">
            ✓ Profile created successfully! (Demo — no data saved yet)
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic info */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Arjun Mehta"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all text-gray-900"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email *
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. arjun@college.edu"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all text-gray-900"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Branch *
              </label>
              <select
                required
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all text-gray-900 bg-white"
              >
                <option value="">Select branch</option>
                <option>Computer Science</option>
                <option>Information Technology</option>
                <option>Electronics & Communication</option>
                <option>Electrical Engineering</option>
                <option>Mechanical Engineering</option>
                <option>Civil Engineering</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Semester *
              </label>
              <select
                required
                value={semester}
                onChange={(e) => setSemester(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all text-gray-900 bg-white"
              >
                <option value="">Select semester</option>
                {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
                  <option key={s} value={s}>
                    Semester {s}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Bio
            </label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={3}
              placeholder="Tell us about yourself, your goals, and what excites you..."
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all resize-none text-gray-900"
            />
          </div>

          {/* Skills selection */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              Skills
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              Click a skill to add it as &quot;Can Teach&quot; or &quot;Want to Learn&quot;.
            </p>

            <div className="border border-gray-200 rounded-lg p-4 mb-4">
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-2">
                Available Skills
              </p>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <div key={skill.id} className="relative group">
                    <SkillBadge name={skill.name} />
                    <div className="hidden group-hover:flex absolute top-full left-0 mt-1 z-10 gap-1">
                      <button
                        type="button"
                        onClick={() =>
                          addSkill(skill.id, skill.name, "teaching")
                        }
                        className="px-2 py-1 bg-emerald-600 text-white text-xs rounded shadow whitespace-nowrap"
                      >
                        + Teach
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          addSkill(skill.id, skill.name, "learning")
                        }
                        className="px-2 py-1 bg-amber-600 text-white text-xs rounded shadow whitespace-nowrap"
                      >
                        + Learn
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {selectedSkills.length > 0 && (
              <div className="space-y-3">
                {selectedSkills.filter((s) => s.type === "teaching").length > 0 && (
                  <div>
                    <p className="text-xs font-medium text-emerald-600 uppercase tracking-wide mb-2">
                      Can Teach
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {selectedSkills
                        .filter((s) => s.type === "teaching")
                        .map((s) => (
                          <span
                            key={`${s.skillId}-teach`}
                            className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200"
                          >
                            {s.skillName}
                            <button
                              type="button"
                              onClick={() => removeSkill(s.skillId, "teaching")}
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </span>
                        ))}
                    </div>
                  </div>
                )}
                {selectedSkills.filter((s) => s.type === "learning").length > 0 && (
                  <div>
                    <p className="text-xs font-medium text-amber-600 uppercase tracking-wide mb-2">
                      Want to Learn
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {selectedSkills
                        .filter((s) => s.type === "learning")
                        .map((s) => (
                          <span
                            key={`${s.skillId}-learn`}
                            className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200"
                          >
                            {s.skillName}
                            <button
                              type="button"
                              onClick={() => removeSkill(s.skillId, "learning")}
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </span>
                        ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Interests */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Interests
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={interestInput}
                onChange={(e) => setInterestInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addInterest())}
                placeholder="e.g. Hackathons, Open Source"
                className="flex-1 px-4 py-2.5 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all text-gray-900"
              />
              <button
                type="button"
                onClick={addInterest}
                className="px-4 py-2.5 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <Plus className="h-5 w-5" />
              </button>
            </div>
            {interests.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {interests.map((interest) => (
                  <span
                    key={interest}
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700"
                  >
                    {interest}
                    <button
                      type="button"
                      onClick={() =>
                        setInterests(interests.filter((i) => i !== interest))
                      }
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
          >
            <Save className="h-5 w-5" />
            Create Profile
          </button>
        </form>
      </div>
    </div>
  );
}
