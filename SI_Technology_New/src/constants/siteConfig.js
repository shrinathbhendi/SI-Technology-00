export const SITE_CONFIG = {
  company: {
    name: "SI TECHNOLOGY",
    established: 2018,
    tagline: "Engineering Better Manufacturing Solutions",
    subTagline: "Developed By MindAxis Innovation Pvt Ltd.",
    owner: "Sachin Indulkar",
    industry: "Industrial Aluminium Profile Systems, Industrial Automation, Lean Manufacturing, Industrial Engineering, Manufacturing Solutions",
  },
  contact: {
    phone: "+91 95522 91025",
    phoneSecondary: "+91 97646 74113",
    phoneTel: "+919552291025",
    whatsapp: "919552291025",
    email: "sales@sitechnology.in",
    emailSecondary: "sitechnology31@gmail.com",
    address: {
      line1: "Raykar Nagar, Lane No. A-21, Shed No. 2,",
      line2: "Survey Number 148/31/32, Dhayari,",
      city: "Pune",
      zip: "411041",
      state: "Maharashtra",
      country: "India",
      full: "Raykar Nagar, Lane No. A-21, Shed No. 2, Survey Number 148/31/32, Dhayari, Pune - 411041, Maharashtra, India"
    },
    googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3784.697426177114!2d73.79155987597334!3d18.45199657140927!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc295982845c479%3A0xe54cdbfae7cf15c9!2sSI%20Technology!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin",
    googleMapsLink: "https://maps.app.goo.gl/yJWh3d8D4rD9eX3k9", // SI Technology Google Map link
    workingHours: "Mon – Sat | 9:00 AM – 6:00 PM IST"
  },
  social: {
    linkedin: "https://www.linkedin.com/in/s-i-technology-?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    instagram: "https://www.instagram.com/s_i_technology?igsh=ZnF3djVma2Z5NmVk",
    youtube: "https://youtube.com/@s_i_technology_pune?si=7euaXmYGMtwGd3ao"
  }
};

export function getWhatsAppUrl(message) {
  const defaultMsg = "Hi, I would like to request a quote and enquire about SI Technology products.";
  const encoded = encodeURIComponent(message || defaultMsg);
  return `https://wa.me/${SITE_CONFIG.contact.whatsapp}?text=${encoded}`;
}

export function getTelHref() {
  return `tel:${SITE_CONFIG.contact.phoneTel}`;
}

export function getMailtoHref(subject) {
  const defaultSubject = "Website Enquiry";
  const encodedSubject = encodeURIComponent(subject || defaultSubject);
  return `mailto:${SITE_CONFIG.contact.email}?subject=${encodedSubject}`;
}
