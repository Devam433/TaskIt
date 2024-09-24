import { NavLink } from "react-router-dom"

function Button({className='',onClick,px,children,href,disabled=false,type="button",variant = 'primary',
  size = 'md',...props}) {

  const baseStyles = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none'
  
  const variants = {
    primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
    secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
    outline: 'border border-input hover:bg-accent hover:text-accent-foreground'
  }
  
  const sizes = {
    sm: 'h-9 px-3 text-xs',
    md: 'h-10 py-2 px-4',
    lg: 'h-11 px-8'
  }

  const classes = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`

  function renderLink(){
    return (
    <NavLink className={classes} to={href}><span>{children}</span></NavLink>
    )
  }
  
  function renderButton(){
    return (
    <button className={classes} onClick={onClick} disabled={disabled} type={type} {...props}>
      <span>{children}</span>
    </button>
    )
  }
    return href ? renderLink() : renderButton()
}

export default Button