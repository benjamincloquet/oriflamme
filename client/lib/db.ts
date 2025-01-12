export type Database<T extends { id: string }> = {
  [K in T["id"]]: T & { id: K };
};
