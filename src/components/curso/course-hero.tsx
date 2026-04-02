export function CourseHero() {
  return (
    <section className="py-16">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-mono text-3xl md:text-5xl font-bold text-text-primary mb-8">
          Domine a Investigacao{" "}
          <span className="text-neon">Digital</span>
        </h1>
        <div className="relative aspect-video max-w-3xl border border-border overflow-hidden bg-bg-card">
          {/* Placeholder for YouTube embed */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-3 border-2 border-neon flex items-center justify-center">
                <svg className="w-6 h-6 text-neon ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              <p className="font-mono text-text-muted text-xs">VIDEO DE APRESENTACAO</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
