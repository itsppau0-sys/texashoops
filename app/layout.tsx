import './globals.css'
import Link from 'next/link'
export const metadata={title:'TEXAS HOOPS 2030',description:'The Future of Texas Basketball. Class of 2030 boys’ rankings, headquartered in Dallas.'}
export default function L({children}:{children:React.ReactNode}){return(<html lang="en"><body>
<nav className="sticky top-0 z-10 flex items-center gap-4 border-b-2 border-hoop bg-ink/95 px-4 py-3 overflow-x-auto">
<Link href="/" className="mr-auto font-display text-2xl whitespace-nowrap">TEXAS <span className="text-hoop">HOOPS</span> 2030</Link>
<Link href="/top-50" className="font-bold text-sm">TOP 50</Link><Link href="/news" className="font-bold text-sm">NEWS</Link></nav>
{children}<footer className="p-8 text-center text-sm text-white/50">TEXAS HOOPS 2030 · Dallas, Texas · Class of 2030 boys’ basketball</footer></body></html>)}
