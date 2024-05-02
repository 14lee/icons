import { pathRoot } from './paths';
import glob from 'fast-glob'
import { resolve, basename } from 'node:path'
import { promises as fs } from 'fs';
import {
	SVG,
	blankIconSet,
	cleanupSVG,
	runSVGO,
	parseColors,
	isEmptyColor,
  importDirectory
} from '@iconify/tools';
import { emptyDir } from 'fs-extra';

const targetPath = resolve(pathRoot, '../platform-icons');

(async () => {
  const iconSet = await importDirectory(targetPath);

  iconSet.forEach((name, type) => {
    const svg = iconSet.toSVG(name);

    if (!svg) {
      // Invalid icon
      iconSet.remove(name);
      return;
    }
    // Clean up and optimise icons
    try {
      // Cleanup icon code
      cleanupSVG(svg);

      // Assume icon is monotone: replace color with currentColor, add if missing
      // If icon is not monotone, remove this code
      parseColors(svg, {
          defaultColor: 'currentColor',
          callback: (attr, colorStr, color) => {
              return !color || isEmptyColor(color) ? colorStr : 'currentColor';
          },
      });

      // Optimise
      runSVGO(svg);
    } catch (err) {
        // Invalid icon
        console.error(`Error parsing ${name}:`, err);
        iconSet.remove(name);
        return;
    }
    // Update icon
    iconSet.fromSVG(name, svg);
  })

  const outputPath = resolve(pathRoot, '../output');

  await emptyDir(outputPath);

  // Export all icons
  await iconSet.forEach(async (name) => {
    const svg = iconSet.toString(name);
    if (!svg) {
      return;
    }
    const newSvg = svg.replace(/width="(\d+)"/, "width=\"1em\"").replace(/height="(\d+)"/, "height=\"1em\"");

    // Save to file
    await fs.writeFile(`${outputPath}/${name}.svg`, newSvg, 'utf8');
  });
})();
