import ProductPage from "@/components/ProductPage";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;

  return <ProductPage id={id} />;
};

export default Page;
