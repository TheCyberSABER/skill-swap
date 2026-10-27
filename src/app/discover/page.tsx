"use client";

import { useState, useMemo } from "react";
import { profiles, skills, skillCategories } from "@/lib/data";
import ProfileCard from "@/components/ProfileCard";
import SkillBadge from "@/components/SkillBadge";
import { Search, Filter, SlidersHorizontal } from "lucide-react";

export default function DiscoverPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  const filteredSkills = useMemo(() => {
    if (selectedCategory === "All") return skills;
    return skills.filter((s) => s.category === selectedCategory);
  }, [selectedCategory]);

  const toggleSkill = (skillName: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skillName)
        ? prev.filter((s) => s !== skillName)
        : [...prev, skillName]
    );
  };

  const filteredProfiles = useMemo(() => {
    return profiles.filter((profile) => {
      // Text search
      const query = searchQuery.toLowerCase();
      const matchesSearch =
        !query ||
        profile.name.toLowerCase().includes(query) ||
        profile.bio.toLowerCase().includes(query) ||
        profile.branch.toLowerCase().includes(query) ||
        profile.skills.some((s) =>
          s.skill.name.toLowerCase().includes(query)
        );

      // Skill filter
      const matchesSkills =
        selectedSkills.length === 0 ||
        selectedSkills.some((selected) =>
          profile.skills.some((s) => s.skill.name === selected)
        );

      return matchesSearch && matchesSkills;
    });
  }, [searchQuery, selectedSkills]);

  // Compute match score for sorting
  const sortedProfiles = useMemo(() => {
    if (selectedSkills.length === 0) return filteredProfiles;

    return [...filteredProfiles].sort((a, b) => {
      const scoreA = selectedSkills.filter((selected) =>
        a.skills.some((s) => s.skill.name === selected)
      ).length;
      const scoreB = selectedSkills.filter((selected) =>
        b.skills.some((s) => s.skill.name === selected)
      ).length;
      return scoreB - scoreA;
    });
  }, [filteredProfiles, selectedSkills]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
          <Search className="h-8 w-8 text-indigo-600" />
          Discover Skills
        </h1>
        <p className="text-gray-600 mt-2">
          Search by skill, name, or branch. Select multiple skills to find the best match.
        </p>
      </div>

      {/* Search bar */}
      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search by name, skill, or branch..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all text-gray-900 bg-white"
        />
      </div>

      {/* Category filter */}
      <div className="flex flex-wrap gap-2 mb-4">
        {skillCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setSelectedCategory(cat);
              setSelectedSkills([]);
            }}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              selectedCategory === cat
                ? "bg-indigo-600 text-white"
                : "bg-white text-gray-600 border border-gray-200 hover:border-indigo-200 hover:text-indigo-600"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Skill tags */}
      <div className="flex flex-wrap gap-2 mb-8 p-4 bg-white rounded-xl border border-gray-200">
        <div className="flex items-center gap-2 text-sm text-gray-500 mr-2">
          <SlidersHorizontal className="h-4 w-4" />
          Filter by skills:
        </div>
        {filteredSkills.map((skill) => (
          <SkillBadge
            key={skill.id}
            name={skill.name}
            onClick={() => toggleSkill(skill.name)}
            active={selectedSkills.includes(skill.name)}
          />
        ))}
      </div>

      {/* Active filters */}
      {selectedSkills.length > 0 && (
        <div className="flex items-center gap-2 mb-4 text-sm">
          <span className="text-gray-500">Active filters:</span>
          {selectedSkills.map((s) => (
            <SkillBadge
              key={s}
              name={s}
              type="teaching"
              onClick={() => toggleSkill(s)}
            />
          ))}
          <button
            onClick={() => setSelectedSkills([])}
            className="text-indigo-600 hover:text-indigo-800 font-medium ml-2"
          >
            Clear all
          </button>
        </div>
      )}

      {/* Results */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-gray-500">
          {sortedProfiles.length} student{sortedProfiles.length !== 1 ? "s" : ""} found
          {selectedSkills.length > 0 && " — sorted by match relevance"}
        </p>
      </div>

      {sortedProfiles.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedProfiles.map((profile) => (
            <ProfileCard key={profile.id} profile={profile} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-xl border border-gray-200">
          <Search className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No students found
          </h3>
          <p className="text-gray-500">
            Try adjusting your search or filters.
          </p>
        </div>
      )}
    </div>
  );
}
