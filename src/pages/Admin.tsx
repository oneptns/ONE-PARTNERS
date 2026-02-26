import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { LayoutDashboard, FolderKanban, FileText, MessageSquare, Plus, Trash2, LogOut, Save, ChevronUp, ChevronDown, Edit2, X } from "lucide-react";
import { Project, Post, Contact } from "../types";

const Admin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginForm, setLoginForm] = useState({ id: "", password: "" });
  const [loginError, setLoginError] = useState("");

  const [activeTab, setActiveTab] = useState<"projects" | "posts" | "contacts">("projects");
  const [projects, setProjects] = useState<Project[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);

  // Form states
  const [projectForm, setProjectForm] = useState({
    title: "", category: "주거", location: "", year: "2024", description: "", system: "", client: "", imageUrl: ""
  });
  const [postForm, setPostForm] = useState({
    title: "", content: "", category: "공지", author: "관리자", fileUrl: "", fileName: ""
  });
  const [uploading, setUploading] = useState(false);
  const [editingProjectId, setEditingProjectId] = useState<number | null>(null);
  const [editingPostId, setEditingPostId] = useState<number | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [projRes, postRes, contRes] = await Promise.all([
        fetch("/api/projects", { cache: 'no-store' }),
        fetch("/api/posts", { cache: 'no-store' }),
        fetch("/api/contacts", { cache: 'no-store' })
      ]);
      
      if (!projRes.ok || !postRes.ok || !contRes.ok) {
        throw new Error("Failed to fetch data");
      }

      setProjects(await projRes.json());
      setPosts(await postRes.json());
      setContacts(await contRes.json());
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchData();
    }
  }, [isLoggedIn]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginForm)
    });
    if (res.ok) {
      setIsLoggedIn(true);
      localStorage.setItem("admin_logged_in", "true");
    } else {
      const data = await res.json();
      setLoginError(data.message);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("admin_logged_in") === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("admin_logged_in");
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-10 rounded-3xl shadow-xl border border-slate-200 w-full max-w-md"
        >
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <LayoutDashboard className="text-white w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900">관리자 로그인</h2>
            <p className="text-slate-500 text-sm mt-2">원파트너스 관리 시스템</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">아이디</label>
              <input
                required
                type="text"
                value={loginForm.id}
                onChange={(e) => setLoginForm({ ...loginForm, id: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary outline-none transition-all"
                placeholder="아이디를 입력하세요"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">비밀번호</label>
              <input
                required
                type="password"
                value={loginForm.password}
                onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary outline-none transition-all"
                placeholder="비밀번호를 입력하세요"
              />
            </div>
            {loginError && <p className="text-red-500 text-xs font-medium">{loginError}</p>}
            <button
              type="submit"
              className="w-full bg-primary hover:bg-primary-light text-white py-4 rounded-xl font-bold shadow-lg transition-all"
            >
              로그인
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = editingProjectId ? `/api/projects/${editingProjectId}` : "/api/projects";
      const method = editingProjectId ? "PUT" : "POST";
      
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(projectForm)
      });
      if (res.ok) {
        await fetchData();
        setProjectForm({ title: "", category: "주거", location: "", year: "2024", description: "", system: "", client: "", imageUrl: "" });
        setEditingProjectId(null);
      } else {
        alert(editingProjectId ? "프로젝트 수정에 실패했습니다." : "프로젝트 추가에 실패했습니다.");
      }
    } catch (error) {
      console.error("Project submit error:", error);
      alert("오류가 발생했습니다.");
    }
  };

  const handleEditProject = (project: Project) => {
    setProjectForm({
      title: project.title,
      category: project.category,
      location: project.location,
      year: project.year,
      description: project.description,
      system: project.system,
      client: project.client,
      imageUrl: project.imageUrl
    });
    setEditingProjectId(project.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddPost = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = editingPostId ? `/api/posts/${editingPostId}` : "/api/posts";
      const method = editingPostId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(postForm)
      });
      if (res.ok) {
        await fetchData();
        setPostForm({ title: "", content: "", category: "공지", author: "관리자", fileUrl: "", fileName: "" });
        setEditingPostId(null);
      } else {
        alert(editingPostId ? "게시물 수정에 실패했습니다." : "게시물 추가에 실패했습니다.");
      }
    } catch (error) {
      console.error("Post submit error:", error);
      alert("오류가 발생했습니다.");
    }
  };

  const handleEditPost = (post: Post) => {
    setPostForm({
      title: post.title,
      content: post.content,
      category: post.category,
      author: post.author,
      fileUrl: post.fileUrl || "",
      fileName: post.fileName || ""
    });
    setEditingPostId(post.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      if (res.ok) {
        const data = await res.json();
        setPostForm({ ...postForm, fileUrl: data.url, fileName: data.name });
      }
    } catch (error) {
      console.error("Upload failed", error);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (type: "projects" | "posts", id: number) => {
    if (!id) {
      alert("유효하지 않은 ID입니다.");
      return;
    }
    if (!confirm("정말 삭제하시겠습니까?")) return;
    
    try {
      const res = await fetch(`/api/${type}/${id}`, { method: "DELETE" });
      if (res.ok) {
        await fetchData();
      } else {
        alert("삭제에 실패했습니다.");
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert("오류가 발생했습니다.");
    }
  };

  const handleMove = async (index: number, direction: "up" | "down") => {
    const newProjects = [...projects];
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    
    if (targetIndex < 0 || targetIndex >= newProjects.length) return;
    
    // Swap
    [newProjects[index], newProjects[targetIndex]] = [newProjects[targetIndex], newProjects[index]];
    
    // Update sortOrder for all
    const orders = newProjects.map((p, i) => ({ id: p.id, sortOrder: i }));
    
    const res = await fetch("/api/projects/reorder", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orders })
    });
    
    if (res.ok) {
      setProjects(newProjects);
    }
  };

  return (
    <div className="pt-24 min-h-screen bg-slate-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 hidden md:flex flex-col">
        <div className="p-6 border-b border-slate-100">
          <h2 className="text-xl font-bold text-primary flex items-center gap-2">
            <LayoutDashboard className="w-5 h-5" /> 관리자 센터
          </h2>
        </div>
        <nav className="flex-grow p-4 space-y-2">
          <button
            onClick={() => setActiveTab("projects")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
              activeTab === "projects" ? "bg-primary text-white shadow-md" : "text-slate-600 hover:bg-slate-50"
            }`}
          >
            <FolderKanban className="w-4 h-4" /> 프로젝트 관리
          </button>
          <button
            onClick={() => setActiveTab("posts")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
              activeTab === "posts" ? "bg-primary text-white shadow-md" : "text-slate-600 hover:bg-slate-50"
            }`}
          >
            <FileText className="w-4 h-4" /> 기술·연구 관리
          </button>
          <button
            onClick={() => setActiveTab("contacts")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
              activeTab === "contacts" ? "bg-primary text-white shadow-md" : "text-slate-600 hover:bg-slate-50"
            }`}
          >
            <MessageSquare className="w-4 h-4" /> 문의 내역 확인
          </button>
        </nav>
        <div className="p-4 border-t border-slate-100">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-all"
          >
            <LogOut className="w-4 h-4" /> 로그아웃
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-8 overflow-y-auto">
        <div className="max-w-5xl mx-auto">
          {activeTab === "projects" && (
            <div className="space-y-8">
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-bold text-slate-900">프로젝트 관리</h3>
              </div>

              {/* Add Project Form */}
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
                <div className="flex justify-between items-center mb-6">
                  <h4 className="text-lg font-bold flex items-center gap-2">
                    {editingProjectId ? <Edit2 className="w-5 h-5 text-primary" /> : <Plus className="w-5 h-5 text-primary" />}
                    {editingProjectId ? "프로젝트 수정" : "새 프로젝트 추가"}
                  </h4>
                  {editingProjectId && (
                    <button 
                      onClick={() => {
                        setEditingProjectId(null);
                        setProjectForm({ title: "", category: "주거", location: "", year: "2024", description: "", system: "", client: "", imageUrl: "" });
                      }}
                      className="text-slate-400 hover:text-slate-600 flex items-center gap-1 text-sm"
                    >
                      <X className="w-4 h-4" /> 취소
                    </button>
                  )}
                </div>
                <form onSubmit={handleAddProject} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    required
                    placeholder="프로젝트 제목"
                    value={projectForm.title}
                    onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                    className="px-4 py-2 rounded-lg border border-slate-200 outline-none focus:border-primary"
                  />
                  <select
                    value={projectForm.category}
                    onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value })}
                    className="px-4 py-2 rounded-lg border border-slate-200 outline-none focus:border-primary"
                  >
                    <option>주거</option><option>업무</option><option>교육</option><option>물류</option><option>특수</option>
                  </select>
                  <input
                    placeholder="위치 (예: 서울특별시 강남구)"
                    value={projectForm.location}
                    onChange={(e) => setProjectForm({ ...projectForm, location: e.target.value })}
                    className="px-4 py-2 rounded-lg border border-slate-200 outline-none focus:border-primary"
                  />
                  <input
                    placeholder="연도 (예: 2024)"
                    value={projectForm.year}
                    onChange={(e) => setProjectForm({ ...projectForm, year: e.target.value })}
                    className="px-4 py-2 rounded-lg border border-slate-200 outline-none focus:border-primary"
                  />
                  <input
                    placeholder="구조 시스템 (예: RC조)"
                    value={projectForm.system}
                    onChange={(e) => setProjectForm({ ...projectForm, system: e.target.value })}
                    className="px-4 py-2 rounded-lg border border-slate-200 outline-none focus:border-primary"
                  />
                  <input
                    placeholder="이미지 URL (Unsplash 등)"
                    value={projectForm.imageUrl}
                    onChange={(e) => setProjectForm({ ...projectForm, imageUrl: e.target.value })}
                    className="px-4 py-2 rounded-lg border border-slate-200 outline-none focus:border-primary"
                  />
                  <div className="md:col-span-2">
                    <textarea
                      placeholder="설명"
                      value={projectForm.description}
                      onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg border border-slate-200 outline-none focus:border-primary h-24"
                    ></textarea>
                  </div>
                  <button type="submit" className="md:col-span-2 bg-primary text-white py-3 rounded-lg font-bold hover:bg-primary-light transition-all">
                    {editingProjectId ? "수정 완료" : "저장하기"}
                  </button>
                </form>
              </div>

              {/* Project List */}
              <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
                <table className="w-full text-left">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="p-4 text-sm font-bold text-slate-500">제목</th>
                      <th className="p-4 text-sm font-bold text-slate-500">업무분류</th>
                      <th className="p-4 text-sm font-bold text-slate-500 text-right">관리</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 relative">
                    {loading && (
                      <tr className="absolute inset-0 bg-white/50 flex items-center justify-center z-10">
                        <td colSpan={3} className="text-center py-10">
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                        </td>
                      </tr>
                    )}
                    {projects.map((p, index) => (
                      <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                        <td className="p-4 font-medium">{p.title}</td>
                        <td className="p-4 text-sm text-slate-500">{p.category}</td>
                        <td className="p-4 text-right flex items-center justify-end gap-1">
                          <div className="flex flex-col mr-4">
                            <button 
                              disabled={index === 0}
                              onClick={() => handleMove(index, "up")}
                              className="text-slate-400 hover:text-primary disabled:opacity-30 p-0.5"
                            >
                              <ChevronUp className="w-4 h-4" />
                            </button>
                            <button 
                              disabled={index === projects.length - 1}
                              onClick={() => handleMove(index, "down")}
                              className="text-slate-400 hover:text-primary disabled:opacity-30 p-0.5"
                            >
                              <ChevronDown className="w-4 h-4" />
                            </button>
                          </div>
                          <button onClick={() => handleEditProject(p)} className="text-primary hover:text-primary-light p-2">
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button onClick={() => handleDelete("projects", p.id)} className="text-red-500 hover:text-red-700 p-2">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "posts" && (
            <div className="space-y-8">
              <h3 className="text-2xl font-bold text-slate-900">기술·연구 관리</h3>
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
                <div className="flex justify-between items-center mb-6">
                  <h4 className="text-lg font-bold flex items-center gap-2">
                    {editingPostId ? <Edit2 className="w-5 h-5 text-primary" /> : <Plus className="w-5 h-5 text-primary" />}
                    {editingPostId ? "게시물 수정" : "새 게시물 작성"}
                  </h4>
                  {editingPostId && (
                    <button 
                      onClick={() => {
                        setEditingPostId(null);
                        setPostForm({ title: "", content: "", category: "공지", author: "관리자", fileUrl: "", fileName: "" });
                      }}
                      className="text-slate-400 hover:text-slate-600 flex items-center gap-1 text-sm"
                    >
                      <X className="w-4 h-4" /> 취소
                    </button>
                  )}
                </div>
                <form onSubmit={handleAddPost} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      required
                      placeholder="게시물 제목"
                      value={postForm.title}
                      onChange={(e) => setPostForm({ ...postForm, title: e.target.value })}
                      className="px-4 py-2 rounded-lg border border-slate-200 outline-none focus:border-primary"
                    />
                    <select
                      value={postForm.category}
                      onChange={(e) => setPostForm({ ...postForm, category: e.target.value })}
                      className="px-4 py-2 rounded-lg border border-slate-200 outline-none focus:border-primary"
                    >
                      <option>공지</option><option>기술자료</option><option>연구성과</option>
                    </select>
                  </div>
                  <textarea
                    required
                    placeholder="내용 (Markdown 지원 예정)"
                    value={postForm.content}
                    onChange={(e) => setPostForm({ ...postForm, content: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-slate-200 outline-none focus:border-primary h-48"
                  ></textarea>
                  <div className="flex items-center gap-4">
                    <input
                      type="file"
                      onChange={handleFileUpload}
                      className="text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                    />
                    {uploading && <span className="text-xs text-slate-400 animate-pulse">업로드 중...</span>}
                    {postForm.fileName && <span className="text-xs text-primary font-medium">첨부됨: {postForm.fileName}</span>}
                  </div>
                  <button type="submit" className="w-full bg-primary text-white py-3 rounded-lg font-bold hover:bg-primary-light transition-all">
                    {editingPostId ? "수정 완료" : "게시하기"}
                  </button>
                </form>
              </div>

              <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
                <table className="w-full text-left">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="p-4 text-sm font-bold text-slate-500">제목</th>
                      <th className="p-4 text-sm font-bold text-slate-500">카테고리</th>
                      <th className="p-4 text-sm font-bold text-slate-500 text-right">관리</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 relative">
                    {loading && (
                      <tr className="absolute inset-0 bg-white/50 flex items-center justify-center z-10">
                        <td colSpan={3} className="text-center py-10">
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                        </td>
                      </tr>
                    )}
                    {posts.map((p) => (
                      <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                        <td className="p-4 font-medium">{p.title}</td>
                        <td className="p-4 text-sm text-slate-500">{p.category}</td>
                        <td className="p-4 text-right">
                          <button onClick={() => handleEditPost(p)} className="text-primary hover:text-primary-light p-2">
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button onClick={() => handleDelete("posts", p.id)} className="text-red-500 hover:text-red-700 p-2">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "contacts" && (
            <div className="space-y-8">
              <h3 className="text-2xl font-bold text-slate-900">문의 내역 확인</h3>
              <div className="space-y-4">
                {contacts.map((c) => (
                  <div key={c.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="font-bold text-lg text-slate-900">{c.name} <span className="text-sm font-normal text-slate-500">({c.company || "개인"})</span></h4>
                        <p className="text-sm text-primary">{c.email}</p>
                      </div>
                      <span className="text-xs text-slate-400">{new Date(c.createdAt).toLocaleString()}</span>
                    </div>
                    <p className="text-slate-700 bg-slate-50 p-4 rounded-xl text-sm whitespace-pre-wrap">{c.message}</p>
                  </div>
                ))}
                {contacts.length === 0 && (
                  <div className="text-center py-20 text-slate-400">문의 내역이 없습니다.</div>
                )}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Admin;
