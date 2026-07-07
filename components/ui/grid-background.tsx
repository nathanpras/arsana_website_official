export function GridBackground({
  children,
  patternId,
  tone = 'cream',
}: {
  children: React.ReactNode
  patternId: string
  tone?: 'cream' | 'panel'
}) {
  return (
    <div
      data-grid={patternId}
      className={`relative overflow-hidden ${tone === 'panel' ? 'bg-[hsl(var(--panel))]' : 'bg-background'}`}
    >
      {/* Cahaya hangat lembut & statis — pengganti grid+mask yang mengikuti
          mouse (dihapus karena biaya repaint tiap gerakan kursor). */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute left-1/2 -translate-x-1/2 top-[-45%] w-[95%] h-[70%] rounded-full bg-orange-200/40 blur-[150px]" />
      </div>
      {/* Fade lembut di bawah agar glow memudar, tidak terpotong tegas */}
      <div
        className={`absolute inset-x-0 bottom-0 h-32 pointer-events-none z-0 bg-gradient-to-t to-transparent ${
          tone === 'panel' ? 'from-[hsl(var(--panel))]' : 'from-[hsl(var(--background))]'
        }`}
      />
      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  )
}
