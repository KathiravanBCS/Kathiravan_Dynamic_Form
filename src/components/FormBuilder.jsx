import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useState } from 'react';
import Sidebar from './Sidebar';
import FormPreview from './FormPreview';
import { Container, Row, Col } from 'react-bootstrap';

const FormBuilder = ({ fields, setFields, formData, setFormData }) => {
  const [selectedField, setSelectedField] = useState(null);

  return (
    <DndProvider backend={HTML5Backend}>
      <Container fluid className="mt-3">
        <Row>
          <Col md={3} className="border-end">
            <Sidebar 
              fields={fields} 
              setFields={setFields} 
              selectedField={selectedField}
              setSelectedField={setSelectedField}
            />
          </Col>
          <Col md={9}>
            <FormPreview 
              fields={fields} 
              setFields={setFields} 
              formData={formData} 
              setFormData={setFormData}
              selectedField={selectedField}
              setSelectedField={setSelectedField}
            />
          </Col>
        </Row>
      </Container>
    </DndProvider>
  );
};

export default FormBuilder;