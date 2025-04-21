import { useDrag, useDrop } from 'react-dnd';

export const useDragAndDrop = (itemType, item, onDrop, canDrag = true) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: itemType,
    item,
    canDrag: () => canDrag,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const [{ isOver }, drop] = useDrop(() => ({
    accept: itemType,
    drop: (droppedItem, monitor) => {
      if (onDrop) {
        onDrop(droppedItem, monitor);
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return { drag, drop, isDragging, isOver };
};

export const useFieldDrag = (field, index, moveField) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'FORM_FIELD',
    item: { type: 'FORM_FIELD', id: field.id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const [, drop] = useDrop(() => ({
    accept: 'FORM_FIELD',
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveField(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  }));

  return { drag, drop, isDragging };
};

export const useFieldReorder = (fields, setFields) => {
  const moveField = (fromIndex, toIndex) => {
    const newFields = [...fields];
    const [movedField] = newFields.splice(fromIndex, 1);
    newFields.splice(toIndex, 0, movedField);
    setFields(newFields);
  };

  return { moveField };
};