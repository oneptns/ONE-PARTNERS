import { motion } from "motion/react";
import { Shield, Target, Users, Award } from "lucide-react";

const About = () => {
  const team = [
    {
      name: "박정우",
      role: "대표이사 / CEO",
      title: "건축구조기술사 / 토목구조기술사 / 건축공학박사",
      desc: "20년 이상의 구조 설계 경력을 보유한 전문가입니다.",
      image: "https://lh3.googleusercontent.com/d/1dIiGLowW0Y96QsnQ7-HnzX6IX4yI1IBp",
    },
    {
      name: "정보라",
      role: "이사 / Director of Engineering",
      title: "건축구조기술사 / 초고층내진공학박사",
      desc: "초고층 건축물 및 특수 구조물 설계 분야의 전문가입니다.",
      image: "https://lh3.googleusercontent.com/d/1uKxLcPq3XRMTlTQwadEFuvQmL39xXPgx",
    },
    {
      name: "신명선",
      role: "과장 / Engineer",
      title: "건축기사 / 초고층내진공학 석사",
      desc: "내진 성능 평가 및 지진 안전성 분석을 담당하고 있습니다.",
      image: "https://lh3.googleusercontent.com/d/1XisAVsQI5kOocivgaFDVclkoUzLkz1Cu",
    },
  ];

  return (
    <div className="pt-32 pb-24">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-6 mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <span className="text-primary font-bold tracking-widest uppercase text-sm mb-4 block">Company Introduction</span>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-8">회사소개</h1>
          <div className="w-20 h-1 bg-primary mx-auto mb-12"></div>
        </motion.div>
      </section>

      {/* Greetings */}
      <section className="bg-slate-50 py-20 mb-24">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-primary mb-6">인사말</h2>
            <p className="text-slate-700 leading-relaxed mb-6">
              원파트너스는 건축물의 안전과 신뢰를 최우선 가치로 삼는 구조기술사사무소입니다. 
              우리는 건축물이 단순한 구조물을 넘어 사람들의 삶과 안전을 담는 그릇임을 잘 알고 있습니다.
            </p>
            <p className="text-slate-700 leading-relaxed mb-6">
              급변하는 건축 환경과 고도화되는 설계 기준 속에서, 원파트너스는 최신 기술력과 풍부한 실무 경험을 바탕으로 
              가장 안전하면서도 경제적인 구조 솔루션을 제공합니다.
            </p>
            <p className="text-slate-700 leading-relaxed">
              고객의 신뢰에 보답하기 위해 모든 프로젝트에 책임감을 가지고 임하며, 
              안전한 사회를 만드는 든든한 파트너가 되겠습니다.
            </p>
              
            <div className="pt-8 flex items-center justify-end gap-4">
              <p className="text-slate-900 font-bold text-xl">대표이사 박정우</p>
              <img 
                src="https://lh3.googleusercontent.com/d/1SlA5NdmakEVOJwETzO4UNY1yqrV5gJBT" 
                alt="서명" 
                className="h-12 w-auto object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
          </motion.div>
          <div className="relative">
            <img
              src="https://images.pexels.com/photos/15146875/pexels-photo-15146875.jpeg?_gl=1*998vxb*_ga*ODUwNzcyMjY1LjE3NzIwNzc0MTk.*_ga_8JE65Q40S6*czE3NzIwNzc0MTgkbzEkZzAkdDE3NzIwNzc0MTgkajYwJGwwJGgw"
              alt="Office"
              className="rounded-2xl shadow-2xl"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="max-w-7xl mx-auto px-6 mb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: <Shield className="w-10 h-10" />, title: "안전 우선", desc: "어떤 타협도 없는 철저한 구조 안전성 확보" },
            { icon: <Target className="w-10 h-10" />, title: "전문성", desc: "지속적인 연구와 기술 개발을 통한 최상의 품질" },
            { icon: <Users className="w-10 h-10" />, title: "신뢰와 협력", desc: "고객 및 파트너사와의 긴밀한 소통과 협력" },
          ].map((item, i) => (
            <div key={i} className="text-center p-10 rounded-2xl border border-slate-100 hover:shadow-lg transition-all">
              <div className="text-primary flex justify-center mb-6">{item.icon}</div>
              <h3 className="text-xl font-bold mb-4">{item.title}</h3>
              <p className="text-slate-600 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-primary mb-4">주요 인력</h2>
          <p className="text-slate-600">분야별 최고의 전문가들이 함께합니다.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {team.map((member, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group"
            >
              <div className="relative overflow-hidden rounded-2xl mb-6 aspect-[4/5]">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-8">
                  <p className="text-white text-sm italic">"{member.desc}"</p>
                </div>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-1">{member.name}</h3>
              <p className="text-primary font-medium text-sm mb-2">{member.role}</p>
              <p className="text-slate-500 text-xs">{member.title}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;
