import type { Project } from '@/types';

export const projects: Project[] = [
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
  slug: 'task-management-app',
  title: 'AI-Powered Todo App',
  shortDescription:
    'A real-time, agentic task manager featuring full CRUD operations, multi-dimensional filtering, and an intelligent chatbot for natural language task management.',
  fullDescription:
    'An advanced, collaborative workspace that redefines task management by combining standard workflow control with natural language automation. Users can seamlessly create, update, delete, and toggle completion states of tasks. The platform features robust state management allowing instant categorization and sorting based on status (completed vs. pending) and priority levels. Beyond manual UI controls, an embedded conversational chatbot powered by the OpenAI Agents SDK acts as a copilot, allowing users to execute full lifecycle task management entirely through natural language commands.',
  challenge:
    'The main challenge was keeping task state in sync when updates came from both the UI and the chatbot simultaneously.',
  category: 'web',
  techLabels: ['Next.js', 'TypeScript', 'Tailwind CSS', 'OpenAI Agents SDK', 'Docker'],
  thumbnail: '/images/projects/task-management.jpg',
  links: {
    demo: 'https://todo-app-mu-two-48.vercel.app/',
    source: 'https://github.com/alihaidernoorani/todo-app/tree/main/Phase_V',
  },
  period: 'Jan 2026 – Feb 2026',
  featured: true,
},
 {
  slug: 'docusaurus-book',
  title: 'Physical AI & Humanoid Robotics - Docusaurus Book',
  shortDescription:
    'A Docusaurus website presenting structured content on Physical AI and Humanoid Robotics with an integrated AI chatbot.',

  fullDescription:
    'Built a book on Physical AI and Humanoid Robotics with Docusaurus, organising technical content into a clear, navigable format.',

  challenge:
    'The main challenge was designing and integrating an AI chatbot that could respond contextually to user queries without breaking the reading flow or performance of the static site.',

  category: 'web',
  techLabels: ['Docusaurus', 'TypeScript', 'React', 'OpenAI Agents SDK'],
  thumbnail: '/images/projects/docusaurus-book.jpg',
  links: {
    demo: 'https://alihaidernoorani.github.io/Physical-AI-Humanoid-Robotics-Book/',
    source: 'https://github.com/alihaidernoorani/Physical-AI-Humanoid-Robotics-Book',
  },
  period: 'Dec 2025 – Jan 2026',
  featured: false,
},
];
