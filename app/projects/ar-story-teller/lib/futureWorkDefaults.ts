import type { SvgIconComponent } from "@mui/icons-material";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import MovieOutlinedIcon from "@mui/icons-material/MovieOutlined";
import MemoryOutlinedIcon from "@mui/icons-material/MemoryOutlined";

export type FutureWorkCardIcon = "explore" | "film" | "chip";

export type FutureWorkCard = {
  number: string;
  title: string;
  description: string;
  icon: FutureWorkCardIcon;
};

export const FUTURE_WORK_CARD_ICONS: Record<
  FutureWorkCardIcon,
  SvgIconComponent
> = {
  explore: ExploreOutlinedIcon,
  film: MovieOutlinedIcon,
  chip: MemoryOutlinedIcon,
};

export const DEFAULT_FUTURE_WORK_COPY = {
  eyebrow: "Next Steps",
  title: "Future Work",
  intro:
    "The framework is built to evolve. Three directions are being explored to extend its reach and deepen guest personalization.",
} as const;

export const DEFAULT_FUTURE_WORK_CARDS: FutureWorkCard[] = [
  {
    number: "01",
    title: "Scalability Across Attractions",
    description:
      "Adapt the AR framework for other high-traffic attractions, extending the narrative-driven queue experience park-wide with shared infrastructure.",
    icon: "explore",
  },
  {
    number: "02",
    title: "Film-Driven Experiences",
    description:
      "Expand into IP-based storytelling — concepts explored for Disney's Coco demonstrate how AR can bring film narratives to life in the physical park environment.",
    icon: "film",
  },
  {
    number: "03",
    title: "Dynamic ML Content",
    description:
      "Integrate on-device machine learning (Core ML, ONNX) to deliver personalized, context-aware content that adapts to guest behavior and real-time conditions.",
    icon: "chip",
  },
];
