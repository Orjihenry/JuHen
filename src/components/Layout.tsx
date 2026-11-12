import { useEffect, useState } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { useTheme } from '../useTheme'

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  isActive ? 'active' : undefined

export function Layout() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { theme, toggleTheme } = useTheme()
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
    const id = location.hash.slice(1)

    if (!id) {
      window.scrollTo(0, 0)
      return
    }

    const frame = window.requestAnimationFrame(() => {
      const target = document.getElementById(id)
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' })
      } else {
        window.scrollTo(0, 0)
      }
    })

    return () => window.cancelAnimationFrame(frame)
  }, [location.pathname, location.hash])

  return (
    <div className="site">
      <header className={`header${scrolled ? ' scrolled' : ''}`}>
        <div className="wrap header-inner">
          <NavLink className="logo" to="/">
            <img
              className="logo-mark-img"
              src="/logo-mark.png"
              alt=""
              width="38"
              height="46"
            />
            <span className="logo-text">
              <span>JuHen Cleaning</span>
              <span>Services</span>
            </span>
          </NavLink>
          <nav className={`nav${menuOpen ? ' open' : ''}`} aria-label="Primary">
            <NavLink to="/" end className={navLinkClass}>
              Home
            </NavLink>
            <NavLink to="/about" className={navLinkClass}>
              About
            </NavLink>
            <NavLink to="/services" className={navLinkClass}>
              Services
            </NavLink>
            <NavLink to="/faq" className={navLinkClass}>
              FAQ
            </NavLink>
            <NavLink to="/contact" className={navLinkClass}>
              Contact
            </NavLink>
            <NavLink className="btn btn-primary nav-estimate" to="/estimate">
              Free estimate
            </NavLink>
          </nav>
          <div className="header-cta">
            <a className="phone" href="tel:+15551203480">
              (555) 120-3480
            </a>
            <NavLink className="btn btn-primary btn-header" to="/estimate">
              <span className="btn-label-full">Free estimate</span>
              <span className="btn-label-short">Estimate</span>
            </NavLink>
            <button
              className="theme-toggle"
              type="button"
              aria-label={
                theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'
              }
              aria-pressed={theme === 'dark'}
              onClick={toggleTheme}
            >
              {theme === 'dark' ? (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 3v2M12 19v2M5 12H3M21 12h-2M6.2 6.2l1.4 1.4M16.4 16.4l1.4 1.4M6.2 17.8l1.4-1.4M16.4 7.6l1.4-1.4" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 14.5A8.5 8.5 0 1 1 9.5 3a7 7 0 0 0 11.5 11.5Z" />
                </svg>
              )}
            </button>
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
        <div className="footer-inner">
          <div className="footer-grid">
            <div className="footer-brand">
              <NavLink className="logo footer-logo" to="/">
                <img
                  className="logo-mark-img"
                  src="/logo-mark.png"
                  alt=""
                  width="56"
                  height="68"
                />
                <span className="logo-text">
                  <span>JuHen Cleaning</span>
                  <span>Services</span>
                </span>
              </NavLink>
              <p>
                Residential, commercial, and specialty cleaning for spaces that
                should feel looked after, without you doing it yourself.
              </p>
              <NavLink className="btn btn-primary" to="/estimate">
                Free estimate
              </NavLink>
            </div>
            <div>
              <h3>Pages</h3>
              <nav className="footer-links" aria-label="Footer">
                <NavLink to="/">Home</NavLink>
                <NavLink to="/about">About</NavLink>
                <NavLink to="/services">Services</NavLink>
                <NavLink to="/faq">FAQ</NavLink>
                <NavLink to="/contact">Contact</NavLink>
              </nav>
            </div>
            <div>
              <h3>Contact</h3>
              <div className="footer-links">
                <span>Mon–Fri 8am–6pm</span>
                <span>Saturday by appointment</span>
                <a href="tel:+15551203480">(555) 120-3480</a>
                <a href="mailto:hello@juhencleaningservices.ca">
                  hello@juhencleaningservices.ca
                </a>
              </div>
            </div>
          </div>
          <div className="legal">
            <span>
              © {new Date().getFullYear()} JuHen Cleaning Services. All rights
              reserved.
            </span>
            <span>Insured · Bonded · Locally owned</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
