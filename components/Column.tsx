import { memo } from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import TaskList from "./TaskList";
import { ITask } from "./Interfaces";
import { IColumn } from "./Interfaces";

interface Props {
	column: IColumn;
	tasks: ITask[];
	index: number;
}
const Column = ({ column, tasks, index }: Props) => {
	return (
		<Draggable draggableId={column.id} index={index}>
			{(draggableProvided, draggableSnapshot) => (
				<div
					{...draggableProvided.draggableProps}
					ref={draggableProvided.innerRef}
					className={`flex flex-col w-[250px] m-2 border rounded ${
						draggableSnapshot.isDragging ? "bg-sky-50" : "bg-white"
					}`}
				>
					<div {...draggableProvided.dragHandleProps} className="p-2 text-2xl">
						{column.title}
					</div>
					<Droppable droppableId={column.id} type="task">
						{(droppableProvided, droppableSnapshot) => (
							<div
								ref={droppableProvided.innerRef}
								{...droppableProvided.droppableProps}
								className={`grow min-h-[100px] p-2 ${
									droppableSnapshot.isDraggingOver ? "bg-orange-50" : "bg-white"
								}`}
							>
								<TaskList tasks={tasks} />

								{droppableProvided.placeholder}
							</div>
						)}
					</Droppable>
				</div>
			)}
		</Draggable>
	);
};
export default memo(Column);
