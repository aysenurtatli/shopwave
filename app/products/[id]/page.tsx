import { getProductByIdOrSlug } from "@/lib/db";
import { notFound } from "next/navigation";
import ProductDetailPage from "@/components/ProductDetailPage";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = getProductByIdOrSlug(id);

  if (!product) {
    notFound();
  }

  return <ProductDetailPage product={product} />;
}
