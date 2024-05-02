import { pathRoot } from './paths';
import glob from 'fast-glob'
import { resolve, basename } from 'node:path'
import { rename } from 'node:fs';
import { ensureFile } from 'fs-extra';

import { format } from 'prettier'
import { writeFile } from 'node:fs/promises'

import camelcase from 'camelcase'


/**
 * 1. 创建一个空json文件，如果没有
 * 2. 读取collections文件夹下的所有svg文件
 * 3. 将数组写入json文件
 * 4. 抛出json文件，到打包文件里面。
 */

const targetPath = resolve(pathRoot, '../platform-icons');

const file = resolve(pathRoot, 'src', 'platform-icons.json');

await ensureFile(file)
  .then(() => {
    console.log('success!')
   })
  .catch(err => {
    console.error(err)
  })

await glob('*.svg', { cwd: targetPath, absolute: true }).then(async files => {
  // await Promise.all(files.map(async (file) => {
  //   const newFileName = basename(file).split('.svg')[0].replace('ri:', '');
  //   rename(file, resolve(targetPath, `${newFileName}.svg`), (err) => {})
  // }))
  // await Promise.all(files.map(async (file) => {
  //   const fileName = basename(file).split('.svg')[0];
  //   const newFileName = (fileName.charAt(0).toLowerCase() + fileName.slice(1)).replace('_', '-');
  //   rename(file, resolve(collectPath, `${newFileName}.svg`), (err) => {})
  // }))
  const fileNameList: string[] = [];
  await Promise.all(files.map((file) => {
    const fileName = basename(file).split('.svg')[0];
    fileNameList.push(camelcase(fileName, { pascalCase: true }));
  }))
  console.log(fileNameList);

  const content = await format(`{
    "icons": ${JSON.stringify(fileNameList)}
  }`, {
    parser: 'json',
    semi: false,
    singleQuote: true,
  });
  writeFile(file, content, 'utf-8');
})
