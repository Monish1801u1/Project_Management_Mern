import "react-big-calendar/lib/css/react-big-calendar.css";
import React, { useState } from "react";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { enUS } from "date-fns/locale";
import { TaskType } from "@/types/api.type";
import useWorkspaceId from "@/hooks/use-workspace-id";
import { useQuery } from "@tanstack/react-query";
import { getAllTasksQueryFn } from "@/lib/api";
import {
       Dialog,
       DialogContent,
       DialogHeader,
       DialogTitle,
} from "@/components/ui/dialog";
import { TaskCard } from "./task-card";
import { Loader } from "lucide-react";

// Setup date-fns localizer
const locales = {
       "en-US": enUS,
};

const localizer = dateFnsLocalizer({
       format,
       parse,
       startOfWeek,
       getDay,
       locales,
});

interface TaskEvent {
       id: string;
       title: string;
       start: Date;
       end: Date;
       allDay?: boolean;
       resource?: TaskType;
}

const TaskCalendar = () => {
       const workspaceId = useWorkspaceId();

       const { data, isLoading } = useQuery({
              queryKey: ["all-tasks", workspaceId],
              queryFn: () => getAllTasksQueryFn({ workspaceId, pageSize: 100 }), // Fetch more tasks for calendar
       });

       const tasks = data?.tasks || [];

       const [selectedTask, setSelectedTask] = useState<TaskType | null>(null);

       // Transform Tasks to Events
       const events: TaskEvent[] = tasks
              .filter((task) => task.dueDate) // Only map tasks with due dates
              .map((task) => {
                     const date = new Date(task.dueDate);
                     return {
                            id: task._id,
                            title: task.title,
                            start: date,
                            end: date, // Assuming 1-day tasks for now, or use same date
                            allDay: true,
                            resource: task,
                     };
              });

       const handleSelectEvent = (event: TaskEvent) => {
              if (event.resource) {
                     setSelectedTask(event.resource);
              }
       };

       const eventStyleGetter = (event: TaskEvent) => {
              const priority = event.resource?.priority;
              let backgroundColor = "#3174ad";
              if (priority === "HIGH") backgroundColor = "#ef4444"; // Red
              if (priority === "MEDIUM") backgroundColor = "#f59e0b"; // Amber
              if (priority === "LOW") backgroundColor = "#10b981"; // Green
              if (priority === "URGENT") backgroundColor = "#7f1d1d"; // Dark Red

              return {
                     style: {
                            backgroundColor,
                            borderRadius: "4px",
                            opacity: 0.8,
                            color: "white",
                            border: "0px",
                            display: "block",
                     },
              };
       };

       if (isLoading) {
              return (
                     <div className="flex h-96 items-center justify-center">
                            <Loader className="h-8 w-8 animate-spin text-muted-foreground" />
                     </div>
              );
       }

       return (
              <div className="h-[calc(100vh-220px)] w-full bg-white dark:bg-zinc-950 p-4 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm">
                     <Calendar
                            localizer={localizer}
                            events={events}
                            startAccessor="start"
                            endAccessor="end"
                            style={{ height: "100%" }}
                            views={["month", "week", "day"]}
                            defaultView="month"
                            onSelectEvent={handleSelectEvent}
                            eventPropGetter={eventStyleGetter}
                            className="text-sm"
                     />

                     {/* View Task Details Dialog */}
                     <Dialog
                            open={!!selectedTask}
                            onOpenChange={(open) => !open && setSelectedTask(null)}
                     >
                            <DialogContent className="max-w-md border-0">
                                   <DialogHeader>
                                          <DialogTitle>{selectedTask?.title}</DialogTitle>
                                   </DialogHeader>
                                   {selectedTask && <TaskCard task={selectedTask} />}
                            </DialogContent>
                     </Dialog>
              </div>
       );
};

export default TaskCalendar;
