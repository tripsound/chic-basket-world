
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ProductTabsProps {
  details?: string;
  care?: string;
  shipping?: string;
}

const ProductTabs = ({ details, care, shipping }: ProductTabsProps) => {
  return (
    <Tabs defaultValue="details" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="details">Details</TabsTrigger>
        <TabsTrigger value="care">Care</TabsTrigger>
        <TabsTrigger value="shipping">Shipping</TabsTrigger>
      </TabsList>
      <TabsContent value="details" className="pt-4">
        {details ? (
          <div className="text-sm space-y-2" dangerouslySetInnerHTML={{ __html: details }} />
        ) : (
          <ul className="list-disc pl-5 space-y-2 text-sm">
            <li>80% Wool, 20% Polyester</li>
            <li>Dry clean only</li>
            <li>Imported</li>
            <li>Model is 5'11" and wears size S</li>
          </ul>
        )}
      </TabsContent>
      <TabsContent value="care" className="pt-4">
        {care ? (
          <div className="text-sm space-y-2" dangerouslySetInnerHTML={{ __html: care }} />
        ) : (
          <ul className="list-disc pl-5 space-y-2 text-sm">
            <li>Dry clean only</li>
            <li>Do not bleach</li>
            <li>Cool iron if needed</li>
            <li>Store folded in a cool, dry place</li>
          </ul>
        )}
      </TabsContent>
      <TabsContent value="shipping" className="pt-4">
        {shipping ? (
          <div className="text-sm space-y-2" dangerouslySetInnerHTML={{ __html: shipping }} />
        ) : (
          <ul className="list-disc pl-5 space-y-2 text-sm">
            <li>Free standard shipping on all orders</li>
            <li>Standard: 3-5 business days</li>
            <li>Express: 2-3 business days</li>
            <li>International shipping available</li>
          </ul>
        )}
      </TabsContent>
    </Tabs>
  );
};

export default ProductTabs;
