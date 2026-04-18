import { Check } from "lucide-react";
import { listCourseLearnings } from "@/lib/actions/courseLearnings";
import { SectionTitle } from "@/components/ui/section-title";

export async function LearningGrid() {
  const items = await listCourseLearnings();

  return (
    <section className="py-16">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle>O QUE VOCÊ VAI APRENDER</SectionTitle>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((item) => (
            <div key={item.id} className="flex items-center gap-3 p-3 border border-border">
              <Check className="w-4 h-4 text-neon shrink-0" />
              <span className="text-text-secondary text-sm">{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
