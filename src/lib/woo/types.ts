/** Minimal WooCommerce REST (wc/v3) types — extend as the storefront grows. */

export interface WooImage {
  id: number;
  src: string;
  alt: string;
}

export interface WooTerm {
  id: number;
  name: string;
  slug: string;
}

export interface WooProduct {
  id: number;
  name: string;
  slug: string;
  permalink: string;
  type: "simple" | "variable" | "grouped" | "external";
  status: "publish" | "draft" | "pending" | "private";
  description: string;
  short_description: string;
  sku: string;
  price: string;
  regular_price: string;
  sale_price: string;
  on_sale: boolean;
  stock_status: "instock" | "outofstock" | "onbackorder";
  stock_quantity: number | null;
  average_rating: string;
  rating_count: number;
  images: WooImage[];
  categories: WooTerm[];
  tags: WooTerm[];
  attributes: { id: number; name: string; options: string[] }[];
  meta_data: { id: number; key: string; value: unknown }[];
}

export interface WooCategory {
  id: number;
  name: string;
  slug: string;
  parent: number;
  description: string;
  count: number;
  image: WooImage | null;
}

export interface WooListMeta {
  total: number;
  totalPages: number;
}

export interface WooList<T> {
  items: T[];
  meta: WooListMeta;
}
