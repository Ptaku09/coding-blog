const extensions: { [key: string]: string } = {
  java: 'java',
  js: 'javascript',
  ts: 'typescript',
  py: 'python',
  c: 'c',
  cpp: 'cpp',
  go: 'go',
  php: 'php',
  cs: 'csharp',
  sh: 'bash',
  rs: 'rust',
  rb: 'ruby',
};

export const detectLanguage = (extension: string): string => {
  return extensions[extension];
};
