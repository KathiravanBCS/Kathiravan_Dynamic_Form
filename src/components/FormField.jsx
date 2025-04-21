import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { Form, Row, Col, InputGroup } from 'react-bootstrap';

const FormField = ({ field, value, error, onChange }) => {
  const handleChange = (e) => {
    onChange(field.id, e.target.value);
  };

  const handleFileChange = (e) => {
    onChange(field.id, e.target.files[0]);
  };

  const handleDateChange = (date) => {
    onChange(field.id, date);
  };

  const handleCheckboxChange = (e) => {
    onChange(field.id, e.target.checked);
  };

  const renderSubFields = () => {
    switch (field.type) {
      case 'Name':
        return (
          <Row className="g-2">
            <Col md>
              <Form.Control
                placeholder="First Name"
                value={value?.firstName || ''}
                onChange={(e) => onChange(field.id, { ...value, firstName: e.target.value })}
              />
            </Col>
            <Col md>
              <Form.Control
                placeholder="Last Name"
                value={value?.lastName || ''}
                onChange={(e) => onChange(field.id, { ...value, lastName: e.target.value })}
              />
            </Col>
          </Row>
        );
      case 'Address':
        return (
          <div>
            <Form.Control
              className="mb-2"
              placeholder="Street Address"
              value={value?.street || ''}
              onChange={(e) => onChange(field.id, { ...value, street: e.target.value })}
            />
            <Form.Control
              className="mb-2"
              placeholder="Address Line 2"
              value={value?.line2 || ''}
              onChange={(e) => onChange(field.id, { ...value, line2: e.target.value })}
            />
            <Row className="g-2">
              <Col md>
                <Form.Control
                  placeholder="City"
                  value={value?.city || ''}
                  onChange={(e) => onChange(field.id, { ...value, city: e.target.value })}
                />
              </Col>
              <Col md>
                <Form.Control
                  placeholder="State/Region"
                  value={value?.state || ''}
                  onChange={(e) => onChange(field.id, { ...value, state: e.target.value })}
                />
              </Col>
            </Row>
          </div>
        );
      default:
        return null;
    }
  };

  switch (field.type) {
    case 'Text':
      return (
        <Form.Group className="mb-3">
          <Form.Label>{field.label}{field.required && <span className="text-danger">*</span>}</Form.Label>
          <Form.Control
            type="text"
            value={value || ''}
            placeholder={field.placeholder}
            onChange={handleChange}
          />
          {error && <Form.Text className="text-danger">{error}</Form.Text>}
        </Form.Group>
      );
    case 'TextArea':
      return (
        <Form.Group className="mb-3">
          <Form.Label>{field.label}{field.required && <span className="text-danger">*</span>}</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={value || ''}
            placeholder={field.placeholder}
            onChange={handleChange}
          />
          {error && <Form.Text className="text-danger">{error}</Form.Text>}
        </Form.Group>
      );
    case 'Name':
    case 'Address':
      return (
        <Form.Group className="mb-3">
          <Form.Label>{field.label}{field.required && <span className="text-danger">*</span>}</Form.Label>
          {renderSubFields()}
          {error && <Form.Text className="text-danger">{error}</Form.Text>}
        </Form.Group>
      );
    case 'Number':
      return (
        <Form.Group className="mb-3">
          <Form.Label>{field.label}{field.required && <span className="text-danger">*</span>}</Form.Label>
          <Form.Control
            type="number"
            value={value || ''}
            placeholder={field.placeholder}
            onChange={handleChange}
          />
          {error && <Form.Text className="text-danger">{error}</Form.Text>}
        </Form.Group>
      );
    case 'Decimal':
      return (
        <Form.Group className="mb-3">
          <Form.Label>{field.label}{field.required && <span className="text-danger">*</span>}</Form.Label>
          <Form.Control
            type="number"
            step="0.01"
            value={value || ''}
            placeholder={field.placeholder}
            onChange={handleChange}
          />
          {error && <Form.Text className="text-danger">{error}</Form.Text>}
        </Form.Group>
      );
    case 'Currency':
      return (
        <Form.Group className="mb-3">
          <Form.Label>{field.label}{field.required && <span className="text-danger">*</span>}</Form.Label>
          <InputGroup>
            <InputGroup.Text>$</InputGroup.Text>
            <Form.Control
              type="number"
              step="0.01"
              value={value || ''}
              placeholder={field.placeholder}
              onChange={handleChange}
            />
          </InputGroup>
          {error && <Form.Text className="text-danger">{error}</Form.Text>}
        </Form.Group>
      );
    case 'Dropdown':
      return (
        <Form.Group className="mb-3">
          <Form.Label>{field.label}{field.required && <span className="text-danger">*</span>}</Form.Label>
          <Form.Select
            value={value || ''}
            onChange={handleChange}
          >
            <option value="">Select an option</option>
            {field.options?.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </Form.Select>
          {error && <Form.Text className="text-danger">{error}</Form.Text>}
        </Form.Group>
      );
    case 'Radio':
      return (
        <Form.Group className="mb-3">
          <Form.Label>{field.label}{field.required && <span className="text-danger">*</span>}</Form.Label>
          <div>
            {field.options?.map((option, index) => (
              <Form.Check
                key={index}
                type="radio"
                name={field.id}
                id={`${field.id}-${index}`}
                label={option}
                value={option}
                checked={value === option}
                onChange={handleChange}
              />
            ))}
          </div>
          {error && <Form.Text className="text-danger">{error}</Form.Text>}
        </Form.Group>
      );
    case 'Checkbox':
      return (
        <Form.Group className="mb-3">
          <Form.Check
            type="checkbox"
            label={field.label}
            checked={!!value}
            onChange={handleCheckboxChange}
          />
          {error && <Form.Text className="text-danger">{error}</Form.Text>}
        </Form.Group>
      );
    case 'MultipleChoice':
      return (
        <Form.Group className="mb-3">
          <Form.Label>{field.label}{field.required && <span className="text-danger">*</span>}</Form.Label>
          <div>
            {field.options?.map((option, index) => (
              <Form.Check
                key={index}
                type="checkbox"
                id={`${field.id}-${index}`}
                label={option}
                value={option}
                checked={value?.includes(option) || false}
                onChange={(e) => {
                  const newValue = e.target.checked
                    ? [...(value || []), option]
                    : (value || []).filter(v => v !== option);
                  onChange(field.id, newValue);
                }}
              />
            ))}
          </div>
          {error && <Form.Text className="text-danger">{error}</Form.Text>}
        </Form.Group>
      );
    case 'Date':
      return (
        <Form.Group className="mb-3">
          <Form.Label>{field.label}{field.required && <span className="text-danger">*</span>}</Form.Label>
          <DatePicker
            selected={value || null}
            onChange={handleDateChange}
            dateFormat="MMMM d, yyyy"
            className="form-control"
          />
          {error && <Form.Text className="text-danger">{error}</Form.Text>}
        </Form.Group>
      );
    case 'Time':
      return (
        <Form.Group className="mb-3">
          <Form.Label>{field.label}{field.required && <span className="text-danger">*</span>}</Form.Label>
          <DatePicker
            selected={value || null}
            onChange={handleDateChange}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={15}
            timeCaption="Time"
            dateFormat="h:mm aa"
            className="form-control"
          />
          {error && <Form.Text className="text-danger">{error}</Form.Text>}
        </Form.Group>
      );
    case 'DateTime':
      return (
        <Form.Group className="mb-3">
          <Form.Label>{field.label}{field.required && <span className="text-danger">*</span>}</Form.Label>
          <DatePicker
            selected={value || null}
            onChange={handleDateChange}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            dateFormat="MMMM d, yyyy h:mm aa"
            timeCaption="Time"
            className="form-control"
          />
          {error && <Form.Text className="text-danger">{error}</Form.Text>}
        </Form.Group>
      );
    case 'MonthYear':
      return (
        <Form.Group className="mb-3">
          <Form.Label>{field.label}{field.required && <span className="text-danger">*</span>}</Form.Label>
          <DatePicker
            selected={value || null}
            onChange={handleDateChange}
            dateFormat="MM/yyyy"
            showMonthYearPicker
            className="form-control"
          />
          {error && <Form.Text className="text-danger">{error}</Form.Text>}
        </Form.Group>
      );
    case 'FileUpload':
    case 'ImageUpload':
    case 'MediaUpload':
      return (
        <Form.Group className="mb-3">
          <Form.Label>{field.label}{field.required && <span className="text-danger">*</span>}</Form.Label>
          <Form.Control
            type="file"
            accept={field.type === 'ImageUpload' ? 'image/*' : field.type === 'MediaUpload' ? 'audio/*,video/*' : '*'}
            onChange={handleFileChange}
          />
          {error && <Form.Text className="text-danger">{error}</Form.Text>}
        </Form.Group>
      );
    case 'Rating':
      return (
        <Form.Group className="mb-3">
          <Form.Label>{field.label}{field.required && <span className="text-danger">*</span>}</Form.Label>
          <div className="rating">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={`star ${star <= (value || 0) ? 'filled' : ''}`}
                onClick={() => onChange(field.id, star)}
                style={{ cursor: 'pointer', fontSize: '24px', color: star <= (value || 0) ? '#ffc107' : '#e4e5e9' }}
              >
                ★
              </span>
            ))}
          </div>
          {error && <Form.Text className="text-danger">{error}</Form.Text>}
        </Form.Group>
      );
    case 'Slider':
      return (
        <Form.Group className="mb-3">
          <Form.Label>
            {field.label}{field.required && <span className="text-danger">*</span>}
            {value && <span className="ms-2">({value})</span>}
          </Form.Label>
          <Form.Range
            min={field.min || 0}
            max={field.max || 100}
            step={field.step || 1}
            value={value || 0}
            onChange={handleChange}
          />
          {error && <Form.Text className="text-danger">{error}</Form.Text>}
        </Form.Group>
      );
    case 'Terms':
      return (
        <Form.Group className="mb-3">
          <Form.Check
            type="checkbox"
            label={field.label}
            checked={!!value}
            onChange={handleCheckboxChange}
            required={field.required}
          />
          {field.description && (
            <div className="border p-2 mt-2 bg-light">
              <small>{field.description}</small>
            </div>
          )}
          {error && <Form.Text className="text-danger">{error}</Form.Text>}
        </Form.Group>
      );
    case 'Signature':
      return (
        <Form.Group className="mb-3">
          <Form.Label>{field.label}{field.required && <span className="text-danger">*</span>}</Form.Label>
          <div className="border rounded p-3" style={{ height: '150px' }}>
            {value ? (
              <img src={value} alt="Signature" style={{ maxHeight: '100%', maxWidth: '100%' }} />
            ) : (
              <div className="text-center text-muted h-100 d-flex align-items-center justify-content-center">
                Sign here
              </div>
            )}
          </div>
          <button 
            type="button" 
            className="btn btn-sm btn-outline-secondary mt-2"
            onClick={() => {
              // In a real app, this would open a signature pad
              const fakeSignature = 'data:image/png;base64,...';
              onChange(field.id, fakeSignature);
            }}
          >
            {value ? 'Change Signature' : 'Add Signature'}
          </button>
          {error && <Form.Text className="text-danger">{error}</Form.Text>}
        </Form.Group>
      );
    case 'Section':
      return (
        <div className="border rounded p-3 mb-3 bg-light">
          <h5>{field.label}</h5>
          {field.description && <p className="text-muted">{field.description}</p>}
        </div>
      );
    case 'Description':
      return (
        <div className="mb-3">
          {field.label && <h6>{field.label}</h6>}
          <div className="text-muted">{field.description}</div>
        </div>
      );
    case 'UniqueID':
    case 'RandomID':
      return (
        <Form.Group className="mb-3">
          <Form.Label>{field.label}</Form.Label>
          <Form.Control
            type="text"
            value={value || (field.type === 'RandomID' ? Math.random().toString(36).substring(2, 10) : '')}
            readOnly
          />
        </Form.Group>
      );
    default:
      return (
        <Form.Group className="mb-3">
          <Form.Label>{field.label || field.type}{field.required && <span className="text-danger">*</span>}</Form.Label>
          <Form.Control
            type="text"
            value={value || ''}
            placeholder={field.placeholder}
            onChange={handleChange}
          />
          {error && <Form.Text className="text-danger">{error}</Form.Text>}
        </Form.Group>
      );
  }
};

export default FormField;