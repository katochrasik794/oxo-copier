import { useEffect, useState } from "react";
import { getBrand, setBrand, resetBrand, fileToDataUrl, applyBrandToDocument } from "../../utils/brand";

export default function Branding() {
  const [title, setTitle] = useState("");
  const [logoUrl, setLogoUrl] = useState("");
  const [faviconUrl, setFaviconUrl] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const b = getBrand();
    setTitle(b.title);
    setLogoUrl(b.logoUrl);
    setFaviconUrl(b.faviconUrl);
    applyBrandToDocument(b);
  }, []);

  async function handleFileChange(e, kind) {
    const file = e.target.files?.[0];
    if (!file) return;
    const dataUrl = await fileToDataUrl(file);
    if (kind === "logo") setLogoUrl(dataUrl);
    if (kind === "favicon") setFaviconUrl(dataUrl);
  }

  async function handleSave() {
    setSaving(true);
    try {
      const b = setBrand({ title, logoUrl, faviconUrl });
      setTitle(b.title);
      setLogoUrl(b.logoUrl);
      setFaviconUrl(b.faviconUrl);
    } finally {
      setSaving(false);
    }
  }

  function handleReset() {
    const b = resetBrand();
    setTitle(b.title);
    setLogoUrl(b.logoUrl);
    setFaviconUrl(b.faviconUrl);
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold text-black">Branding</h1>
      <p className="text-gray-700 mt-1">Set website title, logo, and favicon. These settings are applied instantly in admin. Persisting files to the public folder will require a backend; for now we store settings locally.</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        {/* Settings */}
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <h2 className="text-lg font-medium text-black">Site Title</h2>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter website title"
            className="mt-2 w-full border border-gray-300 rounded-lg px-3 py-2 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <div className="mt-5">
            <h2 className="text-lg font-medium text-black">Upload Logo</h2>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange(e, "logo")}
              className="mt-2 block w-full text-sm text-gray-700"
            />
          </div>

          <div className="mt-5">
            <h2 className="text-lg font-medium text-black">Upload Favicon</h2>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange(e, "favicon")}
              className="mt-2 block w-full text-sm text-gray-700"
            />
          </div>

          <div className="flex gap-3 mt-6">
            <button
              onClick={handleSave}
              disabled={saving}
              className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Branding"}
            </button>
            <button
              onClick={handleReset}
              className="px-4 py-2 rounded-lg bg-gray-100 text-black border border-gray-300 hover:bg-gray-200"
            >
              Reset to Default
            </button>
          </div>
        </div>

        {/* Preview */}
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <h2 className="text-lg font-medium text-black">Preview</h2>
          <p className="text-gray-700">How it appears in admin layout.</p>

          <div className="mt-4 flex items-center gap-3">
            {logoUrl && (
              <img src={logoUrl} alt="Logo" className="h-10 w-10 object-contain" />
            )}
            <span className="text-xl font-semibold text-black">{title || "Social Trading"}</span>
          </div>

          <div className="mt-6">
            <p className="text-gray-700">Favicon:</p>
            {faviconUrl && (
              <img src={faviconUrl} alt="Favicon" className="h-8 w-8 object-contain border border-gray-200 rounded" />
            )}
          </div>
        </div>
      </div>

      <div className="mt-6 text-gray-600 text-sm">
        <p>
          Note: Saving to the `public/` folder requires a backend/API to accept uploads and write files. This admin UI persists settings locally and applies them dynamically.
        </p>
      </div>
    </div>
  );
}