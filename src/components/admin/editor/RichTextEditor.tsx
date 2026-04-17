"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Underline from "@tiptap/extension-underline";
import Placeholder from "@tiptap/extension-placeholder";
import { marked } from "marked";
import {
  Bold, Italic, Underline as UnderlineIcon, Strikethrough, Code,
  Heading1, Heading2, Heading3, List, ListOrdered, Quote,
  Link as LinkIcon, Image as ImageIcon, Undo, Redo,
  Eye, FileCode, Type, X, Upload, Loader2,
} from "lucide-react";

type EditorMode = "visual" | "markdown" | "html";

interface Props {
  content: string;
  onChange: (html: string) => void;
  placeholder?: string;
}

export function RichTextEditor({ content, onChange, placeholder = "Escreva o conteúdo..." }: Props) {
  const [mode, setMode] = useState<EditorMode>("visual");
  const [markdownContent, setMarkdownContent] = useState("");
  const [htmlContent, setHtmlContent] = useState(content || "");
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");
  const [linkText, setLinkText] = useState("");
  const [showImageModal, setShowImageModal] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [imageAlt, setImageAlt] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const htmlContentRef = useRef(content || "");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ codeBlock: false }),
      Underline,
      Link.configure({ openOnClick: false }),
      Image,
      Placeholder.configure({ placeholder }),
    ],
    content,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      htmlContentRef.current = html;
      setHtmlContent(html);
      onChange(html);
    },
    editorProps: {
      attributes: {
        class: "min-h-[400px] p-4 font-sans text-sm text-text-primary focus:outline-none prose prose-invert max-w-none",
      },
    },
  });

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content || "");
      htmlContentRef.current = content || "";
      setHtmlContent(content || "");
    }
  }, [content, editor]);

  useEffect(() => {
    if (mode === "markdown" && htmlContentRef.current) {
      const html = htmlContentRef.current;
      const md = html
        .replace(/<h1>/g, "# ").replace(/<\/h1>/g, "\n\n")
        .replace(/<h2>/g, "## ").replace(/<\/h2>/g, "\n\n")
        .replace(/<h3>/g, "### ").replace(/<\/h3>/g, "\n\n")
        .replace(/<p>/g, "").replace(/<\/p>/g, "\n\n")
        .replace(/<strong>/g, "**").replace(/<\/strong>/g, "**")
        .replace(/<em>/g, "*").replace(/<\/em>/g, "*")
        .replace(/<u>/g, "__").replace(/<\/u>/g, "__")
        .replace(/<code>/g, "`").replace(/<\/code>/g, "`")
        .replace(/<blockquote>/g, "> ").replace(/<\/blockquote>/g, "\n\n")
        .replace(/<ul>/g, "").replace(/<\/ul>/g, "")
        .replace(/<ol>/g, "").replace(/<\/ol>/g, "")
        .replace(/<li>/g, "- ").replace(/<\/li>/g, "\n")
        .replace(/<br\s*\/?>/g, "\n")
        .replace(/<[^>]+>/g, "")
        .replace(/&nbsp;/g, " ").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&")
        .trim();
      setMarkdownContent(md);
    }
  }, [mode]);

  const switchMode = useCallback(
    (newMode: EditorMode) => {
      if (!editor) return;
      if (newMode === "visual") {
        if (mode === "markdown") {
          const html = marked.parse(markdownContent, { async: false }) as string;
          editor.commands.setContent(html);
          htmlContentRef.current = html;
          onChange(html);
        } else if (mode === "html") {
          editor.commands.setContent(htmlContent);
          htmlContentRef.current = htmlContent;
          onChange(htmlContent);
        }
      }
      setMode(newMode);
    },
    [editor, mode, markdownContent, htmlContent, onChange]
  );

  const addLink = () => {
    if (!editor || !linkUrl) return;
    if (linkText) {
      editor.chain().focus().insertContent(`<a href="${linkUrl}">${linkText}</a>`).run();
    } else {
      editor.chain().focus().setLink({ href: linkUrl }).run();
    }
    setShowLinkModal(false);
    setLinkUrl("");
    setLinkText("");
  };

  const addImage = () => {
    if (!editor || !imageUrl) return;
    editor.chain().focus().setImage({ src: imageUrl, alt: imageAlt }).run();
    setShowImageModal(false);
    setImageUrl("");
    setImageAlt("");
    setUploadError("");
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) { setUploadError("Apenas imagens são permitidas"); return; }
    if (file.size > 5 * 1024 * 1024) { setUploadError("Máximo 5MB."); return; }
    setUploadingImage(true);
    setUploadError("");
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", "artigos");
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Erro ao fazer upload");
      setImageUrl(data.url);
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : "Erro ao fazer upload");
    } finally {
      setUploadingImage(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const setLink = () => {
    if (!editor) return;
    const { from, to } = editor.state.selection;
    const text = editor.state.doc.textBetween(from, to);
    setLinkText(text);
    setShowLinkModal(true);
  };

  if (!editor) return null;

  const btnBase = "p-1.5 rounded text-text-muted hover:text-neon hover:bg-neon/10 transition-colors disabled:opacity-30";
  const btnActive = "bg-neon/10 text-neon";

  return (
    <div className="border border-border">
      {/* Mode switcher */}
      <div className="flex items-center justify-between border-b border-border px-2 py-1.5 bg-bg-card">
        <div className="flex items-center gap-0.5">
          {(["visual", "markdown", "html"] as EditorMode[]).map((m) => {
            const icons = { visual: Eye, markdown: Type, html: FileCode };
            const Icon = icons[m];
            return (
              <button
                key={m}
                type="button"
                onClick={() => switchMode(m)}
                className={[
                  "flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono transition-colors",
                  mode === m ? "text-neon bg-neon/10" : "text-text-muted hover:text-neon",
                ].join(" ")}
              >
                <Icon className="w-3.5 h-3.5" />
                {m.charAt(0).toUpperCase() + m.slice(1)}
              </button>
            );
          })}
        </div>
      </div>

      {/* Toolbar (visual only) */}
      {mode === "visual" && (
        <div className="flex flex-wrap items-center gap-0.5 p-1.5 border-b border-border bg-bg-card">
          <button type="button" onClick={() => editor.chain().focus().toggleBold().run()} className={[btnBase, editor.isActive("bold") ? btnActive : ""].join(" ")}><Bold className="w-3.5 h-3.5" /></button>
          <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()} className={[btnBase, editor.isActive("italic") ? btnActive : ""].join(" ")}><Italic className="w-3.5 h-3.5" /></button>
          <button type="button" onClick={() => editor.chain().focus().toggleUnderline().run()} className={[btnBase, editor.isActive("underline") ? btnActive : ""].join(" ")}><UnderlineIcon className="w-3.5 h-3.5" /></button>
          <button type="button" onClick={() => editor.chain().focus().toggleStrike().run()} className={[btnBase, editor.isActive("strike") ? btnActive : ""].join(" ")}><Strikethrough className="w-3.5 h-3.5" /></button>
          <button type="button" onClick={() => editor.chain().focus().toggleCode().run()} className={[btnBase, editor.isActive("code") ? btnActive : ""].join(" ")}><Code className="w-3.5 h-3.5" /></button>
          <span className="w-px h-5 bg-border mx-1" />
          <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} className={[btnBase, editor.isActive("heading", { level: 1 }) ? btnActive : ""].join(" ")}><Heading1 className="w-3.5 h-3.5" /></button>
          <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={[btnBase, editor.isActive("heading", { level: 2 }) ? btnActive : ""].join(" ")}><Heading2 className="w-3.5 h-3.5" /></button>
          <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} className={[btnBase, editor.isActive("heading", { level: 3 }) ? btnActive : ""].join(" ")}><Heading3 className="w-3.5 h-3.5" /></button>
          <span className="w-px h-5 bg-border mx-1" />
          <button type="button" onClick={() => editor.chain().focus().toggleBulletList().run()} className={[btnBase, editor.isActive("bulletList") ? btnActive : ""].join(" ")}><List className="w-3.5 h-3.5" /></button>
          <button type="button" onClick={() => editor.chain().focus().toggleOrderedList().run()} className={[btnBase, editor.isActive("orderedList") ? btnActive : ""].join(" ")}><ListOrdered className="w-3.5 h-3.5" /></button>
          <button type="button" onClick={() => editor.chain().focus().toggleBlockquote().run()} className={[btnBase, editor.isActive("blockquote") ? btnActive : ""].join(" ")}><Quote className="w-3.5 h-3.5" /></button>
          <span className="w-px h-5 bg-border mx-1" />
          <button type="button" onClick={setLink} className={[btnBase, editor.isActive("link") ? btnActive : ""].join(" ")}><LinkIcon className="w-3.5 h-3.5" /></button>
          <button type="button" onClick={() => setShowImageModal(true)} className={btnBase}><ImageIcon className="w-3.5 h-3.5" /></button>
          <span className="w-px h-5 bg-border mx-1" />
          <button type="button" onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()} className={btnBase}><Undo className="w-3.5 h-3.5" /></button>
          <button type="button" onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()} className={btnBase}><Redo className="w-3.5 h-3.5" /></button>
        </div>
      )}

      {/* Editor area */}
      {mode === "visual" && (
        <div className="bg-bg-primary">
          <EditorContent editor={editor} />
        </div>
      )}
      {mode === "markdown" && (
        <div className="grid grid-cols-2 divide-x divide-border">
          <textarea
            value={markdownContent}
            onChange={(e) => {
              const val = e.target.value;
              setMarkdownContent(val);
              const html = marked.parse(val, { async: false }) as string;
              htmlContentRef.current = html;
              onChange(html);
            }}
            className="min-h-[400px] p-4 bg-bg-primary font-mono text-xs text-text-primary resize-none focus:outline-none"
            placeholder="Markdown..."
          />
          <div
            className="min-h-[400px] p-4 prose prose-invert max-w-none text-sm overflow-auto"
            dangerouslySetInnerHTML={{ __html: marked.parse(markdownContent, { async: false }) as string }}
          />
        </div>
      )}
      {mode === "html" && (
        <textarea
          value={htmlContent}
          onChange={(e) => {
            const val = e.target.value;
            setHtmlContent(val);
            htmlContentRef.current = val;
            onChange(val);
          }}
          className="w-full min-h-[400px] p-4 bg-bg-primary font-mono text-xs text-text-primary resize-none focus:outline-none"
          placeholder="HTML bruto..."
        />
      )}

      {/* Link modal */}
      {showLinkModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">
          <div className="bg-bg-card border border-border p-6 w-full max-w-md space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-mono text-sm font-bold text-neon">Inserir Link</h3>
              <button type="button" onClick={() => setShowLinkModal(false)}><X className="w-4 h-4 text-text-muted" /></button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-mono text-text-secondary mb-1 uppercase">URL</label>
                <input
                  type="url"
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  className="w-full px-3 py-2 bg-bg-primary border border-border text-text-primary text-sm font-mono focus:outline-none focus:border-neon/50"
                  placeholder="https://..."
                  autoFocus
                />
              </div>
              <div>
                <label className="block text-xs font-mono text-text-secondary mb-1 uppercase">Texto (opcional)</label>
                <input
                  type="text"
                  value={linkText}
                  onChange={(e) => setLinkText(e.target.value)}
                  className="w-full px-3 py-2 bg-bg-primary border border-border text-text-primary text-sm font-mono focus:outline-none focus:border-neon/50"
                  placeholder="Texto do link"
                />
              </div>
            </div>
            <div className="flex gap-2 justify-end">
              <button type="button" onClick={() => setShowLinkModal(false)} className="px-4 py-1.5 text-xs font-mono border border-border text-text-muted hover:text-neon transition-colors">Cancelar</button>
              <button type="button" onClick={addLink} className="px-4 py-1.5 text-xs font-mono bg-neon/10 border border-neon/40 text-neon hover:bg-neon/20 transition-colors">Inserir</button>
            </div>
          </div>
        </div>
      )}

      {/* Image modal */}
      {showImageModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">
          <div className="bg-bg-card border border-border p-6 w-full max-w-md space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-mono text-sm font-bold text-neon">Inserir Imagem</h3>
              <button type="button" onClick={() => setShowImageModal(false)}><X className="w-4 h-4 text-text-muted" /></button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-mono text-text-secondary mb-1 uppercase">URL da Imagem</label>
                <input
                  type="url"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="w-full px-3 py-2 bg-bg-primary border border-border text-text-primary text-sm font-mono focus:outline-none focus:border-neon/50"
                  placeholder="https://..."
                />
              </div>
              <div>
                <label className="block text-xs font-mono text-text-secondary mb-1 uppercase">Alt text</label>
                <input
                  type="text"
                  value={imageAlt}
                  onChange={(e) => setImageAlt(e.target.value)}
                  className="w-full px-3 py-2 bg-bg-primary border border-border text-text-primary text-sm font-mono focus:outline-none focus:border-neon/50"
                  placeholder="Descrição da imagem"
                />
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploadingImage}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono border border-border hover:border-neon/50 text-text-secondary hover:text-neon transition-colors disabled:opacity-50"
                >
                  {uploadingImage ? <Loader2 className="w-3 h-3 animate-spin" /> : <Upload className="w-3 h-3" />}
                  {uploadingImage ? "Enviando..." : "Fazer upload"}
                </button>
              </div>
              {uploadError && <p className="text-xs font-mono text-red-400">{uploadError}</p>}
            </div>
            <div className="flex gap-2 justify-end">
              <button type="button" onClick={() => setShowImageModal(false)} className="px-4 py-1.5 text-xs font-mono border border-border text-text-muted hover:text-neon transition-colors">Cancelar</button>
              <button type="button" onClick={addImage} disabled={!imageUrl} className="px-4 py-1.5 text-xs font-mono bg-neon/10 border border-neon/40 text-neon hover:bg-neon/20 transition-colors disabled:opacity-50">Inserir</button>
            </div>
          </div>
        </div>
      )}

      <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
    </div>
  );
}
