import type { Project } from '@/types';

export const projects: Project[] = [
  {
    slug: 'task-management-app',
    title: 'AI-Powered Todo App',
    shortDescription:
      'A real-time, agentic task manager featuring full CRUD operations, multi-dimensional filtering, and an intelligent chatbot for natural language task management.',
    fullDescription:
      'A full-stack task manager with a Next.js frontend and a FastAPI backend backed by NeonDB (Postgres). Users can create, update, delete, and filter tasks by status and priority through the UI. An embedded conversational chatbot powered by the OpenAI Agents SDK acts as a copilot — performing the same full CRUD operations through natural language commands, kept in sync with the UI in real time.',
    challenge:
      'The main challenge was keeping task state in sync when updates came from both the UI and the chatbot.',
    category: 'web',
    techLabels: ['Next.js', 'TypeScript', 'Tailwind CSS', 'FastAPI', 'OpenAI Agents SDK', 'NeonDB', 'Docker'],
    thumbnail: '/images/projects/task-management.jpg',
    links: {
      demo: 'https://todo-app-mu-two-48.vercel.app/',
      source: 'https://github.com/alihaidernoorani/todo-app/tree/main/Phase_V',
    },
    period: 'Jan 2026 – Feb 2026',
    featured: true,
  },
  {
    slug: 'ecommerce-dashboard',
    title: 'E-Commerce Website - Comforty',
    shortDescription:
      'A full-stack e-commerce website for furniture shopping with a modern UI and seamless user experience.',
    fullDescription:
      'Built a full-stack e-commerce platform for a furniture brand, featuring product listings, product detail pages, cart functionality, and a smooth checkout flow. The application focuses on performance, responsive design, and a clean user experience across all devices.',
    challenge:
      'The main challenge was designing a scalable and responsive UI for product browsing while maintaining smooth state management for cart operations and ensuring consistent data flow across components.',
    category: 'web',
    techLabels: ['Next.js', 'TypeScript', 'Sanity', 'Tailwind CSS'],
    thumbnail: '/images/projects/Comforty.jpg',
    links: {
      demo: 'https://marketplace-builder-hackathon-comforty.vercel.app/',
      source: 'https://github.com/alihaidernoorani/Marketplace-Builder-Hackathon-Comforty',
    },
    period: 'Jan 2025 – Feb 2025',
    featured: true,
  },
  {
    slug: 'ai-agents-series',
    title: 'AI Agents Series',
    shortDescription:
      'A collection of five focused Python agents built with the OpenAI Agents SDK, covering multi-agent orchestration, live weather queries, natural language translation, product catalog search, and real-time crypto pricing.',
    fullDescription:
      'A series of purpose-built agents developed to explore different patterns with the OpenAI Agents SDK. The Poetry Agent is the most architecturally rich: a triage agent classifies an input poem as lyric, narrative, or dramatic, then uses the SDK handoffs feature to delegate to the correct specialist agent, showcasing multi-agent orchestration and clean inter-agent delegation. The remaining four agents each expose a single scoped function tool: the Weather Agent calls the Weatherstack API for live conditions by city; the Translator Agent converts text between languages while preserving tone; the Shopping Agent searches a product catalog with exact, substring, and related match ranking; the Crypto Agent queries the Binance API for real-time prices of major coins.',
    challenge:
      'The main challenge across the series was designing tool return contracts that gave the LLM enough structured information to produce natural, helpful responses. For the Poetry Agent specifically, getting the triage step to reliably classify ambiguous inputs before handing off required careful prompt engineering.',
    category: 'ai-agent',
    techLabels: ['Python', 'OpenAI Agents SDK', 'Weatherstack API', 'Binance API'],
    thumbnail: '/images/projects/ai-agents-series.svg',
    links: {
      repos: [
        { label: 'Poetry Agent', url: 'https://github.com/alihaidernoorani/Poetry-Agent' },
        { label: 'Weather AI Agent', url: 'https://github.com/alihaidernoorani/Weather-AI-Agent' },
        { label: 'Translator Agent', url: 'https://github.com/alihaidernoorani/Translator-Agent' },
        { label: 'Shopping Agent', url: 'https://github.com/alihaidernoorani/Shopping-Agent' },
        { label: 'Crypto Currency Agent', url: 'https://github.com/alihaidernoorani/Crypto-Currency-Agent' },
      ],
    },
    period: 'Jul 2025 – Sep 2025',
    featured: false,
  },
  {
    slug: 'docusaurus-book',
    title: 'Physical AI & Humanoid Robotics - Docusaurus Book',
    shortDescription:
      'A Docusaurus book on Physical AI and Humanoid Robotics with a RAG-powered chatbot that answers reader questions directly from the book\'s content.',
    fullDescription:
      'A structured technical book built with Docusaurus, covering Physical AI and Humanoid Robotics. Includes a retrieval-augmented generation (RAG) chatbot backed by a FastAPI server, Cohere embeddings, and a Qdrant vector store — so readers can ask questions and get answers grounded in the book\'s content. Conversation history is persisted in NeonDB (Postgres).',
    challenge:
      'The main challenge was integrating the RAG chatbot without disrupting the static site\'s reading flow or performance, and tuning the retrieval pipeline to return relevant passages for technical queries.',
    category: 'web',
    techLabels: ['Docusaurus', 'TypeScript', 'React', 'FastAPI', 'OpenAI Agents SDK', 'Cohere', 'Qdrant', 'NeonDB'],
    thumbnail: '/images/projects/docusaurus-book.jpg',
    links: {
      demo: 'https://alihaidernoorani.github.io/Physical-AI-Humanoid-Robotics-Book/',
      source: 'https://github.com/alihaidernoorani/Physical-AI-Humanoid-Robotics-Book',
    },
    period: 'Dec 2025 – Jan 2026',
    featured: false,
  },
];
