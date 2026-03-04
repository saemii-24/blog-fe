"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import useSignup from "@/query/useSignup";

type SignupFormValues = {
  username: string;
  password: string;
  passwordConfirm: string;
};

export default function SignupPage() {
  const { signUpAsync, isError, isPending } = useSignup();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignupFormValues>({
    defaultValues: { username: "", password: "", passwordConfirm: "" },
    mode: "onSubmit",
  });

  const password = watch("password");

  const onSubmit = async (values: SignupFormValues) => {
    try {
      await signUpAsync({
        username: values.username,
        password: values.password,
      });
    } catch (e) {
      console.error("Failed to signup", e);
      alert("Failed to signup. Please try again.");
      return;
    }
  };
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-6 py-20">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-stone-400 hover:text-stone-900 transition-colors mb-16 group"
        >
          <ArrowLeft
            size={16}
            className="group-hover:-translate-x-1 transition-transform"
          />
          <span className="text-[10px] font-bold uppercase tracking-widest">
            Back to Journal
          </span>
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-5xl font-serif font-medium mb-16 text-stone-900">
            Create Account
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-12">
            {/* Username */}
            <div className="space-y-4">
              <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400">
                Username
              </label>
              <input
                type="text"
                placeholder="Choose a username..."
                className="w-full text-2xl serif border-none focus:ring-0 outline-none py-2 transition-colors placeholder:text-stone-100 text-stone-900"
                autoComplete="username"
                {...register("username", {
                  required: "Username is required.",
                  minLength: {
                    value: 2,
                    message: "Please enter at least 2 characters.",
                  },
                  maxLength: {
                    value: 30,
                    message: "Please keep it under 30 characters.",
                  },
                })}
              />
              {errors.username?.message && (
                <p className="text-xs text-rose-500 tracking-wide">
                  {errors.username.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-4">
              <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400">
                Password
              </label>
              <input
                type="password"
                placeholder="Create a password..."
                className="w-full py-4 border-b border-stone-100 focus:border-stone-900 outline-none transition-colors text-sm placeholder:text-stone-200"
                autoComplete="new-password"
                {...register("password", {
                  required: "Password is required.",
                  minLength: {
                    value: 6,
                    message: "Use at least 6 characters.",
                  },
                })}
              />
              {errors.password?.message && (
                <p className="text-xs text-rose-500 tracking-wide">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="space-y-4">
              <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400">
                Confirm Password
              </label>
              <input
                type="password"
                placeholder="Type it again..."
                className="w-full py-4 border-b border-stone-100 focus:border-stone-900 outline-none transition-colors text-sm placeholder:text-stone-200"
                autoComplete="new-password"
                {...register("passwordConfirm", {
                  required: "Please confirm your password.",
                  validate: (v) => v === password || "Passwords do not match.",
                })}
              />
              {errors.passwordConfirm?.message && (
                <p className="text-xs text-rose-500 tracking-wide">
                  {errors.passwordConfirm.message}
                </p>
              )}
            </div>

            {/* Server error */}
            {isError && (
              <div className="border border-stone-100 rounded-md p-4">
                <p className="text-sm text-stone-600 leading-relaxed">
                  {isError}
                </p>
              </div>
            )}

            <div className="pt-12 flex flex-col gap-4">
              <button
                type="submit"
                disabled={isPending}
                className="w-full md:w-auto px-12 bg-stone-900 text-white py-4 rounded-md font-bold text-sm uppercase tracking-widest hover:bg-stone-800 transition-all disabled:opacity-50 flex items-center justify-center gap-3"
              >
                {isPending ? (
                  <Loader2 className="animate-spin" size={18} />
                ) : (
                  "Create Account"
                )}
              </button>

              <p className="text-xs text-stone-400 tracking-wide">
                이미 계정이 있으신가요?{" "}
                <Link href="/login" className="text-stone-900 hover:underline">
                  로그인
                </Link>
              </p>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
