import { createClient } from '@supabase/supabase-js'
export const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)
export type Player = { id:string; rank:number; name:string; school:string|null; city:string|null; pos:string|null; height:string|null; aau:string|null; region:string|null; rating:string|null; move:string|null; report:string|null; strengths:string|null; improve:string|null; video:string|null; photo:string|null }
export const REGIONS=['Dallas–Fort Worth','Houston','Austin and Central Texas','San Antonio','East Texas','West Texas','South Texas']
export const POS=['PG','SG','SF','PF','C','Guard','Wing','Forward']
