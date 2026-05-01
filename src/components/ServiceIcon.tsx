import {
  Sparkles,
  LayoutGrid,
  Paintbrush,
  SprayCan,
  Wrench,
  Droplets,
  Hammer,
  Brush,
  Home,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";

const ICONS: Record<string, LucideIcon> = {
  Sparkles,
  LayoutGrid,
  Paintbrush,
  SprayCan,
  Wrench,
  Droplets,
  Hammer,
  Brush,
  Home,
  ShieldCheck,
};

export function ServiceIcon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const Icon = ICONS[name] ?? Sparkles;
  return <Icon className={className} />;
}

export const AVAILABLE_ICONS = Object.keys(ICONS);
