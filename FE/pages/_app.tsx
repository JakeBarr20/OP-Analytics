import "../styles/globals.scss";
import type { AppProps } from "next/app";
import AuthContextProvider from "../context/AuthContext";
import StoreProvider from "@/reducer/StoreProvider";
import { SkeletonTheme } from "react-loading-skeleton";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthContextProvider>
      <StoreProvider>
        <SkeletonTheme baseColor="#dadee8" highlightColor="#ffffff">
          <Component {...pageProps} />
        </SkeletonTheme>
      </StoreProvider>
    </AuthContextProvider>
  );
}
