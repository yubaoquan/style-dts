declare module 'typed-scss-modules/dist/lib/main.js' {
  interface Aliases {
    [index: string]: string;
  }

  export type NameFormat = 'camel' | 'kebab' | 'param' | 'dashes' | 'none';
  type ExportType = 'named' | 'default';

  interface Options {
    includePaths?: string[];
    aliases?: Aliases;
    aliasPrefixes?: Aliases;
    nameFormat?: NameFormat;
    verbose?: boolean;
  }

  interface MainOptions extends Options {
    exportType: ExportType | string;
    listDifferent?: boolean;
    watch?: boolean;
    ignoreInitial?: boolean;
    exportTypeName?: string;
    implementation?: string;
  }

  export function main(pattern: string, options: MainOptions): void;
}
