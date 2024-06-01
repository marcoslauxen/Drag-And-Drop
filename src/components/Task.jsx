import PropTypes from "prop-types";
import { Draggable } from "@hello-pangea/dnd";

export function Task({ task, index }) {
  return (
    <Draggable draggableId={task.id.toString()} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className="bg-gray-100 p-4 rounded-lg mb-4 shadow-sm transition transform hover:scale-105 hover:shadow-md"
        >
          <p className="text-gray-800">{task.name}</p>
        </div>
      )}
    </Draggable>
  );
}

Task.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
};
