import Image from 'next/image'
import { Project } from '@/lib/types'

interface ProjectsGridProps {
  projects: Project[]
}

export default function ProjectsGrid({ projects }: ProjectsGridProps) {
  return (
    <div className="bg-slate-800 rounded-2xl shadow-md p-6">
      <h2 className="text-xl font-semibold text-white mb-6">Featured Projects</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <div key={project.id} className="bg-slate-700/50 rounded-xl overflow-hidden">
            {/* Project Image */}
            <div className="relative h-48 bg-slate-600">
              {project.imageUrl && (
                <Image
                  src={project.imageUrl}
                  alt={project.title}
                  fill
                  className="object-cover"
                />
              )}
            </div>
            
            {/* Project Info */}
            <div className="p-4">
              <h3 className="text-lg font-semibold text-white mb-2">{project.title}</h3>
              <p className="text-slate-400 text-sm mb-4">{project.description}</p>
              
              {/* Tech Stack */}
              <div className="flex flex-wrap gap-2 mb-4">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-1 bg-signal-indigo/10 text-signal-indigo text-xs rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              
              {/* Impact */}
              <div className="text-sm">
                <span className="text-slate-400">Impact: </span>
                <span className="text-signal-green">{project.impact}</span>
              </div>
              
              {/* Link */}
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-block text-signal-indigo hover:text-signal-indigo/80 text-sm"
                >
                  View Project →
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 