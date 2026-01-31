import { useState, useCallback, useEffect } from "react";
import {
       DndContext,
       closestCorners,
       KeyboardSensor,
       PointerSensor,
       useSensor,
       useSensors,
       DragOverlay,
       DragStartEvent,
       DragOverEvent,
       DragEndEvent,
       defaultDropAnimationSideEffects,
       DropAnimation,
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { TaskType } from "@/types/api.type";
import { TaskStatusEnum, TaskStatusEnumType } from "@/constant";
import { TaskColumn } from "./task-column";
import { TaskCard, TaskCardView } from "./task-card";
import EditTaskDialog from "./edit-task-dialog";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useWorkspaceId from "@/hooks/use-workspace-id";
import { editTaskMutationFn, getAllTasksQueryFn } from "@/lib/api";
import { toast } from "@/hooks/use-toast";
import useTaskTableFilter from "@/hooks/use-task-table-filter";
import { Loader } from "lucide-react";
import { useParams } from "react-router-dom";

// Columns configuration
const columns: { id: TaskStatusEnumType; title: string }[] = [
       { id: TaskStatusEnum.TODO, title: "Todo" },
       { id: TaskStatusEnum.IN_PROGRESS, title: "In Progress" },
       { id: TaskStatusEnum.IN_REVIEW, title: "In Review" },
       { id: TaskStatusEnum.DONE, title: "Done" },
       { id: TaskStatusEnum.BACKLOG, title: "Backlog" },
];

const dropAnimation: DropAnimation = {
       sideEffects: defaultDropAnimationSideEffects({
              styles: {
                     active: {
                            opacity: "0.5",
                     },
              },
       }),
};



export default function TaskBoard() {
       // ... existing state ...
       const [editingTask, setEditingTask] = useState<TaskType | null>(null);
       const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

       const onEditTask = (task: TaskType) => {
              setEditingTask(task);
              setIsEditDialogOpen(true);
       };

       const workspaceId = useWorkspaceId();

       // ... existing hooks ...


       const param = useParams();
       const projectIdParam = param.projectId as string;
       const [filters] = useTaskTableFilter();

       // We fetch tasks similarly to the table to ensure consistency
       // Ideally, we'd share this data via context or react-query cache, which we are doing.
       const { data, isLoading } = useQuery({
              queryKey: [
                     "all-tasks",
                     workspaceId,
                     100, // Page size - fetching more for board
                     1, // Page number
                     filters,
                     projectIdParam,  // Dependency on filters
              ],
              queryFn: () =>
                     getAllTasksQueryFn({
                            workspaceId,
                            keyword: filters.keyword,
                            priority: filters.priority,
                            status: filters.status,
                            projectId: projectIdParam || filters.projectId,
                            assignedTo: filters.assigneeId,
                            pageNumber: 1,
                            pageSize: 100, // Fetch up to 100 tasks for the board for now
                     }),
       });

       const [tasks, setTasks] = useState<TaskType[]>([]);
       const [activeTask, setActiveTask] = useState<TaskType | null>(null);

       useEffect(() => {
              if (data?.tasks) {
                     setTasks(data.tasks);
              }
       }, [data]);

       const { mutate: moveTask } = useMutation({
              mutationFn: editTaskMutationFn,
              onSuccess: () => {
                     queryClient.invalidateQueries({ queryKey: ["all-tasks"] });
                     queryClient.invalidateQueries({ queryKey: ["workspace-analytics"] });
                     toast({
                            title: "Task Updated",
                            description: "Task status updated successfully.",
                     });
              },
              onError: (error) => {
                     toast({
                            title: "Error",
                            description: error.message,
                            variant: "destructive",
                     });
                     // Revert optimistic update (simple refetch for now)
                     queryClient.invalidateQueries({ queryKey: ["all-tasks"] });
              }
       });

       const sensors = useSensors(
              useSensor(PointerSensor, {
                     activationConstraint: {
                            distance: 8, // 8px movement required to start drag
                     }
              }),
              useSensor(KeyboardSensor, {
                     coordinateGetter: sortableKeyboardCoordinates,
              })
       );

       const onDragStart = (event: DragStartEvent) => {
              if (event.active.data.current?.type === "Task") {
                     setActiveTask(event.active.data.current.task);
              }
       };

       const onDragOver = (event: DragOverEvent) => {
              const { active, over } = event;
              if (!over) return;

              const activeId = active.id;
              const overId = over.id;

              if (activeId === overId) return;

              // We only handle immediate visual feedback in drag over if needed
              // For Kanban moving between columns, we might rely on DragEnd or implement
              // custom visual logic if we want real-time preview of the card in the new column.
              // For simplicity with dnd-kit sortable, we can just use DragEnd for logical updates
              // if we don't need precise reordering *within* the column in real-time in this MVP.
       };

       const onDragEnd = (event: DragEndEvent) => {
              setActiveTask(null);
              const { active, over } = event;

              if (!over) return;

              const activeId = active.id as string;
              const overId = over.id as string;

              const activeTask = tasks.find((t) => t._id === activeId);

              // Find dropping column
              // The over.id could be a "Task ID" (if dropped on another task) OR a "Column ID" (if dropped on empty column)
              let newStatus: TaskStatusEnumType | null = null;

              // Check if over is a column
              const overColumn = columns.find(c => c.id === overId);
              if (overColumn) {
                     newStatus = overColumn.id;
              } else {
                     // Dropped on another task, find that task's status
                     const overTask = tasks.find(t => t._id === overId);
                     if (overTask) {
                            newStatus = overTask.status;
                     }
              }

              if (activeTask && newStatus && activeTask.status !== newStatus) {
                     // Optimistic UI Update
                     const updatedTasks = tasks.map(t =>
                            t._id === activeId ? { ...t, status: newStatus as TaskStatusEnumType } : t
                     );
                     setTasks(updatedTasks);

                     // API Call
                     if (activeTask.project?._id) {
                            moveTask({
                                   taskId: activeId,
                                   workspaceId,
                                   projectId: activeTask.project._id,
                                   data: { status: newStatus },
                            });
                     } else {
                            toast({
                                   title: "Warning",
                                   description: "Task has no project associated. Cannot update status.",
                                   variant: "destructive"
                            });
                            // Revert
                            queryClient.invalidateQueries({ queryKey: ["all-tasks"] });
                     }
              }
       };


       if (isLoading) {
              return (
                     <div className="flex h-96 items-center justify-center">
                            <Loader className="w-10 h-10 animate-spin text-primary" />
                     </div>
              );
       }

       return (
              <DndContext
                     sensors={sensors}
                     collisionDetection={closestCorners}
                     onDragStart={onDragStart}
                     onDragOver={onDragOver}
                     onDragEnd={onDragEnd}
              >
                     <div className="flex h-full gap-4 overflow-x-auto pb-4">
                            {columns.map((col) => (
                                   <TaskColumn
                                          key={col.id}
                                          column={col}
                                          tasks={tasks.filter((task) => task.status === col.id)}
                                   />
                            ))}
                     </div>

                     <DragOverlay dropAnimation={dropAnimation}>
                            {activeTask ? <TaskCardView task={activeTask} /> : null}
                     </DragOverlay>
                     <EditTaskDialog
                            isOpen={isEditDialogOpen}
                            onClose={() => setIsEditDialogOpen(false)}
                            task={editingTask}
                     />
              </DndContext>
       );
}
