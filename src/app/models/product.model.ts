export interface Product {
  id: number;
  name: string;
  description: string;
  slug: string;
  featuredAsset: FeaturedAsset;
}

export interface FeaturedAsset {
  id: string;
  preview: string;
}
