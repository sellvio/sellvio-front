"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getStoredUserType } from "@/feature/createCampaing/utils/storedUser";

type RequireUserTypeProps = {
  userType: "business" | "creator";
  children: React.ReactNode;
};

const homeFor = {
  business: "/buisnessDashboard",
  creator: "/creatorDashboard",
} as const;

/** Redirects to /login without a token, or to the user's own dashboard on a type mismatch. */
const RequireUserType = ({ userType, children }: RequireUserTypeProps) => {
  const router = useRouter();
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("access_token")) {
      router.replace("/login");
      return;
    }
    const storedType = getStoredUserType();
    if (storedType && storedType !== userType) {
      router.replace(homeFor[storedType]);
      return;
    }
    setAllowed(true);
  }, [router, userType]);

  if (!allowed) return null;

  return <>{children}</>;
};

export default RequireUserType;
