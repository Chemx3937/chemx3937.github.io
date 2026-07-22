(() => {
  const header = document.querySelector('.site-header');
  const menuToggle = document.querySelector('.menu-toggle');
  const siteNav = document.querySelector('.site-nav');
  const mainContent = document.querySelector('main');
  const navLinks = [...document.querySelectorAll('[data-nav]')];
  const languageButtons = [...document.querySelectorAll('[data-language]')];
  const storageKey = 'portfolio-language';

  const koreanTranslations = {
    'a11y.skip': '본문으로 건너뛰기',
    'a11y.brandHome': 'Chemin Ahn, 페이지 맨 위로 이동',
    'a11y.language': '언어 선택',
    'a11y.primaryNav': '주요 메뉴',
    'a11y.socialLinks': '소셜 링크',
    'a11y.careerHighlights': '주요 경력',
    'a11y.technologies': '사용 기술',
    'a11y.professionalProfiles': '외부 프로필 링크',

    'brand.role': '로보틱스 엔지니어',

    'nav.about': '소개',
    'nav.projects': '프로젝트',
    'nav.experience': '경력',
    'nav.recognition': '특허·수상',
    'nav.skills': '기술',
    'nav.education': '학력',
    'nav.resume': '이력서',

    'common.email': '이메일',
    'common.sourceCode': '소스 코드',
    'common.demo': '데모',
    'common.watchDemo': '데모 보기',

    'hero.title': 'Vision–force learning으로 구현하는 <em>dexterous bimanual control.</em>',
    'hero.lede': 'Multimodal 시연 데이터로부터 정밀한 dual-arm·dual-hand manipulation을 구현하는 학습 기반 시스템을 개발합니다.',
    'hero.projects': '주요 프로젝트 보기',
    'hero.resume': '이력서 보기',
    'hero.portraitAlt': 'Chemin Ahn의 프로필 사진',
    'hero.portraitCaption': '석사과정 연구원<br><strong>Robotics Innovatory, SKKU</strong>',
    'hero.highlight': '2026 주요 성과',
    'hero.prize': '1위',
    'hero.focusLabel': '현재 연구 분야',
    'hero.proofPatent': '<strong>특허 출원</strong><br>Force-feedback leader arm',
    'hero.proofAward': '<strong>로봇공학 학술대회 수상</strong><br>1위 · KRoC 2026 RED Show',
    'hero.proofInternship': '<strong>Robot Control 인턴십</strong><br>Doosan Robotics · 2024년 7월–10월',
    'hero.proofGpa': '<strong>석사과정 최종 학점</strong><br>4.0 / 4.5 · SKKU',

    'about.kicker': '<span>01</span> 프로필',
    'about.title': '<em>사람의 의도</em>와 로봇의 동작을 잇는 기술을 연구합니다.',
    'about.lead': '성균관대학교 기계공학과 석사과정에서 로보틱스를 전공하고 있습니다. 사람의 시연 데이터로부터 정밀하고 다양한 작업에 전이 가능한 조작 기술을 습득하는 manipulator 학습·제어 시스템을 연구합니다.',
    'about.teleopBody': '고품질 시연 데이터 수집을 위해 force-feedback leader-arm teleoperation 시스템을 구축했고, 이와 별도로 VR-tracker teleoperation 시스템도 개발했습니다. 또한 Doosan Robotics의 Robot Control Team 인턴십에서 ROS 2 visual-servoing package를 개발했습니다.',
    'about.learningBody': 'Imitation Learning 분야에서는 여러 policy를 평가하고 내부 architecture를 수정해 학습 성능을 개선했습니다. 현재는 vision–proprioception policy architecture를 force까지 추가 modality로 학습할 수 있도록 확장하여, hand가 장착된 dual-arm robot의 dexterous manipulation을 위한 학습 기반 제어를 연구하고 있습니다.',
    'about.focusLearning': '<strong>vision과 force를 활용한 multimodal imitation learning</strong>을 기반으로 dexterous manipulation을 연구하며, 여러 policy를 평가하고 내부 architecture를 개선합니다.',
    'about.focusTeleoperation': '<strong>Force-feedback leader-arm teleoperation</strong>을 활용해 고품질 시연 데이터를 수집하며, 이와 별도로 VR-tracker teleoperation 시스템도 구축했습니다.',
    'about.focusControl': 'Impedance control, visual servoing 및 gravity compensation.',

    'projects.kicker': '<span>02</span> 프로젝트',
    'projects.title': '연구를 <em>실제 하드웨어로 구현한</em> 로봇 시스템.',
    'projects.leaderAlt': 'Dual-arm leader teleoperation 장치를 표현한 이미지',
    'projects.featuredLabel': '주요 프로젝트 · Teleoperation',
    'projects.researchProject': '연구 프로젝트',
    'projects.firstPrizeBadge': '1위 · KRoC 2026',
    'projects.patentBadge': '특허 출원 완료',
    'projects.leaderDescription': 'Contact-rich manipulation을 위해 gravity compensation과 operator force feedback을 갖춘 leader–follower 시스템을 개발했습니다. Force-aware imitation learning에 활용되는 시연 데이터의 품질 향상을 목표로 설계했으며, 동일한 leader-arm interface로 NVIDIA Isaac Sim의 robot model도 teleoperation할 수 있습니다.',
    'projects.leaderOutcome1': 'Single-arm 및 dual-arm + hands teleoperation',
    'projects.leaderOutcome2': 'Force feedback, gripper feedback 및 gravity compensation',
    'projects.leaderOutcome3': 'Impedance control 연동',
    'projects.leaderOutcome4': 'NVIDIA Isaac Sim에서의 leader-arm teleoperation',
    'projects.imitationAlt': 'Manipulation task를 학습하는 dual-arm robot 이미지',
    'projects.imitationDescription': '여러 policy architecture를 평가하고 목적에 맞게 수정했으며, teleoperation 시연 데이터를 수집해 single-arm, dual-arm 및 dual-arm-with-hands 구성에 policy를 적용했습니다. 현재는 vision–proprioception 입력에 force를 추가하는 연구를 진행하고 있습니다.',
    'projects.servoingAlt': 'Visual-servoing robot system을 표현한 이미지',
    'projects.servoingDescription': 'Python 기반 ROS 2 visual-servoing package를 개발하고 SDF/Gazebo simulation을 구축하여, simulation과 실제 hardware에서 시스템을 구동했습니다.',
    'projects.vrAlt': 'Dual-arm robot을 제어하는 VR-tracker teleoperation 이미지',
    'projects.vrDescription': '시연 데이터 수집을 위한 VR-tracker teleoperation 시스템을 구축했습니다. Transformation matrix 기반 안전 제한 기능을 적용했으며, SLAM을 지원하는 별도 버전도 구현했습니다.',
    'projects.teleoperationDemo': 'Teleoperation 데모',
    'projects.slamVariant': 'SLAM 버전',
    'projects.medicationAlt': '자율 약제 준비 및 배송 로봇 시스템',
    'projects.kairosMeta': 'KG-KAIROS · 2위',
    'projects.medicationTitle': '의약품 조제 및 배송',
    'projects.medicationDescription': '환자 정보를 확인하고 처방 의약품을 준비한 뒤 자율 배송하는 manipulator–AMR workflow를 설계했습니다.',
    'projects.amrAlt': '직접 제작한 AMR 플랫폼',
    'projects.capstoneMeta': '캡스톤 · 2위',
    'projects.amrTitle': 'Custom AMR: SLAM 및 Planner 비교',
    'projects.amrDescription': 'Custom AMR을 제작하고 GMapping 및 Hector SLAM과 TEB 및 DWA local planner를 조합한 네 가지 navigation 구성을 비교했습니다.',
    'projects.amrOutcome1': 'Raspberry Pi, Arduino Mega, encoder motor 및 2D LIDAR',
    'projects.amrOutcome2': 'ROS Navigation Stack 통합 및 성능 비교',

    'experience.kicker': '<span>03</span> 경력',
    'experience.title': '연구를 <em>산업용 로보틱스에 적용했습니다.</em>',
    'experience.date': '7월 — 10월<br>성남, 대한민국',
    'experience.type': '기업 인턴십',
    'experience.role': 'Robot Control Team 인턴',
    'experience.detail': 'Doosan robot system을 위한 visual-servoing example package를 개발했습니다.',
    'experience.bullet1': 'Python으로 ROS 2 node 구현',
    'experience.bullet2': 'SDF/Gazebo simulation 환경 구축',
    'experience.bullet3': 'Simulation 및 실제 hardware에서 제어 검증',
    'experience.github': 'GitHub에서 package 보기',

    'recognition.kicker': '<span>04</span> 특허 및 수상',
    'recognition.title': '로보틱스 연구에서 이룬 <em>특허 출원 및 대회 수상 성과.</em>',
    'recognition.patent': '특허',
    'recognition.filed': '출원 완료',
    'recognition.responsibilities': '발명자 · 시스템 설계 · Force-feedback 제어 · Teleoperation 구현',
    'recognition.patentBullet1': 'Contact-rich manipulation 중 작업자에게 force feedback을 제공합니다.',
    'recognition.patentBullet2': 'Force-aware imitation learning을 위한 시연 데이터의 품질을 높이도록 설계했습니다.',
    'recognition.patentNote': '특허 공개 전까지 기술 세부 사항은 비공개입니다.',
    'recognition.awards': '수상',
    'recognition.awardsSummary': '대회 수상 3건',
    'recognition.rankSuffix': '위',
    'recognition.award1Subtitle': 'F/T Sensor를 활용한 고품질 시연 데이터 수집용 Force Feedback Leader Arm',
    'recognition.award1Detail': '2026년 2월 수상했으며, 이 프로젝트와 관련된 force-feedback leader-arm system에 대한 특허도 출원되었습니다.',
    'recognition.poster': '포스터',
    'recognition.winners': '수상자 명단',
    'recognition.award2Subtitle': 'Autonomous mobile robot을 위한 sensor 및 navigation algorithm 분석',
    'recognition.award2Detail': '2024년 6월 수상한 연구로, autonomous mobile robot 설계를 위해 sensor 종류와 navigation algorithm의 특성을 비교했습니다.',
    'recognition.award3Subtitle': 'Cobot과 AMR을 활용한 의약품 조제 및 자율 배송',
    'recognition.award3Detail': '2024년 6월 수상했으며, 의약품 조제를 위한 cobot과 자율 배송을 위한 AMR을 연동한 시스템입니다.',

    'skills.kicker': '<span>05</span> 기술',
    'skills.title': '로보틱스 연구개발에 활용하는 <em>실무 중심의 기술 스택.</em>',
    'skills.programming': '프로그래밍',
    'skills.roboticsSimulation': '로보틱스 및 시뮬레이션',
    'skills.learningVision': '학습 및 비전',
    'skills.scientificComputing': '과학 계산',
    'skills.robotPlatforms': '로봇 플랫폼',
    'skills.engineeringTools': '엔지니어링 도구',
    'skills.additional': '<span>기타</span> 대한민국 육군 · 병장 · 2021년 5월 — 2022년 11월',

    'education.kicker': '<span>06</span> 학력',
    'education.title': '기계공학을 기반으로,<br><em>지능형 로보틱스</em>에<br>집중합니다.',
    'education.master': '석사과정',
    'education.ongoing': '재학 중',
    'education.suwon': '수원, 대한민국',
    'education.majorFact': '<span>전공</span>기계공학',
    'education.labLabel': '연구실',
    'education.coursework': '주요 이수 과목',
    'education.bachelor': '학사',
    'education.honors': '우등 졸업',
    'education.seoul': '서울, 대한민국',
    'education.schoolLabel': '학과',
    'education.department': '기계공학과',

    'contact.kicker': '<span>07</span> 연락처',
    'contact.title': '사람에게서 <em>배우는 로봇을 함께 만들어가요.</em>',
    'contact.prompt': '로보틱스 연구, 엔지니어링 기회 또는 협업에 관심이 있으시다면 연락해 주세요.',
    'contact.backToTop': '맨 위로 ↑'
  };

  const metadata = {
    en: {
      title: 'Chemin Ahn — Robotics Engineer',
      description: 'Chemin Ahn is a robotics engineer and M.S. student focused on imitation learning, teleoperation, robot control, and manipulation.',
      socialDescription: 'Robotics engineer focused on imitation learning, teleoperation, robot control, and manipulation.',
      locale: 'en_US'
    },
    ko: {
      title: 'Chemin Ahn — 로보틱스 엔지니어',
      description: 'Chemin Ahn은 Imitation Learning, Teleoperation, Robot Control 및 Manipulation을 연구하는 로보틱스 엔지니어이자 석사과정 연구원입니다.',
      socialDescription: 'Imitation Learning, Teleoperation, Robot Control 및 Manipulation을 연구하는 로보틱스 엔지니어입니다.',
      locale: 'ko_KR'
    }
  };

  const textElements = [...document.querySelectorAll('[data-i18n]')];
  const htmlElements = [...document.querySelectorAll('[data-i18n-html]')];
  const ariaElements = [...document.querySelectorAll('[data-i18n-aria-label]')];
  const altElements = [...document.querySelectorAll('[data-i18n-alt]')];
  const originalText = new Map(textElements.map((element) => [element, element.textContent]));
  const originalHtml = new Map(htmlElements.map((element) => [element, element.innerHTML]));
  const originalAria = new Map(ariaElements.map((element) => [element, element.getAttribute('aria-label')]));
  const originalAlt = new Map(altElements.map((element) => [element, element.getAttribute('alt')]));
  let currentLanguage = 'en';

  const hasKoreanTranslation = (key) => Object.prototype.hasOwnProperty.call(koreanTranslations, key);

  const readSavedLanguage = () => {
    try {
      const language = window.localStorage.getItem(storageKey);
      return language === 'en' || language === 'ko' ? language : null;
    } catch {
      return null;
    }
  };

  const saveLanguage = (language) => {
    try {
      window.localStorage.setItem(storageKey, language);
    } catch {
      // The language still changes when storage is unavailable.
    }
  };

  const setMetaContent = (selector, value) => {
    const element = document.querySelector(selector);
    if (element) element.setAttribute('content', value);
  };

  const syncMenuLabel = () => {
    const isOpen = siteNav.classList.contains('is-open');
    const labels = currentLanguage === 'ko'
      ? { open: '메뉴 열기', close: '메뉴 닫기' }
      : { open: 'Open navigation', close: 'Close navigation' };
    menuToggle.setAttribute('aria-label', isOpen ? labels.close : labels.open);
  };

  const applyLanguage = (language, { persist = false } = {}) => {
    const nextLanguage = language === 'ko' ? 'ko' : 'en';
    const useKorean = nextLanguage === 'ko';
    currentLanguage = nextLanguage;

    textElements.forEach((element) => {
      const key = element.dataset.i18n;
      element.textContent = useKorean && hasKoreanTranslation(key)
        ? koreanTranslations[key]
        : originalText.get(element);
    });

    htmlElements.forEach((element) => {
      const key = element.dataset.i18nHtml;
      element.innerHTML = useKorean && hasKoreanTranslation(key)
        ? koreanTranslations[key]
        : originalHtml.get(element);
    });

    ariaElements.forEach((element) => {
      const key = element.dataset.i18nAriaLabel;
      element.setAttribute('aria-label', useKorean && hasKoreanTranslation(key)
        ? koreanTranslations[key]
        : originalAria.get(element));
    });

    altElements.forEach((element) => {
      const key = element.dataset.i18nAlt;
      element.setAttribute('alt', useKorean && hasKoreanTranslation(key)
        ? koreanTranslations[key]
        : originalAlt.get(element));
    });

    const pageMetadata = metadata[nextLanguage];
    document.title = pageMetadata.title;
    setMetaContent('meta[name="description"]', pageMetadata.description);
    setMetaContent('meta[property="og:locale"]', pageMetadata.locale);
    setMetaContent('meta[property="og:title"]', pageMetadata.title);
    setMetaContent('meta[property="og:description"]', pageMetadata.socialDescription);
    setMetaContent('meta[property="og:site_name"]', pageMetadata.title);
    setMetaContent('meta[name="twitter:title"]', pageMetadata.title);
    setMetaContent('meta[name="twitter:description"]', pageMetadata.socialDescription);

    document.documentElement.lang = nextLanguage;
    document.documentElement.dataset.language = nextLanguage;
    languageButtons.forEach((button) => {
      button.setAttribute('aria-pressed', String(button.dataset.language === nextLanguage));
    });
    syncMenuLabel();

    if (persist) saveLanguage(nextLanguage);
  };

  const savedLanguage = readSavedLanguage();
  const browserLanguage = navigator.language && navigator.language.toLowerCase().startsWith('ko') ? 'ko' : 'en';
  applyLanguage(savedLanguage || browserLanguage);

  languageButtons.forEach((button) => {
    button.addEventListener('click', () => {
      applyLanguage(button.dataset.language, { persist: true });
    });
  });
  document.documentElement.classList.add('i18n-ready');

  const closeMenu = () => {
    siteNav.classList.remove('is-open');
    menuToggle.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('menu-open');
    mainContent.removeAttribute('inert');
    syncMenuLabel();
  };

  menuToggle.addEventListener('click', () => {
    const willOpen = !siteNav.classList.contains('is-open');
    siteNav.classList.toggle('is-open', willOpen);
    menuToggle.setAttribute('aria-expanded', String(willOpen));
    document.body.classList.toggle('menu-open', willOpen);
    mainContent.toggleAttribute('inert', willOpen);
    syncMenuLabel();
  });

  siteNav.addEventListener('click', (event) => {
    if (event.target.closest('a')) closeMenu();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMenu();
  });

  const updateHeader = () => header.classList.toggle('is-scrolled', window.scrollY > 24);
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });
  window.addEventListener('resize', () => {
    if (window.innerWidth > 920) closeMenu();
  }, { passive: true });

  document.documentElement.classList.add('js');
  const revealItems = document.querySelectorAll('[data-reveal]');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    revealItems.forEach((item) => item.classList.add('is-visible'));
  } else {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px' });
    revealItems.forEach((item) => revealObserver.observe(item));
  }

  if ('IntersectionObserver' in window) {
    const sections = navLinks
      .map((link) => document.querySelector(link.getAttribute('href')))
      .filter(Boolean);
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((link) => {
          const isCurrent = link.getAttribute('href') === '#' + entry.target.id;
          if (isCurrent) link.setAttribute('aria-current', 'true');
          else link.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-35% 0px -55%', threshold: 0 });
    sections.forEach((section) => sectionObserver.observe(section));
  }
})();
