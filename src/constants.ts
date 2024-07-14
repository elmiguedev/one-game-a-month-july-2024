import { RaidType } from "./entities/raids/RaidFactory";

export const LEVEL_GRAVITY = 7000
export const PLAYER_JUMP_VELOCITY = -2500
export const SHADOW_VELOCITY = 20;
export const INITIAL_COFFEE_LEVEL = 1100;
export const INITIAL_LEVEL_VELOCITY = -1000;
export const COFFEE_LEVEL = 300;
export const TIMER_DELAY = 200;
export const PLATFORM_NORMAL_HEIGHT = 400;
export const PLATFORM_HIGH_HEIGHT = 200;

export const ITEMS_HEIGHT = [
  520,
  240,
]

export const LEVEL_RAIDS: Record<string, RaidType[]> = {
  "09:10": ["coffee"],
  "09:20": ["normal"],
  "10:10": ["high-coffee"],
  "10:20": ["daily"],
  "11:30": ["high-coffee"],
  "11:33": ["high-coffee"],
  "11:36": ["high-coffee"],
  "11:40": ["work"],
  "12:40": ["coffee"],
  "12:43": ["high-coffee"],
  "12:46": ["platform"],
  "13:30": ["coffee"],
  "13:40": ["work"],
  "14:40:": ["high-coffee"],
  "14:43": ["planning"],
  "15:30": ["high-coffee"],
  "15:32": ["coffee"],
  "15:35": ["high-coffee"],
  "15:45": ["work"],
  "16:20": ["high-coffee"],
  "16:30": ["platform"],
  "17:00": ["boss"]
}

export const LEVEL_VELOCITIES: Record<string, number> = {
  "09:30": -1100,
  "12:30": -1200,
  "15:30": -1300,
  "17:30": -1400
}