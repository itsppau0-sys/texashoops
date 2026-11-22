import { supabase, Player, POS, REGIONS } from '@/lib/supabase'
import PlayerCard from '@/components/PlayerCard'
export const dynamic='force-dynamic'
export default async function Top({searchParams}:{searchParams:Record<string,string|undefined>}){
 const {data}=await supabase.from('players').select('*').order('rank').limit(50)
 const all=(data??[]) as Player[]; const s=searchParams
 const q=(s.q??'').toLowerCase()
 const list=all.filter(p=>(!s.pos||p.pos===s.pos)&&(!s.city||p.city===s.city)&&(!s.school||p.school===s.school)&&(!s.aau||p.aau===s.aau)&&(!s.region||p.region===s.region)&&(!q||`${p.name} ${p.school} ${p.aau} ${p.city}`.toLowerCase().includes(q)))
 const u=(k:'city'|'school'|'aau')=>Array.from(new Set(all.map(p=>p[k]).filter(Boolean) as string[])).sort()
 const sel=(n:string,l:string,v:string[])=><select name={n} defaultValue={s[n]??''}><option value="">{l}</option>{v.map(x=><option key={x}>{x}</option>)}</select>
 return(<main className="mx-auto max-w-4xl p-4"><h1 className="font-display text-4xl">TEXAS HOOPS 2030 — TOP 50</h1>
 <p className="mb-3 text-sm text-white/60">Initial list, not independently verified scouting rankings. Blank fields are unverified.</p>
 <form className="mb-4 flex flex-wrap gap-2"><input name="q" defaultValue={s.q} placeholder="Search…" className="flex-1 min-w-[160px]"/>
 {sel('pos','Position',POS)}{sel('city','City',u('city'))}{sel('school','School',u('school'))}{sel('aau','AAU',u('aau'))}{sel('region','Region',REGIONS)}
 <button className="rounded bg-hoop px-4 font-bold">FILTER</button></form>
 {list.length?list.map(p=><PlayerCard key={p.id} p={p}/>):<p>No players match.</p>}</main>)}
