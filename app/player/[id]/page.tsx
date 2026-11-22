import { supabase, Player } from '@/lib/supabase'
import { notFound } from 'next/navigation'
export const dynamic='force-dynamic'
export default async function P({params}:{params:{id:string}}){
 const {data}=await supabase.from('players').select('*').eq('id',params.id).single()
 if(!data) notFound(); const p=data as Player
 const u=(v:string|null,l='Unverified')=>v??<span className="text-amber-400">{l}</span>
 return(<main className="mx-auto max-w-2xl p-4"><h1 className="font-display text-4xl">#{p.rank} {p.name}</h1><p className="text-white/50">Class of 2030 · Texas</p>
 <div className="my-4 grid grid-cols-2 gap-3 sm:grid-cols-3">{([['High school',p.school],['City',p.city],['Position',p.pos],['Height',p.height],['AAU',p.aau],['Rating',p.rating]] as [string,string|null][]).map(([k,v])=><div key={k}><small className="text-white/50">{k}</small><br/>{u(v)}</div>)}</div>
 <h2 className="font-display text-xl">SCOUTING REPORT</h2><p className="mb-3">{u(p.report,'No verified report yet.')}</p>
 <h2 className="font-display text-xl">STRENGTHS</h2><p className="mb-3">{u(p.strengths,'Unavailable')}</p>
 <h2 className="font-display text-xl">AREAS TO IMPROVE</h2><p className="mb-3">{u(p.improve,'Unavailable')}</p>
 <h2 className="font-display text-xl">HIGHLIGHTS</h2>{p.video?<a className="text-hoop underline" href={p.video} target="_blank" rel="noopener">Watch video</a>:<p className="text-amber-400">No video linked.</p>}</main>)}
