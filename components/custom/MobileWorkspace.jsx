"use client";
import React, { useState, useContext, useEffect } from "react";
import ChatView from "./ChatView";
import CodeView from "./CodeView";
import { FloatingChat } from "./FloatingChat";
import { FloatingTabBar } from "./FloatingTabBar";
import { StatusPIP } from "./StatusPIP";
import { MessagesContext } from "@/context/MessagesContext";
import { Eye, Share2 } from "lucide-react";

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
      {/* Main Content Area - Full Height for IDE Experience */}
      <div className="fixed inset-0 top-0 bottom-16 overflow-hidden">
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
          <div className="w-full h-full bg-gray-950">
            <div className="h-full flex flex-col items-center justify-center p-6">
              <div className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-2xl w-full max-w-sm p-8 border border-purple-500/20">
                <div className="flex justify-center mb-4">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-full p-3">
                    <Eye className="h-8 w-8 text-white" />
                  </div>
                </div>
                <div className="text-center">
                  <h3 className="text-white font-semibold text-lg mb-2">Preview Mode</h3>
                  <p className="text-gray-400 text-sm mb-4">Switch to Workspace tab to start coding and see live preview</p>
                  <button 
                    onClick={() => setActiveTab("workspace")}
                    className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-full font-medium text-sm hover:shadow-lg transition-all duration-300 active:scale-95"
                  >
                    Go to Workspace
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Deploy Tab */}
        {activeTab === "deploy" && (
          <div className="w-full h-full bg-gray-950">
            <div className="h-full flex flex-col items-center justify-center p-6">
              <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl w-full max-w-sm p-8 border border-purple-500/30">
                <div className="flex justify-center mb-4">
                  <div className="bg-gradient-to-r from-purple-500 to-blue-600 rounded-full p-3">
                    <Share2 className="h-8 w-8 text-white" />
                  </div>
                </div>
                <div className="text-center mb-6">
                  <h3 className="text-white font-bold text-xl mb-2">Deploy Your App</h3>
                  <p className="text-gray-400 text-sm">
                    Choose your platform to launch your application
                  </p>
                </div>
                <div className="space-y-3">
                  <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 rounded-xl transition-all duration-300 font-medium text-sm shadow-lg hover:shadow-blue-500/25 active:scale-95">
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 bg-white/20 rounded" />
                      Deploy to CodeSandbox
                    </div>
                  </button>
                  <button className="w-full bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-800 hover:to-gray-900 text-white py-3 rounded-xl transition-all duration-300 font-medium text-sm shadow-lg hover:shadow-gray-500/25 active:scale-95">
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 bg-white/20 rounded" />
                      Deploy to GitHub
                    </div>
                  </button>
                  <button className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white py-3 rounded-xl transition-all duration-300 font-medium text-sm shadow-lg hover:shadow-purple-500/25 active:scale-95">
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 bg-white/20 rounded" />
                      Export Project
                    </div>
                  </button>
                </div>
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
