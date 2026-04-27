import { createElement } from "react";
import { Link } from "react-router-dom";
import {
  HeartHandshake,
  Rocket,
  Users,
  HandHeart,
  Code,
  Database,
  Megaphone,
  ArrowRight,
  Github,
  Building2,
  Image,
} from "lucide-react";
import teamPhoto from "../assets/highquality.jpg";
import "../styles/design-system.css";

const volunteerRoles = [
  {
    icon: Code,
    title: "Technical Volunteers",
    description:
      "Developers, AI enthusiasts, and designers to help scale the codebase and improve the AI Tutor.",
  },
  {
    icon: Database,
    title: "Data Hunters",
    description:
      "Contributors who collect accurate university admission data, past papers, and scholarship information.",
  },
  {
    icon: Megaphone,
    title: "Community Ambassadors",
    description:
      "FSO and community volunteers who spread awareness and support students in remote areas.",
  },
];

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gradient-subtle py-10 md:py-14">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <section className="relative overflow-hidden rounded-3xl border border-primary-100 bg-white p-8 md:p-12 shadow-soft">
          <div className="absolute -top-16 -right-14 h-44 w-44 rounded-full bg-primary-200/45 blur-3xl" />
          <div className="absolute -bottom-16 -left-14 h-44 w-44 rounded-full bg-accent-200/35 blur-3xl" />

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary-50 px-4 py-2 text-primary-700">
              <Rocket className="h-4 w-4" />
              <span className="text-body-sm font-semibold">
                About NorthStar
              </span>
            </div>

            <h1 className="mt-5 text-display-lg text-primary-900 max-w-4xl">
              Built by students, for students. Guiding your educational journey,
              no matter where you are.
            </h1>

            <p className="mt-5 text-body-lg text-neutral-700 max-w-3xl">
              We built NorthStar with a student-first mindset and a community
              mission: help every learner discover the right path to higher
              education.
            </p>
          </div>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-3">
          <article className="card-float lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <HeartHandshake className="h-6 w-6 text-primary-600" />
              <h2 className="text-heading-md text-primary-900">Our Mission</h2>
            </div>
            <p className="text-body-md text-neutral-700">
              Education should not be a privilege limited by geography or
              background; it is a fundamental right. NorthStar was born from a
              simple but powerful idea: make higher education accessible,
              understandable, and achievable for everyone.
            </p>
            <p className="text-body-md text-neutral-700 mt-4">
              We built this platform specifically for students of
              Gilgit-Baltistan and beyond, so every brilliant mind can get the
              guidance they need to find the right university, secure financial
              aid, and prepare for entry tests with confidence.
            </p>
          </article>

          <aside className="card-float">
            <div className="mt-4 rounded-2xl border-primary-200 bg-primary-50/40 p-4">
              <div className=" items-center justify-center">
                <div className="text-center text-primary-700 px-4">
                  <img
                    src={teamPhoto}
                    alt="Team Photo"
                    className="h-50 w-80 rounded-full mx-auto mt-2 object-cover shadow-md"
                  />
                  <p className="text-body-sm font-medium mt-2">
                    The NorthStar Team
                  </p>
                </div>
              </div>
            </div>

            <p className="text-body-sm text-neutral-600 mt-3">
              I built NorthStar to ensure students from underrepresented regions
              can access quality career guidance. - Raqeeb
            </p>
          </aside>
        </section>

        <section className="mt-6 card-float">
          <div className="flex items-center gap-3 mb-4">
            <Users className="h-6 w-6 text-primary-600" />
            <h2 className="text-heading-md text-primary-900">
              What is NorthStar?
            </h2>
          </div>
          <p className="text-body-md text-neutral-700">
            NorthStar is an AI-powered Career Pilot and Tutor. It bridges the
            gap between ambition and opportunity by matching students with
            universities based on unique academic and financial profiles, while
            also providing a personalized roadmap for exam preparation.
          </p>
        </section>

        <section className="mt-6 card-float">
          <div className="flex items-center gap-3 mb-4">
            <HandHeart className="h-6 w-6 text-primary-600" />
            <h2 className="text-heading-md text-primary-900">
              A Project by the Community, For the Community
            </h2>
          </div>

          <p className="text-body-md text-neutral-700">
            NorthStar is proudly open-source. This is not a closed-door
            corporate product; it is a community-driven initiative. We started
            as a small family team building the core AI and full-stack
            infrastructure, and now we are inviting passionate contributors to
            help grow this mission.
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {volunteerRoles.map(({ icon, title, description }) => (
              <article
                key={title}
                className="rounded-2xl border border-primary-100 bg-primary-50/35 p-4"
              >
                {createElement(icon, { className: "h-5 w-5 text-primary-600" })}
                <h3 className="text-body-lg font-semibold text-primary-900 mt-3">
                  {title}
                </h3>
                <p className="text-body-sm text-neutral-700 mt-2">
                  {description}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-6 card-float">
          <div className="flex items-center gap-3 mb-4">
            <Building2 className="h-6 w-6 text-primary-600" />
            <h2 className="text-heading-md text-primary-900">
              Our Promise: Purpose Over Profit
            </h2>
          </div>
          <p className="text-body-md text-neutral-700">
            NorthStar operates under the umbrella of the Feel and Support
            Organization (FSO). Our core directive is community welfare, not
            corporate gain. If NorthStar generates profit or receives funding,
            100% of those proceeds will be directed to FSO to support
            educational awareness, youth training, and regional development
            initiatives.
          </p>
        </section>

        <section className="mt-6 card-float">
          <h2 className="text-heading-md text-primary-900">Get Involved</h2>
          <p className="text-body-md text-neutral-700 mt-2">
            You do not need to be a programmer to make a difference. Whether you
            can write code, collect data, or simply spread the word to students
            in remote areas, there is a place for you here.
          </p>

          <div className="mt-5 flex flex-col sm:flex-row sm:flex-wrap gap-3">
            <a
              href="https://forms.gle/qNuV42VzWqhowtzAA"
              target="_blank"
              rel="noreferrer"
              className="btn-primary justify-center"
            >
              Join the Volunteer Team
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="https://github.com/GB-AI-Tutor"
              target="_blank"
              rel="noreferrer"
              className="btn-secondary justify-center"
            >
              View the Source Code on GitHub
              <Github className="h-4 w-4" />
            </a>
            <a
              href="https://www.facebook.com/people/Feel-and-Support-Organization-FSO/100078969348561/"
              className="btn-secondary justify-center"
              aria-label="Learn More About FSO"
            >
              Learn More About FSO
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;
