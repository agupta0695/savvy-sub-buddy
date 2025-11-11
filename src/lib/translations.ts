// Translation system for SubSentry/Savvy Sub Buddy
export type Language = 'en' | 'hi';

export interface Translations {
  // App Name
  appName: string;
  tagline: string;

  // Login Screen
  continueWithGoogle: string;
  or: string;
  email: string;
  password: string;
  signIn: string;
  signUp: string;
  name: string;
  createAccount: string;
  alreadyHaveAccount: string;
  dontHaveAccount: string;

  // Onboarding
  neverForgetRenewal: string;
  getAlertsDesc: string;
  seeYourSpending: string;
  trackCostsDesc: string;
  cancelWithEase: string;
  stepByStepDesc: string;
  next: string;
  skip: string;
  letsGetStarted: string;

  // Dashboard
  monthlySpending: string;
  annualCost: string;
  activeSubscriptions: string;
  renewingSoon: string;
  view: string;
  noSubscriptions: string;
  renews: string;
  daysLeft: string;
  overdue: string;

  // Add/Edit Subscription
  addSubscription: string;
  editSubscription: string;
  serviceName: string;
  amount: string;
  billingCycle: string;
  monthly: string;
  quarterly: string;
  annual: string;
  nextRenewalDate: string;
  category: string;
  entertainment: string;
  fitness: string;
  software: string;
  shopping: string;
  food: string;
  other: string;
  save: string;
  cancel: string;

  // Subscription Detail
  back: string;
  details: string;
  nextRenewal: string;
  daysUntilRenewal: string;
  edit: string;
  delete: string;
  viewCancellationGuide: string;

  // Alerts
  renewalAlerts: string;
  renewsIn: string;
  stillUsing: string;
  keepIt: string;
  viewDetails: string;
  noUpcomingRenewals: string;

  // Cancellation Guide
  cancelGuide: string;
  estimatedTime: string;
  stepsToCancel: string;
  step: string;
  openCancellationPage: string;
  markAsCanceled: string;

  // Analytics
  analytics: string;
  monthlySpendingTrend: string;
  average: string;
  categoryBreakdown: string;
  topSpending: string;
  exportData: string;
  noDataAvailable: string;

  // Premium
  goPremium: string;
  upgradeToPro: string;
  unlockFeatures: string;
  perMonth: string;
  perYear: string;
  saveAmount: string;
  bestValue: string;
  choosePlan: string;
  premiumFeatures: string;
  smsAutoImport: string;
  familySharing: string;
  advancedAnalytics: string;
  whatsappAlerts: string;

  // Settings
  settings: string;
  subscriptionsTracked: string;
  saved: string;
  notifications: string;
  pushNotifications: string;
  smsAlerts: string;
  preferences: string;
  language: string;
  upgradeNow: string;
  data: string;
  exportMyData: string;
  privacyPolicy: string;
  logout: string;
  deleteAccount: string;

  // Alert Messages
  languageChanged: string;
  deleteConfirm: string;
  subscriptionCanceled: string;
  alertDismissed: string;
  dataExported: string;
  logoutConfirm: string;
  deleteAccountConfirm: string;
  typeDelete: string;
  accountDeleted: string;
  deletionCancelled: string;
  passwordMinLength: string;

  // Common
  yes: string;
  no: string;
  confirm: string;
  loading: string;
  error: string;
  success: string;
  minutes: string;
  days: string;
  members: string;
}

