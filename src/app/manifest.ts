import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Sonara — Music Learning & Practice Platform",
    short_name: "Sonara",
    description:
      "Aplikasi belajar musik, katalog chord interaktif, transpose, metronome, tuner, dan latihan loop audio.",
    start_url: "/",
    display: "standalone",
    background_color: "#020617",
    theme_color: "#10b981",
    orientation: "portrait-primary",
    icons: [
      {
        src: "/icon-sonara.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
