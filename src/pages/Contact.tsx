import { useState } from "react";
import { motion } from "motion/react";
import { Send, Phone, Mail, MapPin, Clock, CheckCircle2 } from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const res = await fetch("/api/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      
      if (res.ok) {
        setSubmitted(true);
        setFormData({ name: "", company: "", email: "", message: "" });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-32 pb-24 bg-slate-50 min-h-screen">
      <section className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">고객문의</h1>
          <p className="text-slate-600">궁금하신 사항은 언제든 문의해 주세요. 전문가가 신속하게 답변해 드립니다.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Info */}
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
              <h3 className="text-xl font-bold text-primary mb-8">연락처 정보</h3>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-primary shrink-0">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">전화번호</p>
                    <p className="text-slate-900 font-medium">010-4343-1427</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-primary shrink-0">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">이메일</p>
                    <p className="text-slate-900 font-medium">ecsel@naver.com</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-primary shrink-0">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">주소</p>
                    <p className="text-slate-900 font-medium">경기도 용인시 기흥구 죽현로 8-20</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-primary shrink-0">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">업무시간</p>
                    <p className="text-slate-900 font-medium">평일 09:00 - 18:00 (공휴일 휴무)</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="bg-slate-200 rounded-3xl aspect-square flex items-center justify-center relative overflow-hidden group">
              <img 
                src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80&w=800" 
                alt="Map placeholder" 
                className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:scale-110 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="relative z-10 text-center p-6">
                <MapPin className="w-12 h-12 text-primary mx-auto mb-4" />
                <p className="text-primary font-bold mb-4">네이버 지도에서 보기</p>
                <a 
                  href="https://map.naver.com/p/entry/place/1207213211?placePath=/home?from=map&fromPanelNum=1&additionalHeight=76&timestamp=202602261352&locale=ko&svcName=map_pcv5&c=16.51,0,0,0,dh" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-primary text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg inline-block"
                >
                  길찾기
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white p-10 rounded-3xl shadow-sm border border-slate-100 h-full">
              {submitted ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="h-full flex flex-col items-center justify-center text-center py-20"
                >
                  <CheckCircle2 className="w-20 h-20 text-green-500 mb-6" />
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">문의가 성공적으로 접수되었습니다.</h3>
                  <p className="text-slate-600 mb-8">담당자가 확인 후 빠른 시일 내에 연락드리겠습니다.</p>
                  <button 
                    onClick={() => setSubmitted(false)}
                    className="text-primary font-bold hover:underline"
                  >
                    새로운 문의 작성하기
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700">성함</label>
                      <input
                        required
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                        placeholder="홍길동"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700">회사명</label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                        placeholder="소속사명/개인"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">이메일</label>
                    <input
                      required
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                      placeholder="example@email.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">문의 내용</label>
                    <textarea
                      required
                      rows={6}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
                      placeholder="문의하실 내용을 상세히 적어주세요."
                    ></textarea>
                  </div>
                  <button
                    disabled={loading}
                    type="submit"
                    className="w-full bg-primary hover:bg-primary-light text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg disabled:opacity-50"
                  >
                    {loading ? "전송 중..." : (
                      <>
                        문의 보내기 <Send className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
