import { ASSETS, sharp } from './lib-v2.mjs';

// Instagram profile picture — the gold "A" swash monogram on a flat cream
// square. IG applies its own circular crop on display, so the source is a
// plain full-bleed square (no transparent/rounded corners to rely on IG to hide).
// Source: _build/profile-source.png — a manually-touched-up master (higher-res
// than the original favicon.svg render) the user supplied on 2026-07-06.
// Swap that file to update the mark; everything else regenerates from it.
const src = sharp(ASSETS + '/_build/profile-source.png');

await src.clone().png().toFile(ASSETS + '/profile-picture.png');
console.log('✓ profile-picture.png');

// JPEG too — iCloud Photos (and most phone photo libraries) expect a plain
// flattened photo rather than a PNG that may carry an alpha channel.
// withMetadata() is required here: sharp's default jpeg() output has no
// JFIF/EXIF APP marker at all (goes straight from SOI to the quantization
// table), and some upload validators (apparently including iCloud's) refuse
// to recognize a JPEG that lacks one, even though it's spec-valid.
await src.clone().flatten({ background: '#F5EEE5' }).jpeg({ quality: 95 }).withMetadata()
  .toFile(ASSETS + '/profile-picture.jpg');
console.log('✓ profile-picture.jpg');
