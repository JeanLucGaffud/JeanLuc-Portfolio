import 'dotenv/config';
import { drizzle } from 'drizzle-orm/neon-http';
import { NewProject, projectsTable } from '../db/schema';
  
const db = drizzle(process.env.DATABASE_URL!, {casing: "snake_case"});

async function main() {

    const newProject: NewProject = {
        title: "Portfolio Website",
        description: "A modern, responsive portfolio built with Next.js 15, TypeScript, and Tailwind CSS featuring dark mode support and smooth animations.",
        longDescription: "This portfolio showcases my skills in modern web development using cutting-edge technologies. Built with Next.js 15 for optimal performance, TypeScript for type safety, and Tailwind CSS for beautiful, responsive design. Features include dark/light theme switching, smooth animations, and a mobile-first approach.",
        technologies: ["Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui", "Drizzle ORM", "Postgresql"],
        status: "Complete",
        category: "Web Development",
        demoUrl: "https://jeanluc-portfolio.vercel.app",
        githubUrl: "https://github.com/JeanLucGaffud/JeanLuc-Portfolio",
        imageUrl: "/projects/portfolio-preview.png",
        thumbnailUrl: "/projects/portfolio-thumb.png",
        screenshots: [
            "/projects/portfolio-home.png",
            "/projects/portfolio-projects.png",
            "/projects/portfolio-about.png"
        ],
        featured: true,
        priority: 1,
        slug: "portfolio-website",
        tags: ["portfolio", "responsive", "modern", "typescript"],
        challenges: "Learning Next.js 15 App Router, implementing proper TypeScript types, and creating a cohesive design system with Tailwind CSS.",
        learnings: "Gained expertise in modern React patterns, server components, and building production-ready applications with proper SEO and performance optimization."
    };


    const insertedProject = await db.select().from(projectsTable)
    
    console.log('Successfully inserted project:', insertedProject[0]);
    

    const allProjects = await db.select().from(projectsTable);
    console.log('All projects in database:', allProjects);
}

main().catch(console.error);
