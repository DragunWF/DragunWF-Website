import PropTypes from "prop-types";
import styles from "./Button.module.css";

function Button({
  children,
  onClick,
  type = "button",
  disabled = false,
  variant = "primary",
  size = "medium",
  width = "auto",
  className = "",
  ...props
}) {
  const getVariantClass = () => {
    switch (variant) {
      case "secondary":
        return styles.secondary;
      case "outline":
        return styles.outline;
      default:
        return styles.primary;
    }
  };

  const getSizeClass = () => {
    switch (size) {
      case "small":
        return styles.small;
      case "large":
        return styles.large;
      default:
        return styles.medium;
    }
  };

  const getWidthClass = () => {
    switch (width) {
      case "full":
        return styles.fullWidth;
      case "half":
        return styles.halfWidth;
      default:
        return "";
    }
  };

  const buttonClasses = [
    styles.button,
    getVariantClass(),
    getSizeClass(),
    getWidthClass(),
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      className={buttonClasses}
      onClick={onClick}
      type={type}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(["button", "submit", "reset"]),
  disabled: PropTypes.bool,
  variant: PropTypes.oneOf(["primary", "secondary", "outline"]),
  size: PropTypes.oneOf(["small", "medium", "large"]),
  width: PropTypes.oneOf(["auto", "half", "full"]),
  className: PropTypes.string,
};

export default Button;
