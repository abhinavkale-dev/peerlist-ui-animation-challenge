"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface BreadcrumbProps {
  className?: string;
}

export default function Breadcrumb({ className = "" }: BreadcrumbProps) {
  const pathname = usePathname();
  
  const routes = [
    { path: "/day-1", label: "Day 1" },
    { path: "/day-2", label: "Day 2" },
    { path: "/day-3", label: "Day 3" },
  ];

  return (
    <div className={`hidden md:flex items-center space-x-3 ${className}`}>
      <Link 
        href="/" 
        className="text-sm px-3 py-1.5 rounded bg-gray-800 text-gray-200 hover:bg-gray-700 transition-colors font-medium"
      >
        Home
      </Link>
      
      {routes.map((route) => (
        <Link
          key={route.path}
          href={route.path}
          className={`text-sm px-3 py-1.5 rounded transition-colors font-medium ${
            pathname === route.path
              ? "bg-indigo-600 text-white"
              : "bg-gray-800 text-gray-200 hover:bg-gray-700"
          }`}
        >
          {route.label}
        </Link>
      ))}
    </div>
  );
} 