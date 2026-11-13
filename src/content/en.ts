/**
 * English master (Appendix B). `Copy` is derived from this object, so `fr.ts`
 * and `ar.ts` cannot drift: a missing or renamed key is a type error and a
 * failing test.
 *
 * Keys marked as illustrative belong to the drawn figures (§7.1, §7.5, §7.6,
 * §7.7). They are mock chrome inside a captioned illustration, never claims.
 */
export const en = {
  meta: {
    title: "H2D.dev — Branded training for teams and academies.",
    description:
      "H2D.dev helps academies and companies create branded training with structured courses, live sessions, learner progress, and certificates.",
  },

  nav: {
    product: "Product",
    structure: "Structure",
    certificates: "Certificates",
    live: "Live sessions",
    admin: "Administration",
    faq: "FAQ",
    contact: "Contact H2D.dev",
    menu: "Open navigation menu",
    close: "Close navigation menu",
    skipToContent: "Skip to content",
    sectionLabel: "Page sections",
  },

  hero: {
    eyebrow: "H2D.dev · Learning and development",
    title: "Training for your team,",
    highlight: "built around your brand.",
    body: "I help academies and companies create a clear training experience with structured courses, live sessions, learner progress, and branded certificates.",
    ctaPrimary: "Send me a message",
    ctaSecondary: "Email me",
    meta: "Tell me what your learners need. I’ll help you find the right approach.",
    figureCaption: "Course view. Illustrative layout, not a screenshot of live data.",

    /* Illustrative course mock */
    figureCourse: "Company orientation",
    figurePath: "/course/company-orientation",
    figureLessons: ["Welcome and objectives", "Your workspace", "Security and access"],
    figureDurations: [12, 8, 15],
    figureStatusDone: "Completed",
    figureStatusProgress: "In progress",
    figureStatusLabel: "Lesson state",
    figureProgressLabel: "Course progress",
    figureProgress: 62,
    figureCertificate: "Course completed",
    figureResources: "Resources",
    figureResourceItems: ["Onboarding checklist.pdf", "Access request form.pdf"],
  },

  strip: {
    label: "Platform capabilities",
    video: "Direct uploads or external embeds",
    videoDetail: "Your bucket, or the host you already use",
    live: "Live sessions in the browser",
    liveDetail: "Built-in studio, or your own meeting link",
    certificates: "PNG and print-ready A4 PDF",
    certificatesDetail: "Issued when a course is completed",
    languages: "English, French, Arabic",
    languagesDetail: "Full right-to-left support",
  },

  structure: {
    title: "Paths, courses, lessons",
    body: "The catalogue is a hierarchy, so a learner always knows where a lesson sits and what completes it.",
    pathTitle: "Learning path",
    pathBody: "A skill area — onboarding, sales, engineering practice — that groups the courses which build it.",
    courseTitle: "Course",
    courseBody: "An ordered set of lessons with its own certificate. Publish now, or schedule a release date.",
    lessonTitle: "Lesson",
    lessonBody: "A video with an optional duration, tags, thumbnail and attached resources. Drafts stay hidden.",
    note: "Learners only see what their account has been granted, and drafts never appear in the catalogue.",
  },

  features: {
    title: "What the platform does",
    progress: {
      title: "Progress that resumes",
      body: "Per-lesson watch position: a learner returns to the second they left.",
    },
    notes: {
      title: "Notes beside the video",
      body: "A per-lesson notes panel; write while watching, keep the notes with the lesson.",
    },
    access: {
      title: "Course access per account",
      body: "All courses, a chosen set, or none — enforced on the server.",
    },
    analytics: {
      title: "Completion you can read",
      body: "Per-student progress across courses, with the state of every lesson.",
    },
    certificate: {
      title: "Certificates that issue themselves",
      body: "A certificate appears when the last published lesson is completed.",
    },
    live: {
      title: "Live, then a replay",
      body: "Schedule a session, join in the browser, chat and ask questions, link the recording.",
    },
  },

  certificates: {
    title: "A certificate that matches the course it proves",
    body: "Every published lesson completed, and the credential issues itself. The code and issue date stay the same on every visit.",
    specFormatsLabel: "Formats",
    specFormats: "{pixels} px PNG ({dpi} DPI) · one-page A4 PDF, {width} × {height} mm",
    specBordersLabel: "Frames",
    specBorders: "Seven border styles, classic rules to a guilloche band",
    specBrandingLabel: "Branding",
    specBranding: "Logo, signature and seal uploaded per learning path",
    specTypeLabel: "Typography",
    specType: "Latin and Arabic names both render correctly on export",

    /* Illustrative certificate mock */
    sampleBadge: "Sample",
    sampleCaption: "Illustrative certificate. Real certificates use your branding.",
    sampleTitle: "Certificate of completion",
    sampleRecipient: "Learner name",
    sampleCourse: "Course title",
    sampleCodeLabel: "Record",
    sampleCode: "EF-4A7C-92KD",
  },

  live: {
    title: "Scheduled sessions, joined in the browser",
    body: "Use your own meeting link — Zoom, Meet, Teams, YouTube Live — or broadcast from the built-in studio.",
    roomNote: "Either way, the room has chat, questions, reactions and raised hands.",
    chat: "Chat, with questions pinned and answered in place",
    hands: "Raised hands, so a host sees who wants to speak",
    replay: "A replay link added to the same event afterwards",
    openCta: "Ask me about live sessions",
    caption: "Session room. Illustrative layout.",

    /* Illustrative session-room mock */
    mockBadge: "Live",
    mockStageLabel: "Session stage",
    mockParticipants: "Participants",
    mockRoles: ["Host", "Co-host", "Participant"],
    mockChat: "Chat",
    mockChatLines: ["Can you repeat the access step?", "Yes — the replay link is added to this event."],
    mockReactions: "Reactions",
    mockHands: "Raised hands",
  },

  admin: {
    title: "Administration is part of the product",
    body: "Accounts, courses, lessons, live events, certificate templates and per-student progress in one console.",
    access: "All courses, selected courses, or none — chosen per student with a searchable course picker.",
    suspend:
      "Suspending an account revokes its existing sessions on the next request; progress, notes and certificates are preserved.",
    templates:
      "Per-course certificate templates: frame, accent colour, logo, signature and seal — or turn issuance off.",
    note: "Administrators always retain full access, and cannot suspend their own account.",

    /* Labelled control mocks */
    figureCaption: "Administration controls. Illustrative layout.",
    mockAccessLabel: "Course access",
    mockAccessOptions: ["All courses", "Selected courses", "None"],
    mockAccessChosen: 1,
    mockStatusLabel: "Account",
    mockStatusOptions: ["Active", "Suspended"],
    mockStatusChosen: 1,
    mockTemplateLabel: "Certificate template",
    mockTemplateValue: "guilloche",
    mockIssuanceLabel: "Issuance",
    mockIssuanceValue: "On",
  },

  protection: {
    deterredTitle: "Capture is deterred, not prevented",
    deterredBody: "Uploaded video is protected by measures that work inside the browser.",
    deterredHotkeys: "Screenshot hotkeys, right-click save, drag-out, copy, print, casting and Picture-in-Picture are blocked",
    deterredPause: "The player pauses and blurs when capture is suspected",
    deterredMark: "Every frame carries a per-viewer watermark",
    deterredUrls: "Playback URLs are signed and expire after an hour",
    deterredBucket: "Uploaded files stay in a private bucket",
    limitsTitle: "What a browser cannot stop",
    limitsBody: "None of these are solvable inside a web player.",
    limitsRecorder: "An external desktop recorder",
    limitsCamera: "A phone camera pointed at the screen",
    limitsFile: "A file that was already downloaded",
    limitsShare: "A signed URL shared before it expired",
    drm: "DRM is the only mechanism that makes captures come out black; EduFormation supports it when your stream is packaged for it.",
    hostingTitle: "Your infrastructure",
    hostingDb: "Your PostgreSQL database",
    hostingStorage: "Your S3-compatible bucket (R2 or S3)",
    hostingDomain: "Your domain",
    hostingNote: "Data stays in infrastructure you control.",
  },

  how: {
    title: "How it works",
    step1Title: "Build the path",
    step1Body: "Create a learning path, add courses, upload or embed the lessons. Leave what is not ready in draft.",
    step2Title: "Grant access",
    step2Body: "Create accounts and choose what each learner may open.",
    step3Title: "Watch it complete",
    step3Body: "Progress accumulates per learner; the certificate is issued when the course is finished.",
  },

  faq: {
    title: "Questions worth asking",
    q1: "Is this something we host, or a service we subscribe to?",
    a1: "You deploy the application with your own PostgreSQL database and S3-compatible bucket. Sign-in is by account an administrator creates; there is no self-service signup.",
    q2: "Which languages does it support?",
    a2: "English, French and Arabic, with right-to-left layouts. Every screen, including administration, uses the same three-language dictionary.",
    q3: "Can we limit which courses a learner sees?",
    a3: "Yes. Each student is granted all courses, a selected set, or none. The check runs on the server for course lists, direct links, notes and progress.",
    q4: "Do we need a separate video host?",
    a4: "No. Upload to your own storage, or embed from a host you already use. Both appear as lessons in the same course.",
    q5: "How are videos protected?",
    a5: "Casual capture is deterred: blocked hotkeys, a pausing player, a per-viewer watermark, and short-lived signed URLs. DRM is available for streams packaged for it. Nothing in a browser can prevent an external recorder.",
    q6: "Can the certificate carry our branding?",
    a6: "Yes — logo, signature, seal and accent colour, per learning path, with seven border styles. Exports are a {pixels} px PNG and a true A4 landscape PDF.",
    q7: "Is there SCORM or xAPI import?",
    a7: "Not currently. Courses are built from uploaded or embedded videos with attached resources.",
    q8: "Is there a mobile app?",
    a8: "No. The platform is a responsive web application that runs in the browser on phones and tablets.",
  },

  finalCta: {
    title: "Let’s talk about your training needs",
    body: "Share a little about your team or academy, and I’ll get back to you at the email address you provide.",
    primary: "Write a message",
  },

  footer: {
    tagline: "EduFormation, by H2D.dev.",
    product: "Product",
    courses: "Courses",
    resources: "Resources",
    contact: "Contact",
    designSystem: "Design system",
    security: "Security notes",
    legal: "© {year} EduFormation. All rights reserved.",
    locale: "Language",
    theme: "Theme",
    themeLight: "Light",
    themeDark: "Dark",
    themeSystem: "System",
  },

  form: {
    name: "Name",
    email: "Email address",
    message: "How can I help?",
    submit: "Send message",
    submitting: "Sending…",
    success: "Thanks — I’ll reply to {email}.",
    mailtoOpened: "Your email app should open with the message addressed to {email}. Send it there to complete your inquiry.",
    error: "That did not send. Try again, or email {email}.",
    errorName: "Enter the name we should address the reply to.",
    errorEmail: "Enter a valid email address, for example name@example.com.",
    errorMessage: "Write a short message so I know how to help.",
  },

  contact: {
    mailtoSubject: "Website inquiry for H2D.dev",
    mailtoBody: "Hello,",
  },

  unit: {
    minutes: "min",
  },
};

export type Copy = typeof en;
