interface QuickUpdateProps {
  title: string;
}

const QuickUpdate: React.FC<QuickUpdateProps> = ({ title }) => {
  return (
    <div className="quick-update">
      <h1 className="ubuntu-medium">{title}</h1>
      <input />
      <button className="primary-button" type="button">
        SUBMIT
      </button>
    </div>
  );
};

export default QuickUpdate;
