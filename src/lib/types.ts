export interface Skill {
  id: string;
  name: string;
  category: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  bio: string;
  branch: string;
  semester: number;
  skills: UserSkill[];
  interests: string[];
  createdAt: string;
}

export interface UserSkill {
  skill: Skill;
  proficiency: "beginner" | "intermediate" | "advanced";
  type: "teaching" | "learning";
}

export interface CollaborationPost {
  id: string;
  authorId: string;
  authorName: string;
  authorAvatar: string;
  title: string;
  description: string;
  type: "help_needed" | "offering_help" | "collaboration";
  skillsNeeded: string[];
  status: "open" | "in_progress" | "closed";
  responses: number;
  createdAt: string;
}
