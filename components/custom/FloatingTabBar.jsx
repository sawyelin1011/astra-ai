"use client";
import React, { useState, useRef, useEffect } from "react";
import {
  Code2,
  Eye,
  Share2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export function FloatingTabBar({ activeTab, setActiveTab, onDeploy }) {
  const tabsContainerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const touchStart = useRef(0);
  const touchEnd = useRef(0);

  const tabs = [
    { id: "workspace", label: "Workspace", icon: Code2 },
    { id: "preview", label: "Preview", icon: Eye },
    { id: "deploy", label: "Deploy", icon: Share2 },
  ];

  const handleTouchStart = (e) => {
    touchStart.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    touchEnd.current = e.changedTouches[0].clientX;
    detectSwipe();
  };

  const detectSwipe = () => {
    const distance = touchStart.current - touchEnd.current;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      const currentIndex = tabs.findIndex((t) => t.id === activeTab);
      if (currentIndex < tabs.length - 1) {
        setActiveTab(tabs[currentIndex + 1].id);
      }
    }
    if (isRightSwipe) {
      const currentIndex = tabs.findIndex((t) => t.id === activeTab);
      if (currentIndex > 0) {
        setActiveTab(tabs[currentIndex - 1].id);
      }
    }
  };

  const scrollTabs = (direction) => {
    if (tabsContainerRef.current) {
      const scrollAmount = 100;
      if (direction === "left") {
        tabsContainerRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      } else {
        tabsContainerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
    }
  };

  useEffect(() => {
    const checkScroll = () => {
      if (tabsContainerRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = tabsContainerRef.current;
        setCanScrollLeft(scrollLeft > 0);
        setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
      }
    };

    const container = tabsContainerRef.current;
    container?.addEventListener("scroll", checkScroll);
    checkScroll();

    return () => container?.removeEventListener("scroll", checkScroll);
  }, []);

  return (
    <>
      {/* Desktop TabBar */}
      <div className="hidden md:flex fixed bottom-0 left-0 right-0 bg-gradient-to-t from-gray-950 to-gray-900/80 border-t border-purple-500/20 backdrop-blur-md h-16 items-center justify-center gap-2 z-40 px-4">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => {
                if (tab.id === "deploy") {
                  onDeploy?.();
                } else {
                  setActiveTab(tab.id);
                }
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                activeTab === tab.id
                  ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                  : "text-gray-300 hover:text-white hover:bg-white/10"
              }`}
            >
              <Icon className="h-5 w-5" />
              <span className="text-sm font-medium">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Mobile Floating TabBar */}
      <div
        className="md:hidden fixed bottom-0 left-0 right-0 bg-gradient-to-t from-black via-gray-950/95 to-gray-900/80 border-t border-purple-500/20 backdrop-blur-md z-40"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Scroll Indicators */}
        {canScrollLeft && (
          <button
            onClick={() => scrollTabs("left")}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-blue-500/80 hover:bg-blue-600 rounded-full p-1.5 transition-all"
          >
            <ChevronLeft className="h-4 w-4 text-white" />
          </button>
        )}
        {canScrollRight && (
          <button
            onClick={() => scrollTabs("right")}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-blue-500/80 hover:bg-blue-600 rounded-full p-1.5 transition-all"
          >
            <ChevronRight className="h-4 w-4 text-white" />
          </button>
        )}

        {/* Tabs Container */}
        <div
          ref={tabsContainerRef}
          className="flex gap-2 overflow-x-auto px-4 py-3 scrollbar-hide scroll-smooth"
          style={{ scrollBehavior: "smooth" }}
        >
          <style jsx>{`
            .scrollbar-hide {
              -ms-overflow-style: none;
              scrollbar-width: none;
            }
            .scrollbar-hide::-webkit-scrollbar {
              display: none;
            }
          `}</style>

          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  if (tab.id === "deploy") {
                    onDeploy?.();
                  } else {
                    setActiveTab(tab.id);
                  }
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 flex-shrink-0 whitespace-nowrap ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                    : "bg-gray-800/50 text-gray-300 hover:text-white hover:bg-gray-700/50"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span className="text-xs md:text-sm font-medium">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default FloatingTabBar;
