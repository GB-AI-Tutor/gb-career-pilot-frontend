import EligibilityBadge from "./EligibilityBadge";
import { formatCurrency } from "../../utils/formatters";
import {
  ArrowUpRight,
  Building2,
  DollarSign,
  GraduationCap,
  MapPin,
} from "lucide-react";

const ProgramCard = ({ program }) => {
  const getTextValue = (value) => {
    if (value === undefined || value === null) {
      return "";
    }

    if (typeof value === "string") {
      return value.trim();
    }

    if (typeof value === "number" || typeof value === "boolean") {
      return String(value);
    }

    return "";
  };

  const universitySource =
    program?.university ||
    program?.universities ||
    program?.university_data ||
    {};

  const universityName =
    getTextValue(universitySource?.name) ||
    getTextValue(program?.university_name) ||
    getTextValue(program?.university) ||
    "University details unavailable";

  const universityCity =
    getTextValue(universitySource?.city) || getTextValue(program?.city);

  const universitySector =
    getTextValue(universitySource?.sector) || getTextValue(program?.sector);

  const eligibility = program?.eligibility || {};
  const fieldLabel =
    getTextValue(program?.field_of_study) ||
    getTextValue(program?.field) ||
    getTextValue(program?.subject) ||
    "Field not specified";

  const degreeLabel =
    getTextValue(program?.degree_type) ||
    getTextValue(program?.degree) ||
    getTextValue(program?.program_type);

  return (
    <article className="group relative overflow-hidden rounded-2xl bg-white shadow-[0_18px_40px_-18px_rgba(0,33,71,0.22)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_28px_60px_-24px_rgba(0,33,71,0.28)]">
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#002147] via-[#0c8ce9] to-[#ff7e12] opacity-90" />

      <div className="relative p-6 md:p-7">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div className="min-w-0 flex-1">
            <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-[#f0f7ff] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#0158a1]">
              <Building2 className="w-3.5 h-3.5" />
              {degreeLabel || "Program"}
            </div>
            <h3 className="text-heading-sm text-[#002147] group-hover:text-[#006d36] transition-colors">
              {program.name}
            </h3>
          </div>

          {eligibility.tier && <EligibilityBadge tier={eligibility.tier} />}
        </div>

        <div className="space-y-3 text-body-sm text-[#44474e]">
          <div className="flex items-start gap-3 rounded-xl bg-[#f8f9fa] px-4 py-3">
            <div className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-full bg-[#e0effe] text-[#006d36]">
              <GraduationCap className="w-4.5 h-4.5" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#6c727f]">
                University
              </p>
              <p className="mt-1 text-base font-semibold text-[#191c1d]">
                {universityName}
              </p>
              {universityCity && (
                <p className="mt-1 flex items-center gap-1.5 text-sm text-[#5b616d]">
                  <MapPin className="w-3.5 h-3.5" />
                  {universityCity}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl bg-[#f8f9fa] px-4 py-3">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#6c727f]">
                Field
              </p>
              <p className="mt-1 text-sm font-semibold text-[#191c1d]">
                {fieldLabel}
              </p>
            </div>

            <div className="rounded-xl bg-[#f8f9fa] px-4 py-3">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#6c727f]">
                Fee
              </p>
              <p className="mt-1 text-sm font-semibold text-[#191c1d]">
                {program.estimated_total_fee
                  ? formatCurrency(program.estimated_total_fee)
                  : "Not listed"}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 pt-1">
            {universitySector && (
              <span
                className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
                  universitySector === "Public"
                    ? "bg-[#e0effe] text-[#0158a1]"
                    : "bg-[#fff2e8] text-[#c15a00]"
                }`}
              >
                {universitySector}
              </span>
            )}

            {program.duration_years && (
              <span className="inline-flex items-center rounded-full bg-[#f3f4f5] px-3 py-1 text-xs font-semibold text-[#44474e]">
                {program.duration_years} years
              </span>
            )}

            {fieldLabel && (
              <span className="inline-flex items-center rounded-full bg-[#f0f7ff] px-3 py-1 text-xs font-semibold text-[#0158a1]">
                {fieldLabel}
              </span>
            )}
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between border-t border-transparent pt-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#6c727f]">
              Match ready
            </p>
            <p className="mt-1 text-sm font-medium text-[#44474e]">
              Explore this option in detail
            </p>
          </div>

          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#f0f7ff] text-[#0158a1] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            aria-label={`View more details for ${program.name}`}
          >
            <ArrowUpRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </article>
  );
};

export default ProgramCard;
