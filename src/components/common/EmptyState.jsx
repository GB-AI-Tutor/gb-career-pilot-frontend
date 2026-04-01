const EmptyState = ({
  icon = "📭",
  title = "Nothing here yet",
  message = "No data to display at the moment.",
  actionLabel,
  onAction,
  className = "",
}) => {
  return (
    <div className={className} style={styles.container}>
      <div style={styles.icon}>{icon}</div>
      <h3 style={styles.title}>{title}</h3>
      <p style={styles.message}>{message}</p>
      {actionLabel && onAction && (
        <button onClick={onAction} style={styles.button}>
          {actionLabel}
        </button>
      )}
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "3rem 1rem",
    textAlign: "center",
    minHeight: "200px",
  },
  icon: {
    fontSize: "3rem",
    marginBottom: "1rem",
  },
  title: {
    margin: "0 0 0.5rem",
    fontSize: "1.25rem",
    fontWeight: 600,
    color: "#1a1a2e",
  },
  message: {
    margin: "0 0 1.5rem",
    color: "#6b7280",
    maxWidth: "400px",
  },
  button: {
    padding: "0.5rem 1.5rem",
    backgroundColor: "#4f46e5",
    color: "#fff",
    border: "none",
    borderRadius: "0.375rem",
    cursor: "pointer",
    fontSize: "0.875rem",
    fontWeight: 500,
  },
};

export default EmptyState;
