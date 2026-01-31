import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "./ui/separator";
import { Link, useLocation } from "react-router-dom";
import useWorkspaceId from "@/hooks/use-workspace-id";

const Header = () => {
  const location = useLocation();
  const workspaceId = useWorkspaceId();

  const pathname = location.pathname;

  const getPageLabel = (pathname: string) => {
    if (pathname.includes("/project/")) return "Project";
    if (pathname.includes("/settings")) return "Settings";
    if (pathname.includes("/tasks")) return "Tasks";
    if (pathname.includes("/members")) return "Members";
    if (pathname.includes("/calendar")) return "Calendar";
    if (pathname.includes("/reports")) return "Reports";
    return null;
  };

  const pageHeading = getPageLabel(pathname);
  return (
    <header className="flex sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 h-14 shrink-0 items-center border-b px-4 gap-2">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="mr-2 h-4" />
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem className="hidden md:block text-sm font-medium">
            {pageHeading ? (
              <BreadcrumbLink asChild>
                <Link to={`/workspace/${workspaceId}`}>Dashboard</Link>
              </BreadcrumbLink>
            ) : (
              <BreadcrumbPage>
                Dashboard
              </BreadcrumbPage>
            )}
          </BreadcrumbItem>
          {pageHeading && (
            <>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem className="text-sm">
                <BreadcrumbPage>
                  {pageHeading}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </>
          )}
        </BreadcrumbList>
      </Breadcrumb>
    </header>
  );
};

export default Header;
