/** Fired when a portfolio access-code session is created or cleared (same tab). */
export const PORTFOLIO_ACCESS_CHANGED_EVENT = "aae:portfolio-access-changed";

export function notifyPortfolioAccessChanged() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(PORTFOLIO_ACCESS_CHANGED_EVENT));
}
