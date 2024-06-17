interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  theme?: 'primary' | 'success' | 'danger' | 'warning';
  option?: string;
  children: React.ReactNode;
}
import './button.css';

export const Button: React.FC<ButtonProps> = (props) => {
  const { theme, children, option } = props;
  let className = 'btn ';
  switch (theme) {
    case 'primary':
      className += 'btn-primary';
      break;
    case 'success':
      className += 'btn-success';
      break;
    case 'danger':
      className += 'btn-danger';
      break;
    case 'warning':
      className += 'btn-warning';
      break;
    default:
      className += 'btn-primary';
  }
  return (
    <button type="submit" className={className + ` ${option}`} {...props}>
      {children}
    </button>
  );
};
