function InputField({ label, id, ...props }) {
  return (
    <label className="field" htmlFor={id}>
      <span className="field-label">{label}</span>
      <input className="field-input" id={id} {...props} />
    </label>
  );
}

export default InputField;
