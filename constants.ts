import { AssetPrompt } from './types';

export const ASSET_PROMPTS: AssetPrompt[] = [
  {
    key: 'background',
    name: 'Game Background',
    prompt:
      'A 2D pixel-art open field background, vibrant grassy plain with subtle checkboard tiling, gentle rolling hills in the distance, bright day sky, limited 16-color palette, crisp clean pixels, resolution suitable for retro game (e.g. 320x240 or tile-based like 16x16 tiles). Pixel art style reminiscent of classic NES or GameBoy Advance.',
    negativePrompt:
      'photo-realistic, 3D rendering, smooth gradients, painterly shading, blur, anti-aliased edges, overly complex detail, modern high-resolution textures.',
  },
  {
    key: 'doorClosed',
    name: 'Door (Closed)',
    prompt:
      'A single 2D pixel-art wooden door, simple rectangular shape with basic frame, warm brown tones, minimal shading (one highlight), about 32x48 pixels. Retro pixel style, limited palette, front-facing view, no perspective.',
    negativePrompt:
      'realistic wood grain, 3D perspective, complex shading, text anti-aliased, modern fonts, overly ornate detail, door knob.',
  },
  {
    key: 'doorOpen1',
    name: 'Door (Opening Frame 1)',
    prompt:
      '2D pixel-art wooden door, same style as the closed door, slightly ajar, revealing a pitch-black dark doorway inside. This is frame 1 of an opening animation. Front-facing view, 32x48 pixels.',
    negativePrompt:
      '3D rotation, motion blur, complex lighting, high-detail textures, anti-aliasing, showing anything inside the doorway except darkness.',
  },
   {
    key: 'doorOpen2',
    name: 'Door (Opening Frame 2)',
    prompt:
      '2D pixel-art wooden door, same style as the closed door, fully open and swung inwards, revealing a pitch-black dark doorway inside. This is frame 2 of an opening animation. Front-facing view, 32x48 pixels.',
    negativePrompt:
      '3D rotation, motion blur, complex lighting, high-detail textures, anti-aliasing, showing anything inside the doorway except darkness.',
  },
  {
    key: 'brickBlock1',
    name: 'Brick Wall (Frame 1)',
    prompt:
        '2D pixel-art red brick pattern rising from the bottom, covering the lower half of a 32x48 pixel area. Transparent background on top half. This is frame 1 of a blocking animation.',
    negativePrompt:
      'realistic mortar, high-detail bricks, photoreal, 3D shading, blur, complex textures, graffiti, full wall.',
  },
  {
    key: 'brickBlock2',
    name: 'Brick Wall (Frame 2)',
    prompt:
      '2D pixel-art red brick pattern, completely filling a 32x48 pixel area. Solid wall. This is frame 2 of a blocking animation.',
    negativePrompt:
      'realistic mortar, high-detail bricks, photoreal, 3D shading, blur, complex textures, graffiti.',
  },
  {
    key: 'correctIcon',
    name: 'Correct Icon',
    prompt:
      '2D pixel-art green check-mark icon with upbeat style, bold single color, few pixels, anti-aliased off, retro game look. 16x16 pixels.',
    negativePrompt: 'realistic, glossy icon, gradients, drop shadows, excessive detail, text.',
  },
  {
    key: 'wrongIcon',
    name: 'Wrong Icon',
    prompt:
      '2D pixel-art red ‘X’ mark icon, few pixels, bold, retro style. 16x16 pixels.',
    negativePrompt: 'anti-aliased, blurry, 3D, realistic, glossy, gradients.',
  },
   {
    key: 'player',
    name: 'Player Character',
    prompt:
      '2D pixel-art character for a retro game, simple friendly design, wearing a blue shirt and red cap, front-facing view, standing still. About 24x32 pixels. Limited 16-color palette, crisp clean pixels.',
    negativePrompt: 'side view, back view, realistic, 3D, high detail, weapons, blurry.',
  },
];

export const QUESTIONS_COUNT = 10;
