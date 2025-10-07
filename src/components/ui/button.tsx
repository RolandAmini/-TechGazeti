// src/components/ui/button.tsx
"use client";

import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline";
  size?: "sm" | "md";
}

export function Button({ variant = "default", size = "md", className = "", ...props }: ButtonProps) {
  const base = "rounded-lg font-medium transition focus:outline-none focus:ring-2 px-4 py-2";
  const variants = {
    default: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
    outline: "border border-gray-300 text-gray-700 hover:bg-gray-100 focus:ring-gray-400",
  };
  const sizes = {
    sm: "text-sm",
    md: "text-base",
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    />
  );
}
