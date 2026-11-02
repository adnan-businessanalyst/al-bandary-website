const GTM_ID_PATTERN = /^GTM-[A-Z0-9]+$/;
const POSTHOG_KEY_PATTERN = /^phc_[A-Za-z0-9]+$/;

export function googleTagManagerId() {
  const id = process.env.NEXT_PUBLIC_GTM_ID ?? "";
  return GTM_ID_PATTERN.test(id) ? id : "";
}

export function posthogSettings() {
  const key = process.env.NEXT_PUBLIC_POSTHOG_KEY ?? "";
  const host = process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "";
  if (!POSTHOG_KEY_PATTERN.test(key)) return null;
  if (!host.startsWith("https://")) return null;
  return { key, host };
}
