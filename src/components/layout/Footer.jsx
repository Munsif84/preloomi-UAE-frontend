import { Link } from 'react-router-dom'
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'

const Footer = () => {
  const { t, isRTL } = useTheme()

  return (
    <footer className="bg-card border-t border-border mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">V</span>
              </div>
              <span className="text-xl font-bold text-foreground">VintedUAE</span>
            </div>
            <p className="text-sm text-muted-foreground max-w-xs">
              {t('footer.description')}
            </p>
            <div className="flex space-x-4 rtl:space-x-reverse">
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/items"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {t('nav.browse')}
                </Link>
              </li>
              <li>
                <Link
                  to="/sell"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {t('nav.sell')}
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {t('footer.about')}
                </Link>
              </li>
              <li>
                <Link
                  to="/help"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {t('footer.help')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/items?category=Women"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {t('categories.women')}
                </Link>
              </li>
              <li>
                <Link
                  to="/items?category=Men"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {t('categories.men')}
                </Link>
              </li>
              <li>
                <Link
                  to="/items?category=Kids"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {t('categories.kids')}
                </Link>
              </li>
              <li>
                <Link
                  to="/items?category=Home"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {t('categories.home')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground">{t('footer.contact')}</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2 rtl:space-x-reverse text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 flex-shrink-0" />
                <span>Dubai, United Arab Emirates</span>
              </li>
              <li className="flex items-center space-x-2 rtl:space-x-reverse text-sm text-muted-foreground">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <a href="mailto:support@vinteduae.com" className="hover:text-primary transition-colors">
                  support@vinteduae.com
                </a>
              </li>
              <li className="flex items-center space-x-2 rtl:space-x-reverse text-sm text-muted-foreground">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <a href="tel:+971501234567" className="hover:text-primary transition-colors">
                  +971 50 123 4567
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-muted-foreground">
              © 2024 VintedUAE. All rights reserved.
            </div>
            <div className="flex space-x-6 rtl:space-x-reverse">
              <Link
                to="/terms"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {t('footer.terms')}
              </Link>
              <Link
                to="/privacy"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {t('footer.privacy')}
              </Link>
              <Link
                to="/cookies"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

