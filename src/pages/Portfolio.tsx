import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, Filter, MapPin, Calendar, Layers } from "lucide-react";
import { Project } from "../types";

const Portfolio = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filter, setFilter] = useState("전체");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/projects")
      .then((res) => res.json())
      .then((data) => {
        setProjects(data);
        setLoading(false);
      });
  }, []);

  const categories = ["전체", "주거", "업무", "교육", "물류", "특수"];

  const filteredProjects = filter === "전체" 
    ? projects 
    : projects.filter(p => p.category === filter);

  return (
    <div className="pt-32 pb-24 min-h-screen bg-slate-50">
      <section className="max-w-7xl mx-auto px-6 mb-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">프로젝트 실적</h1>
          <p className="text-slate-600">원파트너스가 수행한 주요 프로젝트를 소개합니다.</p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                filter === cat
                  ? "bg-primary text-white shadow-lg"
                  : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all group border border-slate-100"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={project.imageUrl || "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=800"}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-primary/90 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase">
                        {project.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <div className="space-y-2 text-sm text-slate-500">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span>{project.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{project.year}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Layers className="w-4 h-4" />
                        <span>{project.system}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {!loading && filteredProjects.length === 0 && (
          <div className="text-center py-20 text-slate-400">
            해당 카테고리의 프로젝트가 없습니다.
          </div>
        )}
      </section>
    </div>
  );
};

export default Portfolio;
