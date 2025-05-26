import type { Multi, Link } from '@core/types';

export const languages = {
    en: 'English',
    fr: 'Français',
};

export const defaultLang = 'fr';

export const ui = {
  fr: {
    'html.title': 'Analyste Développeur',
    'html.description': 'Développeur web fullstack passionné par les technologies Web. Découvrez mes projets et mes articles sur mon blog.',
    'anchor.who-i-am': 'qui-suis-je',
    'nav.who-i-am': 'Qui suis-je',
    'nav.blog': 'Mon blog',
    'nav.contact': 'Contact',
    'blog.read': 'Voir l\'article',
    'blog.see-more' : 'Voir plus',
    'footer.made-with': 'Construit avec',
    'footer.hosted-by': 'Hébergé par',
    'footer.privacy-policy': 'Politique de confidentialité',
    'footer.legals': 'Mentions légales',
    'footer.sitemap': 'Plan du site',
    'contact.first-name': 'Prénom',
    'contact.last-name': 'Nom',
    'contact.email': 'Email',
    'contact.message': 'Message',
    'contact.send': 'Envoyer',
    'contact.rgpd': 'J\'accepte que mes données soient collectées et utilisées pour me contacter.',
    'contact.rgpd-error': 'Vous devez accepter la collecte de vos données.',
    'contact.success': 'Votre message a bien été envoyé. Je vous répondrai dès que possible.',
    'contact.server-waiting': 'Le temps que vous rédigiez votre message, je m\'occupe de démarrer le serveur...',
    'contact.server-ready': 'Serveur démarré',
    'contact.server-ko': 'Erreur serveur',
    'contact.thanks-you': 'Merci de m\'avoir contacté ! 😊 Je vous répondrai dès que possible.',
    'contact.error': 'Oh non, une erreur est survenue lors de l\'envoi de votre message. Pourtant ça marchait sur mon poste ! 😅',
    'contact.back': 'Page d\'accueil',
  },
  en: {
      'html.title': 'Fullstack Web Developer',
      'html.description': 'Fullstack web developer passionate about Web technologies. Discover my projects and my articles on my blog.',
      'anchor.who-i-am': 'who-i-am',
      'nav.who-i-am': 'Who I am',
      'nav.blog': 'My blog',
      'nav.contact': 'Contact',
      'blog.read': 'Read more',
      'blog.see-more' : 'See more',
      'footer.made-with': 'Built with',
      'footer.hosted-by': 'Hosted by',
      'footer.privacy-policy': 'Privacy policy',
      'footer.legals': 'Legals',
      'footer.sitemap': 'Sitemap',
      'contact.first-name': 'First name',
      'contact.last-name': 'Last name',
      'contact.email': 'Email',
      'contact.message': 'Message',
      'contact.send': 'Send',
      'contact.rgpd': 'I accept that my data is collected and used to contact me.',
      'contact.rgpd-error': 'You must accept the collection of your data.',
      'contact.success': 'Your message has been sent successfully. I will reply as soon as possible.',
      'contact.server-waiting': 'While you write your message, I\'m starting the server...',
      'contact.server-ready': 'Server OK',
      'contact.server-ko': 'Server error',
      'contact.thanks-you': 'Thank you for contacting me. I will reply as soon as possible.',
      'contact.error': 'Oh no, an error occurred while sending your message. It was working on my machine! 😅',
      'contact.back': 'Back to home',
  },
} as const;


export const headerRoutes: Record<string, Link[]> = {
  fr: [
    { id: 'who-i-am', href: '/#qui-suis-je', label: 'Qui suis-je' },
    { id: 'blog', href: '/blog', label: 'Mon blog' },
    { id: 'contact', href: '/contact', label: 'Contact' },
  ],
  en: [
    { id: 'who-i-am', href: '/en/#who-i-am', label: 'Who I am' },
    { id: 'blog', href: '/en/blog', label: 'My blog' },
    { id: 'contact', href: '/en/contact', label: 'Contact' },
  ],
}

export const footerRoutes: Record<string, Link[]> = {
  fr: [
    { id: 'legals', href: '/legals', label: 'Mentions légales' },
    { id: 'privacy', href: '/privacy-policy', label: 'Politique de confidentialité' }
  ],
  en: [
    { id: 'legals', href: '/en/legals', label: 'Legals' },
    { id: 'privacy', href: '/en/privacy-policy', label: 'Privacy policy' }
  ],
}

// Strings for OG spaces in header
export const ogStrings: Multi = {
  en: "en_GB",
  fr: "fr_FR",
}