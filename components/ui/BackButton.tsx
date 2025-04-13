"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function BackButton() {
  return (
    <Link 
      href="/" 
      className="flex items-center gap-1 px-3 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
    >
      <ArrowLeft className="w-4 h-4" />
      <span>Back</span>
    </Link>
  );
} 