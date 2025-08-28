"use client";

import { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function ScrollAnimatedSvg() {
  const svgRef = useRef<SVGSVGElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Definisikan semua elemen animasi
      const allElements = {
        chipBody: svgRef.current?.querySelector("#chip-body"),
        chipCore: svgRef.current?.querySelector("#chip-core"),
        pathways: svgRef.current?.querySelectorAll("#pathways path"),
        pins: svgRef.current?.querySelectorAll("#pins rect"),
        cornerMarker: svgRef.current?.querySelector("#corner-marker"),
        brandText: svgRef.current?.querySelector("#brand-text"),
        modelText: svgRef.current?.querySelector("#model-text"),
        sideSchematics: svgRef.current?.querySelectorAll(".side-schematic path"), // Select paths within schematics
        dataParticles: svgRef.current?.querySelectorAll(".data-particle"),
      };

      // Pastikan semua elemen ditemukan sebelum melanjutkan
      if (Object.values(allElements).some(el => !el || (el.length === 0 && el.tagName !== 'rect'))) {
        console.error("Gemini Agent: One or more SVG elements for animation not found or empty.");
        return;
      }

      const { chipBody, chipCore, pathways, pins, cornerMarker, brandText, modelText, sideSchematics, dataParticles } = allElements;

      // --- ATUR PROPERTI AWAL ---
      gsap.set(svgRef.current, { rotationY: -10, autoAlpha: 1 });
      gsap.set(chipCore, { autoAlpha: 0, scale: 0.5, transformOrigin: "center" });
      gsap.set(pins, { autoAlpha: 0.2, transformOrigin: "center" });
      gsap.set(cornerMarker, { autoAlpha: 0 });
      gsap.set([brandText, modelText], { autoAlpha: 0, y: 5 });
      gsap.set(dataParticles, { autoAlpha: 0, x: (i) => (i < 5 ? -20 : 20) });

      // Mengumpulkan semua path yang perlu digambar ke dalam satu array datar
      const allDrawablePaths = [
        chipBody,
        ...Array.from(pathways),
        ...Array.from(sideSchematics),
      ];

      // Menjalankan set pada satu array tunggal yang sudah benar.
      allDrawablePaths.forEach(path => {
        if (path instanceof SVGPathElement) { // Pastikan itu benar-benar SVGPathElement
          const length = path.getTotalLength();
          gsap.set(path, { 
            strokeDasharray: length, 
            strokeDashoffset: length 
          });
        }
      });

      // --- TIMELINE ANIMASI UTAMA ---
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: svgRef.current,
          start: "top center",
          end: "bottom center+=100",
          scrub: 1.2,
        },
      });

      // 1. Animasi Inti Prosesor
      tl.to(svgRef.current, { rotationY: 10, duration: 4, ease: "power1.inOut" }, 0)
        .to(chipBody, { strokeDashoffset: 0, duration: 1.5, ease: "power1.inOut" }, 0)
        .to(cornerMarker, { autoAlpha: 0.7, duration: 0.5 }, 0.5)
        .to(pins, { autoAlpha: 0.4, scale: 1, stagger: 0.02, duration: 1 }, 0.2)
        .to(sideSchematics, { strokeDashoffset: 0, autoAlpha: 0.3, y: 0, stagger: 0.2, duration: 1 }, 0.3) // Animate side schematics
        .to(chipCore, { 
          autoAlpha: 1, 
          scale: 1, 
          duration: 0.5, 
          ease: "back.out(1.7)",
          onComplete: () => {
            gsap.to(chipCore, { scale: 1.05, duration: 1, ease: "power1.inOut", yoyo: true, repeat: -1 });
            // Setelah inti aktif, mulai aliran data
            gsap.to(dataParticles, {
              duration: 2,
              autoAlpha: 0.7,
              stagger: {
                each: 0.1,
                repeat: -1,
                repeatDelay: 0.5,
              },
              x: (i) => (i < 5 ? '+=300' : '-=300'),
              ease: 'power1.inOut',
            });
          }
        }, 0.5)
        .to([brandText, modelText], { autoAlpha: 1, y: 0, stagger: 0.2, duration: 0.8, ease: "power1.out" }, 1)
        .to(pathways, { strokeDashoffset: 0, duration: 1.5, ease: "power2.inOut", stagger: 0.05 }, 1.2)
        .to(pins, { autoAlpha: 1, duration: 1, ease: "power2.out" }, 1.7);

    }, svgRef);

    return () => ctx.revert();
  }, []);

  return (
    <svg
      ref={svgRef}
      className="w-full h-auto max-w-4xl mx-auto text-sky-500 invisible"
      viewBox="0 0 800 200"
      preserveAspectRatio="xMidYMid meet"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* === ELEMEN SAMPING === */}
      <g id="side-elements">
        {/* Kiri */}
        <g className="side-schematic" transform="translate(50, 40)">
          <path d="M0 0 L20 0 L20 20 L0 20 Z" stroke="currentColor" strokeWidth="0.5" fill="none" />
          <path d="M5 25 L5 40 M10 25 L10 40 M15 25 L15 40" stroke="currentColor" strokeWidth="0.5" fill="none" />
        </g>
        <g className="side-schematic" transform="translate(80, 120)">
          <path d="M0 0 C 20 40, 40 0, 60 20" stroke="currentColor" strokeWidth="0.5" fill="none" />
        </g>
        {/* Kanan */}
        <g className="side-schematic" transform="translate(750, 50)">
          <path d="M0 0 L-20 0 L-20 20 L0 20 Z" stroke="currentColor" strokeWidth="0.5" fill="none" />
        </g>
        <g className="side-schematic" transform="translate(720, 140)">
          <path d="M0 0 L20 0 L10 20 Z" stroke="currentColor" strokeWidth="0.5" fill="none" />
        </g>
      </g>

      {/* === ALIRAN DATA === */}
      <g id="data-stream" fill="currentColor">
        {[...Array(10)].map((_, i) => (
          <rect key={i} className="data-particle" x={i < 5 ? 0 : 800} y={40 + i * 25} width="5" height="2" rx="1" />
        ))}
      </g>

      {/* === PROSESOR UTAMA (DITENGAH) === */}
      <g transform="translate(300, 0)">
        {/* Pin Konektor */} 
        <g id="pins" fill="currentColor">
          {[...Array(10)].map((_, i) => <rect key={`t-${i}`} x={25 + i * 15} y="10" width="10" height="4" rx="1" />)}
          {[...Array(10)].map((_, i) => <rect key={`b-${i}`} x={25 + i * 15} y="186" width="10" height="4" rx="1" />)}
          {[...Array(10)].map((_, i) => <rect key={`l-${i}`} x="10" y={25 + i * 15} width="4" height="10" rx="1" />)}
          {[...Array(10)].map((_, i) => <rect key={`r-${i}`} x="186" y={25 + i * 15} width="4" height="10" rx="1" />)}
        </g>

        {/* Jalur Sirkuit Internal Prosesor */}
        <g id="pathways" stroke="currentColor" strokeWidth="1.5" fill="none">
          <path d="M100 100 L100 14" />
          <path d="M100 100 L160 40 L 186 40" />
          <path d="M100 100 L170 100" />
          <path d="M100 100 L160 160 L 186 160" />
          <path d="M100 100 L100 186" />
          <path d="M100 100 L40 160 L 14 160" />
          <path d="M100 100 L30 100" />
          <path d="M100 100 L40 40 L 14 40" />
        </g>

        {/* Kerangka & Tanda Sudut Prosesor */}
        <g>
          <path id="chip-body" d="M20 20 H180 V180 H20 Z" stroke="currentColor" strokeWidth="1.5" fill="none" />
          <path id="corner-marker" d="M20 20 L45 20 L20 45 Z" fill="currentColor" />
        </g>

        {/* Inti Prosesor & Teks Branding */}
        <g>
          <rect id="chip-core" x="75" y="75" width="50" height="50" rx="3" fill="#082f49" />
          <text id="brand-text" x="100" y="98" textAnchor="middle" fontFamily="Geist, sans-serif" fontSize="14" fontWeight="bold" fill="#0ea5e9" letterSpacing="1">
            XENA
          </text>
          <text id="model-text" x="100" y="112" textAnchor="middle" fontFamily="Geist Mono, monospace" fontSize="6" fill="#e0f2fe">
            TEKNO CORE 1.0
          </text>
        </g>
      </g>
    </svg>
  );
}
