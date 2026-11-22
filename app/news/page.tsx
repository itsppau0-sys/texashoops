import { supabase } from '@/lib/supabase'
export const dynamic='force-dynamic'
export default async function N(){const {data}=await supabase.from('news').select('*').order('created_at',{ascending:false})
 return(<main className="mx-auto max-w-3xl p-4"><h1 className="font-display text-4xl mb-3">NEWS</h1>{data?.length?data.map((n:any)=><article key={n.id} className="mb-3 rounded bg-navy p-4"><small className="text-hoop">{n.category}</small><h2 className="font-bold">{n.title}</h2><p className="text-white/70">{n.body}</p></article>):<p className="text-white/50">No stories yet.</p>}</main>)}
