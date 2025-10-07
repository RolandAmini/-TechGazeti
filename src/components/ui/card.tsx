// src/components/ui/card.tsx
import { ReactNode } from "react";

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`bg-white rounded-lg border shadow-sm ${className}`}>{children}</div>;
}

export function CardHeader({ children }: { children: ReactNode }) {
  return <div className="p-4 border-b">{children}</div>;
}

export function CardTitle({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <h2 className={`text-lg font-semibold ${className}`}>{children}</h2>;
}

export function CardContent({ children }: { children: ReactNode }) {
  return <div className="p-4">{children}</div>;
}
