import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { AlertTriangle, Send, CheckCircle2 } from "lucide-react";
import toast from "react-hot-toast";
import reportIssuesAPI from "../api/reportIssues";
import "../styles/design-system.css";

const categories = [
  "Bug",
  "Data Error",
  "Recommendation Issue",
  "UI/UX",
  "Performance",
  "Other",
];

const ReportIssuePage = () => {
  const [form, setForm] = useState({
    category: "Bug",
    subject: "",
    description: "",
    page_url: window.location.pathname,
    contact_email: "",
  });
  const [submittedIssueId, setSubmittedIssueId] = useState(null);

  const createIssueMutation = useMutation({
    mutationFn: reportIssuesAPI.createIssue,
    onSuccess: (data) => {
      setSubmittedIssueId(data?.id || data?.issue_id || null);
      toast.success("Issue reported successfully.");
      setForm({
        category: "Bug",
        subject: "",
        description: "",
        page_url: window.location.pathname,
        contact_email: "",
      });
    },
    onError: (error) => {
      toast.error(error?.response?.data?.detail || "Failed to report issue.");
    },
  });

  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const onSubmit = (event) => {
    event.preventDefault();
    createIssueMutation.mutate(form);
  };

  return (
    <div className="min-h-screen bg-gradient-subtle py-10 md:py-14">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="card-float bg-white">
          <div className="flex items-start gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <h1 className="text-display-sm text-primary-900">
                Report an Issue
              </h1>
              <p className="text-body-md text-neutral-600 mt-1">
                Share a bug or data problem. This report will be saved in your
                backend database.
              </p>
            </div>
          </div>

          {submittedIssueId && (
            <div className="mb-6 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-green-800 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5" />
              <span>Issue submitted. Reference ID: {submittedIssueId}</span>
            </div>
          )}

          <form onSubmit={onSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-neutral-700 mb-2">
                Category
              </label>
              <select
                value={form.category}
                onChange={(event) =>
                  updateField("category", event.target.value)
                }
                className="w-full rounded-lg border border-neutral-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-neutral-700 mb-2">
                Subject
              </label>
              <input
                required
                value={form.subject}
                onChange={(event) => updateField("subject", event.target.value)}
                placeholder="Short title for the issue"
                className="w-full rounded-lg border border-neutral-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-neutral-700 mb-2">
                Description
              </label>
              <textarea
                required
                rows={6}
                value={form.description}
                onChange={(event) =>
                  updateField("description", event.target.value)
                }
                placeholder="Tell us what happened, and how to reproduce it"
                className="w-full rounded-lg border border-neutral-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-neutral-700 mb-2">
                Page URL
              </label>
              <input
                value={form.page_url}
                onChange={(event) =>
                  updateField("page_url", event.target.value)
                }
                placeholder="/page-path"
                className="w-full rounded-lg border border-neutral-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-neutral-700 mb-2">
                Contact Email (optional)
              </label>
              <input
                type="email"
                value={form.contact_email}
                onChange={(event) =>
                  updateField("contact_email", event.target.value)
                }
                placeholder="you@example.com"
                className="w-full rounded-lg border border-neutral-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            <button
              type="submit"
              disabled={createIssueMutation.isPending}
              className="btn-primary w-full justify-center"
            >
              <Send className="w-4 h-4" />
              {createIssueMutation.isPending ? "Submitting..." : "Submit Issue"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReportIssuePage;
