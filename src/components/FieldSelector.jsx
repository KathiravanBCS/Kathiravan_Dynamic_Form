import { useDrag } from 'react-dnd';
import { ItemTypes } from '../constants/itemTypes';
import { Badge } from 'react-bootstrap';

const FieldItem = ({ type, label, icon, subTypes }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.FIELD,
    item: { type, label, subTypes },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging()
    })
  }));

  return (
    <div 
      ref={drag}
      className="d-flex align-items-center p-2 mb-2 border rounded bg-light"
      style={{ cursor: 'move', opacity: isDragging ? 0.5 : 1 }}
    >
      <span className="me-2">{icon}</span>
      <span className="flex-grow-1">{label}</span>
      {subTypes && <Badge bg="secondary" className="ms-2">+{subTypes.length}</Badge>}
    </div>
  );
};

const FieldSelector = ({ fieldTypes }) => {
  return (
    <div className="p-2">
      {fieldTypes.map((fieldType) => (
        <FieldItem 
          key={fieldType.type} 
          type={fieldType.type} 
          label={fieldType.label} 
          icon={fieldType.icon}
          subTypes={fieldType.subTypes}
        />
      ))}
    </div>
  );
};

export default FieldSelector;