import { motion } from "motion/react";
import { Building2, ShieldAlert, Zap, HardHat, Search, ClipboardCheck } from "lucide-react";

const Business = () => {
  const areas = [
    {
      title: "건축 구조설계",
      icon: <Building2 className="w-12 h-12" />,
      scope: ["공동주택, 업무시설, 상업시설 구조설계", "공장, 창고 등 산업시설 구조설계", "특수 구조물 및 대공간 구조설계"],
    },
    {
      title: "구조 안전성 검토",
      icon: <ClipboardCheck className="w-12 h-12" />,
      scope: ["용도변경 및 증축에 따른 구조 검토", "공사 중 인접 건물 영향 검토", "노후 건축물 정밀 안전 진단"],
    },
    {
      title: "내진·성능기반 설계 및 평가",
      icon: <ShieldAlert className="w-12 h-12" />,
      scope: ["기존 건축물 내진성능평가", "신축 건축물 성능기반 내진설계", "비구조요소 내진 설계 및 검토"],
    },
    {
      title: "구조·내진 보강 설계",
      icon: <Zap className="w-12 h-12" />,
      scope: ["탄소섬유, 철판보강 등 보강 공법 제안", "내진 댐퍼 및 면진 시스템 적용 설계", "보강 후 구조 안전성 재검증"],
    },
    {
      title: "건축구조감리",
      icon: <HardHat className="w-12 h-12" />,
      scope: ["배근 적정성 및 콘크리트 타설 확인", "구조 도면과 현장 일치 여부 검토", "시공 중 발생하는 구조적 문제 해결 지원"],
    },
    {
      title: "제3자 검토",
      icon: <Search className="w-12 h-12" />,
      scope: ["타 사무소 설계 도서의 적정성 검토", "구조 계산서 및 도면 오류 체크", "합리적 설계 여부 독립적 검증"],
    },
  ];

  return (
    <div className="pt-32 pb-24">
      <section className="max-w-7xl mx-auto px-6 mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <span className="text-primary font-bold tracking-widest uppercase text-sm mb-4 block">Business Areas</span>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-8">업무분야</h1>
          <div className="w-20 h-1 bg-primary mx-auto mb-12"></div>
          <p className="text-slate-600 max-w-3xl mx-auto text-lg">
            원파트너스는 전문 기술력을 바탕으로 건축물의 안전을 책임지는 
            다양한 엔지니어링 서비스를 제공합니다.
          </p>
        </motion.div>
      </section>

      <section className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {areas.map((area, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-3xl border border-slate-100 p-10 shadow-sm hover:shadow-xl transition-all flex flex-col md:flex-row gap-8"
            >
              <div className="text-primary shrink-0">
                <div className="w-20 h-20 bg-slate-50 rounded-2xl flex items-center justify-center">
                  {area.icon}
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-6">{area.title}</h3>
                
                <div className="mb-6">
                  <h4 className="text-sm font-bold text-primary uppercase tracking-wider mb-3">업무 범위</h4>
                  <ul className="space-y-2">
                    {area.scope.map((item, j) => (
                      <li key={j} className="text-slate-600 text-sm flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 shrink-0"></div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Business;
