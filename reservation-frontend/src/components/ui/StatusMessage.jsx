function StatusMessage({ children, tone = 'neutral', ...props }) {
  return (
    <p className={`status-message status-${tone}`} {...props}>
      {children}
    </p>
  );
}

export default StatusMessage;
