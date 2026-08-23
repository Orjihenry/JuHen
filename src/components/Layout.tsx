import { useEffect, useState } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  isActive ? 'active' : undefined

export function Layout() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
    window.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <div className="site">
      <header className={`header${scrolled ? ' scrolled' : ''}`}>
        <div className="wrap header-inner">
          <NavLink className="logo" to="/">
            <span className="logo-mark">JH</span>
            JuHen Cleaning
          </NavLink>
          <nav className={`nav${menuOpen ? ' open' : ''}`} aria-label="Primary">
            <NavLink to="/" end className={navLinkClass}>
              Home
            </NavLink>
            <NavLink to="/services" className={navLinkClass}>
              Services
            </NavLink>
            <NavLink to="/about" className={navLinkClass}>
              About
            </NavLink>
            <NavLink to="/contact" className={navLinkClass}>
              Contact
            </NavLink>
          </nav>
          <div className="header-cta">
            <a className="phone" href="tel:+15551203480">
              (555) 120-3480
            </a>
            <NavLink className="btn btn-primary" to="/contact">
              Free estimate
            </NavLink>
            <button
              className="menu-toggle"
              type="button"
              aria-expanded={menuOpen}
              aria-label="Toggle menu"
              onClick={() => setMenuOpen((open) => !open)}
            >
              Menu
            </button>
          </div>
        </div>
      </header>

      <Outlet />

      <footer className="footer">
        <div className="wrap footer-grid">
          <div>
            <h3>JuHen Cleaning Services</h3>
            <p>
              Residential house cleaning for families who want a home that feels
              looked after—without doing it themselves.
            </p>
          </div>
          <div>
            <h3>Pages</h3>
            <p>
              <NavLink to="/">Home</NavLink>
              <br />
              <NavLink to="/services">Services</NavLink>
              <br />
              <NavLink to="/about">About</NavLink>
              <br />
              <NavLink to="/contact">Contact</NavLink>
            </p>
          </div>
          <div>
            <h3>Contact</h3>
            <p>
              Mon–Fri 8am–6pm
              <br />
              Saturday by appointment
              <br />
              <a href="tel:+15551203480">(555) 120-3480</a>
              <br />
              <a href="mailto:hello@juhencleaning.com">hello@juhencleaning.com</a>
            </p>
          </div>
        </div>
        <div className="wrap legal">
          © {new Date().getFullYear()} JuHen Cleaning Services. All rights
          reserved.
        </div>
      </footer>
    </div>
  )
}
