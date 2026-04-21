import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  MessageSquare,
  School,
  BookOpen,
  Target,
  Users,
  ArrowRight,
  Sparkles,
  Brain,
  GraduationCap,
} from "lucide-react";
import { statsAPI } from "../api/stats";
import { getTests } from "../api/tests";
import { useAuth } from "../hooks/useAuth";
import "../styles/design-system.css";

const unwrapPayload = (payload) => {
  let current = payload;

  for (let index = 0; index < 3; index += 1) {
    if (
      current &&
      typeof current === "object" &&
      !Array.isArray(current) &&
      current.data &&
      typeof current.data === "object"
    ) {
      current = current.data;
    } else {
      break;
    }
  }

  return current || {};
};

const extractCount = (payload, keys = []) => {
  const normalized = unwrapPayload(payload);

  if (Array.isArray(normalized)) {
    return normalized.length;
  }

  for (const key of keys) {
    const value = normalized?.[key];
    if (typeof value === "number" && Number.isFinite(value)) {
      return value;
    }
    if (
      typeof value === "string" &&
      value.trim() !== "" &&
      !Number.isNaN(Number(value))
    ) {
      return Number(value);
    }
    if (Array.isArray(value)) {
      return value.length;
    }
  }

  const metadata = normalized?.metadata;
  const metadataCount =
    metadata?.total_count ??
    metadata?.count ??
    metadata?.total ??
    metadata?.total_items;

  if (typeof metadataCount === "number" && Number.isFinite(metadataCount)) {
    return metadataCount;
  }

  const directCount =
    normalized?.total_count ??
    normalized?.count ??
    normalized?.total ??
    normalized?.total_items;

  if (typeof directCount === "number" && Number.isFinite(directCount)) {
    return directCount;
  }

  return 0;
};

