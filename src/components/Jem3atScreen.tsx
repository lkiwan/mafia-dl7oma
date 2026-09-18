import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Crown, Pencil, Plus, Trash2, UserRound, Users, Swords } from 'lucide-react'
import { useMafiaGame } from '../game/useMafiaGame'
import { MIN_PLAYERS } from '../game/types'
import { buzz } from '../lib/utils'

export default function Jem3atScreen() {
  const players = useMafiaGame((s) => s.players)
  const addPlayer = useMafiaGame((s) => s.addPlayer)
  const removePlayer = useMafiaGame((s) => s.removePlayer)
  const setPlayerName = useMafiaGame((s) => s.setPlayerName)
  const setTeller = useMafiaGame((s) => s.setTeller)
  const startGame = useMafiaGame((s) => s.startGame)

  const [name, setName] = useState('')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [draft, setDraft] = useState('')
  const editRef = useRef<HTMLInputElement>(null)

  // select the old name only once, when entering edit mode
  useEffect(() => {
    if (editingId !== null) editRef.current?.select()
  }, [editingId])

  const teller = players.find((p) => p.isTeller)

  const enough = players.length >= MIN_PLAYERS
  const capped = players.length >= 14

  const startEdit = (id: string, currentName: string) => {
    setEditingId(id)
    setDraft(currentName)
  }

  const commitEdit = (id: string) => {
    setPlayerName(id, draft)
    setEditingId(null)
  }

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || capped) return
    addPlayer(name)
    setName('')
    buzz(15)
  }

  return (
    <div className="relative flex h-full flex-col overflow-hidden bg-night">
      {/* ambience */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 50% -10%, rgba(220,38,38,.14), transparent 55%), radial-gradient(ellipse at 50% 110%, rgba(234,179,8,.08), transparent 60%)',
        }}
      />

      <motion.div
        initial={{ y: -18, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 px-6 pt-8 pb-4 text-center"
      >
        <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-blood/20 ring-1 ring-blood/50 shadow-glowRed">
          <Swords className="h-7 w-7 text-blood" />
        </div>
        <h1 className="font-grit text-3xl leading-tight text-zinc-100">
          L'MAFIA <span className="text-blood">D'LHOUMA</span>
        </h1>
        <p className="mt-1 font-darija text-sm font-semibold tracking-[0.3em] text-yellow-500/80 uppercase">
          مرر و العب · طلب الحاكم
        </p>
      </motion.div>

      <div className="relative z-10 flex flex-1 flex-col overflow-hidden px-5">
        {/* add form */}
        <form onSubmit={submit} className="mb-4 flex gap-2">
          <div className="relative flex-1">
            <UserRound className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="سميّات اللاعبيين..."
              maxLength={16}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 pl-9 font-darija text-sm font-bold text-zinc-100 placeholder-zinc-500 outline-none focus:border-gold/60 focus:bg-white/[.07]"
              autoComplete="off"
            />
          </div>
          <button
            type="submit"
            disabled={capped}
            className="btn-gold shrink-0 !px-4"
            aria-label="زيد اللاعب"
          >
            <Plus className="h-5 w-5" />
          </button>
        </form>

        {/* player roster */}
        <div className="scrollbar-hide min-h-0 flex-1 overflow-y-auto pb-2">
          <p className="mb-2 px-1 font-darija text-[11px] font-bold text-zinc-500">
            <Pencil className="mr-1 inline h-3 w-3 text-gold" />
            ديز على السميّة باش تبدّلها بسرعة.
          </p>
          <div className="mb-2 flex items-center justify-between px-1">
            <span className="font-darija text-xs font-bold tracking-wider text-zinc-400 uppercase">
              لّعبة · {players.length}/14
            </span>
            <span className="rounded-full bg-white/5 px-2.5 py-0.5 font-darija text-[11px] font-bold text-zinc-400">
              الحاكم: <b className="text-gold">{teller?.name ?? '—'}</b>
            </span>
          </div>

          <AnimatePresence initial={false}>
            {players.map((p, i) => (
              <motion.div
                key={p.id}
                layout
                initial={{ opacity: 0, x: 30, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -30, scale: 0.9 }}
                transition={{ duration: 0.25 }}
                className={`mb-2 flex items-center gap-2 rounded-xl px-3 py-2 ring-1 ${
                  p.isTeller ? 'bg-gold/10 ring-gold/50' : 'bg-white/5 ring-white/10'
                }`}
              >
                <span className="w-5 text-center font-grit text-xs text-zinc-500">{i + 1}</span>
                {editingId === p.id ? (
                  <input
                    value={draft}
                    maxLength={16}
                    autoFocus
                    ref={editRef}
                    onFocus={(e) => {
                      if (editingId === p.id) e.target.select()
                    }}
                    onChange={(e) => setDraft(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault()
                        commitEdit(p.id)
                      }
                      if (e.key === 'Escape') setEditingId(null)
                    }}
                    onBlur={() => commitEdit(p.id)}
                    className={`min-w-0 flex-1 rounded-lg bg-night-panel px-2 py-1 font-darija text-sm font-bold text-gold outline-none ring-2 ring-gold/60`}
                  />
                ) : (
                  <button
                    type="button"
                    onClick={() => startEdit(p.id, p.name)}
                    title="ديز باش تبدّل السميّة"
                    className={`flex min-w-0 flex-1 items-center gap-1 truncate rounded-lg px-2 py-1 text-left font-darija text-sm font-bold transition-colors ${
                      p.isTeller ? 'text-gold' : 'text-zinc-100'
                    } hover:bg-white/5`}
                  >
                    <span className="truncate">{p.name}</span>
                    <Pencil className="h-3 w-3 shrink-0 text-zinc-600" />
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => {
                    setTeller(p.id)
                    buzz(20)
                  }}
                  aria-label="ختر الحاكم"
                  title="ختر الحاكم"
                  className={`rounded-lg p-2 transition-all active:scale-90 ${
                    p.isTeller ? 'bg-gold text-night shadow-glowGold' : 'bg-white/5 text-zinc-500 hover:text-gold'
                  }`}
                >
                  <Crown className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => removePlayer(p.id)}
                  aria-label="مشّاه"
                  className="rounded-lg p-2 text-zinc-500 transition-colors hover:text-blood active:scale-90"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>

          {players.length === 0 && (
            <div className="mt-8 flex flex-col items-center gap-2 text-zinc-600">
              <Users className="h-10 w-10" />
              <p className="font-darija text-sm font-semibold">زيد سميّات اللاعبيين...</p>
            </div>
          )}
        </div>

        {/* role roster hint */}
        <div className="mb-3 flex flex-wrap items-center justify-center gap-1.5 text-[11px] font-bold text-zinc-500">
          <span className="rounded-full bg-blood/15 px-2.5 py-1 text-blood">2× عصابة</span>
          <span className="rounded-full bg-gold/15 px-2.5 py-1 text-gold">1× بوليس</span>
          <span className="rounded-full bg-heal/15 px-2.5 py-1 text-heal">1× طبيب</span>
          <span className="rounded-full bg-white/5 px-2.5 py-1 text-zinc-400">ولاد الحومة</span>
        </div>

        {/* start */}
        <div className="pb-6 pt-1">
          <motion.button
            whileTap={!enough ? undefined : { scale: 0.97 }}
            onClick={() => {
              if (!enough) return
              buzz([30, 40, 30])
              startGame()
            }}
            disabled={!enough}
            className="btn-blood font-darija w-full !py-5 text-lg"
          >
            ابدا اللعبة
          </motion.button>
          <p className={`mt-2 text-center font-darija text-xs font-bold ${enough ? 'text-zinc-500' : 'text-zinc-400'}`}>
            {enough
              ? 'الله غيختر الرولات ملي خاصو. يلا نديرو!'
              : `باقي ${MIN_PLAYERS - players.length} لاعبين`}
          </p>
        </div>
      </div>
    </div>
  )
}