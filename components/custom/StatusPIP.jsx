"use client";
import React, { useEffect, useState } from "react";
import { AlertCircle, Loader2, Check } from "lucide-react";

export function StatusPIP({ isLoading, status = "generating", fileName = "Generating..." }) {
  const [displayText, setDisplayText] = useState(fileName);

  useEffect(() => {
    setDisplayText(fileName);
  }, [fileName]);

  if (!isLoading) return null;

  return (
    <div className="fixed bottom-32 left-4 z-30 animate-in slide-in-from-left md:bottom-8 md:right-8 md:left-auto">
      <div className="bg-gradient-to-r from-purple-900/80 to-blue-900/80 backdrop-blur-md rounded-lg p-4 shadow-2xl border border-purple-500/50 min-w-[250px] md:min-w-[280px]">
        {/* Header */}
        <div className="flex items-center gap-2 mb-3">
          {status === "generating" && (
            <Loader2 className="h-4 w-4 text-blue-400 animate-spin flex-shrink-0" />
          )}
          {status === "success" && (
            <Check className="h-4 w-4 text-green-400 flex-shrink-0" />
          )}
          {status === "error" && (
            <AlertCircle className="h-4 w-4 text-red-400 flex-shrink-0" />
          )}
          <span className="text-xs font-semibold text-gray-300 uppercase tracking-wider">
            {status === "generating" && "Generating Code"}
            {status === "success" && "Complete!"}
            {status === "error" && "Error"}
          </span>
        </div>

        {/* File Info */}
        <div className="mb-3">
          <p className="text-sm text-white font-medium truncate">{displayText}</p>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-700/50 rounded-full h-1 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 rounded-full"
            style={{
              width: "100%",
              animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
            }}
          />
        </div>

        {/* Status Text */}
        <p className="text-xs text-gray-400 mt-2">
          {status === "generating" && "This may take a moment..."}
          {status === "success" && "Ready to preview!"}
          {status === "error" && "Please try again"}
        </p>

        <style jsx>{`
          @keyframes pulse {
            0%, 100% {
              opacity: 1;
            }
            50% {
              opacity: 0.5;
            }
          }
        `}</style>
      </div>
    </div>
  );
}

export default StatusPIP;
