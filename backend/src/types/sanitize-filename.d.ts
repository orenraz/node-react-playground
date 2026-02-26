declare module 'sanitize-filename' {
  function sanitize(filename: string, options?: { replacement?: string }): string;
  export = sanitize;
}