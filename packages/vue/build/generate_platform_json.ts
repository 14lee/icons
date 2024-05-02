import { pathRoot } from './paths';
import glob from 'fast-glob'
import { resolve, basename } from 'node:path'
import { rename } from 'node:fs';
import { ensureFile } from 'fs-extra';

import { format } from 'prettier'
import { writeFile } from 'node:fs/promises'

import camelcase from 'camelcase'

// 需要创建一个文件夹，放入平台的icons
const targetPath = resolve(pathRoot, '../platform-icons');

const outputFile = resolve(pathRoot, 'platform-icons.json');

await ensureFile(outputFile)
  .then(() => {
    console.log('success!')
   })
  .catch(err => {
    console.error(err)
  })

await glob('*.svg', { cwd: targetPath, absolute: true }).then(async files => {
  const fileNameList: string[] = [];
  await Promise.all(files.map((file) => {
    const fileName = basename(file).split('.svg')[0];
    fileNameList.push(camelcase(fileName, { pascalCase: true }));
  }))

  const content = await format(`{
    "icons": ${JSON.stringify(fileNameList)}
  }`, {
    parser: 'json',
    semi: false,
    singleQuote: true,
  });
  writeFile(outputFile, content, 'utf-8');
})
