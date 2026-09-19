"use client";

import type { ReactNode } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import {
  SkipBack,
  SkipForward,
  Shuffle,
  Repeat,
  ChevronDown,
  MoreHorizontal,
  X,
  Speaker,
  Laptop,
  Airplay,
  Plus,
  Users,
} from "lucide-react";

import { HERO_COLORS } from "@/app/projects/spotify-music-groups-session/layoutConfig";
import ProjectImage from "@/lib/media/ProjectImage";

const GREEN = "#1DB954";
const SEA = "#3D8AA8";

const LISTENERS = [
  {
    initials: "AA",
    backgroundColor: HERO_COLORS.accent,
    color: HERO_COLORS.deepsea,
  },
  {
    initials: "MK",
    backgroundColor: SEA,
    color: "#FFFFFF",
  },
] as const;

function EqualizerIcon() {
  return (
    <Box
      component="svg"
      width={14}
      height={16}
      viewBox="0 0 14 16"
      fill="none"
      aria-hidden
      sx={{ flexShrink: 0 }}
    >
      <rect x="0" y="6" width="3" height="10" rx="1.5" fill={GREEN} />
      <rect x="5.5" y="0" width="3" height="16" rx="1.5" fill={GREEN} />
      <rect x="11" y="3" width="3" height="13" rx="1.5" fill={GREEN} />
    </Box>
  );
}

function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <Box
      sx={{
        borderRadius: "1.7rem",
        backgroundColor: "#000000",
        p: 1.5,
        boxShadow: "0 25px 50px -12px rgba(0,0,0,0.45)",
        outline: "1px solid rgba(255,255,255,0.15)",
      }}
    >
      {children}
    </Box>
  );
}

function DeviceRow({ icon, label }: { icon: ReactNode; label: string }) {
  return (
    <Stack direction="row" spacing={1.25} alignItems="center">
      <Box sx={{ color: "rgba(255,255,255,0.7)", display: "inline-flex" }}>
        {icon}
      </Box>
      <Typography
        component="span"
        sx={{ fontSize: "10px", color: "#FFFFFF", lineHeight: 1.2 }}
      >
        {label}
      </Typography>
    </Stack>
  );
}

function HostScreen() {
  return (
    <Box sx={{ color: "#FFFFFF" }}>
      <Box sx={{ display: "flex", justifyContent: "center", pb: 1 }}>
        <Box
          sx={{
            height: 4,
            width: 32,
            borderRadius: 999,
            backgroundColor: "rgba(255,255,255,0.3)",
          }}
        />
      </Box>

      <Stack direction="row" alignItems="flex-start" justifyContent="space-between">
        <Stack direction="row" spacing={1} alignItems="center">
          <EqualizerIcon />
          <Box>
            <Typography
              sx={{
                fontSize: "12px",
                fontWeight: 700,
                lineHeight: 1.2,
                color: "#FFFFFF",
              }}
            >
              Listening on
            </Typography>
            <Typography
              sx={{ fontSize: "10px", fontWeight: 500, color: GREEN, lineHeight: 1.2 }}
            >
              This iPhone
            </Typography>
          </Box>
        </Stack>
        <X size={16} style={{ color: "rgba(255,255,255,0.7)" }} />
      </Stack>

      <Typography sx={{ mt: 2, fontSize: "11px", fontWeight: 700, color: "#FFFFFF" }}>
        Select a device
      </Typography>
      <Stack spacing={1.25} sx={{ mt: 1.25 }}>
        <DeviceRow icon={<Speaker size={14} />} label="Living Room" />
        <DeviceRow icon={<Laptop size={14} />} label="My laptop" />
        <DeviceRow icon={<Airplay size={14} />} label="AirPlay or Bluetooth" />
      </Stack>

      <Box sx={{ mt: 2 }}>
        <Stack direction="row" spacing={0.75} alignItems="center">
          <Typography sx={{ fontSize: "10px", fontWeight: 600, color: "#FFFFFF" }}>
            In a group session
          </Typography>
          <Box
            component="span"
            sx={{
              borderRadius: "4px",
              backgroundColor: "rgba(255,255,255,0.2)",
              px: 1.5,
              py: "2px",
              fontSize: "7px",
              fontWeight: 700,
              letterSpacing: "0.04em",
              color: "#FFFFFF",
            }}
          >
            BETA
          </Box>
        </Stack>
        <Typography
          sx={{ mt: 0.5, fontSize: "9px", color: "rgba(255,255,255,0.55)", lineHeight: 1.35 }}
        >
          Pick what to play and control the music together.
        </Typography>
        <Stack direction="row" spacing={0.75} alignItems="center" sx={{ mt: 1 }}>
          {LISTENERS.map((person) => (
            <Box
              key={person.initials}
              component="span"
              sx={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: 20,
                height: 20,
                borderRadius: "50%",
                fontSize: "8px",
                fontWeight: 600,
                backgroundColor: person.backgroundColor,
                color: person.color,
                outline: "2px solid #000000",
              }}
            >
              {person.initials}
            </Box>
          ))}
          <Box
            component="span"
            sx={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: 20,
              height: 20,
              borderRadius: "50%",
              backgroundColor: "rgba(255,255,255,0.1)",
              color: "#FFFFFF",
              outline: "2px solid #000000",
            }}
          >
            <Plus size={12} />
          </Box>
        </Stack>
      </Box>

      <Box
        component="button"
        type="button"
        sx={{
          mt: 1.5,
          width: "80%",
          alignSelf: "center",
          display: "block",
          mx: "auto",
          border: 0,
          borderRadius: "5px",
          backgroundColor: "#FFFFFF",
          py: 0.8,
          fontSize: "8px",
          fontWeight: 700,
          letterSpacing: "0.04em",
          color: "#000000",
          cursor: "default",
        }}
      >
        SEE LISTENERS
      </Box>
    </Box>
  );
}

