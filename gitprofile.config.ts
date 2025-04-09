// gitprofile.config.ts

const CONFIG = {
  github: {
    username: 'akiidjk', // Your GitHub org/user name. (This is the only required config)
  },
  /**
   * If you are deploying to https://<USERNAME>.github.io/, for example your repository is at https://github.com/arifszn/arifszn.github.io, set base to '/'.
   * If you are deploying to https://<USERNAME>.github.io/<REPO_NAME>/,
   * for example your repository is at https://github.com/arifszn/portfolio, then set base to '/portfolio/'.
   */
  base: '/portfolio/',
  projects: {
    github: {
      display: true, // Display GitHub projects?
      header: 'Github Projects',
      mode: 'manual', // Mode can be: 'automatic' or 'manual'
      automatic: {
        sortBy: 'stars', // Sort projects by 'stars' or 'updated'
        limit: 6, // How many projects to display.
        exclude: {
          forks: true, // Forked projects will not be displayed if set to true.
          projects: [], // These projects will not be displayed. example: ['arifszn/my-project1', 'arifszn/my-project2']
        },
      },
      manual: {
        // Properties for manually specifying projects
        projects: [
          'akiidjk/Adh',
          'akiidjk/DiscordCTFHelper',
          'akiidjk/SLANotifier',
          'akiidjk/ProjectFABT',
          'akiidjk/ShellDeeple',
          'akiidjk/SysScope',
        ], // List of repository names to display. example: ['arifszn/my-project1', 'arifszn/my-project2']
      },
    },
    external: {
      header: 'My Projects',
      // To hide the `External Projects` section, keep it empty.
      projects: [
        // {
        //   title: 'Project Name',
        //   description:
        //     'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc ut.',
        //   imageUrl:
        //     'https://img.freepik.com/free-vector/illustration-gallery-icon_53876-27002.jpg',
        //   link: 'https://example.com',
        // },
        // {
        //   title: 'Project Name',
        //   description:
        //     'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc ut.',
        //   imageUrl:
        //     'https://img.freepik.com/free-vector/illustration-gallery-icon_53876-27002.jpg',
        //   link: 'https://example.com',
        // },
      ],
    },
  },
  seo: {
    title: 'Portfolio of Francesco Memoli aka akiidjk',
    description:
      "I'm a 12th-grade student with a strong passion for technology, innovation, and problem-solving. With a solid foundation in Python",
    imageURL: '/public/banner.png',
  },
  social: {
    linkedin: '',
    twitter: 'akiidjk',
    mastodon: '',
    researchGate: '',
    facebook: '',
    instagram: 'akiidjk',
    reddit: 'akiidjk',
    threads: 'akiidjk',
    youtube: '', // example: 'pewdiepie'
    udemy: '',
    dribbble: '',
    behance: '',
    medium: '',
    dev: '',
    stackoverflow: '', // example: '1/jeff-atwood'
    skype: '',
    telegram: '',
    website: 'https://bytethecookies.github.io/',
    phone: '',
    email: 'akiidjk@proton.com',
  },
  resume: {
    fileUrl: '', // Empty fileUrl will hide the `Download Resume` button.
  },
  skills: [
    'Python',
    'Golang',
    'Rust',
    'C',
    'Dart/Flutter',
    'eBPF',
    'Bash',
    'Docker',
    'Git',
  ],
  experiences: [
    {
      company: 'Exotique Malta (Valletta)',
      position: 'Technical Assistant',
      from: 'October 2024',
      to: 'November 2024',
      companyLink: 'https://exotique.com.mt/valletta-store/',
    },
  ],
  certifications: [
    // {
    //   name: 'Lorem ipsum',
    //   body: 'Lorem ipsum dolor sit amet',
    //   year: 'March 2022',
    //   link: 'https://example.com',
    // },
  ],
  educations: [
    {
      institution: 'IIS Margherita Hack Baronissi',
      degree: 'Degree (not yet)',
      from: '2020',
      to: '2025',
    },
    // {
    //   institution: 'Institution Name',
    //   degree: 'Degree',
    //   from: '2012',
    //   to: '2014',
    // },
  ],
  publications: [
    {
      title: 'Writeup Trendz part 1 & 2 (Cyberspace 2024) - ByteTheCookies',
      conferenceName: '',
      journalName: 'ByteTheCookies',
      authors: 'akiidjk',
      link: 'https://bytethecookies.github.io/writeups/cyberspace2024/trendz/',
      description:
        'This challenge is divided into four parts, three webs and a reverse. I’m excited to share that I managed to solve the first two webs! I’ll insert them all in a write-up, trying to explain them in the way the author thought. I admit I did not solve them in order, but I’m eager to see how they fit together. The application was written in Go using templates and a JWT authentication, and it’s write well! The application itself has many files, but they are well written and ordered, so a thorough analysis is not difficult but necessary. The application is divided into 5 basic parts.',
    },
    {
      title: 'Writeup b64SiteViewer (IronCTF 2024) - ByteTheCookies',
      conferenceName: '',
      journalName: 'ByteTheCookies',
      authors: 'akiidjk',
      link: 'https://bytethecookies.github.io/writeups/ironctf2024/b64siteviewer/',
      description:
        'This is one of the challenges added later, but despite that it wasn’t very complex, in fact the most complex part wasn’t even the web part, but despite that the challenge was still really nice',
    },
    {
      title: 'Writeup Speed - ByteTheCookies',
      conferenceName: '',
      journalName: 'ByteTheCookies',
      authors: 'akiidjk',
      link: 'https://bytethecookies.github.io/writeups/srdnlen2025/speed/',
      description:
        'Welcome to Radiator Springs’ finest store, where every car enthusiast’s dream comes true! But remember, in the world of racing, precision matters—so tread carefully as you navigate this high-octane experience. Ka-chow!',
    },
    {
      title: 'Telemetry',
      conferenceName: '',
      journalName: 'ByteTheCookies',
      authors: 'akiidjk',
      link: 'https://bytethecookies.github.io/writeups/ulisse2025/telemetry/',
      description:
        'Elia has just developed a brand-new website to analyze logs at runtime 🧻. Confident in his security skills, he bet his entire house that you won’t find the hidden flag… Will you prove him wrong? 🏠🔍',
    },
  ],
  // Display articles from your medium or dev account. (Optional)
  blog: {
    source: 'dev', // medium | dev
    username: 'akiidjk', // to hide blog section, keep it empty
    limit: 2, // How many articles to display. Max is 10.
  },
  googleAnalytics: {
    id: '', // GA3 tracking id/GA4 tag id UA-XXXXXXXXX-X | G-XXXXXXXXXX
  },
  // Track visitor interaction and behavior. https://www.hotjar.com
  hotjar: {
    id: '',
    snippetVersion: 6,
  },
  themeConfig: {
    defaultTheme: 'dracula',

    // Hides the switch in the navbar
    // Useful if you want to support a single color mode
    disableSwitch: true,

    // Should use the prefers-color-scheme media-query,
    // using user system preferences, instead of the hardcoded defaultTheme
    respectPrefersColorScheme: true,

    // Display the ring in Profile picture
    displayAvatarRing: true,

    // Available themes. To remove any theme, exclude from here.
    themes: [
      'light',
      'dark',
      'cupcake',
      'bumblebee',
      'emerald',
      'corporate',
      'synthwave',
      'retro',
      'cyberpunk',
      'valentine',
      'halloween',
      'garden',
      'forest',
      'aqua',
      'lofi',
      'pastel',
      'fantasy',
      'wireframe',
      'black',
      'luxury',
      'dracula',
      'cmyk',
      'autumn',
      'business',
      'acid',
      'lemonade',
      'night',
      'coffee',
      'winter',
      'dim',
      'nord',
      'sunset',
      'procyon',
    ],

    // Custom theme, applied to `procyon` theme
    customTheme: {
      primary: '#fc055b',
      secondary: '#219aaf',
      accent: '#e8d03a',
      neutral: '#2A2730',
      'base-100': '#E3E3ED',
      '--rounded-box': '3rem',
      '--rounded-btn': '3rem',
    },
  },

  // Optional Footer. Supports plain text or HTML.
  footer: `Thanks to arifszn for the template ❤️`,

  enablePWA: true,
};

export default CONFIG;
