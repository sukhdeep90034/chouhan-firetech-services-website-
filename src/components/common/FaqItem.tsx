import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { FaqData } from "@/data/firetechData";

export function FaqItem({
  item,
  question,
  answer,
  defaultOpen = false,
}: {
  item?: FaqData;
  question?: string;
  answer?: string;
  defaultOpen?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const qText = item?.q || question || "";
  const aText = item?.a || answer || "";
  const idx = item?.index;
  const category = item?.category;

  return (
    <div
      className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
        isOpen
          ? "border-red-500/50 bg-[#0e111d] shadow-[0_12px_32px_-10px_rgba(220,38,38,0.22)] border-l-4 border-l-red-500"
          : "border-zinc-800/80 bg-[#0b0d15] hover:border-zinc-700 hover:bg-[#0f121d]"
      }`}
    >
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-start justify-between p-4.5 sm:p-5.5 text-left cursor-pointer group gap-3 sm:gap-4"
        aria-expanded={isOpen}
      >
        <div className="flex items-start gap-3 sm:gap-4 min-w-0">
          {idx && (
            <span
              className={`font-mono text-xs font-black px-2.5 py-1 rounded-lg shrink-0 mt-0.5 transition-colors ${
                isOpen
                  ? "bg-red-600 text-white shadow-xs"
                  : "bg-zinc-900 text-zinc-400 group-hover:text-red-400 group-hover:bg-zinc-800"
              }`}
            >
              {idx}
            </span>
          )}
          <div className="min-w-0">
            {category && (
              <span className="inline-block text-[10px] font-extrabold uppercase tracking-wider text-red-400 mb-1">
                {category}
              </span>
            )}
            <h4
              className={`text-xs sm:text-sm md:text-base font-bold tracking-tight transition-colors leading-snug ${
                isOpen ? "text-white" : "text-zinc-200 group-hover:text-white"
              }`}
            >
              {qText}
            </h4>
          </div>
        </div>
        <div
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-300 mt-0.5 ${
            isOpen
              ? "border-red-500/50 bg-red-950/70 text-red-400 rotate-180 shadow-xs"
              : "border-zinc-800 bg-zinc-900 text-zinc-400 group-hover:border-zinc-700 group-hover:text-zinc-200"
          }`}
        >
          <ChevronDown className="h-4 w-4" />
        </div>
      </button>

      {isOpen && (
        <div className="px-4.5 sm:px-5.5 pb-5 text-xs sm:text-sm leading-relaxed text-zinc-300 border-t border-zinc-800/80 pt-3.5 animate-in fade-in slide-in-from-top-1 duration-200">
          <p className="pl-0 sm:pl-11 text-zinc-300 font-medium">
            {aText}
          </p>
        </div>
      )}
    </div>
  );
}
