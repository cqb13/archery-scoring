'use client'

import useScroll from "@hooks/useScroll";
import { useRouter, usePathname } from "next/navigation";
import { useAuthContext } from "@/lib/context/authContext";
import googleSignIn from "@/utils/firebase/account/googleSignIn";
import { routes } from "@lib/routes";

export default function NavBar() {
  const router = useRouter();
  const pathname = usePathname();
  const { user } = useAuthContext() as { user: any };

  return (
    <nav
      className={`${useScroll(10)
        ? "shadow-bar backdrop-blur-md"
        : ""}
        : ""} flex flex-row items-center justify-between p-4 sticky top-0 z-50 bg-darkest text-lightest transition-all`}
    >
      <div className="flex gap-4 flex-wrap items-center justify-center">
        {routes.map(([name, path, signedIn]) =>
          <button
            type="button"
            key={name}
            onClick={() => router.push(path)}
            className={`${pathname === path ? "text-highlight" : ""} ${signedIn == "true" && !user ? "hidden" : ""}`}
          >
            {name}
          </button>
        )}
        <button
            type="button"
            onClick={() => googleSignIn()}
            className={`${user ? "hidden" : ""}`}
          >
            Sign In
          </button>
      </div>
    </nav>
  );
}
