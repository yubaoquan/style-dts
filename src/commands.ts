import * as vscode from 'vscode';
import { main as lessMain } from 'typed-less-modules/dist/lib/main.js';
import { main as scssMain } from 'typed-scss-modules/dist/lib/main.js';

import readdirp = require('readdirp');

function registerCommands() {
  const disposable = vscode.commands.registerCommand('style-dts.batchGenDts', batchGenDts);
  const disposable2 = vscode.commands.registerCommand('style-dts.singleGenDts', singleGenDts);

  return [disposable, disposable2];
}

const lessOptions = {
  exportType: 'default',
};

const scssOptions = {
  exportType: 'default',
  exportTypeName: 'ClassesType',
  implementation: 'sass',
};

async function batchGenDts(evt: any) {
  try {
    const filePath: string = evt?.fsPath;
    if (!filePath) return;
    lessMain(filePath, lessOptions);
    scssMain(filePath, scssOptions);

    // lessMain 默认不处理 css 文件, 需要显示指明具体文件
    const cssFiles = await readdirp.promise(filePath, { fileFilter: ['*.css'] });
    cssFiles.forEach(file => lessMain(file.fullPath, lessOptions));

    // scssMain 默认不处理 sass 文件, 需要显示指明具体文件
    const sassFiles = await readdirp.promise(filePath, { fileFilter: ['*.sass'] });
    sassFiles.forEach(file => scssMain(file.fullPath, scssOptions));
  } catch (e) {
    console.error(e);
  }
}

function singleGenDts(evt: any) {
  try {
    if (evt?.fsPath) genDts(evt?.fsPath);
  } catch (e) {
    console.error(e);
    vscode.window.showErrorMessage('Fail to generate .d.ts for this file.');
  }
}

function genDts(filePath: string) {
  try {
    if (/\.(css|less)$/.test(filePath)) lessMain(filePath, lessOptions);
    if (/\.(sass|scss)$/.test(filePath)) scssMain(filePath, scssOptions);
  } catch (e) {
    console.error(e);
    vscode.window.showErrorMessage('Fail to generate .d.ts for this file.');
  }
}

export {
  registerCommands,
};
