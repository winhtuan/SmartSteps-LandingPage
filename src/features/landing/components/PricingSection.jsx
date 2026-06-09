import { useState } from "react";
import { Check } from "@phosphor-icons/react";
import { ButtonLink } from "../../../components/ui/ButtonLink";
import { SectionHeading } from "../../../components/ui/SectionHeading";
import { planIcons } from "../data/landingContent";

const BILLING_CYCLES = ["monthly", "yearly"];

function getPlanCardClass(plan) {
  if (!plan.paid) {
    return "border-slate-200 bg-slate-50 shadow-sm hover:-translate-y-1 hover:border-slate-300 hover:shadow-xl";
  }

  if (plan.pricing) {
    return "border-green-600 bg-green-600 text-white shadow-[0_18px_40px_rgba(22,163,74,0.2)] hover:-translate-y-1 hover:shadow-[0_24px_52px_rgba(22,163,74,0.28)]";
  }

  return "border-[#149447] bg-[#149447] text-white shadow-[0_18px_40px_rgba(20,148,71,0.2)] hover:-translate-y-1 hover:shadow-[0_24px_52px_rgba(20,148,71,0.28)]";
}

function BillingToggle({ labels, value, onChange }) {
  return (
    <div className="mt-1">
      <div className="inline-flex w-fit rounded-full bg-green-900/70 p-1 text-xs font-bold">
        {BILLING_CYCLES.map((cycle) => (
          <button
            key={cycle}
            type="button"
            aria-pressed={value === cycle}
            onClick={() => onChange(cycle)}
            className={`relative rounded-full px-3 py-1.5 transition ${
              value === cycle
                ? "bg-white text-green-800 shadow-sm"
                : "text-green-100 hover:text-white"
            }`}
          >
            {labels[cycle]}
            {cycle === "yearly" && (
              <span className="absolute -right-3 -top-4 -rotate-6 whitespace-nowrap rounded-full bg-yellow-300 px-2 py-0.5 text-[10px] font-black text-yellow-900 shadow-sm">
                {labels.save}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

function PricingCard({ plan, planIcon, billingCycle, pricingLabels, onBillingCycleChange }) {
  const [price, billing] = plan.pricing
    ? plan.pricing[billingCycle]
    : [plan.price, plan.billing];

  return (
    <article
      className={`relative flex flex-col overflow-hidden rounded-[1.5rem] border p-5 transition duration-300 sm:rounded-[2rem] sm:p-7 xl:p-8 ${getPlanCardClass(plan)}`}
    >
      <div className="flex min-h-12 items-center gap-3">
        <img
          className={`h-12 w-12 shrink-0 ${plan.paid ? "brightness-0 invert" : "opacity-80"}`}
          src={planIcon}
          alt=""
        />
        <h3 className={`text-3xl font-black ${plan.paid ? "text-white" : "text-slate-900"}`}>
          {plan.name}
        </h3>
      </div>

      <p className={`mt-5 text-sm leading-6 lg:min-h-[4.5rem] ${plan.paid ? "text-green-100" : "text-slate-600"}`}>
        {plan.copy}
      </p>

      {plan.pricing && (
        <BillingToggle
          labels={pricingLabels}
          value={billingCycle}
          onChange={onBillingCycleChange}
        />
      )}

      <p className={`mt-5 flex flex-wrap items-baseline gap-x-2 gap-y-1 text-[1.55rem] font-black tracking-tight sm:whitespace-nowrap sm:text-[1.75rem] xl:text-3xl ${plan.paid ? "text-white" : "text-slate-950"}`}>
        <span>{price}</span>
        <span className={`text-xs font-bold tracking-normal ${plan.paid ? "text-green-100" : "text-slate-500"}`}>
          {billing}
        </span>
      </p>

      <ButtonLink
        href={plan.paid ? "#pricing" : "/learning"}
        tone={plan.paid ? "yellow" : "outline"}
        className="mt-5 w-full"
      >
        {plan.cta || pricingLabels.signup}
      </ButtonLink>

      <ul className={`mt-7 flex-1 space-y-3 border-t pt-6 ${plan.paid ? "border-[#35a964]" : "border-slate-200"}`}>
        {plan.items.map((item) => (
          <li
            key={item}
            className={`flex gap-2 text-sm font-medium leading-5 ${plan.paid ? "text-white" : "text-slate-600"}`}
          >
            <Check
              className={`mt-0.5 shrink-0 ${plan.paid ? "text-yellow-300" : "text-green-600"}`}
              size={18}
              weight="bold"
            />
            {item}
          </li>
        ))}
      </ul>
    </article>
  );
}

export function PricingSection({ t }) {
  const [billingCycle, setBillingCycle] = useState("yearly");
  const pricing = t.pricing;

  return (
    <section
      id="pricing"
      className="section-space overflow-hidden bg-[#fffdf7] px-4 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeading {...pricing} />
        <div className="mt-10 grid items-stretch gap-5 md:mt-14 md:grid-cols-2 lg:grid-cols-3 xl:gap-6">
          {pricing.plans.map((plan, index) => (
            <PricingCard
              key={plan.name}
              plan={plan}
              planIcon={planIcons[index]}
              billingCycle={billingCycle}
              pricingLabels={pricing}
              onBillingCycleChange={setBillingCycle}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
