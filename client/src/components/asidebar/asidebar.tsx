import { useState } from "react";
import { Link } from "react-router-dom";
import { EllipsisIcon, Loader, LogOut } from "lucide-react";
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroupContent,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Logo from "@/components/logo";
import LogoutDialog from "./logout-dialog";
import { WorkspaceSwitcher } from "./workspace-switcher";
import { NavMain } from "./nav-main";
import { NavProjects } from "./nav-projects";
import NotificationBell from "../notifications/notification-bell";
import { Separator } from "../ui/separator";
import useWorkspaceId from "@/hooks/use-workspace-id";
import { useAuthContext } from "@/context/auth-provider";
import { ModeToggle } from "../mode-toggle";
import { SearchDialog } from "../workspace/search/search-dialog";

const Asidebar = () => {
  const { isLoading, user } = useAuthContext();

  const { open } = useSidebar();
  const workspaceId = useWorkspaceId();

  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Sidebar collapsible="icon" className="border-r border-sidebar-border bg-sidebar text-sidebar-foreground">
        <SidebarHeader className="!py-0 bg-sidebar text-sidebar-foreground">
          <div className="flex h-[50px] items-center justify-start w-full px-1">
            <Logo url={`/workspace/${workspaceId}`} />
            {open && (
              <Link
                to={`/workspace/${workspaceId}`}
                className="hidden md:flex ml-2 items-center gap-2 self-center font-medium"
              >
                ZOHO
              </Link>
            )}
            <div className="ml-auto flex items-center gap-1">
              <SearchDialog />
            </div>
          </div>
        </SidebarHeader>
        <SidebarContent className="!mt-0 bg-sidebar text-sidebar-foreground">
          <SidebarGroup className="!py-0">
            <SidebarGroupContent>
              <WorkspaceSwitcher />
              <Separator className="bg-sidebar-border" />
              <NavMain />
              <Separator className="bg-sidebar-border" />
              <NavProjects />
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter className="bg-sidebar text-sidebar-foreground p-2">
          <div className="flex items-center justify-between mb-2 px-2">
            <div className="flex items-center gap-1">
              <ModeToggle />
              <NotificationBell />
            </div>
          </div>
          <SidebarMenu>
            <SidebarMenuItem>
              {isLoading ? (
                <Loader
                  size="24px"
                  className="place-self-center self-center animate-spin"
                />
              ) : (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <SidebarMenuButton
                      size="lg"
                      className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                    >
                      <Avatar className="h-8 w-8 rounded-full">
                        <AvatarImage src={user?.profilePicture || ""} />
                        <AvatarFallback className="rounded-full border border-gray-500">
                          {user?.name?.split(" ")?.[0]?.charAt(0)}
                          {user?.name?.split(" ")?.[1]?.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="truncate font-semibold">
                          {user?.name}
                        </span>
                        <span className="truncate text-xs">{user?.email}</span>
                      </div>
                      <EllipsisIcon className="ml-auto size-4" />
                    </SidebarMenuButton>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                    side={"bottom"}
                    align="start"
                    sideOffset={4}
                  >
                    <DropdownMenuGroup></DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => setIsOpen(true)}>
                      <LogOut />
                      Log out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar >

      <LogoutDialog isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};

export default Asidebar;
