import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button"
import  NavBar  from "@/components/ui/NavBar"
import { Separator } from "@/components/ui/separator"

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function Home() {
  return (
    <div className="flex flex-col h-screen w-screen p-0 m-0 items-center">

      <NavBar />


      <main className="flex flex-col items-center justify-center w-full bg-card pt-20">
        <HeroSection />
        <ArticleSection />
      </main>


      <footer className="h-20">
        
      </footer>
    </div>
  );
}

export function HeroSection() {
  return (
    <>
    <section className="relative w-full flex justify-center items-center py-20 bg-gradient-to-b from-zinc-700 to-zinc-950  ">
      <div className="max-w-3xl w-full mx-auto rounded-3xl shadow-2xl bg-background/80 p-10 flex flex-col items-center gap-8 border border-gray-900 backdrop-blur">
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-gray-200 to-gray-500 mb-2">Jean Luc's Portfolio</h1>
          <h2 className = "text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-gray-200 to-gray-500 mb-2">Fullstack Developer</h2>
        </div>
        <p className="text-xl text-muted-foreground max-w-xl mx-auto leading-relaxed">
          Hi, I'm Jean Luc! I'm a Computer Science major from De La Salle University, and here is a collection of my experience as an aspiring developer.
        </p>
        <Button asChild size="lg" className="mt-4 shadow-lg bg-gradient-to-r from-slate-600 to-slate-700 text-white hover:bg-gradient-to-r hover:from-slate-500 hover:to-slate-600 hover:scale-105 transition-all">
          <Link href="/about">Learn More About Me</Link>
        </Button>
      </div>
      
    </section>
  
    </>
    
  );
}

export function ArticleSection(){
  return(
    <div className="flex flex-row items-center justify-center bg-gradient-to-b from-zinc-950 to-zinc 700 h-96 w-full">
      <ArticleCard />
    </div>
  )

}

export function ArticleCard(){
  return (
    <Card>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card Description</CardDescription>
        <CardAction>Card Action</CardAction>
      </CardHeader>
      <CardContent>
        <p>Card Content</p>
      </CardContent>
      <CardFooter>
        <p>Card Footer</p>
      </CardFooter>
    </Card>
  )
}
