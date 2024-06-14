interface AuthModalProps {
  errorMessage: string;
  closeModal: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ errorMessage, closeModal }) => {
  return (
    <div className="auth-modal-background">
      <div className="auth-modal-content">
        <h1 className="bebas-neue red">ERROR</h1>
        <p className="ubuntu-medium">{errorMessage}</p>
        <button
          className="primary-button"
          onClick={() => {
            closeModal();
          }}
        >
          close
        </button>
      </div>
    </div>
  );
};

export default AuthModal;
