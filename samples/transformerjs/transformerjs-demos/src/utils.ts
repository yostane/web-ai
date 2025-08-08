export function log(...args: any[]) {
  console.log(...args);
}

export function logProgress(file: string, progress: number) {
  console.log(`Progress for ${file}: ${progress}%`);
}
