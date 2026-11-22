import Link from 'next/link'
import type { Player } from '@/lib/supabase'
export default function PlayerCard({p}:{p:Player}){
 const mv=p.move==='up'?'▲':p.move==='down'?'▼':p.move==='same'?'—':'NEW'
 return(<div className="flex items-center gap-3 rounded border border-white/10 bg-navy p-3 mb-2">
 <div className="w-12 text-center font-display text-3xl text-hoop">{p.rank}</div>
 {p.photo?<img src={p.photo} alt="" className="h-11 w-11 rounded-full object-cover"/>:<div className="grid h-11 w-11 place-items-center rounded-full bg-white/10 font-bold">{p.name.split(' ').map(w=>w[0]).slice(0,2).join('')}</div>}
 <div className="min-w-0 flex-1"><b className="block">{p.name} <span className="text-xs text-white/50">{mv}</span></b>
 <small className="text-white/60">{p.school??'School unverified'}{p.city?` · ${p.city}`:''} · {p.pos??'Pos —'} · {p.height??'Ht unverified'} · AAU: {p.aau??'—'} · Rating: {p.rating??'Unrated'}</small></div>
 <Link href={`/player/${p.id}`} className="rounded bg-hoop px-3 py-2 text-xs font-bold">PROFILE</Link></div>)}
