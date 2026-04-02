import { Mail, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CONTACT } from "@/lib/constants";

export function CourseContact() {
  return (
    <section className="py-12">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href={`mailto:${CONTACT.email}`}>
            <Button variant="secondary" size="md">
              <Mail className="w-4 h-4" />
              {CONTACT.email}
            </Button>
          </a>
          <a
            href={`https://wa.me/${CONTACT.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="primary" size="md">
              <MessageCircle className="w-4 h-4" />
              WhatsApp
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}
