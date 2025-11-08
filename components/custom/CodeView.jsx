"use client";
import React, { useState, useEffect } from "react";
import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackFileExplorer,
} from "@codesandbox/sandpack-react";
import Lookup from "@/data/Lookup";
import axios from "axios";
import { MessagesContext } from "@/context/MessagesContext";
import { UserDetailContext } from "@/context/UserDetailContext";
import Prompt from "@/data/Prompt";
import { useContext } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useParams } from "next/navigation";
import { useConvex } from "convex/react";
import { Loader } from "react-feather";
import SandPackPreviewClient from "./SandPackPreviewClient";
import { toast } from "sonner";
import { SkeletonLoader } from "./SkeletonLoader";

function CodeView({ onGeneratingChange, onFileChange }) {
  const { id } = useParams();
  const convex = useConvex();
  const [activeTab, setActiveTab] = useState("code");
  const [files, setFiles] = React.useState(Lookup?.DEFAULT_FILE);
  const { messages, setMessages } = useContext(MessagesContext);
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const UpdateFiles = useMutation(api.workspace.UpdateFiles);
  const [loading, setLoading] = React.useState(false);
  const [isMobile, setIsMobile] = React.useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (onGeneratingChange) {
      onGeneratingChange(loading);
    }
  }, [loading, onGeneratingChange]);

  React.useEffect(() => {
    if (messages?.length > 0) {
      const role = messages[messages?.length - 1].role;
      if (role === "user") {
        GenerateAiCode();
      }
    }
  }, [messages]);

  React.useEffect(() => {
    id && GetFiles();
  }, [id]);

  const GetFiles = async () => {
    setLoading(true);
    const result = await convex.query(api.workspace.GetWorkspaceData, {
      workspaceId: id,
    });
    const mergedFiles = { ...Lookup.DEFAULT_FILE, ...result?.fileData };
    setFiles(mergedFiles);
    setLoading(false);
  };


  const GenerateAiCode = async () => {
    setLoading(true);
    if (onFileChange) {
      onFileChange("Generating project files...");
    }
    const PROMPT = JSON.stringify(messages) + " " + Prompt.CODE_GEN_PROMPT;
    try {
      const result = await axios.post("/api/gen-ai-code", {
        prompt: PROMPT,
      });
      console.log(result.data);
      const aiResp = result.data;

      const mergedFiles = { ...Lookup.DEFAULT_FILE, ...aiResp.files };
      setFiles(mergedFiles);
      if (onFileChange) {
        onFileChange("Saving files...");
      }
      await UpdateFiles({
        workspaceId: id,
        files: aiResp?.files,
      });
      if (onFileChange) {
        onFileChange("Ready! Preview loading...");
      }
    } catch (error) {
      console.error("Error in GenerateAiCode:", error);
      toast.error("Failed to generate AI code. Please try again later.");
      if (onFileChange) {
        onFileChange("Error generating code");
      }
    } finally {
      setActiveTab(isMobile ? "preview" : "code");
      setLoading(false);
    }
  };

  if (isMobile) {
    return (
      <div className="relative w-full h-full bg-gray-950">
        <SandpackProvider
          files={files}
          template="react"
          theme="dark"
          customSetup={{
            dependencies: {
              ...Lookup.DEPENDANCY,
            },
          }}
          options={{ externalResources: ["https://cdn.tailwindcss.com"] }}
        >
          <SandpackLayout>
            {activeTab === "code" ? (
              <>
                <SandpackFileExplorer style={{ height: "100vh", width: "100%" }} />
              </>
            ) : activeTab === "preview" ? (
              <>
                <SandPackPreviewClient />
              </>
            ) : null}
          </SandpackLayout>
        </SandpackProvider>
        {loading && (
          <div className="absolute inset-0 bg-gray-900/80 backdrop-blur-sm flex flex-col items-center justify-center gap-4 rounded-lg">
            <Loader className="animate-spin h-12 w-12 text-blue-500" />
            <div className="text-center">
              <h2 className="text-white font-semibold">Generating Your Files...</h2>
              <p className="text-gray-400 text-sm mt-1">Please wait</p>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="bg-[#181818] w-full p-2 border border-neutral-800">
        <div className="flex items-center flex-wrap shrink-0 bg-black p-1 w-[160px] gap-2 justify-center rounded-full">
          <h2
            className={`text-sm font-medium transition-all duration-200 cursor-pointer px-3 py-1 rounded-full ${
              activeTab === "code"
                ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-md"
                : "text-gray-300 hover:text-blue-400 hover:bg-blue-500/10"
            }`}
            onClick={() => setActiveTab("code")}
          >
            Code
          </h2>
          <h2
            className={`text-sm font-medium transition-all duration-200 cursor-pointer px-3 py-1 rounded-full ${
              activeTab === "preview"
                ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-md"
                : "text-gray-300 hover:text-blue-400 hover:bg-blue-500/10"
            }`}
            onClick={() => setActiveTab("preview")}
          >
            Preview
          </h2>
        </div>
      </div>
      <SandpackProvider
        files={files}
        template="react"
        theme="dark"
        customSetup={{
          dependencies: {
            ...Lookup.DEPENDANCY,
          },
        }}
        options={{ externalResources: ["https://cdn.tailwindcss.com"] }}
      >
        <SandpackLayout>
          {activeTab === "code" ? (
            <>
              <SandpackFileExplorer style={{ height: "80vh" }} />
              <SandpackCodeEditor style={{ height: "80vh" }} />
            </>
          ) : (
            <>
              <SandPackPreviewClient />
            </>
          )}
        </SandpackLayout>
      </SandpackProvider>
      {loading && (
        <div className="p-10 bg-gray-900 opacity-80 absolute top-0 rounded-lg w-full h-full flex items-center justify-center">
          <Loader className="animate-spin h-10 w-10 text-white" />
          <h2 className="text-white ml-3">Generating Your Files...</h2>
        </div>
      )}
    </div>
  );
}

export default CodeView;