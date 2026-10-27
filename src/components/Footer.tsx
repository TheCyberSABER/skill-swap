"use client";

import { GraduationCap } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-6 w-6 text-indigo-600" />
            <span className="text-lg font-bold text-gray-900">
              Skill<span className="text-indigo-600">Swap</span>
            </span>
          </div>
          <p className="text-sm text-gray-500">
            Connecting students through skills. Learn, teach, collaborate.
          </p>
          <p className="text-sm text-gray-400">
            © 2026 SkillSwap. CSE Mini Project.
          </p>
        </div>
      </div>
    </footer>
  );
}
