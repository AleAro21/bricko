// app/congratulations/page.tsx
'use client';
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";
import CongratulationsLayout from "@/components/congratulations/CongratulationsLayout";
import CongratulationsInteractive from "@/components/congratulations/CongratulationsInteractive";
import { motion } from "framer-motion";


export default function CongratulationsPage() {
  const router = useRouter();
  const { user, setUser } = useUser();

  // Ensure the user is loaded from sessionStorage if not already in context.
  useEffect(() => {
    const checkUser = () => {
      const storedUser = sessionStorage.getItem("userObject");
      if (storedUser && !user) {
        setUser(JSON.parse(storedUser));
      } else if (!user && !sessionStorage.getItem("userId")) {
        router.push("/start/login");
        sessionStorage.clear();
        localStorage.clear();
        

      }
    };
    checkUser();
  }, []);

  const userName = user?.name || "";

  return (
    <CongratulationsLayout userName={userName}>
      <CongratulationsInteractive />
    </CongratulationsLayout>
  );
}
