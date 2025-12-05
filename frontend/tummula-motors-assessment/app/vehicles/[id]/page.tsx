import Link from "next/link";
import { notFound } from "next/navigation";

interface Vehicle {
  id: string;
  vin: string;
  make: string;
  model: string;
  description?: string;
  image_urls?: string[];
}

async function getVehicle(id: string): Promise<Vehicle | null> {
  try {
    const res = await fetch(`http://localhost:8000/vehicles/${id}`, {
      cache: "no-store",
    });
    if (!res.ok) {
      return null;
    }
    return res.json();
  } catch (error) {
    console.error("Error fetching vehicle:", error);
    return null;
  }
}

export default async function VehicleDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const vehicle = await getVehicle(id);

  if (!vehicle) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-green-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
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
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
                {vehicle.make} {vehicle.model}
              </h1>
              <p className="mt-1 text-slate-600 text-sm">Vehicle Details</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Image Gallery */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              {vehicle.image_urls && vehicle.image_urls.length > 0 ? (
                <div className="space-y-4 p-6">
                  {/* Main Image */}
                  <div className="aspect-video rounded-xl overflow-hidden bg-slate-100">
                    <img
                      src={vehicle.image_urls[0]}
                      alt={`${vehicle.make} ${vehicle.model} - Main`}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Thumbnail Grid */}
                  {vehicle.image_urls.length > 1 && (
                    <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
                      {vehicle.image_urls.slice(1, 7).map((url, index) => (
                        <div
                          key={index}
                          className="aspect-square rounded-lg overflow-hidden bg-slate-100 hover:opacity-75 transition-opacity duration-200 cursor-pointer"
                        >
                          <img
                            src={url}
                            alt={`${vehicle.make} ${vehicle.model} - ${
                              index + 2
                            }`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                      {vehicle.image_urls.length > 7 && (
                        <div className="aspect-square rounded-lg bg-slate-200 flex items-center justify-center">
                          <span className="text-xs font-semibold text-slate-600">
                            +{vehicle.image_urls.length - 7}
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <div className="aspect-video bg-slate-100 flex flex-col items-center justify-center p-6">
                  <svg
                    className="w-20 h-20 text-slate-300 mb-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <p className="text-slate-500 font-medium">
                    No images available
                  </p>
                </div>
              )}
            </div>

            {/* Description Section */}
            {vehicle.description && (
              <div className="mt-6 bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-slate-900 mb-4">
                  Description
                </h2>
                <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">
                  {vehicle.description}
                </p>
              </div>
            )}
          </div>

          {/* Vehicle Info Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
              <h2 className="text-xl font-bold text-slate-900 mb-6">
                Vehicle Information
              </h2>

              <div className="space-y-5">
                {/* Manufacturer */}
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                    Manufacturer
                  </label>
                  <p className="text-lg font-semibold text-slate-900">
                    {vehicle.make}
                  </p>
                </div>

                {/* Model */}
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                    Model
                  </label>
                  <p className="text-lg font-semibold text-slate-900">
                    {vehicle.model}
                  </p>
                </div>

                {/* VIN */}
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                    VIN
                  </label>
                  <p className="text-sm font-mono bg-slate-50 px-3 py-2 rounded-lg text-slate-900 break-all">
                    {vehicle.vin}
                  </p>
                </div>

                {/* Image Count */}
                {vehicle.image_urls && vehicle.image_urls.length > 0 && (
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                      Photos
                    </label>
                    <div className="flex items-center gap-2">
                      <svg
                        className="w-5 h-5 text-blue-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      <p className="text-lg font-semibold text-slate-900">
                        {vehicle.image_urls.length}{" "}
                        {vehicle.image_urls.length === 1 ? "Photo" : "Photos"}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="mt-8 pt-6 border-t border-slate-200 space-y-3">
                <Link
                  href="/"
                  className="block w-full text-center px-6 py-3 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 transition-colors duration-200 shadow-lg hover:shadow-xl"
                >
                  Back to Inventory
                </Link>
                <button className="block w-full text-center px-6 py-3 rounded-lg border-2 border-slate-300 text-slate-700 font-semibold hover:bg-slate-50 transition-colors duration-200">
                  Contact About This Vehicle
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

