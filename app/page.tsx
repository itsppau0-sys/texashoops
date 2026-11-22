import Link from 'next/link'
import { supabase, Player } from '@/lib/supabase'
import PlayerCard from '@/components/PlayerCard'
export const dynamic='force-dynamic'
export default async function Home(){
 const {data}=await supabase.from('players').select('*').order('rank').limit(5)
 const {data:news}=await supabase.from('news').select('*').order('created_at',{ascending:false}).limit(3)
 return(<main><section className="bg-gradient-to-br from-[#0b1a3d] via-ink to-[#3a0a10] px-5 py-16 text-center">
 <h1 className="font-display text-6xl leading-none">TEXAS <span className="text-hoop">HOOPS</span> 2030</h1>
 <p className="my-4 text-white/70">The Future of Texas Basketball.</p>
 <Link href="/top-50" className="inline-block rounded bg-hoop px-6 py-3 font-bold">VIEW TOP 50</Link>
 <form action="/top-50" className="mx-auto mt-6 flex max-w-md gap-2"><input name="q" placeholder="Search players…" className="flex-1"/><button className="rounded bg-white/10 px-4">Search</button></form></section>
 <div className="mx-auto max-w-4xl p-4"><h2 className="my-4 border-l-4 border-hoop pl-3 font-display text-2xl">TOP 5</h2>
 {(data as Player[]|null)?.map(p=><PlayerCard key={p.id} p={p}/>)}
 <h2 className="my-4 border-l-4 border-hoop pl-3 font-display text-2xl">LATEST NEWS</h2>
 {news?.length?news.map((n:any)=><div key={n.id} className="mb-2 rounded bg-navy p-3"><b>{n.title}</b><p className="text-sm text-white/60">{n.body}</p></div>):<p className="text-white/50">No stories published yet.</p>}</div></main>)}
