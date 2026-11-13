import type { Copy } from "./types";

/**
 * French. Same register as the English master: plain verbs, sentence case, no
 * marketing superlatives, and the same honest limits.
 */
export const fr = {
  meta: {
    title: "EduFormation — Votre plateforme de formation | H2D.dev",
    description:
      "Obtenez votre plateforme EduFormation personnalisée pour votre académie ou entreprise, avec votre marque, des cours, des sessions en direct, un suivi et des certificats.",
  },

  nav: {
    product: "Produit",
    structure: "Structure",
    certificates: "Certificats",
    live: "Sessions en direct",
    admin: "Administration",
    faq: "FAQ",
    contact: "Contacter H2D.dev",
    menu: "Ouvrir le menu de navigation",
    close: "Fermer le menu de navigation",
    skipToContent: "Aller au contenu",
    sectionLabel: "Sections de la page",
  },

  hero: {
    eyebrow: "H2D.dev · Formation et développement",
    title: "Votre propre plateforme de formation,",
    highlight: "conçue pour votre organisation.",
    body: "Nous créons pour chaque académie ou entreprise sa propre plateforme EduFormation personnalisée, adaptée à sa marque et à ses besoins : cours, sessions en direct, suivi des apprenants et certificats.",
    ctaPrimary: "Demander une démonstration",
    ctaSecondary: "Nous écrire",
    meta: "Découvrez EduFormation adapté à votre organisation.",
    figureCaption: "Vue d'un cours. Maquette illustrative, pas une capture de données réelles.",

    figureCourse: "Présentation de l'entreprise",
    figurePath: "/course/company-orientation",
    figureLessons: ["Accueil et objectifs", "Votre espace de travail", "Sécurité et accès"],
    figureDurations: [12, 8, 15],
    figureStatusDone: "Terminé",
    figureStatusProgress: "En cours",
    figureStatusLabel: "État de la leçon",
    figureProgressLabel: "Progression du cours",
    figureProgress: 62,
    figureCertificate: "Cours terminé",
    figureResources: "Ressources",
    figureResourceItems: ["Liste d'intégration.pdf", "Formulaire de demande d'accès.pdf"],
  },

  strip: {
    label: "Capacités de la plateforme",
    video: "Téléversement direct ou intégration externe",
    videoDetail: "Votre stockage, ou l'hébergeur que vous utilisez déjà",
    live: "Sessions en direct dans le navigateur",
    liveDetail: "Studio intégré, ou votre propre lien de réunion",
    certificates: "PNG et PDF A4 prêt à imprimer",
    certificatesDetail: "Délivré lorsqu'un cours est terminé",
    languages: "Anglais, français, arabe",
    languagesDetail: "Prise en charge complète de droite à gauche",
  },

  structure: {
    title: "Parcours, cours, leçons",
    body: "Le catalogue est une hiérarchie : l'apprenant sait toujours où se trouve une leçon et ce qui la complète.",
    pathTitle: "Parcours d'apprentissage",
    pathBody: "Un domaine de compétence — intégration, vente, pratique de l'ingénierie — qui regroupe les cours qui le constituent.",
    courseTitle: "Cours",
    courseBody: "Un ensemble ordonné de leçons avec son propre certificat. Publiez maintenant, ou planifiez une date de sortie.",
    lessonTitle: "Leçon",
    lessonBody:
      "Une vidéo avec une durée facultative, des étiquettes, une miniature et des ressources jointes. Les brouillons restent masqués.",
    note: "Les apprenants ne voient que les cours auxquels leur compte a accès, et les brouillons n'apparaissent jamais dans le catalogue.",
  },

  features: {
    title: "Ce que fait la plateforme",
    progress: {
      title: "Une progression qui reprend",
      body: "Position de lecture par leçon : l'apprenant revient à la seconde où il s'est arrêté.",
    },
    notes: {
      title: "Des notes à côté de la vidéo",
      body: "Un panneau de notes par leçon ; écrivez pendant le visionnage, les notes restent attachées à la leçon.",
    },
    access: {
      title: "Accès aux cours par compte",
      body: "Tous les cours, un ensemble choisi, ou aucun — appliqué côté serveur.",
    },
    analytics: {
      title: "Un avancement lisible",
      body: "Progression par apprenant et par cours, avec l'état de chaque leçon.",
    },
    certificate: {
      title: "Des certificats qui se délivrent seuls",
      body: "Un certificat apparaît lorsque la dernière leçon publiée est terminée.",
    },
    live: {
      title: "En direct, puis en rediffusion",
      body: "Planifiez une session, rejoignez-la dans le navigateur, échangez et posez des questions, puis ajoutez le lien de l'enregistrement.",
    },
  },

  certificates: {
    title: "Un certificat à l'image du cours qu'il atteste",
    body: "Lorsque toutes les leçons publiées sont terminées, le certificat est délivré automatiquement. Le code et la date d'émission restent identiques à chaque consultation.",
    specFormatsLabel: "Formats",
    specFormats: "PNG de {pixels} px ({dpi} DPI) · PDF A4 d'une page, {width} × {height} mm",
    specBordersLabel: "Cadres",
    specBorders: "Sept styles de bordure, du filet classique à la bande guillochée",
    specBrandingLabel: "Marque",
    specBranding: "Logo, signature et sceau téléversés par parcours d'apprentissage",
    specTypeLabel: "Typographie",
    specType: "Les noms en caractères latins et en arabe s'exportent correctement",

    sampleBadge: "Exemple",
    sampleCaption: "Certificat illustratif. Les certificats réels utilisent votre marque.",
    sampleTitle: "Certificat de réussite",
    sampleRecipient: "Nom de l'apprenant",
    sampleCourse: "Titre du cours",
    sampleCodeLabel: "Référence",
    sampleCode: "EF-4A7C-92KD",
  },

  live: {
    title: "Des sessions planifiées, rejointes dans le navigateur",
    body: "Utilisez votre propre lien de réunion — Zoom, Meet, Teams, YouTube Live — ou diffusez depuis le studio intégré.",
    roomNote: "Dans les deux cas, la salle dispose d'une messagerie, de questions, de réactions et de mains levées.",
    chat: "Une messagerie, avec les questions épinglées et leurs réponses sur place",
    hands: "Des mains levées, pour que l'animateur voie qui souhaite parler",
    replay: "Un lien de rediffusion ajouté au même événement après la session",
    openCta: "Me contacter pour les sessions en direct",
    caption: "Salle de session. Maquette illustrative.",

    mockBadge: "En direct",
    mockStageLabel: "Scène de la session",
    mockParticipants: "Participants",
    mockRoles: ["Animateur", "Co-animateur", "Participant"],
    mockChat: "Messagerie",
    mockChatLines: ["Pouvez-vous répéter l'étape d'accès ?", "Oui — le lien de rediffusion est ajouté à cet événement."],
    mockReactions: "Réactions",
    mockHands: "Mains levées",
  },

  admin: {
    title: "L'administration fait partie du produit",
    body: "Comptes, cours, leçons, événements en direct, modèles de certificats et progression par apprenant dans une même console.",
    access: "Tous les cours, certains cours ou aucun — choisis par apprenant avec un sélecteur de cours doté d'une recherche.",
    suspend:
      "Suspendre un compte révoque ses sessions actives à la requête suivante ; la progression, les notes et les certificats sont conservés.",
    templates:
      "Modèles de certificats par cours : cadre, couleur d'accentuation, logo, signature et sceau — ou désactivez l'émission.",
    note: "Les administrateurs conservent toujours un accès complet et ne peuvent pas suspendre leur propre compte.",

    figureCaption: "Commandes d’administration. Maquette illustrative.",
    mockAccessLabel: "Accès aux cours",
    mockAccessOptions: ["Tous les cours", "Certains cours", "Aucun"],
    mockAccessChosen: 1,
    mockStatusLabel: "Compte",
    mockStatusOptions: ["Actif", "Suspendu"],
    mockStatusChosen: 1,
    mockTemplateLabel: "Modèle de certificat",
    mockTemplateValue: "guilloche",
    mockIssuanceLabel: "Émission",
    mockIssuanceValue: "Activée",
  },

  protection: {
    deterredTitle: "La capture est dissuadée, pas empêchée",
    deterredBody: "La vidéo téléversée est protégée par des mesures qui fonctionnent dans le navigateur.",
    deterredHotkeys:
      "Raccourcis de capture d'écran, enregistrement par clic droit, glisser-déposer, copie, impression, diffusion et image dans l'image sont bloqués",
    deterredPause: "Le lecteur se met en pause et se floute lorsqu'une capture est suspectée",
    deterredMark: "Chaque image porte un filigrane propre au spectateur",
    deterredUrls: "Les URL de lecture sont signées et expirent après une heure",
    deterredBucket: "Les fichiers téléversés restent dans un compartiment privé",
    limitsTitle: "Ce qu'un navigateur ne peut pas arrêter",
    limitsBody: "Aucun de ces cas ne se règle dans un lecteur web.",
    limitsRecorder: "Un enregistreur de bureau externe",
    limitsCamera: "Un téléphone qui filme l'écran",
    limitsFile: "Un fichier déjà téléchargé",
    limitsShare: "Une URL signée partagée avant son expiration",
    drm: "Le DRM est le seul mécanisme qui fait apparaître les captures en noir ; EduFormation le prend en charge lorsque votre flux est préparé pour cela.",
    hostingTitle: "Votre infrastructure",
    hostingDb: "Votre base de données PostgreSQL",
    hostingStorage: "Votre compartiment compatible S3 (R2 ou S3)",
    hostingDomain: "Votre domaine",
    hostingNote: "Les données restent dans une infrastructure que vous contrôlez.",
  },

  how: {
    title: "Comment cela fonctionne",
    step1Title: "Construisez le parcours",
    step1Body:
      "Créez un parcours d'apprentissage, ajoutez des cours, téléversez ou intégrez les leçons. Laissez en brouillon ce qui n'est pas prêt.",
    step2Title: "Accordez l'accès",
    step2Body: "Créez des comptes et choisissez ce que chaque apprenant peut ouvrir.",
    step3Title: "Suivez l'achèvement",
    step3Body: "La progression s'accumule par apprenant ; le certificat est délivré lorsque le cours est terminé.",
  },

  faq: {
    title: "Les questions qui méritent d'être posées",
    q1: "Avons-nous notre propre plateforme personnalisée ?",
    a1: "Oui. Chaque académie ou entreprise dispose de sa propre plateforme EduFormation, personnalisée selon sa marque et ses besoins, avec ses cours, ses apprenants et son espace d’administration.",
    q2: "Quelles langues sont prises en charge ?",
    a2: "Anglais, français et arabe, avec des dispositions de droite à gauche. Chaque écran, administration comprise, utilise le même dictionnaire trilingue.",
    q3: "Pouvons-nous limiter les cours visibles par un apprenant ?",
    a3: "Oui. Chaque apprenant reçoit tous les cours, un ensemble choisi, ou aucun. Le contrôle s'exécute côté serveur pour les listes de cours, les liens directs, les notes et la progression.",
    q4: "Faut-il un hébergeur vidéo séparé ?",
    a4: "Non. Téléversez vers votre propre stockage, ou intégrez depuis un hébergeur que vous utilisez déjà. Les deux apparaissent comme des leçons du même cours.",
    q5: "Comment les vidéos sont-elles protégées ?",
    a5: "La capture occasionnelle est dissuadée : raccourcis bloqués, lecteur qui se met en pause, filigrane propre au spectateur et URL signées de courte durée. Le DRM est disponible pour les flux empaquetés pour cela. Rien dans un navigateur ne peut empêcher un enregistreur externe.",
    q6: "Le certificat peut-il porter notre marque ?",
    a6: "Oui — logo, signature, sceau et couleur d'accentuation, par parcours d'apprentissage, avec sept styles de bordure. Les exports sont un PNG de {pixels} px et un véritable PDF A4 paysage.",
    q7: "Existe-t-il un import SCORM ou xAPI ?",
    a7: "Pas actuellement. Les cours sont constitués de vidéos téléversées ou intégrées, avec des ressources jointes.",
    q8: "Existe-t-il une application mobile ?",
    a8: "Non. La plateforme est une application web adaptée aux téléphones et aux tablettes, qui fonctionne dans leur navigateur.",
  },

  finalCta: {
    title: "Demandez une démonstration de votre plateforme",
    body: "Présentez votre académie ou votre entreprise. Nous vous montrerons comment adapter EduFormation à votre marque, à vos apprenants et à vos objectifs.",
    primary: "Demander une démonstration",
  },

  footer: {
    tagline: "Une plateforme EduFormation personnalisée pour chaque client.",
    product: "Produit",
    courses: "Cours",
    resources: "Ressources",
    contact: "Contact",
    designSystem: "Système de design",
    security: "Notes de sécurité",
    legal: "© {year} EduFormation. Tous droits réservés.",
    locale: "Langue",
    theme: "Thème",
    themeLight: "Clair",
    themeDark: "Sombre",
    themeSystem: "Système",
  },

  form: {
    name: "Nom",
    email: "Adresse e-mail",
    message: "Que souhaitez-vous découvrir lors de la démonstration ?",
    submit: "Envoyer la demande de démonstration",
    submitting: "Envoi en cours…",
    success: "Merci — nous répondrons à {email} au sujet de votre demande de démonstration.",
    mailtoOpened: "Votre application de messagerie devrait s’ouvrir avec le message adressé à {email}. Envoyez-le pour terminer votre demande.",
    error: "L'envoi a échoué. Réessayez, ou écrivez à {email}.",
    errorName: "Indiquez le nom auquel adresser la réponse.",
    errorEmail: "Indiquez une adresse e-mail valide, par exemple nom@exemple.fr.",
    errorMessage: "Parlez-nous brièvement de votre organisation ou de vos besoins en formation.",
  },

  contact: {
    mailtoSubject: "Demande de démonstration EduFormation",
    mailtoBody: "Bonjour, je souhaite découvrir une plateforme EduFormation personnalisée pour mon organisation.",
  },

  unit: {
    minutes: "min",
  },
} satisfies Copy;
