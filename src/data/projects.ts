import type { Project } from '../types'

export const PROJECTS: Project[] = [{
  id: "cookie-farm",
  slug: "cookie-farm",
  title: "CookieFarm",
  subtitle: "An attack-defense CTF framework built for exploit automation",
  stack: ["Go", "Python", "Attack-defense CTF", "Exploit automation"],
  year: "2025",
  status: "Active and maintained",
  domain: "Cybersecurity / CTF infrastructure",
  description:
    "An attack-defense CTF framework created by the Italian ByteTheCookies team. CookieFarm combines Go and Python to automate exploit execution while keeping the competitor focused on exploit logic.",
  detail: [
    { label: "Repository", value: "ByteTheCookies/CookieFarm" },
    { label: "Role", value: "Original project creator and developer" },
    { label: "Architecture", value: "Hybrid Go and Python" },
    { label: "Topics", value: "Attack-defense, exploit farm, Go, Python" },
    { label: "License", value: "GPL-3.0" },
    { label: "Stars", value: "31" },
    { label: "Homepage", value: "cookiefarm.bytethecookies.org" }
  ],
  problem:
    "Attack-defense CTF participants must repeatedly discover targets, execute exploits, and manage service interactions while under time pressure.",
  approach:
    "Designed and developed a hybrid Go and Python framework that automates the repetitive infrastructure around exploit execution, following a zero-distraction workflow where users focus primarily on writing exploit logic.",
  outcome:
    "Created a widely used team framework with 31 GitHub stars and a dedicated project website, providing ByteTheCookies with a reusable foundation for attack-defense competitions.",
  featured: true,
  image: "https://opengraph.githubassets.com/1/ByteTheCookies/CookieFarm"
},
{
  id: "discord-ctf-helper",
  slug: "discord-ctf-helper",
  title: "Discord CTF Helper",
  subtitle: "A Discord bot for managing Capture The Flag competitions",
  stack: ["Go", "Python", "Discord API", "CTF automation"],
  year: "2024",
  status: "Maintained",
  domain: "Cybersecurity / Collaboration tools",
  description:
    "A powerful and customizable Discord bot for organizing and managing Capture The Flag competitions, developed as part of the ByteTheCookies team.",
  detail: [
    { label: "Repository", value: "ByteTheCookies/DiscordCTFHelper" },
    { label: "Role", value: "Original project creator and developer" },
    { label: "Language", value: "Go" },
    { label: "Topics", value: "CTF, Discord, Python" },
    { label: "License", value: "Apache-2.0" },
    { label: "Stars", value: "3" }
  ],
  problem:
    "Running a CTF through Discord requires coordinating participants, challenges, communication, and competition workflows without relying on manual administration.",
  approach:
    "Created a customizable Discord bot that centralizes CTF management inside the communication platform used by the team and participants.",
  outcome:
    "Built a reusable competition-management tool for Discord and established one of ByteTheCookies' core cybersecurity projects.",
  featured: true,
  image:
    "https://opengraph.githubassets.com/1/ByteTheCookies/DiscordCTFHelper"
},
{
   id: "zdiff",
   slug: "zdiff",
   title: "zdiff",
   subtitle: "A Zig implementation of the Myers diff algorithm",
   stack: ["Zig", "Algorithms", "Diffing"],
   year: "2026",
   status: "Active development",
   domain: "Algorithms / Developer tooling",
   description:
     "A focused implementation of the Myers diff algorithm in Zig, created for efficient text comparison and traffic analysis workflows.",
   detail: [
     { label: "Repository", value: "akiidjk/zdiff" },
     { label: "Language", value: "Zig" },
     { label: "License", value: "MIT" },
     { label: "Created", value: "2026" },
     { label: "Focus", value: "Sequence comparison and patch generation" }
   ],
   problem:
     "Text and request comparisons require a reliable way to identify additions, removals, and changes while keeping the implementation lightweight.",
   approach:
     "Implemented the Myers diff algorithm in Zig with a focus on predictable behavior, low-level control, and suitability for traffic-analysis tooling.",
   outcome:
     "Produced a compact algorithmic building block that can be integrated into higher-level analysis and developer tools.",
   featured: true,
   image: "https://opengraph.githubassets.com/1/akiidjk/zdiff"
 },

 {
   id: "adh",
   slug: "adh",
   title: "ADH",
   subtitle: "A customizable self-hosted webhook service",
   stack: ["TypeScript", "Go", "Next.js", "HTTP", "Webhooks"],
   year: "2025",
   status: "Maintained",
   domain: "Backend / Infrastructure",
   description:
     "A self-hosted webhook platform designed for deployment on a VPS, with support for request logging, handling, and data collection.",
   detail: [
     { label: "Repository", value: "akiidjk/adh" },
     { label: "Language", value: "TypeScript" },
     { label: "Topics", value: "Go, HTTP, Next.js, Webhooks" },
     { label: "License", value: "MIT" },
     { label: "Stars", value: "4" }
   ],
   problem:
     "Small projects and private infrastructure often need webhook endpoints without relying on hosted services or third-party tunneling tools.",
   approach:
     "Built a customizable webhook service that can be deployed directly to a VPS and adapted for logging, request processing, and data collection.",
   outcome:
     "Created a flexible alternative to services such as webhook.site, localtunnel, and ngrok for self-managed environments.",
   featured: true,
   image: "https://opengraph.githubassets.com/1/akiidjk/adh"
 },

 {
   id: "styx",
   slug: "styx",
   title: "Styx",
   subtitle: "A next-generation firewall research project",
   stack: ["Go", "eBPF", "XDP", "Linux", "Networking"],
   year: "2024",
   status: "Research project",
   domain: "Cybersecurity / Network security",
   description:
     "A next-generation firewall concept focused on host-level and application-level protection using eBPF and XDP.",
   detail: [
     { label: "Repository", value: "akiidjk/Styx" },
     { label: "Language", value: "Go" },
     { label: "Technologies", value: "eBPF and XDP" },
     { label: "License", value: "MIT" },
     { label: "Stars", value: "7" }
   ],
   problem:
     "Traditional firewall architectures can make it difficult to combine high-performance packet processing with flexible application-aware security policies.",
   approach:
     "Explored a modular firewall architecture based on eBPF and XDP to move security enforcement closer to the host and network stack.",
   outcome:
     "Established a strong systems-security prototype demonstrating interest in high-performance Linux networking and modern packet-processing techniques.",
   featured: true,
   image: "https://opengraph.githubassets.com/1/akiidjk/Styx"
 },

 {
   id: "zinjector",
   slug: "zinjector",
   title: "ZInjector",
   subtitle: "A Windows process-injection utility written in Zig",
   stack: ["Zig", "Windows", "Systems programming", "Process injection"],
   year: "2025",
   status: "Research project",
   domain: "Cybersecurity / Malware research",
   description:
     "A compact process-injection utility for Windows, created to explore operating-system internals and low-level execution techniques in Zig.",
   detail: [
     { label: "Repository", value: "akiidjk/ZInjector" },
     { label: "Language", value: "Zig" },
     { label: "Platform", value: "Windows" },
     { label: "Topics", value: "Malware research, process injection" },
     { label: "License", value: "MIT" }
   ],
   problem:
     "Understanding process injection requires hands-on experimentation with Windows processes, memory, and execution boundaries.",
   approach:
     "Implemented a small experimental utility in Zig to study process manipulation and Windows internals in a controlled research context.",
   outcome:
     "Demonstrated practical low-level security research and the ability to work with Zig beyond conventional application development.",
   featured: true,
   image: "https://opengraph.githubassets.com/1/akiidjk/ZInjector"
 },

 {
   id: "project-fabt",
   slug: "project-fabt",
   title: "Project FABT",
   subtitle: "Fast Analysis Binary Tool for CTF workflows",
   stack: ["Python", "Pwntools", "Binary analysis", "CTF"],
   year: "2024",
   status: "Completed",
   domain: "Cybersecurity / Reverse engineering",
   description:
     "A tool for quickly executing binary files and analyzing their output, designed for Capture The Flag competitions and binary-exploitation workflows.",
   detail: [
     { label: "Repository", value: "akiidjk/ProjectFABT" },
     { label: "Language", value: "Python" },
     { label: "Topics", value: "Binary analysis, CTF, Pwntools" },
     { label: "License", value: "Not specified" },
     { label: "Stars", value: "4" }
   ],
   problem:
     "During CTF competitions, repetitive binary execution and output inspection can slow down the analysis process.",
   approach:
     "Created a focused Python utility around binary execution and analysis workflows, with tooling suited to exploit-development and CTF environments.",
   outcome:
     "Delivered a practical competition-oriented tool that reflects experience with binary analysis and offensive-security workflows.",
   featured: true,
   image: "https://opengraph.githubassets.com/1/akiidjk/ProjectFABT"
 },

 {
   id: "sys-scope",
   slug: "sys-scope",
   title: "SysScope",
   subtitle: "A Rust process-performance monitoring tool",
   stack: ["Rust", "System monitoring", "Performance analysis", "CLI"],
   year: "2023",
   status: "Completed",
   domain: "Systems / Developer tooling",
   description:
     "A Rust application for monitoring and analyzing the performance and resource usage of selected processes.",
   detail: [
     { label: "Repository", value: "akiidjk/SysScope" },
     { label: "Language", value: "Rust" },
     { label: "Topics", value: "Benchmarking and system analysis" },
     { label: "License", value: "Not specified" },
     { label: "Stars", value: "3" }
   ],
   problem:
     "Developers and system analysts need a focused way to inspect process behavior and resource consumption without relying on overly broad monitoring tools.",
   approach:
     "Built a lightweight monitoring utility in Rust with an emphasis on system-level visibility and performance analysis.",
   outcome:
     "Created a practical systems tool that demonstrates Rust proficiency and an interest in performance-oriented software.",
   featured: true,
   image: "https://opengraph.githubassets.com/1/akiidjk/SysScope"
 },

 {
   id: "chip-8",
   slug: "chip-8",
   title: "CHIP-8",
   subtitle: "A CHIP-8 virtual machine implemented in Zig",
   stack: ["Zig", "Emulation", "Virtual machines", "Low-level programming"],
   year: "2026",
   status: "Completed",
   domain: "Emulation / Systems programming",
   description:
     "A standard CHIP-8 implementation in Zig created to explore emulation, instruction sets, memory, and low-level program execution.",
   detail: [
     { label: "Repository", value: "akiidjk/chip-8" },
     { label: "Language", value: "Zig" },
     { label: "Type", value: "Virtual machine emulator" },
     { label: "License", value: "Not specified" },
     { label: "Stars", value: "2" }
   ],
   problem:
     "Emulators provide a compact way to understand how instruction sets, memory, registers, and execution cycles work together.",
   approach:
     "Implemented the CHIP-8 virtual machine in Zig, modeling its instruction set and runtime behavior at a low level.",
   outcome:
     "Produced a concise emulator project that highlights interest in computer architecture and systems programming.",
   featured: true,
   image: "https://opengraph.githubassets.com/1/akiidjk/chip-8"
 },

 {
   id: "zes",
   slug: "zes",
   title: "ZES",
   subtitle: "An NES emulator experiment in Zig",
   stack: ["Zig", "Emulation", "NES", "Computer architecture"],
   year: "2026",
   status: "Experimental",
   domain: "Emulation / Systems programming",
   description:
     "An experimental NES emulator written in Zig, focused on understanding console architecture and emulation fundamentals.",
   detail: [
     { label: "Repository", value: "akiidjk/ZES" },
     { label: "Language", value: "Zig" },
     { label: "Platform", value: "NES" },
     { label: "Type", value: "Emulator" },
     { label: "Topics", value: "Emulation and computer architecture" }
   ],
   problem:
     "Recreating a classic console requires understanding CPU behavior, memory mapping, timing, and hardware abstractions.",
   approach:
     "Started an NES emulator in Zig to investigate the architecture and execution model of the Nintendo Entertainment System.",
   outcome:
     "Created an exploratory low-level project that extends the emulator work from CHIP-8 toward more complex hardware.",
     featured: true,
   image: "https://opengraph.githubassets.com/1/akiidjk/ZES"
 },

 {
   id: "capture-the-flag",
   slug: "capture-the-flag",
   title: "Capture The Flag",
   subtitle: "A collection of CTF solutions and write-ups",
   stack: ["Java", "Cybersecurity", "CTF", "Write-ups"],
   year: "2024",
   status: "Continuously updated",
   domain: "Cybersecurity education",
   description:
     "A personal collection of Capture The Flag challenges, solutions, and explanations covering practical security concepts.",
   detail: [
     { label: "Repository", value: "akiidjk/CaptureTheFlag" },
     { label: "Language", value: "Java" },
     { label: "Topics", value: "CTF solutions and write-ups" },
     { label: "Type", value: "Knowledge base" },
     { label: "Updated", value: "2026" }
   ],
   problem:
     "Security techniques are easier to retain and share when challenge solutions are documented with reproducible reasoning and explanations.",
   approach:
     "Organized CTF solutions and write-ups into a structured repository covering different challenge categories and techniques.",
   outcome:
     "Built a public-facing record of hands-on cybersecurity practice and continuous learning through offensive-security challenges.",
     featured: true,
   image: "https://opengraph.githubassets.com/1/akiidjk/CaptureTheFlag"
 },

 {
   id: "comments-prettify",
   slug: "comments-prettify",
   title: "Comments Prettify",
   subtitle: "A customizable browser extension for cleaner comments",
   stack: ["JavaScript", "Browser extension", "UI customization"],
   year: "2023",
   status: "Completed",
   domain: "Productivity / Browser tooling",
   description:
     "A browser extension designed to improve the style, readability, and customization of code comments.",
   detail: [
     { label: "Repository", value: "akiidjk/CommentsPrettify" },
     { label: "Language", value: "JavaScript" },
     { label: "Type", value: "Browser extension" },
     { label: "License", value: "AGPL-3.0" },
     { label: "Stars", value: "3" }
   ],
   problem:
     "Code comments are often inconsistent and difficult to scan, especially in large codebases or educational material.",
   approach:
     "Built an extension that allows users to customize comment presentation and make comments easier to read.",
   outcome:
     "Delivered a small productivity-focused browser tool with a clear user-facing purpose and configurable visual behavior.",
     featured: true,
   image: "https://opengraph.githubassets.com/1/akiidjk/CommentsPrettify"
 },

 {
   id: "slanotifier",
   slug: "sla-notifier",
   title: "SLANotifier",
   subtitle: "Service-status notifications for attack-defense environments",
   stack: ["Python", "Monitoring", "Notifications", "CTF"],
   year: "2024",
   status: "Completed",
   domain: "Cybersecurity / Monitoring",
   description:
     "A Python tool that reports the status of CyberChallenge attack-defense services and notifies users when a service becomes unavailable.",
   detail: [
     { label: "Repository", value: "akiidjk/SLANotifier" },
     { label: "Language", value: "Python" },
     { label: "Topics", value: "Attack-defense, CTF" },
     { label: "Type", value: "Service monitoring utility" },
     { label: "Stars", value: "3" }
   ],
   problem:
     "In attack-defense competitions, teams need immediate feedback when one of their services stops responding.",
   approach:
     "Implemented service checks and desktop notification behavior to surface availability changes quickly.",
   outcome:
     "Created a focused operational tool for CTF teams and demonstrated practical experience with service monitoring.",
     featured: true,
   image: "https://opengraph.githubassets.com/1/akiidjk/SLANotifier"
 },

 {
   id: "gotospoty",
   slug: "gotospoty",
   title: "GoToSpoty",
   subtitle: "A local Spotify playlist and album utility",
   stack: ["Python", "Scraping", "Spotify", "yt-dlp", "Local-first"],
   year: "2026",
   status: "Experimental",
   domain: "Media tooling / Automation",
   description:
     "A local-first utility for scraping Spotify albums or playlists and downloading their associated media.",
   detail: [
     { label: "Repository", value: "akiidjk/GoToSpoty" },
     { label: "Language", value: "Python" },
     { label: "Topics", value: "Spotify, scraping, yt-dlp" },
     { label: "License", value: "LGPL-2.1" },
     { label: "Type", value: "Command-line utility" }
   ],
   problem:
     "Users may want a local workflow for processing playlist metadata and managing media outside a hosted application.",
   approach:
     "Combined playlist scraping with local media-processing workflows and command-line tooling.",
   outcome:
     "Produced a compact automation project demonstrating Python scripting, media tooling, and local-first thinking.",
   featured: false,
   image: "https://opengraph.githubassets.com/1/akiidjk/GoToSpoty"
 },

 {
   id: "wdumper-engine",
   slug: "wdumper-engine",
   title: "WDumperEngine",
   subtitle: "A Wallpaper Engine Workshop extractor",
   stack: ["Python", "File extraction", "Automation", "Desktop tooling"],
   year: "2025",
   status: "Completed",
   domain: "Developer tooling / Desktop utilities",
   description:
     "A Python utility for extracting content from Wallpaper Engine Workshop assets.",
   detail: [
     { label: "Repository", value: "akiidjk/WDumperEngine" },
     { label: "Language", value: "Python" },
     { label: "Topics", value: "Wallpaper Engine and extraction" },
     { label: "Type", value: "Desktop utility" },
     { label: "Stars", value: "1" }
   ],
   problem:
     "Workshop assets can be difficult to inspect and reuse when their contents are packaged inside application-specific formats.",
   approach:
     "Created a focused extraction utility to process Wallpaper Engine Workshop content.",
   outcome:
     "Delivered a practical reverse-engineering-oriented tool for working with desktop application assets.",
     featured: true,
   image: "https://opengraph.githubassets.com/1/akiidjk/WDumperEngine"
 },

 {
   id: "shell-deeple",
   slug: "shell-deeple",
   title: "ShellDeeple",
   subtitle: "A terminal interface for translation workflows",
   stack: ["Rust", "CLI", "API integration", "Translation"],
   year: "2024",
   status: "Completed",
   domain: "Developer tooling / CLI applications",
   description:
     "A Rust command-line application that integrates with the Deeple API to provide translation capabilities directly from the terminal.",
   detail: [
     { label: "Repository", value: "akiidjk/ShellDeeple" },
     { label: "Language", value: "Rust" },
     { label: "Topics", value: "CLI, API, translation" },
     { label: "Type", value: "Terminal application" },
     { label: "License", value: "AGPL-3.0" }
   ],
   problem:
     "Terminal-first workflows benefit from lightweight tools that avoid switching to a browser for common translation tasks.",
   approach:
     "Built a Rust CLI that communicates with a translation API and exposes the workflow through command-line arguments.",
   outcome:
     "Created a focused terminal utility combining Rust, API integration, and practical developer ergonomics.",
     featured: true,
   image: "https://opengraph.githubassets.com/1/akiidjk/ShellDeeple"
 },

 {
   id: "cyberzed",
   slug: "cyberzed",
   title: "CyberZed",
   subtitle: "A cybersecurity utility extension for Zed",
   stack: ["Rust", "Zed", "Editor extension", "Cybersecurity"],
   year: "2025",
   status: "Completed",
   domain: "Developer tooling / Cybersecurity",
   description:
     "A utility extension for the Zed editor inspired by the security-oriented tools available through gchq.github.io.",
   detail: [
     { label: "Repository", value: "akiidjk/CyberZed" },
     { label: "Language", value: "Rust" },
     { label: "Platform", value: "Zed editor" },
     { label: "License", value: "Apache-2.0" },
     { label: "Stars", value: "3" }
   ],
   problem:
     "Security researchers and developers benefit from having commonly used utilities available directly inside their editor workflow.",
   approach:
     "Developed a Zed extension in Rust based on the concept of a centralized cybersecurity utility collection.",
   outcome:
     "Connected editor extensibility with cybersecurity tooling in a compact open-source project.",
     featured: true,
   image: "https://opengraph.githubassets.com/1/akiidjk/CyberZed"
  },

]
