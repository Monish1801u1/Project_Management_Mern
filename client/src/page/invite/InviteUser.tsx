import { Loader } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import { BASE_ROUTE } from "@/routes/common/routePaths";
import useAuth from "@/hooks/api/use-auth";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { invitedUserJoinWorkspaceMutationFn, getWorkspaceByInviteCodeQueryFn } from "@/lib/api";
import { toast } from "@/hooks/use-toast";

const InviteUser = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const param = useParams();
  const inviteCode = param.inviteCode as string;

  const { data: authData, isPending: isAuthPending } = useAuth();
  const user = authData?.user;

  // Fetch workspace details by invite code
  const { data: workspaceData, isPending: isWorkspacePending } = useQuery({
    queryKey: ["workspace-invite", inviteCode],
    queryFn: () => getWorkspaceByInviteCodeQueryFn(inviteCode),
    enabled: !!inviteCode,
  });

  const { mutate, isPending: isJoining } = useMutation({
    mutationFn: invitedUserJoinWorkspaceMutationFn,
  });

  const returnUrl = encodeURIComponent(
    `${BASE_ROUTE.INVITE_URL.replace(":inviteCode", inviteCode)}`
  );

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    mutate(inviteCode, {
      onSuccess: (data) => {
        queryClient.invalidateQueries({
          queryKey: ["userWorkspaces"],
        });
        navigate(`/workspace/${data.workspaceId}`);
      },
      onError: (error) => {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      },
    });
  };

  const workspace = workspaceData?.workspace;
  const isLoading = isAuthPending || isWorkspacePending;

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-gradient-to-br from-indigo-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 p-6 md:p-10">
      <div className="flex w-full max-w-md flex-col gap-6">
        <Link
          to="/"
          className="flex items-center gap-2 self-center font-medium"
        >
          <Logo />
          ZOHO
        </Link>
        <div className="flex flex-col gap-6">
          <Card className="border-2 border-primary/10 shadow-lg">
            <CardHeader className="text-center">
              {isLoading ? (
                <div className="flex justify-center py-6">
                  <Loader className="w-10 h-10 animate-spin text-primary" />
                </div>
              ) : (
                <>
                  <CardTitle className="text-2xl font-bold text-primary">
                    {workspace?.name || "Workspace Invitation"}
                  </CardTitle>
                  <CardDescription className="text-base mt-2">
                    You have been invited to join <strong>{workspace?.name}</strong>
                    {workspace?.owner && (
                      <span> by <span className="text-foreground font-medium">{workspace.owner.name}</span></span>
                    )}
                  </CardDescription>
                  {workspace?.description && (
                    <p className="text-sm text-muted-foreground mt-2 italic">"{workspace.description}"</p>
                  )}
                </>
              )}
            </CardHeader>
            <CardContent>
              {!isLoading && (
                <div>
                  {user ? (
                    <div className="flex flex-col items-center justify-center gap-4">

                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                          {user.name?.charAt(0).toUpperCase()}
                        </div>
                        <div className="text-sm">
                          <p className="font-medium">Logged in as {user.email}</p>
                        </div>
                      </div>

                      <form onSubmit={handleSubmit} className="w-full">
                        <Button
                          type="submit"
                          disabled={isJoining}
                          className="w-full !bg-green-600 hover:!bg-green-700 !text-white text-lg h-12 shadow-md transition-all sm:text-lg"
                        >
                          {isJoining && (
                            <Loader className="mr-2 w-5 h-5 animate-spin" />
                          )}
                          Accept & Join Workspace
                        </Button>
                      </form>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-3">
                      <p className="text-center text-sm text-muted-foreground mb-2">
                        Log in or Sign up to accept this invitation.
                      </p>
                      <div className="flex flex-col md:flex-row items-center gap-2">
                        <Link
                          className="flex-1 w-full"
                          to={`/sign-up?returnUrl=${returnUrl}`}
                        >
                          <Button className="w-full h-11 text-base">Create Account</Button>
                        </Link>
                        <Link
                          className="flex-1 w-full"
                          to={`/?returnUrl=${returnUrl}`}
                        >
                          <Button variant="outline" className="w-full h-11 text-base border-primary/20">
                            Login
                          </Button>
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default InviteUser;
