const renderFieldData = (fields, formData) => {
  return fields.map(field => {
    if (field.condition) {
      const dependentValue = formData[field.condition.dependsOn]?.value;
      if (dependentValue !== field.condition.value) {
        return null;
      }
    }
    
    const fieldData = {
      id: field.id,
      label: field.label,
      type: field.type,
      value: formData[field.id]?.value || null
    };
    
    if (field.type === "Section" && field.children) {
      return {
        ...fieldData,
        children: renderFieldData(field.children, formData)
      };
    }
    return fieldData;
  }).filter(Boolean);
};

const DataDisplay = ({ fields, formData }) => {
  const hierarchicalData = renderFieldData(fields, formData);

  return (
    <div className="p-3">
      <h2>Form Data</h2>
      <pre className="bg-light p-3 rounded">
        {JSON.stringify(hierarchicalData, null, 2)}
      </pre>
    </div>
  );
};

export default DataDisplay;