
import PropTypes from 'prop-types';
function InputWithLabel ({ id, value, onChange, children })  {

  return (
    <>
      <label htmlFor={id}>{children}</label>
      <input
        id={id}
        value={value}
        onChange={onChange}
      />
    </>
  );
}


InputWithLabel.propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default InputWithLabel;
