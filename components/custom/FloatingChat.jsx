"use client";
import React, { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import ChatView from "./ChatView";

export function FloatingChat() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Chat Icon */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-24 right-4 z-40 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 active:scale-95 md:hidden"
          aria-label="Open AI Chat"
        >
          <MessageCircle className="h-6 w-6" />
        </button>
      )}

      {/* Chat Panel */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm md:hidden">
          <div className="fixed bottom-24 right-0 left-0 top-16 md:hidden bg-gradient-to-b from-gray-950 to-black rounded-t-2xl border border-purple-500/20 shadow-2xl overflow-hidden flex flex-col max-h-[calc(100vh-120px)]">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-purple-500/20 bg-black/50">
              <div className="flex items-center gap-2">
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-full p-2">
                  <MessageCircle className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">Astra AI Chat</h3>
                  <p className="text-gray-400 text-xs">Always here to help</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white transition-colors p-2"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Chat Content */}
            <div className="flex-1 overflow-hidden">
              <ChatView />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default FloatingChat;
