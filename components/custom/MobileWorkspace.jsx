"use client";
import React, { useState, useContext, useEffect } from "react";
import ChatView from "./ChatView";
import CodeView from "./CodeView";
import { FloatingChat } from "./FloatingChat";
import { FloatingTabBar } from "./FloatingTabBar";
import { StatusPIP } from "./StatusPIP";
import { MessagesContext } from "@/context/MessagesContext";

export function MobileWorkspace() {
  const [activeTab, setActiveTab] = useState("workspace");
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentFile, setCurrentFile] = useState("Initializing...");
  const [isMobile, setIsMobile] = useState(false);
  const { messages } = useContext(MessagesContext);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleDeploy = () => {
    // Deploy functionality will be implemented via action
    console.log("Deploy action triggered");
  };

  if (!isMobile) {
    return null;
  }

  return (
    <div className="fixed inset-0 overflow-hidden">
      {/* Main Content Area - Responsive Padding */}
      <div className="fixed inset-0 top-0 bottom-20 md:bottom-16 overflow-auto">
        {/* Workspace Tab */}
        {activeTab === "workspace" && (
          <div className="w-full h-full">
            <CodeView
              onGeneratingChange={setIsGenerating}
              onFileChange={setCurrentFile}
            />
          </div>
        )}

        {/* Preview Tab */}
        {activeTab === "preview" && (
          <div className="w-full h-full p-2 md:p-4">
            <div className="bg-black/50 rounded-lg w-full h-full flex items-center justify-center border border-purple-500/20">
              <div className="text-center">
                <p className="text-gray-400">Preview will load when ready</p>
                <p className="text-gray-500 text-sm mt-2">Start coding to see live preview</p>
              </div>
            </div>
          </div>
        )}

        {/* Deploy Tab */}
        {activeTab === "deploy" && (
          <div className="w-full h-full p-4 md:p-6 flex items-center justify-center">
            <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-purple-500/30 rounded-lg p-6 max-w-md w-full">
              <h3 className="text-white font-semibold mb-2">Deploy Your App</h3>
              <p className="text-gray-400 text-sm mb-4">
                Choose your deployment platform to launch your application
              </p>
              <div className="space-y-2">
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-colors text-sm font-medium">
                  Deploy to CodeSandbox
                </button>
                <button className="w-full bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-lg transition-colors text-sm font-medium">
                  Deploy to GitHub
                </button>
                <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg transition-colors text-sm font-medium">
                  Export Project
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Floating Chat */}
      <FloatingChat />

      {/* Status PIP */}
      <StatusPIP
        isLoading={isGenerating}
        status={isGenerating ? "generating" : "success"}
        fileName={currentFile}
      />

      {/* Floating Tab Bar */}
      <FloatingTabBar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onDeploy={handleDeploy}
      />
    </div>
  );
}

export default MobileWorkspace;
