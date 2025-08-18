import { createContext, useContext, useState, useEffect } from 'react'

const ThemeContext = createContext()

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light')
  const [language, setLanguage] = useState('en')
  const [direction, setDirection] = useState('ltr')

  useEffect(() => {
    // Load saved preferences
    const savedTheme = localStorage.getItem('theme') || 'light'
    const savedLanguage = localStorage.getItem('language') || 'en'
    const savedDirection = localStorage.getItem('direction') || 'ltr'

    setTheme(savedTheme)
    setLanguage(savedLanguage)
    setDirection(savedDirection)

    // Apply theme to document
    document.documentElement.classList.toggle('dark', savedTheme === 'dark')
    document.documentElement.setAttribute('dir', savedDirection)
    document.documentElement.setAttribute('lang', savedLanguage)
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    document.documentElement.classList.toggle('dark', newTheme === 'dark')
  }

  const toggleLanguage = () => {
    const newLanguage = language === 'en' ? 'ar' : 'en'
    const newDirection = newLanguage === 'ar' ? 'rtl' : 'ltr'
    
    setLanguage(newLanguage)
    setDirection(newDirection)
    
    localStorage.setItem('language', newLanguage)
    localStorage.setItem('direction', newDirection)
    
    document.documentElement.setAttribute('dir', newDirection)
    document.documentElement.setAttribute('lang', newLanguage)
  }

  const setLanguageAndDirection = (lang) => {
    const dir = lang === 'ar' ? 'rtl' : 'ltr'
    
    setLanguage(lang)
    setDirection(dir)
    
    localStorage.setItem('language', lang)
    localStorage.setItem('direction', dir)
    
    document.documentElement.setAttribute('dir', dir)
    document.documentElement.setAttribute('lang', lang)
  }

  // Translation helper
  const t = (key, fallback = key) => {
    const translations = {
      en: {
        // Navigation
        'nav.home': 'Home',
        'nav.browse': 'Browse',
        'nav.sell': 'Sell',
        'nav.messages': 'Messages',
        'nav.profile': 'Profile',
        'nav.login': 'Login',
        'nav.register': 'Register',
        'nav.logout': 'Logout',
        
        // Common
        'common.search': 'Search',
        'common.filter': 'Filter',
        'common.sort': 'Sort',
        'common.price': 'Price',
        'common.condition': 'Condition',
        'common.brand': 'Brand',
        'common.size': 'Size',
        'common.category': 'Category',
        'common.loading': 'Loading...',
        'common.error': 'Error',
        'common.success': 'Success',
        'common.cancel': 'Cancel',
        'common.save': 'Save',
        'common.edit': 'Edit',
        'common.delete': 'Delete',
        'common.view': 'View',
        'common.buy': 'Buy',
        'common.sell': 'Sell',
        'common.message': 'Message',
        'common.offer': 'Make Offer',
        'common.aed': 'AED',
        
        // Auth
        'auth.email': 'Email',
        'auth.password': 'Password',
        'auth.confirmPassword': 'Confirm Password',
        'auth.firstName': 'First Name',
        'auth.lastName': 'Last Name',
        'auth.username': 'Username',
        'auth.phone': 'Phone Number',
        'auth.location': 'Location',
        'auth.loginTitle': 'Welcome Back',
        'auth.loginSubtitle': 'Sign in to your account',
        'auth.registerTitle': 'Join VintedUAE',
        'auth.registerSubtitle': 'Create your account to start buying and selling',
        'auth.forgotPassword': 'Forgot Password?',
        'auth.noAccount': "Don't have an account?",
        'auth.hasAccount': 'Already have an account?',
        'auth.signUp': 'Sign Up',
        'auth.signIn': 'Sign In',
        
        // Items
        'items.title': 'Browse Items',
        'items.featured': 'Featured Items',
        'items.recent': 'Recently Added',
        'items.popular': 'Popular Items',
        'items.condition.new': 'New',
        'items.condition.good': 'Good',
        'items.condition.fair': 'Fair',
        'items.noResults': 'No items found',
        'items.viewDetails': 'View Details',
        'items.addToFavorites': 'Add to Favorites',
        
        // Categories
        'categories.women': 'Women',
        'categories.men': 'Men',
        'categories.kids': 'Kids',
        'categories.home': 'Home',
        'categories.electronics': 'Electronics',
        'categories.sports': 'Sports',
        
        // Home Page
        'home.newInUAE': 'New in UAE',
        'home.heroTitle1': 'TESTING',
        'home.heroTitle2': 'DEPLOYMENT',
        'home.heroTitle3': 'in the UAE',
        'home.heroDescription': 'Discover unique fashion and join the sustainable fashion movement today.',
        'home.startShopping': 'Start Shopping',
        'home.startSelling': 'Start Selling',
        'home.buyerProtection': 'Buyer Protection',
        'home.buyerProtectionDesc': 'Shop with confidence with our buyer protection program',
        'home.fastDelivery': 'Fast Delivery',
        'home.fastDeliveryDesc': 'Quick delivery across all Emirates with tracking',
        'home.sustainableFashion': 'Sustainable Fashion',
        'home.sustainableFashionDesc': 'Give pre-loved items a second life and help the environment',
        'home.shopByCategory': 'Shop by Category',
        'home.shopByCategoryDesc': 'Find exactly what you\'re looking for in our curated categories',
        'home.featuredItemsDesc': 'Handpicked items from our community',
        'home.viewAll': 'View All',
        'home.readyToStart': 'Ready to Start Your Fashion Journey?',
        'home.readyToStartDesc': 'Join thousands of fashion lovers in the UAE who are buying and selling pre-loved items every day.',
        'home.joinToday': 'Join VintedUAE Today',
        'home.browseItems': 'Browse Items',

        // Footer
        'footer.about': 'About VintedUAE',
        'footer.help': 'Help & Support',
        'footer.terms': 'Terms of Service',
        'footer.privacy': 'Privacy Policy',
        'footer.contact': 'Contact Us',
        'footer.followUs': 'Follow Us',
        'footer.description': 'Buy and sell pre-loved fashion in the UAE',
      },
      ar: {
        // Navigation
        'nav.home': 'الرئيسية',
        'nav.browse': 'تصفح',
        'nav.sell': 'بيع',
        'nav.messages': 'الرسائل',
        'nav.profile': 'الملف الشخصي',
        'nav.login': 'تسجيل الدخول',
        'nav.register': 'إنشاء حساب',
        'nav.logout': 'تسجيل الخروج',
        
        // Common
        'common.search': 'بحث',
        'common.filter': 'تصفية',
        'common.sort': 'ترتيب',
        'common.price': 'السعر',
        'common.condition': 'الحالة',
        'common.brand': 'العلامة التجارية',
        'common.size': 'المقاس',
        'common.category': 'الفئة',
        'common.loading': 'جاري التحميل...',
        'common.error': 'خطأ',
        'common.success': 'نجح',
        'common.cancel': 'إلغاء',
        'common.save': 'حفظ',
        'common.edit': 'تعديل',
        'common.delete': 'حذف',
        'common.view': 'عرض',
        'common.buy': 'شراء',
        'common.sell': 'بيع',
        'common.message': 'رسالة',
        'common.offer': 'تقديم عرض',
        'common.aed': 'درهم',
        
        // Auth
        'auth.email': 'البريد الإلكتروني',
        'auth.password': 'كلمة المرور',
        'auth.confirmPassword': 'تأكيد كلمة المرور',
        'auth.firstName': 'الاسم الأول',
        'auth.lastName': 'اسم العائلة',
        'auth.username': 'اسم المستخدم',
        'auth.phone': 'رقم الهاتف',
        'auth.location': 'الموقع',
        'auth.loginTitle': 'مرحباً بعودتك',
        'auth.loginSubtitle': 'سجل دخولك إلى حسابك',
        'auth.registerTitle': 'انضم إلى VintedUAE',
        'auth.registerSubtitle': 'أنشئ حسابك لتبدأ البيع والشراء',
        'auth.forgotPassword': 'نسيت كلمة المرور؟',
        'auth.noAccount': 'ليس لديك حساب؟',
        'auth.hasAccount': 'لديك حساب بالفعل؟',
        'auth.signUp': 'إنشاء حساب',
        'auth.signIn': 'تسجيل الدخول',
        
        // Items
        'items.title': 'تصفح المنتجات',
        'items.featured': 'منتجات مميزة',
        'items.recent': 'مضاف حديثاً',
        'items.popular': 'منتجات شائعة',
        'items.condition.new': 'جديد',
        'items.condition.good': 'جيد',
        'items.condition.fair': 'مقبول',
        'items.noResults': 'لم يتم العثور على منتجات',
        'items.viewDetails': 'عرض التفاصيل',
        'items.addToFavorites': 'إضافة للمفضلة',
        
        // Categories
        'categories.women': 'نساء',
        'categories.men': 'رجال',
        'categories.kids': 'أطفال',
        'categories.home': 'منزل',
        'categories.electronics': 'إلكترونيات',
        'categories.sports': 'رياضة',
        
        // Home Page
        'home.newInUAE': 'جديد في الإمارات',
        'home.heroTitle1': 'اشتري وبع',
        'home.heroTitle2': 'الأزياء المستعملة',
        'home.heroTitle3': 'في دولة الإمارات',
        'home.heroDescription': 'اكتشف الأزياء الفريدة وانضم إلى حركة الأزياء المستدامة اليوم.',
        'home.startShopping': 'ابدأ التسوق',
        'home.startSelling': 'ابدأ البيع',
        'home.buyerProtection': 'حماية المشتري',
        'home.buyerProtectionDesc': 'تسوق بثقة مع برنامج حماية المشتري الخاص بنا',
        'home.fastDelivery': 'توصيل سريع',
        'home.fastDeliveryDesc': 'توصيل سريع عبر جميع الإمارات مع التتبع',
        'home.sustainableFashion': 'أزياء مستدامة',
        'home.sustainableFashionDesc': 'امنح العناصر المستعملة حياة ثانية وساعد البيئة',
        'home.shopByCategory': 'تسوق حسب الفئة',
        'home.shopByCategoryDesc': 'اعثر على ما تبحث عنه بالضبط في فئاتنا المنسقة',
        'home.featuredItemsDesc': 'عناصر مختارة بعناية من مجتمعنا',
        'home.viewAll': 'عرض الكل',
        'home.readyToStart': 'مستعد لبدء رحلة الأزياء الخاصة بك؟',
        'home.readyToStartDesc': 'انضم إلى آلاف عشاق الأزياء في الإمارات الذين يشترون ويبيعون العناصر المستعملة كل يوم.',
        'home.joinToday': 'انضم إلى VintedUAE اليوم',
        'home.browseItems': 'تصفح العناصر',

        // Footer
        'footer.about': 'حول VintedUAE',
        'footer.help': 'المساعدة والدعم',
        'footer.terms': 'شروط الخدمة',
        'footer.privacy': 'سياسة الخصوصية',
        'footer.contact': 'اتصل بنا',
        'footer.followUs': 'تابعنا',
        'footer.description': 'اشتري وبع الأزياء المستعملة في دولة الإمارات',
      }
    }

    return translations[language]?.[key] || fallback
  }

  const value = {
    theme,
    language,
    direction,
    toggleTheme,
    toggleLanguage,
    setLanguageAndDirection,
    t,
    isRTL: direction === 'rtl',
    isArabic: language === 'ar',
  }

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}

