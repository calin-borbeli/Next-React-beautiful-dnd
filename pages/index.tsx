import React, { useState, memo } from "react";
import type { NextPage } from "next";
import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";
import initialData from "./api/initial-data";
import Column from "../components/Column";
import { IData } from "../components/Interfaces";

const Home: NextPage = () => {
	const [state, setState] = useState<IData>(initialData);

	const onDragEnd = (result: DropResult) => {
		document.body.style.color = "inherit";
		const { destination, source, draggableId, type } = result;

		if (!destination) {
			return;
		}

		if (
			destination.droppableId === source.droppableId &&
			destination.index === source.index
		) {
			return;
		}

		if (type === "column") {
			const newColumnOrder = Array.from(state.columnOrder);
			newColumnOrder.splice(source.index, 1);
			newColumnOrder.splice(destination.index, 0, draggableId);
			const newState = {
				...state,
				columnOrder: newColumnOrder,
			};
			setState(newState);
			return;
		}

		const startColumn = state.columns[source.droppableId];
		const finishColumn = state.columns[destination.droppableId];

		if (startColumn === finishColumn) {
			const newTaskIds = Array.from(startColumn.taskIds);
			newTaskIds.splice(source.index, 1);
			newTaskIds.splice(destination.index, 0, draggableId);

			const newColumn = {
				...startColumn,
				taskIds: newTaskIds,
			};

			const newState = {
				...state,
				columns: {
					...state.columns,
					[newColumn.id]: newColumn,
				},
			};

			setState(newState);
			return;
		}
		const newStartTaskIds = Array.from(startColumn.taskIds);
		newStartTaskIds.splice(source.index, 1);
		const newStartColumn = {
			...startColumn,
			taskIds: newStartTaskIds,
		};

		const newFinishTaskIds = Array.from(finishColumn.taskIds);
		newFinishTaskIds.splice(destination.index, 0, draggableId);
		const newFinishColumn = {
			...finishColumn,
			taskIds: newFinishTaskIds,
		};
		const newState = {
			...state,
			columns: {
				...state.columns,
				[newStartColumn.id]: newStartColumn,
				[newFinishColumn.id]: newFinishColumn,
			},
		};

		setState(newState);
	};

	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<React.StrictMode>
				<Droppable
					droppableId="all-columns"
					direction="horizontal"
					type="column"
				>
					{(droppableProvided) => (
						<div
							ref={droppableProvided.innerRef}
							{...droppableProvided.droppableProps}
							className="flex"
						>
							{state.columnOrder.map((columnId, index) => {
								const column = state.columns[columnId];
								const tasks = column.taskIds.map(
									(taskId) => state.tasks[taskId]
								);

								return (
									<Column
										key={column.id}
										column={column}
										tasks={tasks}
										index={index}
									/>
								);
							})}
							{droppableProvided.placeholder}
						</div>
					)}
				</Droppable>
			</React.StrictMode>
		</DragDropContext>
	);
};

export default memo(Home);
