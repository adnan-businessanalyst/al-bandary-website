"use client";

import posthog from "posthog-js";
import { posthogSettings } from "./analytics-config";
import type { Locale } from "./dictionary";

let started = false;
let lastPagePath = "";

type DataLayerPayload = {
  event: string;
  page_path: string;
  language: Locale;
  inquiry_id?: string;
};

declare global {
  interface Window {
    dataLayer?: DataLayerPayload[];
  }
}

export function initAnalytics() {
  if (started || typeof window === "undefined") return;
  const settings = posthogSettings();
  if (!settings) return;
  posthog.init(settings.key, {
    api_host: settings.host,
    capture_pageview: false,
    autocapture: false,
    person_profiles: "identified_only",
    session_recording: {
      maskAllInputs: true,
    },
  });
  started = true;
}

function pushDataLayer(payload: DataLayerPayload) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(payload);
}

export function trackPageView(pagePath: string, language: Locale) {
  initAnalytics();
  if (started) posthog.register({ language });
  if (lastPagePath === pagePath) return;
  lastPagePath = pagePath;
  const payload = { page_path: pagePath, language };
  if (started) posthog.capture("$pageview", payload);
  pushDataLayer({ event: "page_view", ...payload });
}

export function trackClickPhone(language: Locale) {
  trackLead("click_phone", language);
}

export function trackClickEmail(language: Locale) {
  trackLead("click_email", language);
}

function trackLead(event: "click_phone" | "click_email", language: Locale) {
  initAnalytics();
  const payload = {
    event,
    page_path: window.location.pathname,
    language,
  };
  pushDataLayer(payload);
  if (!started) return;
  posthog.capture(event, {
    page_path: payload.page_path,
    language,
  });
}

export function trackGenerateLead(language: Locale, inquiryId: string) {
  if (!inquiryId) return;
  initAnalytics();
  const payload = {
    event: "generate_lead",
    page_path: window.location.pathname,
    language,
    inquiry_id: inquiryId,
  };
  pushDataLayer(payload);
  if (!started) return;
  posthog.capture("generate_lead", {
    page_path: payload.page_path,
    language,
    inquiry_id: inquiryId,
  });
}
