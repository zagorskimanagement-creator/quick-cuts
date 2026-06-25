const PREFIX = "[QuickTransitions]";

export const Logger = {
  info: (msg: string, ...args: unknown[]) =>
    console.log(`${PREFIX} ${msg}`, ...args),

  warn: (msg: string, ...args: unknown[]) =>
    console.warn(`${PREFIX} WARN: ${msg}`, ...args),

  error: (msg: string, ...args: unknown[]) =>
    console.error(`${PREFIX} ERROR: ${msg}`, ...args),

  debug: (msg: string, ...args: unknown[]) =>
    console.debug(`${PREFIX} DBG: ${msg}`, ...args),
};
