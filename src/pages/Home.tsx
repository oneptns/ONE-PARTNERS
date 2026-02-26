import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ChevronRight, ShieldCheck, Zap, HardHat, Building2, ArrowRight } from "lucide-react";

const Home = () => {
  const services = [
    {
      title: "구조설계",
      description: "최신 설계 기준을 준수한 안전하고 경제적인 구조 시스템 제안",
      icon: <Building2 className="w-8 h-8" />,
    },
    {
      title: "내진성능평가",
      description: "기존 건축물의 지진 안전성 정밀 분석 및 보강 방안 수립",
      icon: <ShieldCheck className="w-8 h-8" />,
    },
    {
      title: "구조·내진 보강 설계",
      description: "노후 건축물의 수명 연장과 안전 확보를 위한 최적의 보강 공법",
      icon: <Zap className="w-8 h-8" />,
    },
    {
      title: "구조 감리",
      description: "설계 도서 준수 여부 확인 및 현장 안전 품질 확보",
      icon: <HardHat className="w-8 h-8" />,
    },
  ];

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center pt-20">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2000"
            alt="Engineering background"
            className="w-full h-full object-cover brightness-[0.4]"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/40"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight drop-shadow-lg">
              안전과 신뢰가 최우선인<br />
              <span className="text-primary-light">구조기술사사무소</span>
            </h1>
            <p className="text-sm md:text-xl lg:text-2xl text-slate-300 mb-10 font-light md:whitespace-nowrap overflow-visible drop-shadow-sm">
              축적된 경험과 검증된 기술력으로 안정적인 구조해석과 합리적인 설계를 제공합니다.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/portfolio"
                className="bg-primary hover:bg-primary-light text-white px-8 py-4 rounded-lg font-bold flex items-center gap-2 transition-all"
              >
                프로젝트 보기 <ChevronRight className="w-5 h-5" />
              </Link>
              <Link
                to="/contact"
                className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/30 px-8 py-4 rounded-lg font-bold transition-all"
              >
                문의하기
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">핵심 서비스</h2>
            <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
            <p className="text-slate-600 max-w-2xl mx-auto">
              원파트너스는 건축물의 생애주기 전반에 걸쳐 전문적인 구조 엔지니어링 서비스를 제공합니다.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-8 rounded-2xl border border-slate-100 bg-slate-50 hover:bg-white hover:shadow-xl hover:border-primary/20 transition-all group"
              >
                <div className="text-primary mb-6 group-hover:scale-110 transition-transform">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold mb-4 text-slate-900">{service.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-white/5 skew-x-12 transform translate-x-20"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-white">
            <h2 className="text-3xl font-bold mb-4">전문적인 기술 지원이 필요하십니까?</h2>
            <p className="text-primary-light text-lg">원파트너스의 전문가들이 최적의 솔루션을 제안해 드립니다.</p>
          </div>
          <Link
            to="/contact"
            className="bg-white text-primary hover:bg-slate-100 px-10 py-4 rounded-full font-bold flex items-center gap-2 transition-all shadow-lg"
          >
            지금 상담하기 <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