const LandingPage = () => {
  const heroRef = useRef(null);
  const { isAuthenticated } = useAuth();

  const { data: statsResponse } = useQuery({
    queryKey: ["landing-stats"],
    queryFn: statsAPI.getStats,
  });

  const { data: testsResponse } = useQuery({
    queryKey: ["landing-tests"],
    queryFn: () => getTests(),
    enabled: isAuthenticated,
    retry: false,
  });

  // Scroll animation observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 },
    );

    document.querySelectorAll(".scroll-fade-in").forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const features = [
    {
      icon: MessageSquare,
      title: "AI Career Counselor",
      description:
        "Personalized guidance powered by AI. Get instant answers about universities, programs, and career paths tailored to Pakistani students.",
      color: "blue",
    },
    {
      icon: School,
      title: "University Explorer",
      description:
        "Discover and compare top universities across Pakistan. Explore rankings, programs, campus facilities, and admission requirements.",
      color: "orange",
    },
    {
      icon: BookOpen,
      title: "Test Preparation",
      description:
        "Practice with real test questions. Track your progress, identify weak areas, and boost your scores for entry tests.",
      color: "blue",
    },
    {
      icon: Target,
      title: "Smart Matching",
      description:
        "Find programs that match your FSC marks and interests. Know your Safety, Target, and Reach options before applying.",
      color: "orange",
    },
  ];

  const statsPayload = unwrapPayload(statsResponse);
  const tests = Array.isArray(testsResponse)
    ? testsResponse
    : Array.isArray(testsResponse?.data)
      ? testsResponse.data
      : Array.isArray(testsResponse?.results)
        ? testsResponse.results
        : [];

  const universitiesCount = extractCount(statsPayload, [
    "Universities",
    "total_universities",
    "universities_count",
    "universities",
    "university_names",
  ]);

  // 1. Keep the programs count logic (it's working via the public stats)
  const programsCount = extractCount(statsPayload, [
    "Programs",
    "total_programs",
    "programs_count",
    "programs",
    "program_names",
  ]);

  // 2. Define the fallback calculation for questions first
  const testQuestionsFromTests = tests.reduce(
    (sum, test) => sum + Number(test?.total_questions || 0),
    0,
  );

  // 3. Prioritize public statsPayload to avoid the 403 Forbidden error for guests
  const testsCount =
    extractCount(statsPayload, ["total_tests", "tests_count"]) || tests.length;

  const testQuestionsCount =
    extractCount(statsPayload, ["total_test_questions", "total_questions"]) ||
    testQuestionsFromTests;

  const stats = [
    { value: universitiesCount.toLocaleString(), label: "Universities" },
    { value: programsCount.toLocaleString(), label: "Programs" },
    { value: testsCount.toLocaleString(), label: "Practice Tests" },
    { value: testQuestionsCount.toLocaleString(), label: "Test Questions" },
  ];

  const pendingProfiles = [1, 2, 3];

  const steps = [
    {
      number: "01",
      title: "Create Your Profile",
      description:
        "Sign up and add your FSC marks, interests, and preferences.",
    },
    {
      number: "02",
      title: "Explore Options",
      description:
        "Browse universities, programs, and get AI-powered recommendations.",
    },
    {
      number: "03",
      title: "Prepare & Practice",
      description: "Take practice tests and track your improvement over time.",
    },
    {
      number: "04",
      title: "Apply with Confidence",
      description:
        "Make informed decisions backed by data and personalized guidance.",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative bg-gradient-hero overflow-hidden pt-20 pb-32 md:pt-32 md:pb-40"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-pattern-dots opacity-40"></div>

        {/* Floating Decorative Elements */}
        <div className="absolute top-20 right-10 w-32 h-32 bg-primary-200/30 rounded-full blur-3xl animate-float"></div>
        <div
          className="absolute bottom-20 left-10 w-40 h-40 bg-accent-200/30 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "2s" }}
        ></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center animate-stagger">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-soft mb-8">
              <span className="accent-dot"></span>
              <span className="text-body-sm font-medium text-primary-700">
                Live data from our platform
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-display-xl text-primary-900 mb-6 max-w-4xl mx-auto">
              Your Journey to the{" "}
              <span className="relative inline-block">
                <span className="relative z-10 text-primary-600">
                  Perfect University
                </span>
                <span className="absolute bottom-2 left-0 w-full h-3 bg-accent-300/40 -rotate-1"></span>
              </span>{" "}
              Starts Here
            </h1>

            {/* Subheadline */}
            <p className="text-body-lg text-neutral-600 max-w-2xl mx-auto mb-10">
              AI-powered guidance for Pakistani students. Discover universities,
              explore programs, prepare for tests, and make confident decisions
              about your future.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <Link to="/register">
                <button className="btn-primary group">
                  Get Started Free
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
              <Link to="/login">
                <button className="btn-secondary">Sign In</button>
              </Link>
            </div>

            {/* Stats Bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="scroll-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="text-display-md text-primary-700 font-bold">
                    {stat.value}
                  </div>
                  <div className="text-body-sm text-neutral-600 mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 w-full">
          <svg
            viewBox="0 0 1440 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-auto"
          >
            <path
              d="M0 0L60 10C120 20 240 40 360 46.7C480 53 600 47 720 43.3C840 40 960 40 1080 46.7C1200 53 1320 67 1380 73.3L1440 80V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V0Z"
              fill="white"
            />
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 md:py-32 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16 scroll-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-50 rounded-full mb-6">
              <Sparkles className="w-4 h-4 text-primary-600" />
              <span className="text-body-sm font-semibold text-primary-700">
                Features
              </span>
            </div>
            <h2 className="text-display-md text-primary-900 mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-body-lg text-neutral-600 max-w-2xl mx-auto">
              Comprehensive tools and resources designed specifically for
              Pakistani students navigating university admissions.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="card-feature scroll-fade-in group"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${
                      feature.color === "blue"
                        ? "from-primary-500 to-primary-700"
                        : "from-accent-500 to-accent-600"
                    } flex items-center justify-center mb-6 shadow-soft group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-heading-sm text-primary-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-body-md text-neutral-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 md:py-32 bg-gradient-subtle relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 scroll-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-soft mb-6">
              <Target className="w-4 h-4 text-primary-600" />
              <span className="text-body-sm font-semibold text-primary-700">
                How It Works
              </span>
            </div>
            <h2 className="text-display-md text-primary-900 mb-4">
              Start Your Journey in 4 Simple Steps
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-8 relative">
            {/* Connection Lines - Desktop Only */}
            <div className="hidden md:block absolute top-16 left-0 right-0 h-0.5 bg-gradient-to-r from-primary-200 via-primary-400 to-accent-400"></div>

            {steps.map((step, index) => (
              <div
                key={index}
                className="relative scroll-fade-in"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className="card-float text-center relative z-10 bg-white">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 text-white flex items-center justify-center mx-auto mb-6 shadow-lifted text-heading-md font-bold">
                    {step.number}
                  </div>
                  <h3 className="text-heading-sm text-primary-900 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-body-sm text-neutral-600">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 md:py-32 bg-white relative overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-100 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-100 rounded-full blur-3xl opacity-30"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16 scroll-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-50 rounded-full mb-6">
              <Users className="w-4 h-4 text-primary-600" />
              <span className="text-body-sm font-semibold text-primary-700">
                Testimonials
              </span>
            </div>
            <h2 className="text-display-md text-primary-900 mb-4">
              Success Stories from Students
            </h2>
            <p className="text-body-lg text-neutral-600 max-w-2xl mx-auto">
              Verified student profiles will appear here once we publish real
              stories.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {pendingProfiles.map((profile, index) => (
              <div
                key={profile}
                className="card-testimonial scroll-fade-in hover-lift"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <p className="card-testimonial-quote">
                  Success story profile is intentionally hidden until a verified
                  student consent is available.
                </p>
                <div className="card-testimonial-author">
                  <div className="card-testimonial-avatar bg-neutral-200" />
                  <div>
                    <p className="card-testimonial-name">Profile pending</p>
                    <p className="card-testimonial-meta">Name withheld</p>
                    <p className="card-testimonial-meta text-primary-600 font-medium">
                      -
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 relative overflow-hidden">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 bg-pattern-grid opacity-10"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-10 right-10 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-float"></div>
          <div
            className="absolute bottom-10 left-10 w-96 h-96 bg-accent-500/20 rounded-full blur-3xl animate-float"
            style={{ animationDelay: "3s" }}
          ></div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="scroll-fade-in">
            <Brain className="w-16 h-16 text-white/80 mx-auto mb-6" />
            <h2 className="text-display-lg text-white mb-6">
              Ready to Find Your Perfect University Match?
            </h2>
            <p className="text-body-lg text-primary-100 mb-10 max-w-2xl mx-auto">
              Join thousands of Pakistani students who are making smarter
              decisions about their future with AI-powered guidance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <button className="btn-accent group shadow-glow-orange">
                  Start Free Today
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
              <Link to="/universities">
                <button className="btn-secondary bg-white/10 border-white/30 text-white hover:bg-white/20">
                  Explore Universities
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA Bar */}
      <section className="py-8 bg-primary-50 border-t border-primary-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <GraduationCap className="w-10 h-10 text-primary-600" />
              <div>
                <p className="text-heading-sm text-primary-900">
                  Questions about admissions?
                </p>
                <p className="text-body-sm text-neutral-600">
                  Our AI counselor is ready to help
                </p>
              </div>
            </div>
            <Link to="/chat">
              <button className="btn-primary">
                <MessageSquare className="w-5 h-5" />
                Chat with AI Counselor
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
