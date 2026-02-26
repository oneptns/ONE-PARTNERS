import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { FileText, Download, ExternalLink, Search } from "lucide-react";
import { Post } from "../types";

const Tech = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  const [expandedId, setExpandedId] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/posts")
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
        setLoading(false);
      });
  }, []);

  const togglePost = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="pt-32 pb-24 min-h-screen bg-slate-50">
      <section className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">기술·연구 / 자료실</h1>
          <p className="text-slate-600">원파트너스의 기술 자료와 연구 성과를 공유합니다.</p>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
          {/* Table Header */}
          <div className="hidden md:grid grid-cols-12 gap-4 p-6 bg-slate-50 border-b border-slate-100 text-sm font-bold text-slate-500">
            <div className="col-span-1 text-center">번호</div>
            <div className="col-span-2">구분</div>
            <div className="col-span-6">제목</div>
            <div className="col-span-1">작성자</div>
            <div className="col-span-2 text-right">등록일</div>
          </div>

          {loading ? (
            <div className="p-20 text-center">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary mx-auto"></div>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {posts.map((post, index) => (
                <div key={post.id}>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onClick={() => togglePost(post.id)}
                    className="grid grid-cols-1 md:grid-cols-12 gap-4 p-6 hover:bg-slate-50 transition-colors items-center cursor-pointer"
                  >
                    <div className="hidden md:block col-span-1 text-center text-slate-400 text-sm">
                      {posts.length - index}
                    </div>
                    <div className="col-span-2">
                      <span className="inline-block px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-[10px] font-bold uppercase">
                        {post.category}
                      </span>
                    </div>
                    <div className="col-span-12 md:col-span-6">
                      <h3 className="text-slate-900 font-medium hover:text-primary transition-colors">
                        {post.title}
                      </h3>
                    </div>
                    <div className="col-span-6 md:col-span-1 text-sm text-slate-500">
                      {post.author || "관리자"}
                    </div>
                    <div className="col-span-6 md:col-span-2 text-right text-sm text-slate-400">
                      {new Date(post.createdAt).toLocaleDateString()}
                    </div>
                  </motion.div>
                  
                  <AnimatePresence>
                    {expandedId === post.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden bg-slate-50/50"
                      >
                        <div className="p-8 md:px-24 border-t border-slate-100">
                          <div className="prose prose-slate max-w-none">
                            <div className="whitespace-pre-wrap text-slate-700 leading-relaxed mb-6">
                              {post.content}
                            </div>
                            {post.fileUrl && (
                              <div className="mt-8 p-4 bg-slate-100 rounded-xl flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  <Download className="w-5 h-5 text-primary" />
                                  <span className="text-sm font-medium text-slate-700">{post.fileName}</span>
                                </div>
                                <a 
                                  href={post.fileUrl} 
                                  download={post.fileName}
                                  className="text-primary hover:text-primary-light text-sm font-bold flex items-center gap-1"
                                >
                                  다운로드 <ExternalLink className="w-3 h-3" />
                                </a>
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}

              {posts.length === 0 && (
                <div className="p-20 text-center text-slate-400">
                  등록된 게시물이 없습니다.
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Tech;
