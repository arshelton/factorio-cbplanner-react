import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  base: "https://arshelton.github.io/factorio-cbplanner-react/",
  plugins: [tailwindcss(), react()],
});
