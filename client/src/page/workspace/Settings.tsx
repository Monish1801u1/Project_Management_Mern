import { Separator } from "@/components/ui/separator";
import WorkspaceHeader from "@/components/workspace/common/workspace-header";
import EditWorkspaceForm from "@/components/workspace/edit-workspace-form";
import DeleteWorkspaceCard from "@/components/workspace/settings/delete-workspace-card";
import LeaveWorkspaceCard from "@/components/workspace/settings/leave-workspace-card";
import { Permissions } from "@/constant";
import withPermission from "@/hoc/with-permission";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";

const Settings = () => {
  return (
    <div className="w-full h-auto py-2">
      <WorkspaceHeader />
      <Separator className="my-4 " />
      <main>
        <div className="w-full max-w-4xl mx-auto py-3">
          <h2 className="text-[24px] leading-[30px] font-bold mb-6 tracking-tight">
            Workspace Settings
          </h2>

          <Tabs defaultValue="general" className="w-full">
            <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent mb-6">
              <TabsTrigger
                value="general"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 pb-3 pt-2"
              >
                General
              </TabsTrigger>
              <TabsTrigger
                value="notifications"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 pb-3 pt-2"
              >
                Notifications
              </TabsTrigger>
              <TabsTrigger
                value="security"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 pb-3 pt-2"
              >
                Security
              </TabsTrigger>
              <TabsTrigger
                value="members"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 pb-3 pt-2"
              >
                Members
              </TabsTrigger>
            </TabsList>

            <TabsContent value="general" className="space-y-6">
              <div className="grid gap-6">
                <EditWorkspaceForm />
                <Separator />
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-destructive">Danger Zone</h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    <LeaveWorkspaceCard />
                    <DeleteWorkspaceCard />
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="notifications">
              <div className="p-6 border rounded-lg bg-card/50 glass-card">
                <h3 className="text-lg font-medium mb-4">Email Notifications</h3>
                <div className="space-y-4">
                  {[
                    "New Task Assigned",
                    "Project Deadline Approaching",
                    "Weekly Digest",
                    "Mentions in Comments"
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between py-2">
                      <span className="text-sm font-medium">{item}</span>
                      <Switch defaultChecked={i < 2} />
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="security">
              <div className="p-6 border rounded-lg bg-card/50 glass-card">
                <h3 className="text-lg font-medium mb-2">Two-Factor Authentication</h3>
                <p className="text-sm text-muted-foreground mb-4">Add an extra layer of security to your account.</p>
                <Button variant="outline" disabled>Enable 2FA (Coming Soon)</Button>
              </div>
            </TabsContent>

            <TabsContent value="members">
              <div className="p-6 border rounded-lg bg-card/50 glass-card flex flex-col items-center justify-center text-center py-12">
                <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium">Manage Team</h3>
                <p className="text-sm text-muted-foreground max-w-sm mb-4">
                  Invite new members and manage roles from the centralized member dashboard.
                </p>
                <Button variant="default">Go to Members Page</Button>
              </div>
            </TabsContent>

          </Tabs>
        </div>
      </main>
    </div>
  );
};

const SettingsWithPermission = withPermission(
  Settings,
  Permissions.MANAGE_WORKSPACE_SETTINGS
);

export default SettingsWithPermission;
