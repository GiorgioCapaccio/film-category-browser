interface ToastProps {
  toast: {
    message: string;
    type: "success" | "error";
  };
}

const Toast = ({ toast }: ToastProps) => {
  return (
    <div>
      {toast && (
        <div className={`toast toast-${toast.type}`}>{toast.message}</div>
      )}
    </div>
  );
};

export default Toast;
