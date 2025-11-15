// Translation system for SubSentry/Savvy Sub Buddy
export type Language = 'en' | 'hi' | 'te' | 'gu' | 'ta';

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
    tagline: 'Never forget a Subscription',

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
  te: {
    // App Name
    appName: 'సబ్‌సెంట్రీ',
    tagline: 'సబ్స్క్రిప్షన్‌లను ట్రాక్ చేయండి, డబ్బు ఆదా చేయండి',

    // Login Screen
    continueWithGoogle: '🔐 Google తో కొనసాగించండి',
    or: 'లేదా',
    email: 'ఇమెయిల్',
    password: 'పాస్‌వర్డ్',
    signIn: 'సైన్ ఇన్ చేయండి',
    signUp: 'సైన్ అప్ చేయండి',
    name: 'పేరు',
    createAccount: 'ఖాతా సృష్టించండి',
    alreadyHaveAccount: 'ఇప్పటికే ఖాతా ఉందా?',
    dontHaveAccount: 'ఖాతా లేదా?',

    // Onboarding
    neverForgetRenewal: 'రీన్యూవల్ ఎప్పుడూ మరచిపోవద్దు',
    getAlertsDesc: 'మీ సబ్స్క్రిప్షన్‌లు రీన్యూ అవ్వడానికి 7 రోజుల ముందు అలర్ట్‌లు పొందండి',
    seeYourSpending: 'మీ ఖర్చులను చూడండి',
    trackCostsDesc: 'నెలవారీ మరియు వార్షిక ఖర్చులను ఒక చూపులో ట్రాక్ చేయండి',
    cancelWithEase: 'సులభంగా రద్దు చేయండి',
    stepByStepDesc: 'ప్రతి ప్లాట్‌ఫారమ్ కోసం దశల వారీగా గైడ్‌లు',
    next: 'తర్వాత',
    skip: 'దాటవేయండి',
    letsGetStarted: 'ప్రారంభిద్దాం',

    // Dashboard
    monthlySpending: 'నెలవారీ ఖర్చు',
    annualCost: 'వార్షిక ఖర్చు',
    activeSubscriptions: 'క్రియాశీల సబ్స్క్రిప్షన్‌లు',
    renewingSoon: 'త్వరలో రీన్యూ అయ్యే సబ్స్క్రిప్షన్‌లు',
    view: 'చూడండి',
    noSubscriptions: 'ఇంకా సబ్స్క్రిప్షన్‌లు లేవు. ఒకదాన్ని జోడించడానికి + క్లిక్ చేయండి!',
    renews: 'రీన్యూ అవుతుంది',
    daysLeft: 'రోజులు మిగిలి ఉన్నాయి',
    overdue: 'గడువు దాటింది',

    // Add/Edit Subscription
    addSubscription: 'సబ్స్క్రిప్షన్ జోడించండి',
    editSubscription: 'సబ్స్క్రిప్షన్ సవరించండి',
    serviceName: 'సేవ పేరు',
    amount: 'మొత్తం',
    billingCycle: 'బిల్లింగ్ చక్రం',
    monthly: 'నెలవారీ',
    quarterly: 'త్రైమాసికం',
    annual: 'వార్షికం',
    nextRenewalDate: 'తదుపరి రీన్యూవల్ తేదీ',
    category: 'వర్గం',
    entertainment: 'వినోదం',
    fitness: 'ఫిట్‌నెస్',
    software: 'సాఫ్ట్‌వేర్',
    shopping: 'షాపింగ్',
    food: 'ఆహారం',
    other: 'ఇతరులు',
    save: 'సేవ్ చేయండి',
    cancel: 'రద్దు చేయండి',

    // Subscription Detail
    back: 'వెనుకకు',
    details: 'వివరాలు',
    nextRenewal: 'తదుపరి రీన్యూవల్',
    daysUntilRenewal: 'రీన్యూవల్ వరకు రోజులు',
    edit: 'సవరించండి',
    delete: 'తొలగించండి',
    viewCancellationGuide: 'రద్దు గైడ్ చూడండి',

    // Alerts
    renewalAlerts: 'రీన్యూవల్ అలర్ట్‌లు',
    renewsIn: 'లో రీన్యూ అవుతుంది',
    stillUsing: 'ఇంకా ఉపయోగిస్తున్నారా?',
    keepIt: 'ఉంచండి',
    viewDetails: 'వివరాలు చూడండి',
    noUpcomingRenewals: 'రాబోయే 7 రోజుల్లో రీన్యూవల్స్ లేవు',

    // Cancellation Guide
    cancelGuide: 'రద్దు గైడ్',
    estimatedTime: 'అంచనా సమయం',
    stepsToCancel: 'రద్దు చేయడానికి దశలు',
    step: 'దశ',
    openCancellationPage: 'రద్దు పేజీని తెరవండి',
    markAsCanceled: 'రద్దు చేసినట్లు గుర్తించండి',

    // Analytics
    analytics: 'విశ్లేషణలు',
    monthlySpendingTrend: 'నెలవారీ ఖర్చు ధోరణి',
    average: 'సగటు',
    categoryBreakdown: 'వర్గ విభజన',
    topSpending: 'అత్యధిక ఖర్చు',
    exportData: 'డేటా ఎగుమతి చేయండి',
    noDataAvailable: 'డేటా అందుబాటులో లేదు',

    // Premium
    goPremium: 'ప్రీమియం పొందండి',
    upgradeToPro: 'ప్రో కు అప్‌గ్రేడ్ చేయండి',
    unlockFeatures: 'అన్ని ప్రీమియం ఫీచర్లను అన్‌లాక్ చేయండి',
    perMonth: '/నెల',
    perYear: '/సంవత్సరం',
    saveAmount: '₹240 ఆదా చేయండి',
    bestValue: 'ఉత్తమ విలువ',
    choosePlan: 'ప్లాన్ ఎంచుకోండి',
    premiumFeatures: 'ప్రీమియం ఫీచర్లు',
    smsAutoImport: 'SMS ఆటో-ఇంపోర్ట్',
    familySharing: 'కుటుంబ షేరింగ్',
    advancedAnalytics: 'అధునాతన విశ్లేషణలు',
    whatsappAlerts: 'WhatsApp అలర్ట్‌లు',

    // Settings
    settings: 'సెట్టింగ్‌లు',
    subscriptionsTracked: 'సబ్స్క్రిప్షన్‌లు ట్రాక్ చేయబడ్డాయి',
    saved: 'ఆదా చేయబడింది',
    notifications: 'నోటిఫికేషన్‌లు',
    pushNotifications: 'పుష్ నోటిఫికేషన్‌లు',
    smsAlerts: 'SMS అలర్ట్‌లు',
    preferences: 'ప్రాధాన్యతలు',
    language: 'భాష',
    upgradeNow: 'ఇప్పుడే అప్‌గ్రేడ్ చేయండి',
    data: 'డేటా',
    exportMyData: 'నా డేటా ఎగుమతి చేయండి',
    privacyPolicy: 'గోప్యతా విధానం',
    logout: 'లాగ్ అవుట్',
    deleteAccount: 'ఖాతా తొలగించండి',

    // Alert Messages
    languageChanged: 'భాష మార్చబడింది',
    deleteConfirm: 'మీరు ఖచ్చితంగా ఈ సబ్స్క్రిప్షన్‌ను తొలగించాలనుకుంటున్నారా?',
    subscriptionCanceled: 'సబ్స్క్రిప్షన్ రద్దు చేయబడింది',
    alertDismissed: 'అలర్ట్ తొలగించబడింది',
    dataExported: 'డేటా ఎగుమతి చేయబడింది',
    logoutConfirm: 'మీరు ఖచ్చితంగా లాగ్ అవుట్ చేయాలనుకుంటున్నారా?',
    deleteAccountConfirm: 'మీ ఖాతాను తొలగించడానికి "DELETE" అని టైప్ చేయండి',
    typeDelete: 'DELETE',
    accountDeleted: 'ఖాతా తొలగించబడింది',
    deletionCancelled: 'తొలగింపు రద్దు చేయబడింది',
    passwordMinLength: 'పాస్‌వర్డ్ కనీసం 6 అక్షరాలు ఉండాలి',

    // Common
    yes: 'అవును',
    no: 'కాదు',
    confirm: 'నిర్ధారించండి',
    loading: 'లోడ్ అవుతోంది...',
    error: 'లోపం',
    success: 'విజయం',
    minutes: 'నిమిషాలు',
    days: 'రోజులు',
    members: 'సభ్యులు',
  },
  gu: {
    // App Name
    appName: 'સબસેન્ટ્રી',
    tagline: 'સબ્સ્ક્રિપ્શન્સ ટ્રેક કરો, પૈસા બચાવો',

    // Login Screen
    continueWithGoogle: '🔐 Google સાથે ચાલુ રાખો',
    or: 'અથવા',
    email: 'ઈમેલ',
    password: 'પાસવર્ડ',
    signIn: 'સાઇન ઇન કરો',
    signUp: 'સાઇન અપ કરો',
    name: 'નામ',
    createAccount: 'એકાઉન્ટ બનાવો',
    alreadyHaveAccount: 'પહેલેથી એકાઉન્ટ છે?',
    dontHaveAccount: 'એકાઉન્ટ નથી?',

    // Onboarding
    neverForgetRenewal: 'રિન્યૂઅલ ક્યારેય ભૂલશો નહીં',
    getAlertsDesc: 'તમારા સબ્સ્ક્રિપ્શન્સ રિન્યૂ થાય તેના 7 દિવસ પહેલાં એલર્ટ મેળવો',
    seeYourSpending: 'તમારો ખર્ચ જુઓ',
    trackCostsDesc: 'એક નજરમાં માસિક અને વાર્ષિક ખર્ચ ટ્રેક કરો',
    cancelWithEase: 'સરળતાથી રદ કરો',
    stepByStepDesc: 'દરેક પ્લેટફોર્મ માટે સ્ટેપ-બાય-સ્ટેપ માર્ગદર્શિકા',
    next: 'આગળ',
    skip: 'છોડો',
    letsGetStarted: 'ચાલો શરૂ કરીએ',

    // Dashboard
    monthlySpending: 'માસિક ખર્ચ',
    annualCost: 'વાર્ષિક ખર્ચ',
    activeSubscriptions: 'સક્રિય સબ્સ્ક્રિપ્શન્સ',
    renewingSoon: 'ટૂંક સમયમાં રિન્યૂ થતા સબ્સ્ક્રિપ્શન્સ',
    view: 'જુઓ',
    noSubscriptions: 'હજુ સુધી કોઈ સબ્સ્ક્રિપ્શન નથી. એક ઉમેરવા + ક્લિક કરો!',
    renews: 'રિન્યૂ થાય',
    daysLeft: 'દિવસ બાકી',
    overdue: 'મુદત વીતી ગઈ',

    // Add/Edit Subscription
    addSubscription: 'સબ્સ્ક્રિપ્શન ઉમેરો',
    editSubscription: 'સબ્સ્ક્રિપ્શન સંપાદિત કરો',
    serviceName: 'સેવાનું નામ',
    amount: 'રકમ',
    billingCycle: 'બિલિંગ ચક્ર',
    monthly: 'માસિક',
    quarterly: 'ત્રિમાસિક',
    annual: 'વાર્ષિક',
    nextRenewalDate: 'આગામી રિન્યૂઅલ તારીખ',
    category: 'શ્રેણી',
    entertainment: 'મનોરંજન',
    fitness: 'ફિટનેસ',
    software: 'સોફ્ટવેર',
    shopping: 'શોપિંગ',
    food: 'ખોરાક',
    other: 'અન્ય',
    save: 'સેવ કરો',
    cancel: 'રદ કરો',

    // Subscription Detail
    back: 'પાછળ',
    details: 'વિગતો',
    nextRenewal: 'આગામી રિન્યૂઅલ',
    daysUntilRenewal: 'રિન્યૂઅલ સુધી દિવસો',
    edit: 'સંપાદિત કરો',
    delete: 'કાઢી નાખો',
    viewCancellationGuide: 'રદ કરવાની માર્ગદર્શિકા જુઓ',

    // Alerts
    renewalAlerts: 'રિન્યૂઅલ એલર્ટ્સ',
    renewsIn: 'માં રિન્યૂ થાય',
    stillUsing: 'હજુ પણ ઉપયોગ કરી રહ્યા છો?',
    keepIt: 'રાખો',
    viewDetails: 'વિગતો જુઓ',
    noUpcomingRenewals: 'આગામી 7 દિવસમાં કોઈ રિન્યૂઅલ નથી',

    // Cancellation Guide
    cancelGuide: 'રદ કરવાની માર્ગદર્શિકા',
    estimatedTime: 'અંદાજિત સમય',
    stepsToCancel: 'રદ કરવાના પગલાં',
    step: 'પગલું',
    openCancellationPage: 'રદ કરવાનું પેજ ખોલો',
    markAsCanceled: 'રદ થયેલ તરીકે ચિહ્નિત કરો',

    // Analytics
    analytics: 'વિશ્લેષણ',
    monthlySpendingTrend: 'માસિક ખર્ચ વલણ',
    average: 'સરેરાશ',
    categoryBreakdown: 'શ્રેણી વિભાજન',
    topSpending: 'સૌથી વધુ ખર્ચ',
    exportData: 'ડેટા એક્સપોર્ટ કરો',
    noDataAvailable: 'કોઈ ડેટા ઉપલબ્ધ નથી',

    // Premium
    goPremium: 'પ્રીમિયમ મેળવો',
    upgradeToPro: 'પ્રો માં અપગ્રેડ કરો',
    unlockFeatures: 'બધી પ્રીમિયમ સુવિધાઓ અનલોક કરો',
    perMonth: '/મહિનો',
    perYear: '/વર્ષ',
    saveAmount: '₹240 બચાવો',
    bestValue: 'શ્રેષ્ઠ મૂલ્ય',
    choosePlan: 'યોજના પસંદ કરો',
    premiumFeatures: 'પ્રીમિયમ સુવિધાઓ',
    smsAutoImport: 'SMS ઓટો-ઇમ્પોર્ટ',
    familySharing: 'પરિવાર શેરિંગ',
    advancedAnalytics: 'અદ્યતન વિશ્લેષણ',
    whatsappAlerts: 'WhatsApp એલર્ટ્સ',

    // Settings
    settings: 'સેટિંગ્સ',
    subscriptionsTracked: 'સબ્સ્ક્રિપ્શન્સ ટ્રેક કરેલ',
    saved: 'સેવ કરેલ',
    notifications: 'સૂચનાઓ',
    pushNotifications: 'પુશ સૂચનાઓ',
    smsAlerts: 'SMS એલર્ટ્સ',
    preferences: 'પસંદગીઓ',
    language: 'ભાષા',
    upgradeNow: 'હમણાં અપગ્રેડ કરો',
    data: 'ડેટા',
    exportMyData: 'મારો ડેટા એક્સપોર્ટ કરો',
    privacyPolicy: 'ગોપનીયતા નીતિ',
    logout: 'લોગ આઉટ',
    deleteAccount: 'એકાઉન્ટ કાઢી નાખો',

    // Alert Messages
    languageChanged: 'ભાષા બદલાઈ ગઈ',
    deleteConfirm: 'શું તમે ખરેખર આ સબ્સ્ક્રિપ્શન કાઢી નાખવા માંગો છો?',
    subscriptionCanceled: 'સબ્સ્ક્રિપ્શન રદ થઈ ગયું',
    alertDismissed: 'એલર્ટ કાઢી નાખ્યું',
    dataExported: 'ડેટા એક્સપોર્ટ થયો',
    logoutConfirm: 'શું તમે ખરેખર લોગ આઉટ કરવા માંગો છો?',
    deleteAccountConfirm: 'તમારું એકાઉન્ટ કાઢી નાખવા "DELETE" ટાઇપ કરો',
    typeDelete: 'DELETE',
    accountDeleted: 'એકાઉન્ટ કાઢી નાખ્યું',
    deletionCancelled: 'કાઢી નાખવું રદ કર્યું',
    passwordMinLength: 'પાસવર્ડ ઓછામાં ઓછો 6 અક્ષરોનો હોવો જોઈએ',

    // Common
    yes: 'હા',
    no: 'ના',
    confirm: 'પુષ્ટિ કરો',
    loading: 'લોડ થઈ રહ્યું છે...',
    error: 'ભૂલ',
    success: 'સફળતા',
    minutes: 'મિનિટ',
    days: 'દિવસો',
    members: 'સભ્યો',
  },
  ta: {
    // App Name
    appName: 'சப்செண்ட்ரி',
    tagline: 'சந்தாக்களை கண்காணித்து, பணம் சேமிக்கவும்',

    // Login Screen
    continueWithGoogle: '🔐 Google உடன் தொடரவும்',
    or: 'அல்லது',
    email: 'மின்னஞ்சல்',
    password: 'கடவுச்சொல்',
    signIn: 'உள்நுழைக',
    signUp: 'பதிவு செய்க',
    name: 'பெயர்',
    createAccount: 'கணக்கை உருவாக்கு',
    alreadyHaveAccount: 'ஏற்கனவே கணக்கு உள்ளதா?',
    dontHaveAccount: 'கணக்கு இல்லையா?',

    // Onboarding
    neverForgetRenewal: 'புதுப்பிப்பை மறக்காதீர்கள்',
    getAlertsDesc: 'உங்கள் சந்தாக்கள் புதுப்பிக்கப்படுவதற்கு 7 நாட்களுக்கு முன் எச்சரிக்கைகளை பெறுங்கள்',
    seeYourSpending: 'உங்கள் செலவைப் பார்க்கவும்',
    trackCostsDesc: 'மாதாந்திர மற்றும் வருடாந்திர செலவுகளை ஒரே பார்வையில் கண்காணிக்கவும்',
    cancelWithEase: 'எளிதாக ரத்து செய்யவும்',
    stepByStepDesc: 'ஒவ்வொரு தளத்திற்கும் படிப்படியான வழிகாட்டிகள்',
    next: 'அடுத்து',
    skip: 'தவிர்க்கவும்',
    letsGetStarted: 'தொடங்குவோம்',

    // Dashboard
    monthlySpending: 'மாதாந்திர செலவு',
    annualCost: 'வருடாந்திர செலவு',
    activeSubscriptions: 'செயலில் உள்ள சந்தாக்கள்',
    renewingSoon: 'விரைவில் புதுப்பிக்கப்படும் சந்தாக்கள்',
    view: 'பார்க்கவும்',
    noSubscriptions: 'இன்னும் சந்தாக்கள் இல்லை. ஒன்றைச் சேர்க்க + கிளிக் செய்யவும்!',
    renews: 'புதுப்பிக்கப்படும்',
    daysLeft: 'நாட்கள் உள்ளன',
    overdue: 'காலாவதியானது',

    // Add/Edit Subscription
    addSubscription: 'சந்தா சேர்க்கவும்',
    editSubscription: 'சந்தா திருத்தவும்',
    serviceName: 'சேவையின் பெயர்',
    amount: 'தொகை',
    billingCycle: 'பில் சுழற்சி',
    monthly: 'மாதாந்திர',
    quarterly: 'காலாண்டு',
    annual: 'வருடாந்திர',
    nextRenewalDate: 'அடுத்த புதுப்பிப்பு தேதி',
    category: 'வகை',
    entertainment: 'பொழுதுபோக்கு',
    fitness: 'உடற்பயிற்சி',
    software: 'மென்பொருள்',
    shopping: 'ஷாப்பிங்',
    food: 'உணவு',
    other: 'மற்றவை',
    save: 'சேமிக்கவும்',
    cancel: 'ரத்து செய்யவும்',

    // Subscription Detail
    back: 'பின்னோக்கி',
    details: 'விவரங்கள்',
    nextRenewal: 'அடுத்த புதுப்பிப்பு',
    daysUntilRenewal: 'புதுப்பிப்பு வரை நாட்கள்',
    edit: 'திருத்தவும்',
    delete: 'நீக்கவும்',
    viewCancellationGuide: 'ரத்து வழிகாட்டியைப் பார்க்கவும்',

    // Alerts
    renewalAlerts: 'புதுப்பிப்பு எச்சரிக்கைகள்',
    renewsIn: 'இல் புதுப்பிக்கப்படும்',
    stillUsing: 'இன்னும் பயன்படுத்துகிறீர்களா?',
    keepIt: 'வைத்திருக்கவும்',
    viewDetails: 'விவரங்களைப் பார்க்கவும்',
    noUpcomingRenewals: 'அடுத்த 7 நாட்களில் புதுப்பிப்புகள் இல்லை',

    // Cancellation Guide
    cancelGuide: 'ரத்து வழிகாட்டி',
    estimatedTime: 'மதிப்பிடப்பட்ட நேரம்',
    stepsToCancel: 'ரத்து செய்வதற்கான படிகள்',
    step: 'படி',
    openCancellationPage: 'ரத்து பக்கத்தைத் திறக்கவும்',
    markAsCanceled: 'ரத்து செய்யப்பட்டதாக குறிக்கவும்',

    // Analytics
    analytics: 'பகுப்பாய்வுகள்',
    monthlySpendingTrend: 'மாதாந்திர செலவு போக்கு',
    average: 'சராசரி',
    categoryBreakdown: 'வகை பிரிவு',
    topSpending: 'அதிக செலவு',
    exportData: 'தரவை ஏற்றுமதி செய்யவும்',
    noDataAvailable: 'தரவு கிடைக்கவில்லை',

    // Premium
    goPremium: 'பிரீமியம் பெறவும்',
    upgradeToPro: 'புரோவிற்கு மேம்படுத்தவும்',
    unlockFeatures: 'அனைத்து பிரீமியம் அம்சங்களையும் திறக்கவும்',
    perMonth: '/மாதம்',
    perYear: '/ஆண்டு',
    saveAmount: '₹240 சேமிக்கவும்',
    bestValue: 'சிறந்த மதிப்பு',
    choosePlan: 'திட்டத்தைத் தேர்வு செய்யவும்',
    premiumFeatures: 'பிரீமியம் அம்சங்கள்',
    smsAutoImport: 'SMS தானியங்கு இறக்குமதி',
    familySharing: 'குடும்ப பகிர்வு',
    advancedAnalytics: 'மேம்பட்ட பகுப்பாய்வுகள்',
    whatsappAlerts: 'WhatsApp எச்சரிக்கைகள்',

    // Settings
    settings: 'அமைப்புகள்',
    subscriptionsTracked: 'சந்தாக்கள் கண்காணிக்கப்படுகின்றன',
    saved: 'சேமிக்கப்பட்டது',
    notifications: 'அறிவிப்புகள்',
    pushNotifications: 'புஷ் அறிவிப்புகள்',
    smsAlerts: 'SMS எச்சரிக்கைகள்',
    preferences: 'விருப்பத்தேர்வுகள்',
    language: 'மொழி',
    upgradeNow: 'இப்போதே மேம்படுத்தவும்',
    data: 'தரவு',
    exportMyData: 'எனது தரவை ஏற்றுமதி செய்யவும்',
    privacyPolicy: 'தனியுரிமை கொள்கை',
    logout: 'வெளியேறு',
    deleteAccount: 'கணக்கை நீக்கவும்',

    // Alert Messages
    languageChanged: 'மொழி மாற்றப்பட்டது',
    deleteConfirm: 'இந்த சந்தாவை நிச்சயமாக நீக்க விரும்புகிறீர்களா?',
    subscriptionCanceled: 'சந்தா ரத்து செய்யப்பட்டது',
    alertDismissed: 'எச்சரிக்கை நிராகரிக்கப்பட்டது',
    dataExported: 'தரவு ஏற்றுமதி செய்யப்பட்டது',
    logoutConfirm: 'நீங்கள் நிச்சயமாக வெளியேற விரும்புகிறீர்களா?',
    deleteAccountConfirm: 'உங்கள் கணக்கை நீக்க "DELETE" என டைப் செய்யவும்',
    typeDelete: 'DELETE',
    accountDeleted: 'கணக்கு நீக்கப்பட்டது',
    deletionCancelled: 'நீக்குதல் ரத்து செய்யப்பட்டது',
    passwordMinLength: 'கடவுச்சொல் குறைந்தது 6 எழுத்துக்களாக இருக்க வேண்டும்',

    // Common
    yes: 'ஆம்',
    no: 'இல்லை',
    confirm: 'உறுதிப்படுத்தவும்',
    loading: 'ஏற்றுகிறது...',
    error: 'பிழை',
    success: 'வெற்றி',
    minutes: 'நிமிடங்கள்',
    days: 'நாட்கள்',
    members: 'உறுப்பினர்கள்',
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
