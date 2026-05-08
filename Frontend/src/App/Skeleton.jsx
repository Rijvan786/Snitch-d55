/* ─────────────────────────────────────────────────────────────────────────
   Skeleton.jsx — loading placeholders using react-loading-skeleton
   Each component reads state.auth.Loading internally via useSelector.
   Usage in pages:  <DashboardSkeleton>  <actual content />  </DashboardSkeleton>
   ───────────────────────────────────────────────────────────────────────── */

import React from "react";
import { useSelector } from "react-redux";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const THEME = { baseColor: "#EBEBEB", highlightColor: "#F5F5F5" };

/* ─────────────────────────────────────────────────────────
   Dashboard skeleton wrapper
   – When auth.Loading is true  → shows animated skeleton
   – When auth.Loading is false → renders children (real page)
   ───────────────────────────────────────────────────────── */
export function DashboardSkeleton({ children }) {
  const loading = useSelector((state) => state.auth.Loading);
  console.log(loading,"skelton");

  if (!loading) return children;

  return (
    <SkeletonTheme baseColor={THEME.baseColor} highlightColor={THEME.highlightColor}>
      <div className="flex min-h-screen bg-[#F9F9F9] font-[Inter,sans-serif]">

        {/* Sidebar */}
        <aside className="hidden lg:flex flex-col w-56 min-h-screen bg-white border-r border-[#E5E5E5] px-6 py-8 shrink-0 gap-3">
          <Skeleton width={96} height={14} style={{ marginBottom: 24 }} />
          <Skeleton height={36} count={4} style={{ marginBottom: 4, borderRadius: 6 }} />
          <div className="mt-auto pt-6 border-t border-[#E5E5E5] flex items-center gap-3">
            <Skeleton circle width={32} height={32} />
            <div className="flex-1">
              <Skeleton width={60} height={12} />
              <Skeleton width={40} height={10} />
            </div>
          </div>
        </aside>

        {/* Main */}
        <main className="flex-1 px-4 pt-20 pb-16 sm:px-6 sm:pt-10 lg:px-12 xl:px-16">
          <div className="mx-auto w-full max-w-[1100px]">

            {/* Header */}
            <div className="flex items-end justify-between mb-10">
              <div>
                <Skeleton width={80} height={12} />
                <Skeleton width={200} height={32} style={{ marginTop: 4 }} />
                <Skeleton width={80} height={12} style={{ marginTop: 4 }} />
              </div>
              <Skeleton width={140} height={44} borderRadius={6} />
            </div>

            {/* Filter bar */}
            <div className="flex items-center gap-3 mb-8">
              <Skeleton width={256} height={40} borderRadius={6} />
              <Skeleton width={60} height={36} borderRadius={999} />
              <Skeleton width={90} height={36} borderRadius={999} />
            </div>

            {/* Card grid — 6 placeholders */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white border border-[#E5E5E5] rounded-lg overflow-hidden">
                  <Skeleton height={200} borderRadius={0} />
                  <div className="p-4 flex flex-col gap-2">
                    <Skeleton width="70%" height={16} />
                    <Skeleton height={12} />
                    <Skeleton width="55%" height={12} />
                    <div className="flex items-center gap-2 mt-1">
                      <Skeleton width={56} height={20} />
                      <Skeleton width={36} height={16} borderRadius={4} />
                    </div>
                    <div className="flex justify-between pt-2 border-t border-[#E5E5E5] mt-1">
                      <Skeleton width={72} height={12} />
                      <div className="flex gap-3">
                        <Skeleton width={28} height={12} />
                        <Skeleton width={40} height={12} />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </main>
      </div>
    </SkeletonTheme>
  );
}

/* ─────────────────────────────────────────────────────────
   CreateProduct skeleton wrapper
   – When auth.Loading is true  → shows animated skeleton
   – When auth.Loading is false → renders children (real form)
   ───────────────────────────────────────────────────────── */
export function CreateProductSkeleton({ children }) {
  const loading = useSelector((state) => state.auth.Loading);

  if (!loading) return children;

  return (
    <SkeletonTheme baseColor={THEME.baseColor} highlightColor={THEME.highlightColor}>
      <div className="flex min-h-screen bg-[#F9F9F9] font-[Inter,sans-serif]">

        {/* Sidebar */}
        <aside className="hidden lg:flex flex-col w-56 min-h-screen bg-white border-r border-[#E5E5E5] px-6 py-8 shrink-0 gap-3">
          <Skeleton width={96} height={14} style={{ marginBottom: 24 }} />
          <Skeleton height={36} count={4} style={{ marginBottom: 4, borderRadius: 6 }} />
          <div className="mt-auto pt-6 border-t border-[#E5E5E5] flex items-center gap-3">
            <Skeleton circle width={32} height={32} />
            <div className="flex-1">
              <Skeleton width={60} height={12} />
              <Skeleton width={40} height={10} />
            </div>
          </div>
        </aside>

        {/* Form */}
        <main className="flex-1 px-4 pt-20 pb-12 sm:px-6 sm:pt-12 lg:px-16 xl:px-24">
          <div className="mx-auto w-full max-w-[680px] flex flex-col gap-10">

            <div className="flex flex-col gap-2 mb-4">
              <Skeleton width={100} height={12} />
              <Skeleton width={180} height={32} />
              <Skeleton width={240} height={12} />
            </div>

            {/* Title */}
            <div className="flex flex-col gap-2">
              <Skeleton width={40} height={12} />
              <Skeleton height={48} borderRadius={6} />
            </div>

            {/* Description */}
            <div className="flex flex-col gap-2">
              <Skeleton width={88} height={12} />
              <Skeleton height={112} borderRadius={6} />
            </div>

            {/* Price */}
            <div className="flex flex-col gap-2">
              <Skeleton width={40} height={12} />
              <div className="flex gap-3">
                <div className="flex-1"><Skeleton height={48} borderRadius={6} /></div>
                <Skeleton width={128} height={48} borderRadius={6} />
              </div>
            </div>

            {/* Images */}
            <div className="flex flex-col gap-3">
              <div className="flex justify-between">
                <Skeleton width={56} height={12} />
                <Skeleton width={40} height={12} />
              </div>
              <Skeleton height={160} borderRadius={6} />
            </div>

            {/* Actions */}
            <div className="flex justify-between pt-2 border-t border-[#E5E5E5]">
              <Skeleton width={72} height={16} />
              <Skeleton width={152} height={48} borderRadius={6} />
            </div>

          </div>
        </main>
      </div>
    </SkeletonTheme>
  );
}

/* ─────────────────────────────────────────────────────────
   Auth skeleton wrapper  (Register & Login)
   Dark theme — matches the #0D0D0D split-screen layout
   – loading=true  → shimmer placeholders
   – loading=false → renders children (real form)
   ───────────────────────────────────────────────────────── */
export function AuthSkeleton({ children }) {
  const loading = useSelector((state) => state.auth.Loading);

  if (!loading) return children;

  return (
    <SkeletonTheme baseColor="#1A1A1A" highlightColor="#2A2A2A">
      <div className="min-h-screen bg-[#0D0D0D] flex flex-col lg:flex-row">

        {/* Left brand panel — desktop only */}
        <div className="hidden lg:block lg:w-1/2 xl:w-[55%]">
          <Skeleton height="100vh" borderRadius={0} />
        </div>

        {/* Right form panel */}
        <div className="flex-1 flex flex-col items-center justify-center px-5 py-12 sm:px-8 lg:px-12 xl:px-16">
          <div className="w-full max-w-md flex flex-col gap-5">

            {/* Heading */}
            <div className="flex flex-col gap-2 mb-4">
              <Skeleton width={180} height={28} />
              <Skeleton width={220} height={14} />
            </div>

            {/* Input fields */}
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex flex-col gap-2">
                <Skeleton width={80} height={11} />
                <Skeleton height={48} borderRadius={8} />
              </div>
            ))}

            {/* Checkbox / seller row */}
            <Skeleton height={56} borderRadius={8} />

            {/* Submit button */}
            <Skeleton height={50} borderRadius={8} />

            {/* Divider + link */}
            <Skeleton height={14} />
            <Skeleton height={14} width={160} style={{ margin: "0 auto" }} />
          </div>
        </div>
      </div>
    </SkeletonTheme>
  );
}
