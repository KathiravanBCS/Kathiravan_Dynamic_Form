import { useState } from 'react';
import FormField from './FormField';
import FieldSelector from './FieldSelector';
import { fieldCategories } from '../constants/fieldTypes';
import { Button, Form, Card } from 'react-bootstrap';

const Section = ({ 
  section, 
  formData, 
  handleChange, 
  onClick,
  isSelected,
  index,
  moveField,
  setFields
}) => {
  const [selectedType, setSelectedType] = useState('Text');
  const [activeCategory, setActiveCategory] = useState('basic');
  
  const updateSectionFields = (sectionId, newField) => {
    setFields(prev => prev.map(field => {
      if (field.id === sectionId) {
        return {
          ...field,
          children: [...(field.children || []), newField]
        };
      }
      return field;
    }));
  };

  const handleFieldClick = (field, e) => {
    e.stopPropagation();
    onClick(field);
  };

  return (
    <Card 
      className={`mb-3 ${isSelected ? 'border-primary' : ''}`}
      onClick={(e) => onClick(section, e)}
    >
      <Card.Header>
        <h5>{section.label}</h5>
        {section.description && <p className="text-muted mb-0">{section.description}</p>}
      </Card.Header>
      <Card.Body>
        {section.children?.map((child, childIndex) => {
          if (child.condition) {
            const dependentValue = formData[child.condition.dependsOn]?.value;
            if (dependentValue !== child.condition.value) {
              return null;
            }
          }

          if (child.type === 'Section') {
            return (
              <Section
                key={child.id}
                section={child}
                formData={formData}
                handleChange={handleChange}
                onClick={handleFieldClick}
                isSelected={isSelected && selectedField?.id === child.id}
                index={childIndex}
                moveField={moveField}
                setFields={setFields}
              />
            );
          } else {
            return (
              <div 
                key={child.id} 
                className={`mb-3 ${isSelected && selectedField?.id === child.id ? 'border border-primary rounded p-2' : ''}`}
                onClick={(e) => handleFieldClick(child, e)}
              >
                <FormField
                  field={child}
                  value={formData[child.id]?.value}
                  error={formData[child.id]?.error}
                  onChange={handleChange}
                />
              </div>
            );
          }
        })}

        <Card className="mt-3">
          <Card.Header>
            <h6>Add Field to Section</h6>
          </Card.Header>
          <Card.Body>
            <div className="mb-3">
              <div className="d-flex flex-wrap gap-2 mb-2">
                {Object.keys(fieldCategories).map(category => (
                  <Button
                    key={category}
                    variant={activeCategory === category ? 'primary' : 'outline-secondary'}
                    size="sm"
                    onClick={() => setActiveCategory(category)}
                  >
                    {fieldCategories[category].label}
                  </Button>
                ))}
              </div>

              <Form.Select 
                value={selectedType} 
                onChange={(e) => setSelectedType(e.target.value)}
                className="mb-2"
              >
                {fieldCategories[activeCategory].types.map(type => (
                  <option key={type.type} value={type.type}>{type.label}</option>
                ))}
              </Form.Select>
            </div>
            <Button 
              variant="outline-primary" 
              size="sm"
              onClick={() => {
                const newField = {
                  id: `field-${Date.now()}`,
                  type: selectedType,
                  label: `${selectedType} Field`,
                  placeholder: '',
                  required: false,
                  options: (selectedType === 'Dropdown' || selectedType === 'Radio' || selectedType === 'MultipleChoice') 
                    ? ['Option 1', 'Option 2'] 
                    : undefined,
                };
                updateSectionFields(section.id, newField);
              }}
            >
              Add Field
            </Button>
          </Card.Body>
        </Card>
      </Card.Body>
    </Card>
  );
};

export default Section;