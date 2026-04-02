import "@/styles/prose.css";

interface ArticleBodyProps {
  content: string;
}

export function ArticleBody({ content }: ArticleBodyProps) {
  return (
    <div
      className="prose-cyber"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}
