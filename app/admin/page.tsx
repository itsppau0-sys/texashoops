'use client'
import { useEffect, useState } from 'react'
import { supabase, Player, POS, REGIONS } from '@/lib/supabase'
const F:[keyof Player,string][]=[['name','Name'],['school','High school'],['city','City'],['aau','AAU team'],['height','Height (verified only)'],['rating','Rating'],['photo','Photo URL (authorized)'],['video','Video link'],['report','Scouting report'],['strengths','Strengths'],['improve','Areas to improve']]
export default function Admin(){
 const [ok,setOk]=useState(false),[em,setEm]=useState(''),[pw,setPw]=useState(''),[ps,setPs]=useState<Player[]>([]),[open,setOpen]=useState(''),[msg,setMsg]=useState(''),[nn,setNn]=useState(''),[nt,setNt]=useState(''),[nb,setNb]=useState('')
 const load=async()=>{const {data}=await supabase.from('players').select('*').order('rank');setPs((data??[]) as Player[])}
 useEffect(()=>{supabase.auth.getSession().then(({data})=>{if(data.session){setOk(true);load()}})},[])
 const login=async()=>{const {error}=await supabase.auth.signInWithPassword({email:em,password:pw});if(error)return setMsg(error.message);setOk(true);load()}
 const upd=(id:string,k:string,v:string)=>setPs(ps.map(p=>p.id===id?{...p,[k]:v||null}:p))
 const save=async(p:Player)=>{const {id,...rest}=p;const {error}=await supabase.from('players').update(rest).eq('id',id);setMsg(error?error.message:'Saved')}
 const move=async(i:number,d:number)=>{const j=i+d;if(j<0||j>=ps.length)return;const a=ps[i],b=ps[j]
  await supabase.from('players').update({rank:b.rank,move:d<0?'up':'down'}).eq('id',a.id);await supabase.from('players').update({rank:a.rank,move:d<0?'down':'up'}).eq('id',b.id);load()}
 const del=async(p:Player)=>{if(!confirm('Delete '+p.name+'?'))return;await supabase.from('players').delete().eq('id',p.id);const r=ps.filter(x=>x.id!==p.id);for(let i=0;i<r.length;i++)await supabase.from('players').update({rank:i+1}).eq('id',r[i].id);load()}
 const add=async()=>{if(!nn)return;await supabase.from('players').insert({name:nn,rank:ps.length+1});setNn('');load()}
 const pub=async()=>{if(!nt)return;const {error}=await supabase.from('news').insert({title:nt,body:nb,category:'News'});setMsg(error?error.message:'Published');setNt('');setNb('')}
 if(!ok)return(<main className="mx-auto max-w-sm p-6"><h1 className="font-display text-3xl mb-3">ADMIN LOGIN</h1><div className="grid gap-2"><input placeholder="Email" value={em} onChange={e=>setEm(e.target.value)}/><input type="password" placeholder="Password" value={pw} onChange={e=>setPw(e.target.value)}/><button onClick={login} className="rounded bg-hoop py-2 font-bold">SIGN IN</button><p className="text-amber-400 text-sm">{msg}</p></div></main>)
 return(<main className="mx-auto max-w-3xl p-4"><h1 className="font-display text-3xl">ADMIN</h1><p className="text-sm text-amber-400">{msg}</p>
 <div className="my-3 flex gap-2"><input className="flex-1" placeholder="New player name" value={nn} onChange={e=>setNn(e.target.value)}/><button onClick={add} className="rounded bg-hoop px-4 font-bold">ADD</button></div>
 {ps.map((p,i)=><div key={p.id} className="mb-2 rounded border border-white/10 bg-navy p-3"><div className="flex items-center gap-2"><b className="w-8 text-hoop">{p.rank}</b><span className="flex-1">{p.name}</span>
 <button onClick={()=>move(i,-1)}>▲</button><button onClick={()=>move(i,1)}>▼</button><button onClick={()=>setOpen(open===p.id?'':p.id)} className="text-sm underline">Edit</button><button onClick={()=>del(p)} className="text-sm text-hoop">Delete</button></div>
 {open===p.id&&<div className="mt-3 grid gap-2">{F.map(([k,l])=><label key={k} className="text-xs text-white/60">{l}<input className="w-full" value={(p[k] as string)??''} onChange={e=>upd(p.id,k,e.target.value)}/></label>)}
 <label className="text-xs text-white/60">Position<select className="w-full" value={p.pos??''} onChange={e=>upd(p.id,'pos',e.target.value)}><option value="">—</option>{POS.map(x=><option key={x}>{x}</option>)}</select></label>
 <label className="text-xs text-white/60">Region<select className="w-full" value={p.region??''} onChange={e=>upd(p.id,'region',e.target.value)}><option value="">—</option>{REGIONS.map(x=><option key={x}>{x}</option>)}</select></label>
 <button onClick={()=>save(p)} className="rounded bg-hoop py-2 font-bold">SAVE</button></div>}</div>)}
 <h2 className="mt-6 font-display text-2xl">PUBLISH NEWS</h2><div className="grid gap-2"><input placeholder="Headline" value={nt} onChange={e=>setNt(e.target.value)}/><textarea rows={3} placeholder="Story" value={nb} onChange={e=>setNb(e.target.value)}/><button onClick={pub} className="rounded bg-hoop py-2 font-bold">PUBLISH</button></div></main>)}
