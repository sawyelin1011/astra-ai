"use client";
import React from "react";

export function SkeletonLoader({ type = "code" }) {
  if (type === "code") {
    return (
      <div className="w-full h-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-lg p-6 space-y-4 overflow-hidden">
        {/* File Explorer Skeleton */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="h-5 w-5 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded animate-pulse" />
            <div className="h-4 w-32 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded animate-pulse" />
          </div>
          {[1, 2, 3].map((i) => (
            <div key={i} className="ml-6 h-4 w-24 bg-gradient-to-r from-blue-500/15 to-purple-500/15 rounded animate-pulse" />
          ))}
        </div>

        {/* Code Editor Skeleton */}
        <div className="mt-6 space-y-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="h-4 w-8 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded animate-pulse" />
              <div
                className="h-4 flex-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded animate-pulse"
                style={{ width: `${60 + Math.random() * 30}%` }}
              />
            </div>
          ))}
        </div>

        {/* Shimmer Effect */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer"
          style={{
            animation: "shimmer 3s infinite",
            backgroundPosition: "200% center",
          }}
        />
        <style jsx>{`
          @keyframes shimmer {
            0% {
              background-position: -200% center;
            }
            100% {
              background-position: 200% center;
            }
          }
        `}</style>
      </div>
    );
  }

  if (type === "chat") {
    return (
      <div className="w-full h-full space-y-4 p-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className={`flex ${i % 2 === 0 ? "justify-end" : "justify-start"}`}>
            <div className="max-w-[75%] space-y-2">
              <div className="h-3 bg-gradient-to-r from-purple-500/30 to-blue-500/30 rounded-lg animate-pulse" />
              <div className="h-3 bg-gradient-to-r from-purple-500/30 to-blue-500/30 rounded-lg w-3/4 animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg p-6 animate-pulse" />
  );
}

export default SkeletonLoader;
