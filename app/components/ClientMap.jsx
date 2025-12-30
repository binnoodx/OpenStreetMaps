"use client";

import dynamic from "next/dynamic";

const LeafletMap = dynamic(() => import("./LeafletMap"), {
  ssr: false, //No server Side Rendering
});

export default function ClientMap() {
  return (
    <div className="relative h-screen w-full rounded-xl overflow-hidden shadow-lg">
        
        <div className="navbar h-[5vh] w-screen flex justify-center items-center px-10">
            <p className="font-semibold">Open Street Map</p>
        </div>
      <LeafletMap />
    </div>
  );
}
