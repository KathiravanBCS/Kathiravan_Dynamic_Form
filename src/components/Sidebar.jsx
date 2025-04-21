import { useState } from 'react';
import FieldSelector from './FieldSelector';
import FieldEditor from './FieldEditor';
import { fieldCategories } from '../constants/fieldTypes';
import { Tab, Nav, Card } from 'react-bootstrap';

const Sidebar = ({ fields, setFields, selectedField, setSelectedField }) => {
  const [activeCategory, setActiveCategory] = useState('basic');

  return (
    <div className="sidebar h-100 d-flex flex-column border-end">
      <Card className="sidebar-header">
        <Card.Header className="bg-primary text-white">
          <h5 className="mb-0">Form Fields</h5>
        </Card.Header>
      </Card>
      
      {/* Category Tabs */}
      <Tab.Container activeKey={activeCategory} onSelect={setActiveCategory}>
        <Nav variant="tabs" className="px-2 pt-2">
          {Object.keys(fieldCategories).map(category => (
            <Nav.Item key={category}>
              <Nav.Link 
                eventKey={category}
                className="py-2 px-3 text-center"
                style={{ fontSize: '0.75rem' }}
              >
                <div>{fieldCategories[category].icon || ''}</div>
                <div>{fieldCategories[category].label}</div>
              </Nav.Link>
            </Nav.Item>
          ))}
        </Nav>
        
        {/* Field Selector */}
        <Tab.Content className="flex-grow-1 overflow-auto p-2">
          {Object.keys(fieldCategories).map(category => (
            <Tab.Pane key={category} eventKey={category}>
              <FieldSelector 
                fieldTypes={fieldCategories[category].types} 
                fields={fields}
                setFields={setFields}
              />
            </Tab.Pane>
          ))}
        </Tab.Content>
      </Tab.Container>

      {/* Field Editor */}
      {selectedField && (
        <div className="border-top">
          <FieldEditor 
            field={selectedField} 
            setFields={setFields} 
            setSelectedField={setSelectedField}
          />
        </div>
      )}
    </div>
  );
};

export default Sidebar;