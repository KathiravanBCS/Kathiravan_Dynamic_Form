import { useState, useEffect } from 'react';
import { Form, Button, Row, Col, InputGroup, Card } from 'react-bootstrap';

const FieldEditor = ({ field, setFields, setSelectedField }) => {
  const [editedField, setEditedField] = useState(field);

  useEffect(() => {
    setEditedField(field);
  }, [field]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedField(prev => ({ ...prev, [name]: value }));
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...editedField.options];
    newOptions[index] = value;
    setEditedField(prev => ({ ...prev, options: newOptions }));
  };

  const addOption = () => {
    setEditedField(prev => ({
      ...prev,
      options: [...(prev.options || []), `Option ${(prev.options?.length || 0) + 1}`]
    }));
  };

  const removeOption = (index) => {
    const newOptions = [...editedField.options];
    newOptions.splice(index, 1);
    setEditedField(prev => ({ ...prev, options: newOptions }));
  };

  const saveChanges = () => {
    setFields(prev => prev.map(f => 
      f.id === editedField.id ? editedField : f
    ));
    setSelectedField(null);
  };

  const deleteField = () => {
    setFields(prev => prev.filter(f => f.id !== field.id));
    setSelectedField(null);
  };

  return (
    <Card className="mt-3">
      <Card.Header>
        <h5>Field Properties</h5>
      </Card.Header>
      <Card.Body>
        <Form.Group className="mb-3">
          <Form.Label>Label</Form.Label>
          <Form.Control
            type="text"
            name="label"
            value={editedField.label || ''}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Placeholder</Form.Label>
          <Form.Control
            type="text"
            name="placeholder"
            value={editedField.placeholder || ''}
            onChange={handleChange}
          />
        </Form.Group>

        {(editedField.type === 'Dropdown' || editedField.type === 'Radio' || editedField.type === 'MultipleChoice') && (
          <Form.Group className="mb-3">
            <Form.Label>Options</Form.Label>
            {editedField.options?.map((option, index) => (
              <InputGroup key={index} className="mb-2">
                <Form.Control
                  type="text"
                  value={option}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                />
                <Button variant="outline-danger" onClick={() => removeOption(index)}>
                  ×
                </Button>
              </InputGroup>
            ))}
            <Button variant="outline-primary" size="sm" onClick={addOption}>
              Add Option
            </Button>
          </Form.Group>
        )}

        {(editedField.type === 'Slider' || editedField.type === 'Rating') && (
          <Row className="mb-3">
            <Col>
              <Form.Group>
                <Form.Label>Min Value</Form.Label>
                <Form.Control
                  type="number"
                  name="min"
                  value={editedField.min || 0}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Max Value</Form.Label>
                <Form.Control
                  type="number"
                  name="max"
                  value={editedField.max || (editedField.type === 'Rating' ? 5 : 100)}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            {editedField.type === 'Slider' && (
              <Col>
                <Form.Group>
                  <Form.Label>Step</Form.Label>
                  <Form.Control
                    type="number"
                    name="step"
                    value={editedField.step || 1}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            )}
          </Row>
        )}

        {editedField.type === 'Terms' && (
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              value={editedField.description || ''}
              onChange={handleChange}
            />
          </Form.Group>
        )}

        <Form.Group className="mb-3">
          <Form.Check
            type="checkbox"
            label="Required"
            name="required"
            checked={editedField.required || false}
            onChange={(e) => setEditedField(prev => ({ ...prev, required: e.target.checked }))}
          />
        </Form.Group>

        <div className="d-flex justify-content-between">
          <div>
            <Button variant="primary" onClick={saveChanges} className="me-2">
              Save
            </Button>
            <Button variant="secondary" onClick={() => setSelectedField(null)}>
              Cancel
            </Button>
          </div>
          <Button variant="danger" onClick={deleteField}>
            Delete
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default FieldEditor;