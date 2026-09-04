export const siteRoutes = [
  { to: "/", label: "Home" },
  { to: "/stay", label: "Stay & experiences" },
  { to: "/explore", label: "Explore" },
  { to: "/heritage", label: "Our story" },
  { to: "/rumput", label: "Meet Rumput" },
  { to: "/plan", label: "Plan & Book" },
] as const;

export const whatsappUrl =
  "https://wa.me/60198563536?text=Hello%20Long%20Taa%2C%20I%20would%20like%20to%20learn%20more%20about%20planning%20a%20visit.";

export const asset = (name: string) => `/images/${name}`;

export function makeWhatsAppUrl(message: string) {
  return `https://wa.me/60198563536?text=${encodeURIComponent(message)}`;
}

export const bookingIntro =
  "Hello Long Taa, I would like to check availability and plan a visit.";
