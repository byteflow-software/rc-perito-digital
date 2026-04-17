import { prisma } from "@/lib/prisma";
import { FileText, Video, Camera, BookOpen, Users, HelpCircle } from "lucide-react";
import { StatsCard } from "@/components/admin/stats-card";
import { RecentArticlesTable } from "@/components/admin/RecentArticlesTable";
import Link from "next/link";

async function getStats() {
  const [articles, shorts, instagram, books, subscribers, faqs] = await Promise.all([
    prisma.article.count(),
    prisma.short.count(),
    prisma.instagramPost.count(),
    prisma.book.count(),
    prisma.newsletterSubscriber.count(),
    prisma.faq.count(),
  ]);
  return { articles, shorts, instagram, books, subscribers, faqs };
}

async function getRecentArticles() {
  return prisma.article.findMany({
    orderBy: { updatedAt: "desc" },
    take: 8,
    select: { id: true, title: true, status: true, publishedAt: true, viewsCount: true },
  });
}

export default async function AdminDashboardPage() {
  const [stats, recentArticles] = await Promise.all([getStats(), getRecentArticles()]);

  const statCards = [
    { label: "Artigos", value: stats.articles, icon: FileText },
    { label: "Shorts", value: stats.shorts, icon: Video },
    { label: "Instagram", value: stats.instagram, icon: Camera },
    { label: "Livros", value: stats.books, icon: BookOpen },
    { label: "Newsletter", value: stats.subscribers, icon: Users },
    { label: "FAQ", value: stats.faqs, icon: HelpCircle },
  ];

  return (
    <div>
      <h1 className="font-mono text-xl font-bold text-text-primary mb-1">
        <span className="text-neon">&gt;</span> Dashboard
      </h1>
      <p className="text-text-muted text-xs font-mono mb-8">Visão geral do sistema</p>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-10">
        {statCards.map((s) => <StatsCard key={s.label} {...s} />)}
      </div>

      <div className="flex items-center justify-between mb-4">
        <h2 className="font-mono text-sm font-bold text-text-primary uppercase tracking-widest">
          <span className="text-neon">//</span> Artigos Recentes
        </h2>
        <Link href="/admin/blog" className="font-mono text-xs text-text-muted hover:text-neon transition-colors">
          Ver todos →
        </Link>
      </div>
      <RecentArticlesTable articles={recentArticles} />
    </div>
  );
}