export const translations: Record<Language, Translations> = {
  en: {
    // App Name
    appName: 'SubSentry',
    tagline: 'Track subscriptions, save money',

    // Login Screen
    continueWithGoogle: '🔐 Continue with Google',
    or: 'or',
    email: 'Email',
    password: 'Password',
    signIn: 'Sign In',
    signUp: 'Sign Up',
    name: 'Name',
    createAccount: 'Create Account',
    alreadyHaveAccount: 'Already have an account?',
    dontHaveAccount: "Don't have an account?",

    // Onboarding
    neverForgetRenewal: 'Never Forget a Renewal',
    getAlertsDesc: 'Get alerts 7 days before your subscriptions renew',
    seeYourSpending: 'See Your Spending',
    trackCostsDesc: 'Track monthly and annual costs at a glance',
    cancelWithEase: 'Cancel with Ease',
    stepByStepDesc: 'Step-by-step guides for every platform',
    next: 'Next',
    skip: 'Skip',
    letsGetStarted: "Let's Get Started",

    // Dashboard
    monthlySpending: 'Monthly Spending',
    annualCost: 'Annual Cost',
    activeSubscriptions: 'Active Subscriptions',
    renewingSoon: 'subscription(s) renewing soon',
    view: 'View',
    noSubscriptions: 'No subscriptions yet. Click + to add one!',
    renews: 'Renews',
    daysLeft: 'days left',
    overdue: 'Overdue',

    // Add/Edit Subscription
    addSubscription: 'Add Subscription',
    editSubscription: 'Edit Subscription',
    serviceName: 'Service Name',
    amount: 'Amount',
    billingCycle: 'Billing Cycle',
    monthly: 'Monthly',
    quarterly: 'Quarterly',
    annual: 'Annual',
    nextRenewalDate: 'Next Renewal Date',
    category: 'Category',
    entertainment: 'Entertainment',
    fitness: 'Fitness',
    software: 'Software',
    shopping: 'Shopping',
    food: 'Food',
    other: 'Other',
    save: 'Save',
    cancel: 'Cancel',

    // Subscription Detail
    back: 'Back',
    details: 'Details',
    nextRenewal: 'Next Renewal',
    daysUntilRenewal: 'Days Until Renewal',
    edit: 'Edit',
    delete: 'Delete',
    viewCancellationGuide: 'View Cancellation Guide',

    // Alerts
    renewalAlerts: 'Renewal Alerts',
    renewsIn: 'Renews in',
    stillUsing: 'Still using it?',
    keepIt: 'Keep It',
    viewDetails: 'View Details',
    noUpcomingRenewals: 'No upcoming renewals in the next 7 days',

    // Cancellation Guide
    cancelGuide: 'Cancel Guide',
    estimatedTime: 'Estimated time',
    stepsToCancel: 'Steps to Cancel',
    step: 'Step',
    openCancellationPage: 'Open Cancellation Page',
    markAsCanceled: 'Mark as Canceled',

    // Analytics
    analytics: 'Analytics',
    monthlySpendingTrend: 'Monthly Spending Trend',
    average: 'Average',
    categoryBreakdown: 'Category Breakdown',
    topSpending: 'Top Spending',
    exportData: 'Export Data (CSV)',
    noDataAvailable: 'No data available',

    // Premium
    goPremium: 'Go Premium',
    upgradeToPro: 'Upgrade to Pro',
    unlockFeatures: 'Unlock SMS auto-import and family sharing',
    perMonth: 'per month',
    perYear: 'per year',
    saveAmount: 'Save',
    bestValue: 'Best Value',
    choosePlan: 'Choose Plan',
    premiumFeatures: 'Premium Features',
    smsAutoImport: 'SMS Auto-Import',
    familySharing: 'Family Sharing',
    advancedAnalytics: 'Advanced Analytics',
    whatsappAlerts: 'WhatsApp Alerts (Premium)',

    // Settings
    settings: 'Settings',
    subscriptionsTracked: 'subscriptions tracked',
    saved: 'saved',
    notifications: 'Notifications',
    pushNotifications: 'Push Notifications',
    smsAlerts: 'SMS Alerts (Premium)',
    preferences: 'Preferences',
    language: 'Language',
    upgradeNow: 'Upgrade Now',
    data: 'Data',
    exportMyData: 'Export My Data',
    privacyPolicy: 'Privacy Policy',
    logout: 'Logout',
    deleteAccount: 'Delete Account',

    // Alert Messages
    languageChanged: 'Language changed to',
    deleteConfirm: 'Are you sure you want to delete this subscription?',
    subscriptionCanceled: '🎉 Subscription marked as canceled!',
    alertDismissed: 'Alert dismissed!',
    dataExported: 'Data exported successfully!',
    logoutConfirm: 'Are you sure you want to logout?',
    deleteAccountConfirm: 'Are you sure you want to delete your account? This action cannot be undone.',
    typeDelete: 'Type "DELETE" to confirm',
    accountDeleted: 'Your account has been deleted',
    deletionCancelled: 'Account deletion cancelled',
    passwordMinLength: 'Password must be at least 8 characters',

    // Common
    yes: 'Yes',
    no: 'No',
    confirm: 'Confirm',
    loading: 'Loading...',
    error: 'Error',
    success: 'Success',
    minutes: 'minutes',
    days: 'days',
    members: 'members',
  },
  hi: {
    // App Name
    appName: 'सबसेंट्री',
    tagline: 'सदस्यताओं को ट्रैक करें, पैसे बचाएं',

    // Login Screen
    continueWithGoogle: '🔐 गूगल के साथ जारी रखें',
    or: 'या',
    email: 'ईमेल',
    password: 'पासवर्ड',
    signIn: 'साइन इन करें',
    signUp: 'साइन अप करें',
    name: 'नाम',
    createAccount: 'खाता बनाएं',
    alreadyHaveAccount: 'पहले से खाता है?',
    dontHaveAccount: 'खाता नहीं है?',

    // Onboarding
    neverForgetRenewal: 'नवीनीकरण कभी न भूलें',
    getAlertsDesc: 'अपनी सदस्यताओं के नवीनीकरण से 7 दिन पहले अलर्ट प्राप्त करें',
    seeYourSpending: 'अपना खर्च देखें',
    trackCostsDesc: 'मासिक और वार्षिक लागत को एक नज़र में ट्रैक करें',
    cancelWithEase: 'आसानी से रद्द करें',
    stepByStepDesc: 'हर प्लेटफॉर्म के लिए चरण-दर-चरण गाइड',
    next: 'अगला',
    skip: 'छोड़ें',
    letsGetStarted: 'चलिए शुरू करें',

    // Dashboard
    monthlySpending: 'मासिक खर्च',
    annualCost: 'वार्षिक लागत',
    activeSubscriptions: 'सक्रिय सदस्यताएं',
    renewingSoon: 'सदस्यताएं जल्द ही नवीनीकरण',
    view: 'देखें',
    noSubscriptions: 'अभी तक कोई सदस्यता नहीं। जोड़ने के लिए + पर क्लिक करें!',
    renews: 'नवीनीकरण',
    daysLeft: 'दिन बचे',
    overdue: 'अतिदेय',

    // Add/Edit Subscription
    addSubscription: 'सदस्यता जोड़ें',
    editSubscription: 'सदस्यता संपादित करें',
    serviceName: 'सेवा का नाम',
    amount: 'राशि',
    billingCycle: 'बिलिंग चक्र',
    monthly: 'मासिक',
    quarterly: 'त्रैमासिक',
    annual: 'वार्षिक',
    nextRenewalDate: 'अगली नवीनीकरण तिथि',
    category: 'श्रेणी',
    entertainment: 'मनोरंजन',
    fitness: 'फिटनेस',
    software: 'सॉफ्टवेयर',
    shopping: 'शॉपिंग',
    food: 'भोजन',
    other: 'अन्य',
    save: 'सहेजें',
    cancel: 'रद्द करें',

    // Subscription Detail
    back: 'वापस',
    details: 'विवरण',
    nextRenewal: 'अगला नवीनीकरण',
    daysUntilRenewal: 'नवीनीकरण तक दिन',
    edit: 'संपादित करें',
    delete: 'हटाएं',
    viewCancellationGuide: 'रद्दीकरण गाइड देखें',

    // Alerts
    renewalAlerts: 'नवीनीकरण अलर्ट',
    renewsIn: 'में नवीनीकरण',
    stillUsing: 'अभी भी उपयोग कर रहे हैं?',
    keepIt: 'रखें',
    viewDetails: 'विवरण देखें',
    noUpcomingRenewals: 'अगले 7 दिनों में कोई आगामी नवीनीकरण नहीं',

    // Cancellation Guide
    cancelGuide: 'रद्द करने की गाइड',
    estimatedTime: 'अनुमानित समय',
    stepsToCancel: 'रद्द करने के चरण',
    step: 'चरण',
    openCancellationPage: 'रद्दीकरण पृष्ठ खोलें',
    markAsCanceled: 'रद्द के रूप में चिह्नित करें',

    // Analytics
    analytics: 'विश्लेषण',
    monthlySpendingTrend: 'मासिक खर्च प्रवृत्ति',
    average: 'औसत',
    categoryBreakdown: 'श्रेणी विभाजन',
    topSpending: 'शीर्ष खर्च',
    exportData: 'डेटा निर्यात करें (CSV)',
    noDataAvailable: 'कोई डेटा उपलब्ध नहीं',

    // Premium
    goPremium: 'प्रीमियम लें',
    upgradeToPro: 'प्रो में अपग्रेड करें',
    unlockFeatures: 'SMS ऑटो-इम्पोर्ट और फैमिली शेयरिंग अनलॉक करें',
    perMonth: 'प्रति माह',
    perYear: 'प्रति वर्ष',
    saveAmount: 'बचाएं',
    bestValue: 'सर्वोत्तम मूल्य',
    choosePlan: 'योजना चुनें',
    premiumFeatures: 'प्रीमियम सुविधाएं',
    smsAutoImport: 'SMS ऑटो-इम्पोर्ट',
    familySharing: 'फैमिली शेयरिंग (5 सदस्य)',
    advancedAnalytics: 'उन्नत विश्लेषण',
    whatsappAlerts: 'व्हाट्सएप अलर्ट',

    // Settings
    settings: 'सेटिंग्स',
    subscriptionsTracked: 'सदस्यताएं ट्रैक की गईं',
    saved: 'बचाया',
    notifications: 'सूचनाएं',
    pushNotifications: 'पुश सूचनाएं',
    smsAlerts: 'SMS अलर्ट (7-दिन नवीनीकरण)',
    preferences: 'प्राथमिकताएं',
    language: 'भाषा',
    upgradeNow: 'अभी अपग्रेड करें',
    data: 'डेटा',
    exportMyData: 'मेरा डेटा निर्यात करें',
    privacyPolicy: 'गोपनीयता नीति',
    logout: 'लॉगआउट',
    deleteAccount: 'खाता हटाएं',

    // Alert Messages
    languageChanged: 'भाषा बदलकर',
    deleteConfirm: 'क्या आप वाकई इस सदस्यता को हटाना चाहते हैं?',
    subscriptionCanceled: '🎉 सदस्यता रद्द के रूप में चिह्नित!',
    alertDismissed: 'अलर्ट खारिज किया गया!',
    dataExported: 'डेटा सफलतापूर्वक निर्यात किया गया!',
    logoutConfirm: 'क्या आप वाकई लॉगआउट करना चाहते हैं?',
    deleteAccountConfirm: 'क्या आप वाकई अपना खाता हटाना चाहते हैं? यह क्रिया पूर्ववत नहीं की जा सकती।',
    typeDelete: 'खाता हटाने की पुष्टि करने के लिए "DELETE" टाइप करें',
    accountDeleted: 'आपका खाता हटा दिया गया है',
    deletionCancelled: 'खाता हटाना रद्द किया गया',
    passwordMinLength: 'पासवर्ड कम से कम 8 अक्षरों का होना चाहिए',

    // Common
    yes: 'हां',
    no: 'नहीं',
    confirm: 'पुष्टि करें',
    loading: 'लोड हो रहा है...',
    error: 'त्रुटि',
    success: 'सफलता',
    minutes: 'मिनट',
    days: 'दिन',
    members: 'सदस्य',
  },
};

// Helper function to get translation
export const getTranslation = (lang: Language, key: keyof Translations): string => {
  return translations[lang][key] || translations['en'][key];
};

// Helper function to get all translations for a language
export const getTranslations = (lang: Language): Translations => {
  return translations[lang];
};
