/**
 * Scrolls to #yhteys without scrolling so far that the fixed WEBSO spacer
 * at the bottom of the page enters the viewport (distracting animation).
 */
export function scrollToYhteysSection() {
  const el = document.getElementById("yhteys");
  if (!el) return;
  const spacer = document.querySelector<HTMLElement>("[data-webso-spacer]");
  const spacerH = spacer?.offsetHeight ?? 0;
  const doc = document.documentElement;
  const scrollHeight = doc.scrollHeight;
  const vh = window.innerHeight;
  const bufferPx = 48;
  const y = el.getBoundingClientRect().top + window.scrollY;
  const maxScroll = Math.max(0, scrollHeight - vh);
  const cap =
    spacerH > 0
      ? Math.max(0, scrollHeight - vh - spacerH - bufferPx)
      : maxScroll;
  const targetTop = Math.min(y, cap);
  window.scrollTo({ top: targetTop, behavior: "smooth" });
}
