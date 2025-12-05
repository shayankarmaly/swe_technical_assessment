"use client";

import { useState } from "react";
import Link from "next/link";

interface Vehicle {
  id: string;
  vin: string;
  make: string;
  model: string;
  description?: string;
  image_urls?: string[];
}

interface VehicleCardProps {
  vehicle: Vehicle;
  index: number;
}

export default function VehicleCard({ vehicle, index }: VehicleCardProps) {
  const images = vehicle.image_urls && vehicle.image_urls.length > 0 
    ? vehicle.image_urls 
    : [];
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (images.length > 0) {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }
  };

  const previousImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (images.length > 0) {
      setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
    }
  };

  const goToImage = (index: number, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex(index);
  };

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
      {/* Image Carousel */}
      <div className="relative aspect-[4/3] bg-slate-100 group">
        {images.length > 0 ? (
          <>
            {/* Main Image */}
            <img
              src={images[currentImageIndex]}
              alt={`${vehicle.make} ${vehicle.model}`}
              className="w-full h-full object-cover"
            />

            {/* Favorite Button */}
            <button
              onClick={toggleFavorite}
              className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform duration-200 z-10"
            >
              <svg
                className={`w-6 h-6 ${isFavorite ? "fill-red-500 text-red-500" : "text-slate-400"}`}
                fill={isFavorite ? "currentColor" : "none"}
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </button>

            {/* Navigation Arrows - Show on hover if multiple images */}
            {images.length > 1 && (
              <>
                {/* Previous Button */}
                <button
                  onClick={previousImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-white hover:scale-110"
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
                      strokeWidth={2.5}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>

                {/* Next Button */}
                <button
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-white hover:scale-110"
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
                      strokeWidth={2.5}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>

                {/* Dot Indicators */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {images.slice(0, 5).map((_, idx) => (
                    <button
                      key={idx}
                      onClick={(e) => goToImage(idx, e)}
                      className={`w-2 h-2 rounded-full transition-all duration-200 ${
                        idx === currentImageIndex
                          ? "bg-white w-6"
                          : "bg-white/60 hover:bg-white/80"
                      }`}
                    />
                  ))}
                  {images.length > 5 && (
                    <span className="text-white text-xs font-medium bg-black/50 px-2 py-0.5 rounded-full">
                      +{images.length - 5}
                    </span>
                  )}
                </div>
              </>
            )}

            {/* Image Counter Badge */}
            {images.length > 1 && (
              <div className="absolute top-4 left-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                {currentImageIndex + 1}/{images.length}
              </div>
            )}
          </>
        ) : (
          // No Image Placeholder
          <div className="w-full h-full flex flex-col items-center justify-center">
            <svg
              className="w-16 h-16 text-slate-300 mb-2"
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
            <p className="text-slate-400 text-sm font-medium">No images available</p>
          </div>
        )}
      </div>

      {/* Vehicle Info */}
      <div className="p-5">
        {/* Title */}
        <div className="mb-3">
          <h3 className="text-xl font-bold text-slate-900 mb-1">
            {vehicle.make} {vehicle.model}
          </h3>
          <p className="text-xs font-mono text-slate-500 uppercase tracking-wide">
            VIN: {vehicle.vin}
          </p>
        </div>

        {/* Description */}
        {vehicle.description && (
          <p className="text-sm text-slate-600 mb-4 line-clamp-2 leading-relaxed">
            {vehicle.description}
          </p>
        )}

        {/* Action Button */}
        <Link
          href={`/vehicles/${vehicle.id}`}
          className="block w-full text-center px-6 py-3 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-[1.02]"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}

