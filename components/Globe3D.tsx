"use client";

import dynamic from "next/dynamic";

const GlobeScene = dynamic(() => import("./GlobeScene"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[300px] w-full items-center justify-center sm:h-[400px]">
      <div className="h-12 w-12 animate-spin rounded-full border-2 border-electric border-t-transparent" />
    </div>
  ),
});

export default function Globe3D() {
  return (
    <div className="h-[280px] w-full sm:h-[350px] md:h-[400px]">
      <GlobeScene />
    </div>
  );
}
