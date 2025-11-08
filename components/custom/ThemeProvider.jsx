"use client";
import React, { createContext, useContext } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const theme = {
    colors: {
      primary: "from-blue-500 to-purple-600",
      secondary: "from-purple-500 to-indigo-600",
      accent: "from-cyan-500 to-blue-500",
      dark: {
        bg: "bg-gray-950",
        card: "bg-gray-900",
        border: "border-purple-500/20",
      },
      mobile: {
        button: "min-h-12 min-w-12 px-4 py-2",
        input: "text-base",
      },
    },
    transitions: {
      fast: "transition-all duration-200",
      normal: "transition-all duration-300",
      slow: "transition-all duration-500",
    },
    spacing: {
      mobile: "p-3 md:p-4",
      compact: "p-2 md:p-3",
      comfortable: "p-4 md:p-6",
    },
  };

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}
