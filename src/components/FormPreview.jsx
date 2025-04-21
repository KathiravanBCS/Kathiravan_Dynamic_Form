import { useDrop } from 'react-dnd';
import FormField from './FormField';
import Section from './Section';
import { ItemTypes } from '../constants/itemTypes';
import { useFieldDrag, useFieldReorder } from '../hooks/useDragAndDrop';
import { Card } from 'react-bootstrap';

const FormPreview = ({ 
  fields, 
  setFields, 
  formData, 
  setFormData, 
  selectedField, 
  setSelectedField 
}) => {
  const { moveField } = useFieldReorder(fields, setFields);
  
  const [, drop] = useDrop(() => ({
    accept: ItemTypes.FIELD,
    drop: (item) => {
      if (item.index === undefined) { // New field from sidebar
        const newField = createNewField(item);
        setFields(prev => [...prev, newField]);
      }
    },
  }));

  const createNewField = (item) => {
    const baseField = {
      id: `field-${Date.now()}`,
      type: item.type,
      label: item.label || `${item.type} Field`,
      placeholder: '',
      required: false,
    };

    // Special cases for different field types
    switch (item.type) {
      case 'Dropdown':
      case 'Radio':
      case 'MultipleChoice':
        return { ...baseField, options: ['Option 1', 'Option 2'] };
      case 'Rating':
        return { ...baseField, max: 5 };
      case 'Slider':
        return { ...baseField, min: 0, max: 100, step: 1 };
      case 'Section':
        return { ...baseField, children: [] };
      case 'Terms':
        return { ...baseField, description: 'By checking this box, you agree to our terms and conditions.' };
      default:
        return baseField;
    }
  };

  const handleChange = (fieldId, value) => {
    setFormData(prev => ({
      ...prev,
      [fieldId]: { ...prev[fieldId], value, error: '' }
    }));
  };

  const handleFieldClick = (field, e) => {
    e.stopPropagation();
    setSelectedField(field);
  };

  return (
    <div ref={drop}>
      <Card>
        <Card.Header>
          <h3>Form Preview</h3>
        </Card.Header>
        <Card.Body>
          {fields.length === 0 ? (
            <div className="text-center p-5 border rounded bg-light">
              Drag fields here to build your form
            </div>
          ) : (
            <div className="form-container">
              {fields.map((field, index) => {
                if (field.type === 'Section') {
                  return (
                    <Section
                      key={field.id}
                      section={field}
                      formData={formData}
                      handleChange={handleChange}
                      onClick={handleFieldClick}
                      isSelected={selectedField?.id === field.id}
                      index={index}
                      moveField={moveField}
                      setFields={setFields}
                    />
                  );
                } else {
                  return (
                    <DraggableField
                      key={field.id}
                      field={field}
                      index={index}
                      moveField={moveField}
                      formData={formData}
                      handleChange={handleChange}
                      isSelected={selectedField?.id === field.id}
                      onClick={handleFieldClick}
                    />
                  );
                }
              })}
            </div>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

const DraggableField = ({ field, index, moveField, ...props }) => {
  const { drag, drop, isDragging } = useFieldDrag(field, index, moveField);
  
  return (
    <div
      ref={(node) => drag(drop(node))}
      className={`mb-3 ${props.isSelected ? 'border border-primary rounded p-2' : ''}`}
      style={{ opacity: isDragging ? 0.5 : 1, cursor: 'move' }}
      onClick={(e) => props.onClick(field, e)}
    >
      <FormField {...props} field={field} />
    </div>
  );
};

export default FormPreview;