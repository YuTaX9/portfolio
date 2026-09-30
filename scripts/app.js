// ============================================================
//  PORTFOLIO INTERACTIONS & LANGUAGE SWITCHING
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
  // ==================== LANGUAGE SYSTEM ====================
  
  const LANGUAGES = {
    en: {
      'nav.name': 'Bassam',
      'nav.about': 'About',
      'nav.skills': 'Skills',
      'nav.projects': 'Projects',
      'nav.experience': 'Experience',
      'nav.contact': 'Contact',
      
      'hero.greeting': 'Hi, I\'m',
      'hero.subtitle': 'Full-Stack Developer • Software Engineer • Building intelligent, scalable solutions with modern technologies',
      'hero.description': 'Specializing in AI-driven applications, data engineering, OTA automation, and full-stack web development. CDMP Certified.',
      'hero.cta_projects': 'View My Projects',
      'hero.cta_cv': 'Download CV',
      'hero.cta_linkedin': 'LinkedIn',
      'hero.badge': 'Software Engineer',
      
      'about.title': 'About Me',
      'about.p1': 'I\'m a Computer Science graduate with a passion for building intelligent, scalable applications that solve real-world problems. My expertise spans full-stack web development, artificial intelligence, data engineering, and automation.',
      'about.p2': 'With hands-on experience in designing ETL pipelines, developing AI-powered platforms, and creating interactive web applications, I focus on writing clean, maintainable code and delivering high-quality solutions.',
      'about.p3': 'Currently, I work as an IT Specialist (Tamheer) at SGS, where I automate processes using Power Automate and create impactful dashboards with Power BI. I\'m always learning and excited about innovative projects.',
      'about.stat1': 'Years of Learning',
      'about.stat2': 'Projects Completed',
      'about.stat3': 'Certifications',
      
      'skills.title': 'Technical Skills',
      'skills.frontend': 'Frontend Development',
      'skills.backend': 'Backend & Databases',
      'skills.data': 'Data & AI',
      'skills.devops': 'DevOps & Automation',
      'skills.tools': 'Tools & Platforms',
      'skills.soft': 'Soft Skills',
      'skills.communication': 'Communication',
      'skills.problemsolving': 'Problem Solving',
      'skills.teamwork': 'Teamwork',
      'skills.leadership': 'Leadership',
      'skills.learning': 'Fast Learning',
      
      'projects.title': 'Featured Projects',
      'projects.subtitle': 'A selection of my recent work showcasing various technologies and methodologies',
      'projects.mindspace': 'AI-powered mental health platform with depression level assessment and personalized support for university students.',
      'projects.speakeasy': 'VR-based English learning platform with real-time AI feedback and interactive scenarios.',
      'projects.inventory': 'Full-stack e-commerce and warehouse management system for order processing and stock management.',
      'projects.dashboards': 'Comprehensive Power BI dashboards for operational data analysis and KPI tracking.',
      'projects.cv': 'Real-time face and eye detection with visual effects using OpenCV.',
      'projects.calculator': 'Responsive calculator application demonstrating vanilla JavaScript fundamentals.',
      
      'experience.title': 'Experience & Certifications',
      'experience.work_title': 'Work Experience',
      'experience.job1_title': 'IT Specialist (Tamheer Program)',
      'experience.job1_company': 'SGS — Saudi Arabia',
      'experience.job1_desc': 'Automated ETL pipelines using Power Automate. Designed and deployed Power BI dashboards for operational data analysis. Collaborated with cross-functional teams to improve internal processes.',
      'experience.job2_title': 'Computer Science Graduate',
      'experience.job2_company': 'University Graduation',
      'experience.job2_desc': 'Completed comprehensive computer science program with focus on AI, data engineering, and full-stack development. Developed multiple capstone projects.',
      'experience.job3_title': 'Full-Stack Developer',
      'experience.job3_company': 'Personal & Academic Projects',
      'experience.job3_desc': 'Developed multiple full-stack applications including AI-powered platforms, learning systems, and e-commerce solutions.',
      'experience.cert_title': 'Certifications & Achievements',
      'experience.cert1_name': 'CDMP Certified',
      'experience.cert1_issuer': 'Data Management Certification',
      'experience.cert2_name': 'Full-Stack Development',
      'experience.cert2_issuer': 'Comprehensive Web Development Program',
      'experience.cert3_name': 'AI & Machine Learning',
      'experience.cert3_issuer': 'Advanced AI/ML Specialization',
      
      'contact.title': 'Let\'s Connect',
      'contact.subtitle': 'I\'m open to collaborations, freelance projects, and exciting opportunities',
      'contact.get_in_touch': 'Get In Touch',
      'contact.email': 'Email',
      'contact.linkedin': 'LinkedIn',
      'contact.github': 'GitHub',
      'contact.location': 'Location',
      'contact.location_city': 'Saudi Arabia',
      'contact.form_name': 'Name',
      'contact.form_email': 'Email',
      'contact.form_subject': 'Subject',
      'contact.form_message': 'Message',
      'contact.form_submit': 'Send Message',
      
      'footer.copyright': '© 2025 Bassam Alghamdi. All rights reserved.',
      'footer.made_with': 'Crafted with code 💻 and creativity ✨',
      'site.title': 'Bassam Alghamdi — Full-Stack Developer & Software Engineer',
      'site.description': 'Full-Stack Developer | Software Engineer | AI Enthusiast | Data Engineering | OTA Automation | CDMP Certified',
    },
    ar: {
      'nav.name': 'بسام',
      'nav.about': 'عني',
      'nav.skills': 'المهارات',
      'nav.projects': 'المشاريع',
      'nav.experience': 'الخبرة',
      'nav.contact': 'اتصل',
      
      'hero.greeting': 'مرحباً، أنا',
      'hero.subtitle': 'مطور Full-Stack • مهندس برمجيات • بناء حلول ذكية وقابلة للتوسع باستخدام التقنيات الحديثة',
      'hero.description': 'متخصص في تطبيقات يدعمها الذكاء الاصطناعي، وهندسة البيانات، والتشغيل الآلي، وتطوير الويب الكامل. حاصل على شهادة CDMP.',
      'hero.cta_projects': 'عرض المشاريع',
      'hero.cta_cv': 'تحميل السيرة',
      'hero.cta_linkedin': 'LinkedIn',
      'hero.badge': 'مهندس برمجيات',
      
      'about.title': 'عني',
      'about.p1': 'أنا خريج علوم الحاسب لدي شغف ببناء تطبيقات ذكية وقابلة للتوسع تحل المشاكل الحقيقية. تتمحور خبرتي حول تطوير الويب الكامل والذكاء الاصطناعي وهندسة البيانات والتشغيل الآلي.',
      'about.p2': 'مع خبرة عملية في تصميم أنابيب ETL وتطوير منصات قائمة على الذكاء الاصطناعي وإنشاء تطبيقات ويب تفاعلية، أركز على كتابة كود نظيف وسهل الصيانة وتقديم حلول عالية الجودة.',
      'about.p3': 'حالياً، أعمل كمتخصص تكنولوجيا المعلومات (برنامج التمهير) في شركة SGS، حيث أقوم بأتمتة العمليات باستخدام Power Automate وإنشاء لوحات معلومات مؤثرة باستخدام Power BI.',
      'about.stat1': 'سنوات التعلم',
      'about.stat2': 'المشاريع المكتملة',
      'about.stat3': 'الشهادات',
      
      'skills.title': 'المهارات التقنية',
      'skills.frontend': 'تطوير الواجهة الأمامية',
      'skills.backend': 'الخادم وقواعد البيانات',
      'skills.data': 'البيانات والذكاء الاصطناعي',
      'skills.devops': 'DevOps والتشغيل الآلي',
      'skills.tools': 'الأدوات والمنصات',
      'skills.soft': 'المهارات الناعمة',
      'skills.communication': 'التواصل',
      'skills.problemsolving': 'حل المشاكل',
      'skills.teamwork': 'العمل الجماعي',
      'skills.leadership': 'الريادة',
      'skills.learning': 'التعلم السريع',
      
      'projects.title': 'المشاريع المميزة',
      'projects.subtitle': 'مجموعة مختارة من أعمالي الأخيرة التي تعرض تقنيات ومنهجيات مختلفة',
      'projects.mindspace': 'منصة صحة نفسية مدعومة بالذكاء الاصطناعي مع تقييم مستويات الاكتئاب والدعم الشخصي لطلاب الجامعة.',
      'projects.speakeasy': 'منصة تعلم اللغة الإنجليزية قائمة على الواقع الافتراضي مع تعليقات فورية من الذكاء الاصطناعي وسيناريوهات تفاعلية.',
      'projects.inventory': 'نظام e-commerce وإدارة المستودعات الكامل لمعالجة الطلبات وإدارة المخزون.',
      'projects.dashboards': 'لوحات معلومات Power BI شاملة لتحليل البيانات التشغيلية وتتبع مؤشرات الأداء الرئيسية.',
      'projects.cv': 'تطبيق الرؤية الحاسوبية للكشف عن الوجوه والعيون في الوقت الفعلي مع تأثيرات بصرية باستخدام OpenCV.',
      'projects.calculator': 'تطبيق الآلة الحاسبة سريع الاستجابة يوضح أساسيات JavaScript الفانيلا.',
      
      'experience.title': 'الخبرة والشهادات',
      'experience.work_title': 'الخبرة العملية',
      'experience.job1_title': 'متخصص تقنية المعلومات (برنامج التمهير)',
      'experience.job1_company': 'شركة SGS — المملكة العربية السعودية',
      'experience.job1_desc': 'أتمتة أنابيب ETL باستخدام Power Automate. تصميم ونشر لوحات معلومات Power BI لتحليل البيانات التشغيلية. التعاون مع فرق متعددة الوظائف لتحسين العمليات الداخلية.',
      'experience.job2_title': 'خريج علوم الحاسب',
      'experience.job2_company': 'تخرج من الجامعة',
      'experience.job2_desc': 'استكملت برنامج علوم الحاسب الشامل مع التركيز على الذكاء الاصطناعي وهندسة البيانات وتطوير الويب الكامل. طورت مشاريع capstone متعددة.',
      'experience.job3_title': 'مطور Full-Stack',
      'experience.job3_company': 'المشاريع الشخصية والأكاديمية',
      'experience.job3_desc': 'طورت تطبيقات full-stack متعددة بما في ذلك منصات قائمة على الذكاء الاصطناعي وأنظمة التعلم وحلول e-commerce.',
      'experience.cert_title': 'الشهادات والإنجازات',
      'experience.cert1_name': 'حاصل على شهادة CDMP',
      'experience.cert1_issuer': 'شهادة إدارة البيانات',
      'experience.cert2_name': 'تطوير Full-Stack',
      'experience.cert2_issuer': 'برنامج تطوير الويب الشامل',
      'experience.cert3_name': 'الذكاء الاصطناعي والتعلم الآلي',
      'experience.cert3_issuer': 'متخصص متقدم في الذكاء الاصطناعي والتعلم الآلي',
      
      'contact.title': 'دعنا نتواصل',
      'contact.subtitle': 'أنا منفتح على التعاون والمشاريع الحرة والفرص المثيرة',
      'contact.get_in_touch': 'تواصل معي',
      'contact.email': 'البريد الإلكتروني',
      'contact.linkedin': 'LinkedIn',
      'contact.github': 'GitHub',
      'contact.location': 'الموقع',
      'contact.location_city': 'المملكة العربية السعودية',
      'contact.form_name': 'الاسم',
      'contact.form_email': 'البريد الإلكتروني',
      'contact.form_subject': 'الموضوع',
      'contact.form_message': 'الرسالة',
      'contact.form_submit': 'إرسال الرسالة',
      
      'footer.copyright': '© 2025 بسام الغامدي. جميع الحقوق محفوظة.',
      'footer.made_with': 'تم صنعه بـ الكود 💻 والإبداع ✨',
      'site.title': 'بسام الغامدي — مطور Full-Stack ومهندس برمجيات',
      'site.description': 'مطور Full-Stack | مهندس برمجيات | متحمس للذكاء الاصطناعي | هندسة البيانات | أتمتة OTA | حاصل على شهادة CDMP',
    }
  };

  let currentLanguage = localStorage.getItem('language') || 'en';
  const htmlElement = document.documentElement;
  
  // ==================== THEME MANAGEMENT ====================
  
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = document.querySelector('.theme-icon');
  
  function setTheme(theme) {
    document.body.classList.remove('light', 'dark');
    document.body.classList.add(theme);
    localStorage.setItem('theme', theme);
    themeIcon.textContent = theme === 'dark' ? '🌙' : '☀️';
  }
  
  function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme(prefersDark ? 'dark' : 'light');
    }
  }
  
  themeToggle.addEventListener('click', () => {
    const currentTheme = document.body.classList.contains('dark') ? 'dark' : 'light';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
  });
  
  // ==================== LANGUAGE MANAGEMENT ====================
  
  const langEN = document.getElementById('langEN');
  const langAR = document.getElementById('langAR');
  
  function updateLanguageDisplay() {
    // Update all data-i18n attributes
    document.querySelectorAll('[data-i18n]').forEach(element => {
      const key = element.getAttribute('data-i18n');
      element.textContent = LANGUAGES[currentLanguage][key] || key;
    });
    
    // Update lang-en and lang-ar attributes
    document.querySelectorAll('[lang-en]').forEach(element => {
      if (currentLanguage === 'en') {
        element.textContent = element.getAttribute('lang-en');
      }
    });
    
    document.querySelectorAll('[lang-ar]').forEach(element => {
      if (currentLanguage === 'ar') {
        element.textContent = element.getAttribute('lang-ar');
      }
    });
  }
  
  function setLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem('language', lang);
    
    // Update HTML attributes
    htmlElement.setAttribute('lang', lang);
    htmlElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
    document.body.dir = lang === 'ar' ? 'rtl' : 'ltr';
    
    // Update font family
    if (lang === 'ar') {
      document.body.style.fontFamily = "'Tajawal', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
    } else {
      document.body.style.fontFamily = "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
    }
    
    // Update button states
    langEN.classList.toggle('active', lang === 'en');
    langAR.classList.toggle('active', lang === 'ar');
    
    // Update page title and meta description
    document.title = LANGUAGES[lang]['site.title'];
    document.querySelector('meta[name="description"]').setAttribute('content', LANGUAGES[lang]['site.description']);
    
    // Update all text
    updateLanguageDisplay();
  }
  
  langEN.addEventListener('click', () => setLanguage('en'));
  langAR.addEventListener('click', () => setLanguage('ar'));
  
  // ==================== MOBILE MENU ====================
  
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');
  
  menuToggle.addEventListener('click', () => {
    const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', !isExpanded);
    navMenu.classList.toggle('show', !isExpanded);
  });
  
  // Close menu when a link is clicked
  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      menuToggle.setAttribute('aria-expanded', 'false');
      navMenu.classList.remove('show');
    });
  });
  
  // ==================== SMOOTH SCROLLING ====================
  
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
  
  // ==================== CONTACT FORM ====================
  
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');
  
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      
      submitBtn.disabled = true;
      formStatus.textContent = 'Sending...';
      formStatus.classList.remove('success', 'error');
      
      try {
        const formData = new FormData(contactForm);
        const response = await fetch(contactForm.action, {
          method: 'POST',
          body: formData,
          headers: {
            'Accept': 'application/json',
          },
        });
        
        if (response.ok) {
          formStatus.textContent = currentLanguage === 'en' 
            ? 'Message sent successfully! Thank you for reaching out.' 
            : 'تم إرسال الرسالة بنجاح! شكراً لك.';
          formStatus.classList.add('success');
          contactForm.reset();
        } else {
          throw new Error('Form submission failed');
        }
      } catch (error) {
        formStatus.textContent = currentLanguage === 'en'
          ? 'Failed to send message. Please try again or email directly.'
          : 'فشل إرسال الرسالة. يرجى المحاولة مرة أخرى.';
        formStatus.classList.add('error');
        console.error('Form error:', error);
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
        setTimeout(() => {
          formStatus.textContent = '';
        }, 5000);
      }
    });
  }
  
  // ==================== PAGE VISIBILITY ====================
  
  const year = new Date().getFullYear();
  document.querySelectorAll('#year').forEach(el => {
    el.textContent = year;
  });
  
  // ==================== INITIALIZATION ====================
  
  initTheme();
  setLanguage(currentLanguage);
  
  // Track page interactions for analytics (optional)
  console.log('Portfolio loaded successfully');
});

// ==================== UTILITY FUNCTIONS ====================

// Intersection Observer for scroll animations (optional enhancement)
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px',
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe all sections for fade-in animation
document.querySelectorAll('.section').forEach((section) => {
  section.style.opacity = '0';
  section.style.transform = 'translateY(20px)';
  section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(section);
});
