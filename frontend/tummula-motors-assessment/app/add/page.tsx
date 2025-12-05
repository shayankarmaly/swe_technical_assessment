"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AddVehicle() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    vin: "",
    description: "",
    make: "",
    model: "",
    imageLinks: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Basic validation
    if (!formData.vin.trim()) {
      setError("VIN is required");
      return;
    }
    if (!formData.make.trim()) {
      setError("Manufacturer name is required");
      return;
    }
    if (!formData.model.trim()) {
      setError("Model is required");
      return;
    }

    setIsSubmitting(true);

    try {
      // Process image URLs
      const image_urls = formData.imageLinks
        .split(",")
        .map((url) => url.trim())
        .filter((url) => url.length > 0);

      const payload = {
        vin: formData.vin.trim(),
        description: formData.description.trim() || null,
        make: formData.make.trim(),
        model: formData.model.trim(),
        image_urls: image_urls.length > 0 ? image_urls : [],
      };

      let res;
      try {
        res = await fetch("http://localhost:8000/vehicles", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });
      } catch (fetchError) {
        throw new Error("Cannot connect to backend server. Make sure it's running on port 8000.");
      }

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        const errorMessage = errorData.detail 
          ? (typeof errorData.detail === 'string' 
              ? errorData.detail 
              : JSON.stringify(errorData.detail))
          : `Failed to add vehicle (${res.status})`;
        throw new Error(errorMessage);
      }

      // Success - redirect to home
      router.push("/");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add vehicle");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-green-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 transition-colors duration-200"
            >
              <svg
                className="w-5 h-5 text-slate-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </Link>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-black">
                Add New Vehicle
              </h1>
              <p className="mt-1 text-slate-600 text-sm">
                Fill in the details to add a vehicle to your inventory
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
                <svg
                  className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <div>
                  <h3 className="text-sm font-semibold text-red-900">
                    Error
                  </h3>
                  <p className="text-sm text-red-700 mt-1">{error}</p>
                </div>
              </div>
            )}

            {/* VIN */}
            <div>
              <label
                htmlFor="vin"
                className="block text-sm font-semibold text-black mb-2"
              >
                VIN <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="vin"
                required
                value={formData.vin}
                onChange={(e) =>
                  setFormData({ ...formData, vin: e.target.value })
                }
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-200 font-mono text-sm text-black"
                placeholder="e.g., 1C4RJXR66RW241060"
                disabled={isSubmitting}
              />
              <p className="mt-1.5 text-xs text-slate-600">
                Vehicle Identification Number (17 characters)
              </p>
            </div>

            {/* Manufacturer and Model - Side by Side */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="make"
                  className="block text-sm font-semibold text-black mb-2"
                >
                  Manufacturer <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="make"
                  required
                  value={formData.make}
                  onChange={(e) =>
                    setFormData({ ...formData, make: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-200 text-black"
                  placeholder="e.g., Jeep, Ford, Toyota"
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <label
                  htmlFor="model"
                  className="block text-sm font-semibold text-black mb-2"
                >
                  Model <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="model"
                  required
                  value={formData.model}
                  onChange={(e) =>
                    setFormData({ ...formData, model: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-200 text-black"
                  placeholder="e.g., Wrangler, F150, RAV4"
                  disabled={isSubmitting}
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-semibold text-black mb-2"
              >
                Description
              </label>
              <textarea
                id="description"
                rows={5}
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-200 resize-none text-black"
                placeholder="Enter a brief description about the vehicle..."
                disabled={isSubmitting}
              />
              <p className="mt-1.5 text-xs text-slate-600">
                Provide details about features, condition, and highlights
              </p>
            </div>

            {/* Image Links */}
            <div>
              <label
                htmlFor="imageLinks"
                className="block text-sm font-semibold text-black mb-2"
              >
                Image Links
              </label>
              <textarea
                id="imageLinks"
                rows={4}
                value={formData.imageLinks}
                onChange={(e) =>
                  setFormData({ ...formData, imageLinks: e.target.value })
                }
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-200 resize-none font-mono text-xs text-black"
                placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg"
                disabled={isSubmitting}
              />
              <p className="mt-1.5 text-xs text-slate-600">
                Enter comma-separated image URLs
              </p>
            </div>

            {/* Form Actions */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 inline-flex items-center justify-center px-6 py-3.5 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 disabled:bg-green-400 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Adding Vehicle...
                  </>
                ) : (
                  <>
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Add Vehicle
                  </>
                )}
              </button>
              <Link
                href="/"
                className="flex-1 sm:flex-initial inline-flex items-center justify-center px-6 py-3.5 rounded-lg border-2 border-slate-300 text-slate-700 font-semibold hover:bg-slate-50 transition-colors duration-200"
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>

        {/* Info Card */}
        <div className="mt-6 bg-green-50 border border-green-100 rounded-xl p-6">
          <div className="flex items-start gap-3">
            <svg
              className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <div>
              <h3 className="text-sm font-semibold text-green-900 mb-1">
                Quick Tips
              </h3>
              <ul className="text-sm text-green-800 space-y-1">
                <li>• VIN must be unique for each vehicle</li>
                <li>• Manufacturer and Model are required fields</li>
                <li>• Description helps buyers understand the vehicle better</li>
                <li>• Multiple image URLs should be separated by commas</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

