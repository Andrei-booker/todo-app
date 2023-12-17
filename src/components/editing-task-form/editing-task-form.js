import PropTypes from 'prop-types';
import { useState } from 'react';

function EditingTaskForm({ label, onTaskChanged }) {
  const [newLabel, setNewLabel] = useState(label);

  const onTaskChange = (e) => {
    const { value } = e.target;
    setNewLabel(value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    onTaskChanged(newLabel);
  };

  return (
    <form onSubmit={onSubmit}>
      <input type="text" className="edit" value={newLabel} onChange={onTaskChange} />
    </form>
  );
}

EditingTaskForm.propTypes = {
  onTaskChanged: PropTypes.func.isRequired,
};

export default EditingTaskForm;
