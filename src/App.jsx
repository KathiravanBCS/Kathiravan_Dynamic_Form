import { useState } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import FormBuilder from './components/FormBuilder';
import DataDisplay from './components/DataDisplay';

const App = () => {
  const [fields, setFields] = useState([]);
  const [formData, setFormData] = useState({});
  const [activeTab, setActiveTab] = useState('builder');

  return (
    <div className="app-container">
      <Tabs
        activeKey={activeTab}
        onSelect={(k) => setActiveTab(k)}
        className="mb-3"
      >
        <Tab eventKey="builder" title="Form Builder">
          <FormBuilder 
            fields={fields} 
            setFields={setFields} 
            formData={formData}
            setFormData={setFormData}
          />
        </Tab>
        <Tab eventKey="data" title="Form Data">
          <DataDisplay fields={fields} formData={formData} />
        </Tab>
      </Tabs>
    </div>
  );
};

export default App;