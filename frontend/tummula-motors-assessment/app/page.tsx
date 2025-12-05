"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import VehicleCard from "./components/VehicleCard";
import VehicleSearch from "./components/VehicleSearch";

interface Vehicle {
  id: string;
  vin: string;
  make: string;
  model: string;
  description?: string;
  image_urls?: string[];
}

export default function Home() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [filteredVehicles, setFilteredVehicles] = useState<Vehicle[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchVehicles() {
      try {
        const res = await fetch("http://localhost:8000/vehicles", {
          cache: "no-store",
        });
        if (!res.ok) {
          console.error("Failed to fetch vehicles");
          setVehicles([]);
          setFilteredVehicles([]);
          return;
        }
        const data = await res.json();
        setVehicles(data);
        setFilteredVehicles(data);
      } catch (error) {
        console.error("Error fetching vehicles:", error);
        setVehicles([]);
        setFilteredVehicles([]);
      } finally {
        setIsLoading(false);
      }
    }

    fetchVehicles();
  }, []);

  const handleSearch = (query: string) => {
    // update the search query state
    setSearchQuery(query);
    
    if (!query.trim()) {
      // if the query is empty, show all vehicles, otherwise filter the vehicles based on what the user types
      setFilteredVehicles(vehicles);
      return;
    }

    const lowercaseQuery = query.toLowerCase();
    const filtered = vehicles.filter((vehicle) => {

      // performance optimization: convert to lowercase once outside the loop
      const make = vehicle.make?.toLowerCase() || "";
      const model = vehicle.model?.toLowerCase() || "";
      const vin = vehicle.vin?.toLowerCase() || "";
      const description = vehicle.description?.toLowerCase() || "";

      return (
        make.includes(lowercaseQuery) ||
        model.includes(lowercaseQuery) ||
        vin.includes(lowercaseQuery) ||
        description.includes(lowercaseQuery)
      );
    });

    // update the filtered vehicles state
    setFilteredVehicles(filtered);
  };

  // render the UI, showing the vehicles in a grid layout
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-green-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
                Tummula Motors
              </h1>
              <p className="mt-1 text-slate-600 text-sm sm:text-base">
                Premium vehicles, delivered with excellence
              </p>
            </div>
            <Link
              href="/add"
              className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-green-600 text-white font-semibold hover:bg-green-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
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
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Add New Vehicle
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isLoading ? (
          // Loading State
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <svg
                className="animate-spin h-12 w-12 text-green-600 mx-auto mb-4"
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
              <p className="text-slate-600 font-medium">Loading vehicles...</p>
            </div>
          </div>
        ) : vehicles.length === 0 ? (
          // Empty State
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mb-6">
              <svg
                className="w-10 h-10 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">
              No vehicles in inventory
            </h2>
            <p className="text-slate-600 mb-8 max-w-md mx-auto">
              Get started by adding your first vehicle to the inventory.
            </p>
            <Link
              href="/add"
              className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-green-600 text-white font-semibold hover:bg-green-700 transition-all duration-200"
            >
              Add Your First Vehicle
            </Link>
          </div>
        ) : (
          <>
            {/* Search Bar */}
            <VehicleSearch
              onSearch={handleSearch}
              totalVehicles={vehicles.length}
              filteredCount={filteredVehicles.length}
            />

            {/* Grid Layout - Carvana Style */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredVehicles.map((vehicle, index) => (
                <VehicleCard key={vehicle.id} vehicle={vehicle} index={index} />
              ))}
            </div>

            {/* Stats Footer */}
            <div className="mt-8 bg-white rounded-xl shadow-md p-6 text-center">
              <p className="text-slate-600">
                {searchQuery ? (
                  <>
                    Showing{" "}
                    <span className="font-semibold text-slate-900">
                      {filteredVehicles.length}
                    </span>{" "}
                    of{" "}
                    <span className="font-semibold text-slate-900">
                      {vehicles.length}
                    </span>{" "}
                    {vehicles.length === 1 ? "vehicle" : "vehicles"}
                  </>
                ) : (
                  <>
                    Showing{" "}
                    <span className="font-semibold text-slate-900">
                      {vehicles.length}
                    </span>{" "}
                    {vehicles.length === 1 ? "vehicle" : "vehicles"} in inventory
                  </>
                )}
              </p>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
