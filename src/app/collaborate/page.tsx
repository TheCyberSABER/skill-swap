"use client";

import { useState, useMemo } from "react";
import { collaborationPosts } from "@/lib/data";
import CollaborationCard from "@/components/CollaborationCard";
import { Handshake, Plus, Search } from "lucide-react";

const typeFilters = [
  { value: "all", label: "All Posts" },
  { value: "help_needed", label: "Help Needed" },
  { value: "offering_help", label: "Offering Help" },
  { value: "collaboration", label: "Collaboration" },
];

export default function CollaboratePage() {
  const [typeFilter, setTypeFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = useMemo(() => {
    return collaborationPosts.filter((post) => {
      const matchesType = typeFilter === "all" || post.type === typeFilter;
      const query = searchQuery.toLowerCase();
      const matchesSearch =
        !query ||
        post.title.toLowerCase().includes(query) ||
        post.description.toLowerCase().includes(query) ||
        post.skillsNeeded.some((s) => s.toLowerCase().includes(query));
      return matchesType && matchesSearch;
    });
  }, [typeFilter, searchQuery]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <Handshake className="h-8 w-8 text-indigo-600" />
            Collaborate
          </h1>
          <p className="text-gray-600 mt-2">
            Find help, offer your skills, or team up on projects.
          </p>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium text-sm shrink-0">
          <Plus className="h-4 w-4" />
          New Post
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search collaborations..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all text-gray-900 bg-white"
        />
      </div>

      {/* Type filter */}
      <div className="flex flex-wrap gap-2 mb-8">
        {typeFilters.map((filter) => (
          <button
            key={filter.value}
            onClick={() => setTypeFilter(filter.value)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              typeFilter === filter.value
                ? "bg-indigo-600 text-white"
                : "bg-white text-gray-600 border border-gray-200 hover:border-indigo-200 hover:text-indigo-600"
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* Results */}
      <p className="text-sm text-gray-500 mb-4">
        {filteredPosts.length} post{filteredPosts.length !== 1 ? "s" : ""} found
      </p>

      {filteredPosts.length > 0 ? (
        <div className="grid md:grid-cols-2 gap-6">
          {filteredPosts.map((post) => (
            <CollaborationCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-xl border border-gray-200">
          <Handshake className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No posts found
          </h3>
          <p className="text-gray-500">
            Try changing your filters or create a new post.
          </p>
        </div>
      )}
    </div>
  );
}
