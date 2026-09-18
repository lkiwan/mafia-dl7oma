import { Fragment, useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useMafiaGame } from '../game/useMafiaGame'
import { GameTable } from './GameTable'
import { TableCard } from './PlayerCard'

interface Box {
  w: number
  h: number
}

const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v))

export default function DealScreen() {
  const players = useMafiaGame((s) => s.players)
  const advanceToReveal = useMafiaGame((s) => s.advanceToReveal)
  const deck = players.filter((p) => !p.isTeller)
  const teller = players.find((p) => p.isTeller)
  const n = deck.length

  const stageRef = useRef<HTMLDivElement>(null)
  const [box, setBox] = useState<Box | null>(null)

  // measure the table once the layout is ready (and on resize/appearance)
  useEffect(() => {
    const el = stageRef.current
    if (!el) return
    const update = () => {
      if (el.clientWidth > 0) setBox({ w: el.clientWidth, h: el.clientHeight })
    }
    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  // total time = first delay + all steps + settle + hold
  const firstDelay = 0.25
  const step = 0.26
  const totalSec = firstDelay + n * step + 1.3 + 0.7

  useEffect(() => {
    const t = setTimeout(() => advanceToReveal(), totalSec * 1000)
    return () => clearTimeout(t)
  }, [advanceToReveal, totalSec])

  const delay = (i: number) => firstDelay + i * step

  const cx = box ? box.w / 2 : 0
  const cy = box ? box.h / 2 : 0
  const rx = box ? box.w * 0.4 : 0
  const ry = box ? box.h * 0.425 : 0
  const cardW = box ? clamp(Math.max(box.w * (n > 10 ? 0.16 : n > 7 ? 0.18 : 0.205), 42), 42, 78) : 0
  const cardH = cardW * 1.45

  const seats = deck.map((_, i) => {
    const a = ((-90 + (360 / n) * i) * Math.PI) / 180
    return {
      x: cx + rx * Math.cos(a),
      y: cy + ry * Math.sin(a),
      o: ((a * 180) / Math.PI + 90 + 180) % 360,
    }
  })

  return (
    <div className="relative flex h-full flex-col items-center overflow-hidden bg-night px-4">
      {/* ambient lantern light */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 50% 40%, rgba(234,179,8,.14), transparent 42%), radial-gradient(ellipse at 50% 50%, transparent 42%, rgba(0,0,0,.72) 100%)',
        }}
      />

      {/* header */}
      <div className="relative z-10 mt-6 mb-3 flex flex-col items-center gap-1.5">
        <motion.p
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="font-darija text-[11px] font-bold tracking-[0.4em] text-gold/80 uppercase"
        >
          تفريق الأدوار
        </motion.p>
        <div className="h-px w-24 bg-gradient-to-r from-transparent via-gold/60 to-transparent" />
        <motion.p
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="font-grit text-2xl tracking-wider text-zinc-100"
        >
          L'MAFIA <span className="text-blood">D'LHOUMA</span>
        </motion.p>
      </div>

      {/* the table */}
      <div className="relative z-10 flex w-full max-w-[min(88vw,420px)] flex-1 items-center pb-2">
        <div ref={stageRef} className="relative w-full">
          <GameTable>
            {/* center medallion */}
            {box && (
              <div
                className="absolute h-14 w-14"
                style={{ left: cx, top: cy, transform: 'translate(-50%,-50%)' }}
              >
                <motion.div
                  className="h-full w-full rounded-full border border-gold/25"
                  initial={{ scale: 0, rotate: 0, opacity: 0 }}
                  animate={{ scale: 1, rotate: 360, opacity: 1 }}
                  transition={{ duration: 1.4, ease: 'easeOut' }}
                  style={{
                    boxShadow: 'inset 0 0 18px rgba(234,179,8,.18), 0 0 14px rgba(0,0,0,.6)',
                  }}
                >
                  <div className="absolute left-1/2 top-1/2 h-px w-8 -translate-x-1/2 -translate-y-1/2 bg-gold/30" />
                  <div className="absolute left-1/2 top-1/2 h-8 w-px -translate-x-1/2 -translate-y-1/2 bg-gold/30" />
                </motion.div>
              </div>
            )}

            {/* seats + flying cards */}
            {box &&
              seats.map((s, i) => {
                const p = deck[i]
                // gentle radial orientation so cards face the table center
                let r = ((s.o % 360) + 360) % 360
                if (r > 180) r -= 360
                if (r > 90) r -= 180
                else if (r < -90) r += 180
                const settle = clamp(r, -24, 24)
                return (
                  <Fragment key={p.id}>
                    {/* seat slot */}
                    <motion.div
                      className="absolute rounded-[16%] border border-gold/20"
                      style={{
                        left: s.x,
                        top: s.y,
                        width: cardW * 1.16,
                        height: cardH * 1.16,
                        transform: 'translate(-50%,-50%)',
                        background: 'linear-gradient(135deg, rgba(234,179,8,.07), rgba(0,0,0,.35))',
                        boxShadow: 'inset 0 2px 10px rgba(0,0,0,.5)',
                      }}
                      initial={{ opacity: 0, scale: 0.92 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: delay(i) - 0.18, duration: 0.35, ease: 'easeOut' }}
                    />
                    {/* centering wrapper */}
                    <div
                      className="absolute"
                      style={{
                        left: s.x,
                        top: s.y,
                        width: cardW,
                        height: cardH,
                        transform: 'translate(-50%,-50%)',
                      }}
                    >
                      <motion.div
                        className="h-full w-full"
                        initial={{ x: cx - s.x, y: cy - s.y, scale: 0.25, rotate: settle + 210, opacity: 0 }}
                        animate={{ x: 0, y: 0, scale: 1, rotate: settle, opacity: 1 }}
                        transition={{
                          delay: delay(i),
                          x: { type: 'spring', stiffness: 320, damping: 24, mass: 1 },
                          y: { type: 'spring', stiffness: 280, damping: 16, mass: 1 },
                          scale: { type: 'spring', stiffness: 380, damping: 26 },
                          rotate: { type: 'spring', stiffness: 120, damping: 18 },
                          opacity: { duration: 0.18 },
                        }}
                      >
                        <TableCard player={p} facing="back" className="h-full w-full" />
                      </motion.div>
                    </div>
                  </Fragment>
                )
              })}
          </GameTable>
        </div>
      </div>

      {/* caption */}
      <div className="relative z-10 mb-5 mt-2 flex items-center gap-2 rounded-full border border-white/10 bg-night-panel/80 px-4 py-2">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-60" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-gold" />
        </span>
        <p className="font-darija text-sm font-black text-zinc-100">تشوييييش...</p>
      </div>
      <p className="relative z-10 mb-6 text-center font-darija text-sm font-semibold text-zinc-500">
        الحاكم: <span className="text-gold">{teller?.name}</span> — ما تتيش راك!
      </p>
    </div>
  )
}