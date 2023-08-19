"use-client";

import useScroll from "@hooks/useScroll";
import useIsScrolling from "@hooks/useIsScrolling";
import { useRouter, usePathname } from "next/navigation";
import { routes } from "@lib/routes";

export default function NavBar() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <nav
      className={`${useScroll(10)
        ? "shadow-bar backdrop-blur-md"
        : ""} ${useIsScrolling()
        ? "bg-opacity-50"
        : ""} flex flex-row items-center justify-between p-4 sticky top-0 z-50 bg-darkest text-lightest transition-all`}
    >
      <div className="flex gap-4 flex-wrap items-center justify-center">
        {routes.map(([name, path]) =>
          <button
            type="button"
            key={name}
            onClick={() => router.push(path)}
            className={`${pathname === path ? "text-highlight" : ""}`}
          >
            {name}
          </button>
        )}
      </div>
    </nav>
  );
}
