"use server"

import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

export interface AuthResult {
  success: boolean;
  error?: string;
}

export const signIn = async (formData: FormData): Promise<AuthResult> => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { success: false, error: "Email and password are required" };
  }

  try {
    await auth.api.signInEmail({
      body: {
        email,
        password,
      },
      headers: await headers(),
    });

    redirect("/"); // Redirect after successful sign in
  } catch (error) {
    const e = error as Error;
    return {
      success: false,
      error: e.message || "Invalid email or password"
    };
  }
};

export const signUp = async (formData: FormData): Promise<AuthResult> => {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!name || !email || !password) {
    return { success: false, error: "Name, email and password are required" };
  }

  if (password.length < 8) {
    return { success: false, error: "Password must be at least 8 characters long" };
  }

  try {
    await auth.api.signUpEmail({
      body: {
        name,
        email,
        password,
      },
      headers: await headers(),
    });

    redirect("/"); // Redirect after successful sign up
  } catch (error) {
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Sign up failed" 
    };
  }
};

export const signOut = async () => {
  try {
    await auth.api.signOut({
      headers: await headers(),
    });
    redirect("/");
  } catch (error) {
    console.error("Sign out error:", error);
  }
};
   