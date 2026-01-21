// Simple brand storage using localStorage with safe fallbacks
const DEFAULT_BRAND = {
  title: "Social Trading",
  logoUrl: "/brand/logo.svg",
  faviconUrl: "/brand/favicon.svg",
};

export function getBrand() {
  try {
    const raw = localStorage.getItem("brand-settings");
    if (!raw) return { ...DEFAULT_BRAND };
    const parsed = JSON.parse(raw);
    return {
      title: parsed.title || DEFAULT_BRAND.title,
      logoUrl: parsed.logoUrl || DEFAULT_BRAND.logoUrl,
      faviconUrl: parsed.faviconUrl || DEFAULT_BRAND.faviconUrl,
    };
  } catch {
    return { ...DEFAULT_BRAND };
  }
}

export function setBrand(next) {
  const merged = {
    title: next.title || DEFAULT_BRAND.title,
    logoUrl: next.logoUrl || DEFAULT_BRAND.logoUrl,
    faviconUrl: next.faviconUrl || DEFAULT_BRAND.faviconUrl,
  };
  localStorage.setItem("brand-settings", JSON.stringify(merged));
  applyBrandToDocument(merged);
  return merged;
}

export function resetBrand() {
  localStorage.removeItem("brand-settings");
  applyBrandToDocument(DEFAULT_BRAND);
  return { ...DEFAULT_BRAND };
}

export function applyBrandToDocument(brand) {
  if (typeof document === "undefined") return;
  try {
    if (brand.title) document.title = brand.title;
    const linkId = "dynamic-app-favicon";
    let link = document.querySelector(`link#${linkId}`);
    if (!link) {
      link = document.createElement("link");
      link.id = linkId;
      link.rel = "icon";
      document.head.appendChild(link);
    }
    link.href = brand.faviconUrl || DEFAULT_BRAND.faviconUrl;
  } catch {
    // no-op
  }
}

export function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}