import ProductPage from "@/components/shared/ProductPage";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = Number((await params).id);

  return <ProductPage id={id} />;
};

export default Page;