function ParticipantScreen() {
  return (
    <Box sx={{ color: "#FFFFFF" }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <ChevronDown size={16} style={{ color: "rgba(255,255,255,0.6)" }} />
        <Box
          component="span"
          sx={{
            display: "inline-flex",
            alignItems: "center",
            gap: 0.5,
            borderRadius: 999,
            backgroundColor: "rgba(255,255,255,0.1)",
            px: 1,
            py: 0.25,
            fontSize: "9px",
            fontWeight: 500,
            color: "rgba(255,255,255,0.7)",
          }}
        >
          <Box
            component="span"
            sx={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              backgroundColor: GREEN,
              animation: "spotifyPulse 1.4s ease-in-out infinite",
              "@keyframes spotifyPulse": {
                "0%, 100%": { opacity: 0.45 },
                "50%": { opacity: 1 },
              },
            }}
          />
          4 people listening
        </Box>
        <MoreHorizontal size={16} style={{ color: "rgba(255,255,255,0.6)" }} />
      </Stack>

      <Box
        sx={{
          mt: 1.5,
          aspectRatio: "1 / 1",
          width: "100%",
          borderRadius: "8px",
          overflow: "hidden",
          boxShadow: "0 10px 24px rgba(0,0,0,0.35)",
          lineHeight: 0,
          "& img": {
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          },
        }}
      >
        <ProjectImage
          objectPath="projects/project_8/ANightattheOperaBohemianRhapsody.png"
          alt="A Night at the Opera — Bohemian Rhapsody album cover"
          width={400}
          height={400}
          borderRadius="8px"
        />
      </Box>

      <Box sx={{ mt: 1.5 }}>
        <Typography sx={{ fontSize: "12px", fontWeight: 600, color: "#FFFFFF" }}>
          Bohemian Rhapsody
        </Typography>
        <Typography sx={{ fontSize: "10px", color: "rgba(255,255,255,0.5)" }}>
          Queen
        </Typography>
      </Box>

      <Box sx={{ mt: 1.25 }}>
        <Box
          sx={{
            height: 4,
            width: "100%",
            borderRadius: 999,
            backgroundColor: "rgba(255,255,255,0.15)",
          }}
        >
          <Box
            sx={{
              height: 4,
              width: "33%",
              borderRadius: 999,
              backgroundColor: GREEN,
            }}
          />
        </Box>
        <Stack
          direction="row"
          justifyContent="space-between"
          sx={{ mt: 0.5, fontSize: "8px", color: "rgba(255,255,255,0.4)" }}
        >
          <span>1:42</span>
          <span>5:55</span>
        </Stack>
      </Box>

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ mt: 1.5, px: 0.5 }}
      >
        <Shuffle size={14} color="rgba(255,255,255,0.55)" strokeWidth={2} />
        <SkipBack size={18} fill="white" color="white" strokeWidth={0} />
        <Box
          aria-hidden
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 40,
            height: 40,
            borderRadius: "50%",
            backgroundColor: GREEN,
            flexShrink: 0,
          }}
        >
          {/* Solid Spotify-style play triangle (optically centered) */}
          <Box
            component="svg"
            width={13}
            height={14}
            viewBox="0 0 15 17"
            sx={{ display: "block", ml: "2px" }}
          >
            <path d="M0 0 L15 8.5 L0 17 Z" fill="#000000" />
          </Box>
        </Box>
        <SkipForward size={18} fill="white" color="white" strokeWidth={0} />
        <Repeat size={14} color="rgba(255,255,255,0.55)" strokeWidth={2} />
      </Stack>

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{
          mt: 1.5,
          borderTop: "1px solid rgba(255,255,255,0.1)",
          pt: 1.25,
        }}
      >
        <Stack
          direction="row"
          spacing={0.5}
          alignItems="center"
          sx={{ fontSize: "9px", color: "rgba(255,255,255,0.5)" }}
        >
          <Airplay size={12} />
          <span>Group Session</span>
        </Stack>
        <Users size={14} style={{ color: "rgba(255,255,255,0.4)" }} />
      </Stack>
    </Box>
  );
}

export default function GroupsSessionPhones() {
  return (
    <Box
      data-groups-mockup
      sx={{
        position: "relative",
        mx: "auto",
        width: { xs: 320, sm: 380 },
        height: { xs: 400, sm: 440 },
        maxWidth: "100%",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          zIndex: 10,
          left: { xs: 4, sm: 8 },
          top: { xs: 40, sm: 44 },
          width: { xs: 158, sm: 178 },
          transform: "rotate(-5deg)",
        }}
      >
        <PhoneFrame>
          <HostScreen />
        </PhoneFrame>
      </Box>

      <Box
        sx={{
          position: "absolute",
          zIndex: 20,
          right: { xs: 4, sm: 8 },
          top: { xs: 8, sm: 10 },
          width: { xs: 158, sm: 178 },
          transform: "rotate(4deg)",
        }}
      >
        <PhoneFrame>
          <ParticipantScreen />
        </PhoneFrame>
      </Box>
    </Box>
  );
}
