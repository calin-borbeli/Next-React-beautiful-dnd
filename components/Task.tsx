import { memo } from "react";
import { Draggable } from "react-beautiful-dnd";
import { ITask } from "./Interfaces";

interface Props {
	task: ITask;
	index: number;
}
const Task = ({ task, index }: Props) => {
	return (
		<Draggable draggableId={task.id} index={index}>
			{(draggableProvided, draggableSnapshot) => (
				<div
					{...draggableProvided.draggableProps}
					{...draggableProvided.dragHandleProps}
					ref={draggableProvided.innerRef}
					className={`flex p-2 mb-2 border rounded ${
						draggableSnapshot.isDragging ? "bg-emerald-50" : "bg-white"
					} `}
				>
					{task.content}
				</div>
			)}
		</Draggable>
	);
};
export default memo(Task);
