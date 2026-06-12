/** Centralised React Query key factory — keep all keys here to avoid drift. */
export const queryKeys = {
  products: {
    all: ["products"] as const,
    list: (params: Record<string, unknown>) => ["products", "list", params] as const,
    detail: (slug: string) => ["products", "detail", slug] as const,
  },
  categories: {
    all: ["categories"] as const,
  },
  cart: {
    all: ["cart"] as const,
  },
} as const;
