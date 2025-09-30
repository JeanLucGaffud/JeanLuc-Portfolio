"use server"

import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import {db} from "@/db/db";
import { commentsTable, projectsTable, user } from "@/db/schema";
import { eq, desc } from "drizzle-orm";

export interface CommentResult {
  success: boolean;
  error?: string;
}

export interface CommentWithUser {
  id: number;
  content: string;
  createdAt: Date;
  user: {
    name: string;
    email: string;
    image: string | null;
  };
}

export async function getCommentsForProject(projectSlug: string): Promise<CommentWithUser[]> {
  try {
    // First, find the project by slug to get the actual project ID
    const project = await db
      .select({ id: projectsTable.id })
      .from(projectsTable)
      .where(eq(projectsTable.slug, projectSlug))
      .limit(1);

    if (project.length === 0) {
      return [];
    }

    const projectId = project[0].id;

    // Get comments with user information
    const comments = await db
      .select({
        id: commentsTable.id,
        content: commentsTable.content,
        createdAt: commentsTable.createdAt,
        user: {
          name: user.name,
          email: user.email,
          image: user.image,
        },
      })
      .from(commentsTable)
      .innerJoin(user, eq(commentsTable.userId, user.id))
      .where(eq(commentsTable.projectId, projectId))
      .orderBy(desc(commentsTable.createdAt));

    return comments;
  } catch (error) {
    console.error("Failed to fetch comments:", error);
    return [];
  }
}

export async function submitComment(formData: FormData): Promise<void> {
  const comment = formData.get("comment") as string;
  const projectSlug = formData.get("projectSlug") as string;

  if (!comment || !comment.trim()) {
    throw new Error("Comment cannot be empty");
  }

  if (!projectSlug) {
    throw new Error("Project slug is required");
  }

  try {
    // Check if user is authenticated
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      throw new Error("You must be signed in to comment");
    }

    // First, find the project by slug to get the actual project ID
    const project = await db
      .select({ id: projectsTable.id })
      .from(projectsTable)
      .where(eq(projectsTable.slug, projectSlug))
      .limit(1);

    if (project.length === 0) {
      throw new Error("Project not found");
    }

    const projectId = project[0].id;

    console.log("Submitting comment:", {
      content: comment,
      projectSlug: projectSlug,
      projectId: projectId,
      userId: session.user.id,
      userEmail: session.user.email,
    });

    // Insert comment into database
    await db.insert(commentsTable).values({
      content: comment,
      projectId: projectId, // Now using the actual integer ID
      userId: session.user.id,
    });

    console.log("Comment submitted successfully");

  } catch (error) {
    console.error("Failed to submit comment:", error);
    throw error;
  }
}