import path from 'node:path'
import consola from 'consola'
import chalk from 'chalk'
import { type BuildOptions, type Format, build } from 'esbuild'
import GlobalsPlugin from 'esbuild-plugin-globals'
import vue from 'unplugin-vue/esbuild'
import { emptyDir } from 'fs-extra'
import { version } from '../package.json'
import { pathOutput, pathSrc } from './paths'

const buildBundle = () => {
  const getBuildOptions = (format: Format) => {
    const options: BuildOptions = {
      entryPoints: [
        path.resolve(pathSrc, 'index.ts'),
        path.resolve(pathSrc, 'global.ts'),
      ],
      target: 'es2018',
      platform: 'neutral',
      plugins: [
        vue(),
      ],
      bundle: true,
      format,
      minifySyntax: true,
      banner: {
        js: `/*! Smart Ui Icons Vue v${version} */\n`,
      },
      outdir: pathOutput,
    }
    if (format === 'iife') {
      options.plugins!.push(
        GlobalsPlugin({
          vue: 'Vue',
        }),
      )
      options.globalName = 'SmartUiIconsVue'
    } else {
      options.external = ['vue']
    }

    return options
  }
  const doBuild = async (minify: boolean) => {
    await Promise.all([
      build({
        ...getBuildOptions('esm'),
        entryNames: `[name]${minify ? '.min' : ''}`,
        minify,
      }),
      build({
        ...getBuildOptions('iife'),
        entryNames: `[name].iife${minify ? '.min' : ''}`,
        minify,
      }),
      build({
        ...getBuildOptions('cjs'),
        entryNames: `[name]${minify ? '.min' : ''}`,
        outExtension: { '.js': '.cjs' },
        minify,
      }),
    ])
  }

  return Promise.all([doBuild(true), doBuild(false)])
}

consola.info(chalk.blue('cleaning dist...'))
await emptyDir(pathOutput)
consola.info(chalk.blue('building...'))
await buildBundle()