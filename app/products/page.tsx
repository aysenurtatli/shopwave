import { Suspense } from "react";
import Products from "@/components/Products";

const page = () => {
  return (
    <Suspense>
      <Products />
    </Suspense>
  );
};

export default page;
