
import { Button } from "@/components/ui/button";

const NewsletterSection = () => {
  return (
    <section className="py-20 bg-brand-800 text-white">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">Subscribe to Our Newsletter</h2>
          <p className="text-brand-200 mb-8">
            Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.
          </p>
          <form className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-grow px-4 py-3 rounded-md bg-brand-700 border border-brand-600 text-white placeholder:text-brand-400 focus:outline-none focus:ring-2 focus:ring-accent"
              required
            />
            <Button className="bg-accent hover:bg-accent/90 text-white" type="submit">
              Subscribe
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
