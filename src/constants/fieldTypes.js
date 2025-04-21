export const fieldCategories = {
  basic: {
    label: 'Basic Info',
    icon: '📋',
    types: [
      { type: 'Text', label: 'Single Line', icon: 'T' },
      { type: 'TextArea', label: 'Multi Line', icon: 'TA' },
      { type: 'Name', label: 'Name', icon: '👤', subTypes: ['First Name', 'Last Name'] },
      { type: 'Address', label: 'Address', icon: '🏠', 
        subTypes: ['Street Address', 'Address Line 2', 'City', 'State/Region'] },
      { type: 'Phone', label: 'Phone', icon: '📞' },
      { type: 'Email', label: 'Email', icon: '✉️' },
      { type: 'Website', label: 'Website', icon: '🌐' }
    ]
  },
  numbers: {
    label: 'Number',
    icon: '🔢',
    types: [
      { type: 'Number', label: 'Number', icon: '123' },
      { type: 'Decimal', label: 'Decimal', icon: '0.00' },
      { type: 'Formula', label: 'Formula', icon: 'ƒ' },
      { type: 'Currency', label: 'Currency', icon: '💲' }
    ]
  },
  choices: {
    label: 'Choices',
    icon: '☑️',
    types: [
      { type: 'Dropdown', label: 'Dropdown', icon: '▼' },
      { type: 'Radio', label: 'Radio', icon: '○' },
      { type: 'Checkbox', label: 'Checkbox', icon: '☑' },
      { type: 'MultipleChoice', label: 'Multiple Choice', icon: '☑☑' },
      { type: 'ImageChoices', label: 'Image Choices', icon: '🖼️' },
      { type: 'MatrixChoice', label: 'Matrix Choice', icon: '⊞' }
    ]
  },
  datetime: {
    label: 'Date & Time',
    icon: '⏰',
    types: [
      { type: 'Date', label: 'Date', icon: '📅' },
      { type: 'Time', label: 'Time', icon: '⏰' },
      { type: 'DateTime', label: 'Date-Time', icon: '📅⏰' },
      { type: 'MonthYear', label: 'Month-Year', icon: '🗓️' }
    ]
  },
  uploads: {
    label: 'Uploads',
    icon: '📤',
    types: [
      { type: 'FileUpload', label: 'File Upload', icon: '📁' },
      { type: 'ImageUpload', label: 'Image Upload', icon: '🖼️' },
      { type: 'MediaUpload', label: 'Audio/Video Upload', icon: '🎬' }
    ]
  },
  ratings: {
    label: 'Rating Scales',
    icon: '⭐',
    types: [
      { type: 'Rating', label: 'Rating', icon: '⭐' },
      { type: 'Slider', label: 'Slider', icon: '↔️' }
    ]
  },
  legal: {
    label: 'Legal & Consent',
    icon: '⚖️',
    types: [
      { type: 'Terms', label: 'Terms and Conditions', icon: '📜' },
      { type: 'Signature', label: 'Signature', icon: '✍️' },
      { type: 'DecisionBox', label: 'Decision Box', icon: '☑️' }
    ]
  },
  structure: {
    label: 'Page Elements',
    icon: '🧩',
    types: [
      { type: 'Section', label: 'Section', icon: '⏹' },
      { type: 'PageBreak', label: 'Page Break', icon: '⏸️' },
      { type: 'Description', label: 'Description', icon: 'ℹ️' },
      { type: 'MediaEmbed', label: 'Audio/Video Embed', icon: '🎥' }
    ]
  },
  advanced: {
    label: 'Advanced',
    icon: '⚙️',
    types: [
      { type: 'UniqueID', label: 'Unique ID', icon: '🆔' },
      { type: 'RandomID', label: 'Random ID', icon: '🎲' },
      { type: 'Subform', label: 'Subform', icon: '⊞' },
      { type: 'Payment', label: 'Payment', icon: '💳' }
    ]
  }
};
export const ItemTypes = {
  FIELD: 'field',
  SECTION: 'section',
  FORM_FIELD: 'form_field'
};