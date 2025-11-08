"use client";
import React, { useEffect } from "react";
import Header from "../components/custom/Header";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProvider as CustomThemeProvider } from "@/components/custom/ThemeProvider";
import { MessagesContext } from "@/context/MessagesContext";
import { UserDetailContext } from "@/context/UserDetailContext";
import { GoogleOAuthProvider } from "@react-oauth/google";
import MockGoogleOAuthProvider from "@/components/custom/MockGoogleOAuthProvider";
import { useConvex } from "convex/react";
import { api } from "@/convex/_generated/api";
import { ActionProvider } from "@/context/ActionContext";
import { useRouter } from "next/navigation";

const Provider = ({ children }) => {
  const [messages, setMessages] = React.useState();
  const [userDetail, setUserDetail] = React.useState();
  const [isLoadingUser, setIsLoadingUser] = React.useState(true);

  const convex = useConvex();
  const router = useRouter();

  useEffect(() => {
    IsAuthenticated();
  }, []);

  const IsAuthenticated = async () => {
    if (typeof window !== "undefined") {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) {
        setIsLoadingUser(false);
        router.push("/");
        return;
      }
      const result = await convex.query(api.users.GetUser, {
        email: user?.email,
      });
      setUserDetail(result);
      setIsLoadingUser(false);
      console.log(result);
    }
  };

  return (
    <div>
      {process.env.NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_ID_KEY ? (
        <GoogleOAuthProvider
          clientId={process.env.NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_ID_KEY}
        >
          <UserDetailContext.Provider
            value={{ userDetail, setUserDetail, isLoadingUser }}
          >
            <MessagesContext.Provider value={{ messages, setMessages }}>
              <ActionProvider>
                <NextThemesProvider
                  attribute="class"
                  enableSystem
                  defaultTheme="dark"
                  disableTransitionOnChange
                >
                  <CustomThemeProvider>
                    <Header />
                    {children}
                  </CustomThemeProvider>
                </NextThemesProvider>
              </ActionProvider>
            </MessagesContext.Provider>
          </UserDetailContext.Provider>
        </GoogleOAuthProvider>
      ) : (
        <MockGoogleOAuthProvider>
          <UserDetailContext.Provider
            value={{ userDetail, setUserDetail, isLoadingUser }}
          >
            <MessagesContext.Provider value={{ messages, setMessages }}>
              <ActionProvider>
                <NextThemesProvider
                  attribute="class"
                  enableSystem
                  defaultTheme="dark"
                  disableTransitionOnChange
                >
                  <CustomThemeProvider>
                    <Header />
                    {children}
                  </CustomThemeProvider>
                </NextThemesProvider>
              </ActionProvider>
            </MessagesContext.Provider>
          </UserDetailContext.Provider>
        </MockGoogleOAuthProvider>
      )}
    </div>
  );
};

export default Provider;