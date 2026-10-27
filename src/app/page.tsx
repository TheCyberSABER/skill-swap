import Link from "next/link";
import {
  Users,
  Search,
  Handshake,
  ArrowRight,
  Sparkles,
  BookOpen,
  Code,
  Palette,
  Shield,
  Smartphone,
} from "lucide-react";

const features = [
  {
    icon: Users,
    title: "Student Profiles",
    description:
      "Create your profile showcasing the skills you have and the ones you want to learn.",
    href: "/profiles",
    color: "text-indigo-600 bg-indigo-50",
  },
  {
    icon: Search,
    title: "Skill Discovery",
    description:
      "Search and filter students by skills like Python, UI/UX, cybersecurity, and more.",
    href: "/discover",
    color: "text-emerald-600 bg-emerald-50",
  },
  {
    icon: Handshake,
    title: "Collaboration",
    description:
      "Post requests for help, find project partners, or offer to teach what you know.",
    href: "/collaborate",
    color: "text-amber-600 bg-amber-50",
  },
];

const skillAreas = [
  { icon: Code, label: "Programming", count: 12 },
  { icon: Palette, label: "Design", count: 8 },
  { icon: Shield, label: "Security", count: 5 },
  { icon: Smartphone, label: "Mobile", count: 6 },
  { icon: BookOpen, label: "Data Science", count: 7 },
  { icon: Sparkles, label: "Soft Skills", count: 4 },
];

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-sm font-medium mb-6">
              <Sparkles className="h-4 w-4" />
              Student Skill Exchange Platform
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 tracking-tight">
              Learn from peers.{" "}
              <span className="text-indigo-600">Teach what you know.</span>
            </h1>
            <p className="mt-6 text-lg text-gray-600 leading-relaxed max-w-2xl">
              SkillSwap connects students across departments and semesters. Find
              someone who knows what you want to learn, and share what you&apos;re
              great at in return.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/profiles"
                className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
              >
                Browse Students
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/collaborate"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-gray-700 rounded-lg border border-gray-300 hover:border-indigo-300 hover:text-indigo-600 transition-colors font-medium"
              >
                Find Collaborators
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">How it works</h2>
        <p className="text-gray-600 mb-8">Three modules, one goal — connecting students through skills.</p>
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature) => (
            <Link key={feature.href} href={feature.href}>
              <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg hover:border-indigo-200 transition-all h-full group">
                <div
                  className={`w-12 h-12 rounded-lg ${feature.color} flex items-center justify-center mb-4`}
                >
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="font-semibold text-gray-900 text-lg group-hover:text-indigo-600 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-600 mt-2">{feature.description}</p>
                <span className="inline-flex items-center gap-1 text-sm text-indigo-600 font-medium mt-4 group-hover:gap-2 transition-all">
                  Explore <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Skill Areas */}
      <section className="bg-white border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Skill areas on the platform
          </h2>
          <p className="text-gray-600 mb-8">
            From coding to communication — every skill counts.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {skillAreas.map((area) => (
              <div
                key={area.label}
                className="flex flex-col items-center gap-2 p-4 rounded-xl border border-gray-200 hover:border-indigo-200 hover:shadow-sm transition-all"
              >
                <area.icon className="h-8 w-8 text-indigo-600" />
                <span className="font-medium text-gray-900 text-sm">
                  {area.label}
                </span>
                <span className="text-xs text-gray-500">
                  {area.count} skills
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-indigo-600 rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Ready to start sharing skills?
          </h2>
          <p className="text-indigo-100 mb-8 max-w-xl mx-auto">
            Create your profile, discover what your peers can teach, and find your
            next collaborator.
          </p>
          <Link
            href="/profiles/create"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors font-medium"
          >
            Create Your Profile
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
