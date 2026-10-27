import { CollaborationPost } from "@/lib/types";
import SkillBadge from "./SkillBadge";
import { MessageCircle, Clock, HelpCircle, Heart, Users } from "lucide-react";

interface CollaborationCardProps {
  post: CollaborationPost;
}

const typeConfig = {
  help_needed: {
    label: "Help Needed",
    icon: HelpCircle,
    color: "text-rose-600 bg-rose-50",
  },
  offering_help: {
    label: "Offering Help",
    icon: Heart,
    color: "text-emerald-600 bg-emerald-50",
  },
  collaboration: {
    label: "Collaboration",
    icon: Users,
    color: "text-indigo-600 bg-indigo-50",
  },
};

const statusStyles = {
  open: "bg-green-100 text-green-700",
  in_progress: "bg-yellow-100 text-yellow-700",
  closed: "bg-gray-100 text-gray-500",
};

export default function CollaborationCard({ post }: CollaborationCardProps) {
  const config = typeConfig[post.type];
  const TypeIcon = config.icon;
  const initials = post.authorName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-all">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-2">
          <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${config.color}`}
          >
            <TypeIcon className="h-3.5 w-3.5" />
            {config.label}
          </span>
          <span
            className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusStyles[post.status]}`}
          >
            {post.status.replace("_", " ")}
          </span>
        </div>
      </div>

      <h3 className="font-semibold text-gray-900 mt-3 text-lg">{post.title}</h3>
      <p className="text-sm text-gray-600 mt-2 line-clamp-3">{post.description}</p>

      <div className="flex flex-wrap gap-1.5 mt-4">
        {post.skillsNeeded.map((skill) => (
          <SkillBadge key={skill} name={skill} type="needed" />
        ))}
      </div>

      <div className="flex items-center justify-between mt-5 pt-4 border-t border-gray-100">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-medium text-xs">
            {initials}
          </div>
          <span className="text-sm text-gray-700 font-medium">{post.authorName}</span>
        </div>
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <span className="flex items-center gap-1">
            <MessageCircle className="h-4 w-4" />
            {post.responses}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            {post.createdAt}
          </span>
        </div>
      </div>
    </div>
  );
}
