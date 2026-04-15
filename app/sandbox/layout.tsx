import { Nanum_Myeongjo, Open_Sans } from 'next/font/google'

const nanum = Nanum_Myeongjo({
  weight: ['400', '700', '800'],
  subsets: ['latin'],
  variable: '--font-nanum',
})

const openSans = Open_Sans({
  subsets: ['latin'],
  variable: '--font-open-sans',
})

export default function SandboxLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${nanum.variable} ${openSans.variable}`} style={{ background: '#0F0F11' }}>
      {children}
    </div>
  )
}
