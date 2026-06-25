/**
 * UXP environment globals — not available in standard TypeScript libs.
 * In UXP, `require` is a synchronous CommonJS-style loader injected by the runtime.
 */
declare function require(module: string): unknown;
