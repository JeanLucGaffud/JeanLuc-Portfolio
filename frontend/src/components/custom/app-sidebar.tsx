"use client"

import * as React from "react"
import Image from "next/image"
import { ArchiveX, Command, File, Inbox, Send, Trash2 } from "lucide-react"

import { NavUser } from "@/components/custom/nav-user"
import { Label } from "@/components/ui/label"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarInput,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { Switch } from "@/components/ui/switch"
import { useParams, usePathname } from "next/navigation"

import {signIn, useSession } from "@/lib/auth-client"
import { submitComment, getCommentsForProject, type CommentWithUser } from "@/server/comments"

// This is sample data
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Comments",
      url: "#",
      icon: Inbox,
      isActive: true,
    },
    
  ],
  mails: [
    {
      name: "William Smith",
      email: "williamsmith@example.com",
      subject: "Meeting Tomorrow",
      date: "09:34 AM",
      teaser:
        "Hi team, just a reminder about our meeting tomorrow at 10 AM.\nPlease come prepared with your project updates.",
    },
    
  ],
}

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  comments?: CommentWithUser[];
}

export function AppSidebar({ comments = [], ...props }: AppSidebarProps) {
  // Note: I'm using state to show active item.
  // IRL you should use the url/router.
  const [activeItem, setActiveItem] = React.useState(data.navMain[0])
  const [mails, setMails] = React.useState(data.mails)
  const { setOpen } = useSidebar()

  const session = useSession()
  const tempUser = session.data ? { name: session.data.user.name, email: session.data.user.email, avatar: session.data.user.image || "/avatars/guest.jpg" } : { name: "Guest", email: "", avatar: "/avatars/guest.jpg" }
  
  return (
    <Sidebar
      collapsible="icon"
      className="overflow-hidden *:data-[sidebar=sidebar]:flex-row w-150"
      {...props}
      side = "right"
    >
      
      {/* This is the first sidebar */}
      {/* We disable collapsible and adjust width to icon. */}
      {/* This will make the sidebar appear as icons. */}
      <Sidebar
        collapsible="none"
        className="w-[calc(var(--sidebar-width-icon)+1px)]! border-l "
        side = "right"
      >
        {/* <SidebarHeader>
          
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" asChild className="md:h-8 md:p-0">
                <a href="#">
                  <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                    <Command className="size-4" />
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">Acme Inc</span>
                    <span className="truncate text-xs">Enterprise</span>
                  </div>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader> */}
        <SidebarContent>
          
          <SidebarGroup className="mt-1.5 ">
            <SidebarGroupContent className="px-1.5 md:px-0">
              <SidebarMenu>
                {data.navMain.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      tooltip={{
                        children: item.title,
                        hidden: false,
                      }}
                      onClick={() => {
                        setActiveItem(item)
                        const mail = data.mails.sort(() => Math.random() - 0.5)
                        setMails(
                          mail.slice(
                            0,
                            Math.max(5, Math.floor(Math.random() * 10) + 1)
                          )
                        )
                        setOpen(true)
                      }}
                      isActive={activeItem?.title === item.title}
                      className="px-2.5 md:px-2"
                    >
                      <item.icon />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
                
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <NavUser user={tempUser} />
        </SidebarFooter>
        
      </Sidebar>


      {/* This is the second sidebar */}{/* This is the second sidebar */}
      {/* We disable collapsible and let it fill remaining space */}
      <Sidebar collapsible="none" className="hidden flex-1 md:flex" side = "right">
        <SidebarHeader className="gap-3.5 border-b p-4">
          <div className="flex w-full items-center justify-between">
            <div className="text-foreground text-base font-medium">
              {activeItem?.title}
            </div>
            {/* <Label className="flex items-center gap-2 text-sm">
              <span>Unreads</span>
              <Switch className="shadow-none" />
            </Label> */}
          </div>
        </SidebarHeader>
        <CommentsSection initialComments={comments} />
      </Sidebar>
      
    </Sidebar>
  )
}

// Comments Section Component that combines display and input
function CommentsSection({ initialComments = [] }: { initialComments?: CommentWithUser[] }) {
  const params = useParams()
  const projectSlug = params?.projectID as string
  const [comments, setComments] = React.useState<CommentWithUser[]>(initialComments)
  const [loading, setLoading] = React.useState(false)

  const fetchComments = React.useCallback(async () => {
    if (!projectSlug) return
    
    setLoading(true)
    try {
      const fetchedComments = await getCommentsForProject(projectSlug)
      setComments(fetchedComments)
    } catch (error) {
      console.error("Failed to fetch comments:", error)
    } finally {
      setLoading(false)
    }
  }, [projectSlug])

  // Only fetch if we don't have initial comments
  React.useEffect(() => {
    if (initialComments.length === 0) {
      fetchComments()
    }
  }, [fetchComments, initialComments.length])

  const handleCommentSubmitted = () => {
    fetchComments() // Refresh comments after submission
  }

  return (
    <>
      <SidebarContent>
        <SidebarGroup className="px-0">
          <SidebarGroupContent>
            {loading ? (
              <div className="p-4 text-center">
                <span className="text-xs text-muted-foreground">Loading comments...</span>
              </div>
            ) : comments.length === 0 ? (
              <div className="p-4 text-center">
                <span className="text-xs text-muted-foreground">No comments yet. Be the first to comment!</span>
              </div>
            ) : (
              comments.map((comment) => (
                <div
                  key={comment.id}
                  className="flex flex-col items-start gap-2 border-b p-4 text-sm leading-tight last:border-b-0"
                >
                  <div className="flex w-full items-center gap-2">
                    <div className="flex items-center gap-2">
                      {comment.user.image && (
                        <Image
                          src={comment.user.image}
                          alt={comment.user.name}
                          width={24}
                          height={24}
                          className="w-6 h-6 rounded-full"
                        />
                      )}
                      <span className="font-medium">{comment.user.name}</span>
                    </div>
                    <span className="ml-auto text-xs text-muted-foreground">
                      {new Date(comment.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="w-full text-xs whitespace-break-spaces">
                    {comment.content}
                  </div>
                </div>
              ))
            )}
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t p-4">
        <CommentInput onCommentSubmitted={handleCommentSubmitted} /> 
      </SidebarFooter>
    </>
  )
}

// Comment Input Component
function CommentInput({ onCommentSubmitted }: { onCommentSubmitted?: () => void }) {
  const session = useSession()
  const params = useParams()
  const projectSlug = params?.projectID as string

  async function handleSubmit(formData: FormData) {
    try {
      await submitComment(formData)
      onCommentSubmitted?.()
    } catch (error) {
      console.error("Failed to submit comment:", error)
    }
  }

  if (!session.data?.user) {
    return (
      <div className="text-center p-2">
        <p className="text-xs text-muted-foreground mb-2">Sign in to comment</p>
        <button 
          onClick={() => signIn()}
          className="text-xs text-primary hover:underline"
        >
          Sign in
        </button>
      </div>
    )
  }

  return (
    <form action={handleSubmit} className="flex gap-2">
      <input type="hidden" name="projectSlug" value={projectSlug || ""} />
      <SidebarInput 
        name="comment"
        placeholder="Type comment..." 
        required
        className="flex-1"
      />
      <button
        type="submit"
        className="px-2 py-1 text-xs bg-primary text-primary-foreground rounded hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Send className="h-3 w-3" />
      </button>
    </form>
  )
}
