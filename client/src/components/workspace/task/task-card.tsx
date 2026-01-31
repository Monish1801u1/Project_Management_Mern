import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { TaskType } from "@/types/api.type";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Calendar, User, Edit } from "lucide-react";
import { format } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getAvatarColor, getAvatarFallbackText } from "@/lib/helper";
import { TaskPriorityEnum } from "@/constant";

interface TaskCardProps {
       task: TaskType;
       onEdit?: (task: TaskType) => void;
}

export function TaskCardView({
       task,
       isDragging,
       listeners,
       attributes,
       setNodeRef,
       style,
       onEdit,
}: {
       task: TaskType;
       isDragging?: boolean;
       listeners?: any;
       attributes?: any;
       setNodeRef?: (node: HTMLElement | null) => void;
       style?: any;
       onEdit?: (task: TaskType) => void;
}) {
       if (isDragging) {
              return (
                     <div
                            ref={setNodeRef}
                            style={style}
                            className="opacity-30 bg-primary/20 h-[200px] rounded-lg border-2 border-primary border-dashed"
                     />
              );
       }

       const priorityColor =
              task.priority === TaskPriorityEnum.HIGH
                     ? "bg-red-500/10 text-red-500 hover:bg-red-500/20"
                     : task.priority === TaskPriorityEnum.MEDIUM
                            ? "bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20"
                            : "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20";

       // Assignee Details
       const assigneeName = task.assignedTo?.name || "Unassigned";
       const assigneeInitials = getAvatarFallbackText(assigneeName);
       const assigneeColor = getAvatarColor(assigneeName);

       return (
              <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
                     <Card
                            onClick={() => onEdit?.(task)}
                            className="cursor-pointer active:cursor-grabbing hover:shadow-md transition-shadow dark:bg-[#1a1c1e] group relative"
                     >
                            <CardHeader className="p-4 pb-2 space-y-2">
                                   <div className="flex justify-between items-start">
                                          <span className="text-xs font-mono text-muted-foreground">
                                                 {task.taskCode}
                                          </span>
                                          <div className="flex gap-2 items-center">
                                                 {onEdit && (
                                                        <Button
                                                               variant="ghost"
                                                               size="icon"
                                                               className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                                                               onClick={(e) => {
                                                                      e.stopPropagation(); // Prevent drag start
                                                                      onEdit(task);
                                                               }}
                                                               onPointerDown={(e) => e.stopPropagation()} // Prevent drag start on click
                                                        >
                                                               <Edit className="h-3 w-3" />
                                                        </Button>
                                                 )}
                                                 <Badge className={priorityColor} variant="outline">
                                                        {task.priority}
                                                 </Badge>
                                          </div>
                                   </div>
                                   <h4 className="font-semibold leading-none truncate" title={task.title}>
                                          {task.title}
                                   </h4>
                            </CardHeader>
                            <CardContent className="p-4 py-2">
                                   {task.description && (
                                          <p className="text-sm text-muted-foreground line-clamp-2 min-h-[2.5rem]">
                                                 {task.description}
                                          </p>
                                   )}
                            </CardContent>
                            <Separator className="my-1" />
                            <CardFooter className="p-3 pt-2 flex justify-between items-center text-xs text-muted-foreground">
                                   <div className="flex items-center gap-2">
                                          {task.assignedTo ? (
                                                 <div className="flex items-center gap-1.5" title={assigneeName}>
                                                        <Avatar className="h-6 w-6">
                                                               <AvatarImage
                                                                      src={task.assignedTo.profilePicture || ""}
                                                                      alt={assigneeName}
                                                               />
                                                               <AvatarFallback
                                                                      className={`text-[9px] ${assigneeColor}`}
                                                               >
                                                                      {assigneeInitials}
                                                               </AvatarFallback>
                                                        </Avatar>
                                                        <span className="max-w-[80px] truncate">{assigneeName}</span>
                                                 </div>
                                          ) : (
                                                 <div className="flex items-center gap-1">
                                                        <User className="w-4 h-4" />
                                                        <span>Unassigned</span>
                                                 </div>
                                          )}
                                   </div>

                                   {task.dueDate && (
                                          <div className="flex items-center gap-1" title="Due Date">
                                                 <Calendar className="w-3.5 h-3.5" />
                                                 <span>
                                                        {(() => {
                                                               try {
                                                                      return format(new Date(task.dueDate), "MMM d");
                                                               } catch (_) {
                                                                      return "No Date";
                                                               }
                                                        })()}
                                                 </span>
                                          </div>
                                   )}
                            </CardFooter>
                     </Card>
              </div>
       );
}

export function TaskCard({ task, onEdit }: TaskCardProps) {
       const {
              setNodeRef,
              attributes,
              listeners,
              transform,
              transition,
              isDragging,
       } = useSortable({ id: task._id, data: { type: "Task", task } });

       const style = {
              transition,
              transform: CSS.Transform.toString(transform),
       };

       return (
              <TaskCardView
                     task={task}
                     onEdit={onEdit}
                     setNodeRef={setNodeRef}
                     attributes={attributes}
                     listeners={listeners}
                     transform={transform}
                     transition={transition}
                     isDragging={isDragging}
                     style={style}
              />
       );
}
