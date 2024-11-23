import { Link } from 'react-router-dom'

export default function LinkStyled({ children, to }) {
  return (
    <Link to={to} className="text-primary font-bold cursor-pointer">
      {children}
    </Link>
  )
}
