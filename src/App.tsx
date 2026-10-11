import { useCallback, useRef, useState } from 'react';
import { SiteHeader } from '@/components/site-header';
import { SmoothScroll } from '@/components/smooth-scroll';
import { FlipWords } from '@/components/ui/flip-words';
import { Typewriter } from '@/components/ui/typewriter-text';
import { LogoPointerTrail } from '@/components/ui/logo-pointer-trail';
import { SmoothCursor } from '@/components/ui/smooth-cursor';
import { EntranceAnimation } from '@/components/ui/entrance-animation';
import { PortfolioRouter } from '@/components/portfolio-router';
import { AboutSection } from '@/components/about-section';
import { ProjectsSection } from '@/components/projects-section';
import { SkillsetSection } from '@/components/skillset-section';
import { SignatureSection } from '@/components/signature-section';
import { ContactSection } from '@/components/contact-section';
import { StudioFooter, StudioPolicyDialog, type StudioPolicy } from '@/components/studio-footer';
import portrait from '@/assets/minha-foto.jpg';

const presentationWords = ['cute', 'better', 'modern'];

type IntroStage = 'loading' | 'revealing' | 'complete';

function initialIntroStage(): IntroStage {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const hasSectionLink = Boolean(window.location.hash && window.location.hash !== '#home');
  return reducedMotion || hasSectionLink ? 'complete' : 'loading';
}

export default function App() {
  return (
    <>
      <SmoothCursor />
      <PortfolioRouter><PortfolioHome /></PortfolioRouter>
    </>
  );
}

function PortfolioHome() {
  const [policy, setPolicy] = useState<StudioPolicy | null>(null);
  const [introStage, setIntroStage] = useState<IntroStage>(initialIntroStage);
  const contentRef = useRef<HTMLDivElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const revealPortfolio = useCallback(() => setIntroStage('revealing'), []);
  const completeEntrance = useCallback(() => setIntroStage('complete'), []);
  const categories = [
    'Web Designer',
    'UX | UI',
    'Graphic Designer',
  ];

  return (
    <>
      {introStage !== 'complete' && (
        <EntranceAnimation
          contentRef={contentRef}
          portraitRef={portraitRef}
          onReveal={revealPortfolio}
          onComplete={completeEntrance}
        />
      )}
    <SmoothScroll enabled={introStage === 'complete'} contentRef={contentRef}>
    <div id="smooth-content" ref={contentRef} data-intro-stage={introStage} aria-busy={introStage !== 'complete'} className="bg-[#F7F5F0] text-[#1A1A1A] selection:bg-black selection:text-white">
      <main>
        <section id="home" aria-label="Home" className="flex h-[100svh] flex-col pb-16">
          {/* Header */}
          <SiteHeader contentRef={contentRef} />

          {/* Conteúdo Principal */}
          <div className="mx-auto grid min-h-0 w-full max-w-[1440px] flex-1 grid-cols-1 grid-rows-[auto_minmax(0,1fr)] items-center gap-10 px-6 pb-8 sm:px-10 lg:grid-cols-[2fr_3fr] lg:grid-rows-1 lg:gap-12 lg:px-12 lg:pb-0">

            {/* Coluna de Texto (Esquerda) */}
            <div className="hero-copy flex flex-col justify-center gap-5 pt-8 lg:pt-0">
              <div className="space-y-2">
                <h1
                  aria-label="Oh, Hello!"
                  className="relative text-6xl font-bold sm:text-7xl lg:text-8xl tracking-tight leading-[0.95]"
                >
                  <span aria-hidden="true" className="invisible block">Oh, Hello!|</span>
                  <span aria-hidden="true" className="absolute inset-0">
                    {introStage !== 'loading' && (
                      <Typewriter text="Oh, Hello!" speed={100} deleteSpeed={50} delay={2000} highlightColor="#283EC9" loop />
                    )}
                  </span>
                </h1>
                <p className="text-lg md:text-xl leading-snug md:leading-snug font-normal text-black max-w-md">
                  <span className="block">Want a project?</span>
                  <span className="block">
                    Build{' '}
                    <FlipWords
                      words={presentationWords}
                      className="px-0 font-bold text-neutral-900 dark:text-neutral-900"
                    />{' '}
                    websites with me.
                  </span>
                </p>
              </div>

              {/* Tags / Categorias */}
              <div className="flex flex-wrap gap-3">
                {categories.map((category, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 border border-neutral-300 text-xs md:text-sm font-light hover:border-black transition-colors cursor-default bg-transparent"
                  >
                    {category}
                  </span>
                ))}
              </div>
            </div>

            {/* Coluna da Imagem (Direita) */}
            <div className="h-full min-h-0 w-full">
              <div ref={portraitRef} className="hero-portrait relative aspect-[6/7] max-h-full w-full overflow-hidden bg-neutral-200 lg:aspect-auto lg:h-full">
                <img
                  src={portrait}
                  alt="Yuri Rocha Retrato"
                  className="w-full h-full object-cover object-center grayscale contrast-125"
                />
                <LogoPointerTrail />
              </div>
            </div>

          </div>

        </section>

        <AboutSection />
        <ProjectsSection />
        <SkillsetSection />
        <SignatureSection />
        <ContactSection onPrivacyClick={() => setPolicy('privacy')} />
      </main>

      <StudioFooter onPolicyClick={setPolicy} />
      <StudioPolicyDialog policy={policy} onClose={() => setPolicy(null)} />
    </div>
    </SmoothScroll>
    </>
  );
}
