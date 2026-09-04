export type PackageJourneyId = "package1" | "package2";

export interface PackageJourneyStep {
  phase: "Plan" | "Travel in" | "Arrive" | "Experience" | "Return";
  shortLabel: string;
  title: string;
  description: string;
  note: string;
  image: string;
  imageAlt: string;
}

export interface PackageJourney {
  id: PackageJourneyId;
  number: string;
  name: string;
  promise: string;
  steps: PackageJourneyStep[];
}

const sharedOpening: PackageJourneyStep[] = [
  {
    phase: "Plan",
    shortLabel: "Website",
    title: "Begin here, before the road.",
    description:
      "Choose your preferred dates, group size, stay, one experience package, transport and river-support needs. Send one complete enquiry so Clement can check the moving parts together.",
    note: "Your enquiry requests availability and a quotation. It does not confirm a booking.",
    image: "journal/eco-02.webp",
    imageAlt: "Long Taa longhouse in the village landscape",
  },
  {
    phase: "Travel in",
    shortLabel: "Miri",
    title: "Meet the journey in Miri.",
    description:
      "Long Taa's return 4WD is the default arrangement. Clement provides the confirmed meeting instructions after accommodation, transport and guide availability are checked.",
    note: "Visitors using their own vehicle must request approval for a terrain-suitable 4WD.",
    image: "journal/eco-24.webp",
    imageAlt: "A 4WD vehicle on the journey to Long Taa",
  },
  {
    phase: "Travel in",
    shortLabel: "4WD route",
    title: "Leave the city behind.",
    description:
      "The journey from Miri takes approximately six hours by 4WD. Road and weather conditions shape the actual travel time, so the route is part of the expedition rather than a simple transfer.",
    note: "The published return transfer is RM1,500 per vehicle, with a maximum of three guests.",
    image: "journey-road.webp",
    imageAlt: "The remote road journey through the Borneo interior",
  },
  {
    phase: "Arrive",
    shortLabel: "Longhouse",
    title: "Arrive in a living village.",
    description:
      "Settle into simple longhouse accommodation, meet the people guiding your visit and understand how local conditions, conservation areas and community etiquette will shape the experience.",
    note: "Long Taa is a working Sebup community, not a staged attraction or conventional resort.",
    image: "journal/eco-03.webp",
    imageAlt: "A Long Taa longhouse with palms and open sky",
  },
];

const sharedReturn: PackageJourneyStep = {
  phase: "Return",
  shortLabel: "Home",
  title: "Return to Miri, then home with the story.",
  description:
    "Travel back from Long Taa using the confirmed transport arrangement. What you carry home is not a checklist of attractions, but a journey shaped by river, rainforest and a community that welcomed you.",
  note: "Departure timing remains subject to road, weather, river, availability and safety conditions.",
  image: "journal/eco-21.webp",
  imageAlt: "Visitors taking in the Long Taa landscape",
};

export const packageJourneys: Record<PackageJourneyId, PackageJourney> = {
  package1: {
    id: "package1",
    number: "Package 1",
    name: "River, culture & living heritage",
    promise: "Follow the Dapui River into community life, conservation and rainforest.",
    steps: [
      ...sharedOpening,
      {
        phase: "Experience",
        shortLabel: "Dapui River",
        title: "Move with the river.",
        description:
          "Where conditions allow, travel by longboat with local support and experience the Dapui River as the route through the landscape—not simply a viewpoint beside it.",
        note: "Longboat activity depends on river level, weather, local availability and safety guidance.",
        image: "journal/eco-14.webp",
        imageAlt: "A longboat journey on the Dapui River",
      },
      {
        phase: "Experience",
        shortLabel: "Tagang",
        title: "Understand community-led conservation.",
        description:
          "Visit the Tagang Fish Conservation Area when appropriate and learn why protected river zones and local rules matter to the Dapui ecosystem.",
        note: "Viewing and access are guided by the community and current water conditions.",
        image: "journal/eco-06.webp",
        imageAlt: "A community member beside the river with a fish",
      },
      {
        phase: "Experience",
        shortLabel: "Living heritage",
        title: "Share the rhythm of the longhouse.",
        description:
          "Return to everyday village life: the longhouse, local meals when selected, stories and the practical routines of a living Sebup community.",
        note: "Cultural activities and their timing are confirmed respectfully with the community.",
        image: "journal/eco-07.webp",
        imageAlt: "A gathering in the Long Taa longhouse",
      },
      {
        phase: "Experience",
        shortLabel: "Rainforest",
        title: "Walk, listen and look closely.",
        description:
          "Explore rainforest and wildlife habitat with local guidance. The experience is in the attention you bring to the forest; wildlife sightings are never guaranteed.",
        note: "Trails and activities may be changed or replaced when conditions require it.",
        image: "journal/eco-15.webp",
        imageAlt: "Visitors walking on a forest trail in Long Taa",
      },
      sharedReturn,
    ],
  },
  package2: {
    id: "package2",
    number: "Package 2",
    name: "Nature's wonders exploration",
    promise: "Journey deeper into the named springs and rock formations of the Dapui landscape.",
    steps: [
      ...sharedOpening,
      {
        phase: "Experience",
        shortLabel: "Acin",
        title: "Begin with Acin Salt Spring.",
        description:
          "Travel with local guidance toward Acin Salt Spring, one of the natural wonders identified in the Long Taa experience material.",
        note: "The image is representative of the Dapui landscape; exact access and order require confirmation.",
        image: "journal/eco-09.webp",
        imageAlt: "A forest stream in the Dapui landscape",
      },
      {
        phase: "Experience",
        shortLabel: "Batu Ukat",
        title: "Continue toward Batu Ukat.",
        description:
          "Follow the locally guided route to Batu Ukat, also described as Ladder Rock, as the expedition moves from river landscape into forest terrain.",
        note: "The image is representative; suitability depends on the agreed itinerary and current conditions.",
        image: "journal/eco-13.webp",
        imageAlt: "A visitor walking through the Long Taa rainforest",
      },
      {
        phase: "Experience",
        shortLabel: "Batu Nginan",
        title: "Read the landscape at Batu Nginan.",
        description:
          "Pause at another named formation in the package and experience the terrain through the knowledge of the people guiding the route.",
        note: "The image is representative; Clement confirms which locations fit the available duration.",
        image: "journal/pix-03.webp",
        imageAlt: "A towering rainforest tree seen from below",
      },
      {
        phase: "Experience",
        shortLabel: "Batu Tatip",
        title: "Move onward to Batu Tatip.",
        description:
          "Continue through the natural-wonders route at a pace set by terrain, weather and the group's ability rather than a rigid attraction schedule.",
        note: "The image is representative; the exact sequence is not a guaranteed day-by-day itinerary.",
        image: "journal/eco-16.webp",
        imageAlt: "A forest stream crossing in Long Taa",
      },
      {
        phase: "Experience",
        shortLabel: "Batu Belacek",
        title: "Reach Batu Belacek, the Rock Door.",
        description:
          "Complete the imagined route at Batu Belacek, also described as the Rock Door, before returning toward Long Taa and the journey out.",
        note: "The image is representative; access remains subject to local guidance and safety conditions.",
        image: "journal/pix-11.webp",
        imageAlt: "A forest viewpoint in the Long Taa landscape",
      },
      sharedReturn,
    ],
  },
};

export function getPackageJourney(id: PackageJourneyId) {
  return packageJourneys[id];
}
