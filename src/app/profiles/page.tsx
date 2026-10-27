import { profiles } from "@/lib/data";
import ProfileCard from "@/components/ProfileCard";
import { Users } from "lucide-react";

export default function ProfilesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <Users className="h-8 w-8 text-indigo-600" />
            Student Profiles
          </h1>
          <p className="text-gray-600 mt-2">
            Browse {profiles.length} students and find someone to learn from or teach.
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {profiles.map((profile) => (
          <ProfileCard key={profile.id} profile={profile} />
        ))}
      </div>
    </div>
  );
}
