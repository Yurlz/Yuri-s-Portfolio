const en = {
  navigation: {
    home: "Home", about: "About", work: "Work", skillset: "Skillset", contact: "Contact",
    openMenu: "Open menu", closeMenu: "Close menu", mainMenu: "Main menu", language: "Language",
  },
  hero: {
    greeting: "Oh, Hello!", question: "Want a project?", beforeWord: "Build", afterWord: "websites with me.",
    words: ["cute", "better", "modern"], categories: ["Web Designer", "UX | UI", "Graphic Designer"],
    portrait: "Portrait of Yuri Rocha",
  },
  about: {
    label: "About Yuri",
    introduction: "Hi, I’m Yuri, a graphic and web designer. I work on identities, design systems, and the interfaces where they come to life. I create designs that people remember and products that require no thought to use.",
    tools: "(Tools & technologies)", designTools: "Design tools", developmentTools: "Development tools",
  },
  projects: {
    heading: "Selected Projects", role: "Role", timeline: "Timeline", years: "Years", team: "Team",
    view: "View project", all: "All projects", selected: "Selected work", design: "Design",
    disciplines: "Project disciplines", more: "More projects", visit: "Visit project",
    preview: "Preview of {name}", open: "Open {name} project", gallery: "{name} project gallery",
    artwork: "{name} — project artwork", palette: "{name} colour palette", detail: "Detail of the {name} visual identity",
  },
  skills: {
    heading: "Skillset",
    web: { title: "Web Design", description: "Thoughtful websites that bring brands to life, with clear structure and a seamless experience on every screen." },
    interface: { title: "UX | UI", description: "Intuitive interfaces built around real people, from user flows and prototypes to the final detail." },
    graphic: { title: "Graphic Design", description: "Distinctive identities and visual communication designed to make brands recognizable and memorable." },
  },
  signature: {
    label: "Yurlz Studio — creative signature", backToTop: "Back to top",
    description: "Consistency, curiosity, and thoughtful design that connects brands with people.",
  },
  contact: {
    heading: "SEND ME A MESSAGE", direct: "Or just write:", name: "NAME", email: "EMAIL", phone: "PHONE",
    optional: "(optional)", reason: "REASON", message: "MESSAGE", namePlaceholder: "Your full name",
    emailPlaceholder: "name@company.com", messagePlaceholder: "A few words about your idea",
    projectReason: "Freelance project", helloReason: "Just saying hi", send: "Send Details",
    sendNote: "Your email app opens with the details ready to send.",
    privacyNote: "A direct conversation, from your inbox to mine —", privacyLink: "privacy policy",
    copy: "Copy message", viewMessage: "View your message", nameRequired: "Please enter your name.",
    messageRequired: "Please tell me a little about your idea.", emailRequired: "Please enter your email address.",
    emailInvalid: "Please enter a valid email address.",
    ready: "Your email draft is ready. Send it from your email app, or copy the message below.",
    copied: "Message copied. You can email it to {email}.", copyFallback: "You can select and copy your message below.",
    draftName: "Name", draftEmail: "Email", draftPhone: "Phone", draftReason: "Reason",
  },
  footer: {
    backToTop: "Yurlz Studio — back to top", taglineStart: "SOMEWHERE BETWEEN", taglineEnd: "STRUCTURE AND INSTINCT.",
    label: "Footer", projects: "PROJECTS", about: "ABOUT", privacy: "PRIVACY", terms: "TERMS",
    copyright: "All rights reserved.",
  },
  policy: {
    close: "Close", termsTitle: "Terms of use", privacyTitle: "Privacy",
    termsIntroduction: "This portfolio presents design work by Yuri Rocha / Yurlz Studio. The work is shown for reference and remains the property of its respective owners.",
    termsDetails: "Sending an inquiry starts a conversation. Project scope, timelines, pricing, and usage rights are agreed separately before work begins.",
    privacyIntroduction: "The contact form prepares a message in your own email app. This website does not submit or store the details you enter in the form.",
    privacyDetails: "If you send that email, your name, email address, and any details you include are used to reply to your inquiry. For questions about your message, write to",
    languagePreference: "Your selected language is saved in this browser so it can be remembered on your next visit.",
  },
  pageTitle: "Yurlz | Portfolio",
  projectContent: {
    redragon: {
      role: "Graphic · Web Design · Social Media", timeline: "2 years", year: "2024 - present", team: "Marketing",
      hrefLabel: "Visit Redragon’s website",
      description: "Graphic design, web design and social media for Redragon. A selection of work connecting the brand's bold visual identity to its gaming world, with dark backgrounds, sharp contrast and red accents.",
      disciplines: ["Graphic design", "Web design", "Social media"],
      gallery: ["Redragon website — Flamengo collection", "Redragon website — teams, products and news", "Redragon Spectra Pro and Sparda campaign artwork", "Match Mais login screen and Redragon mascot"],
    },
    kaledo: {
      role: "Graphic Design", timeline: "1 month", year: "2025", team: null as string | null, hrefLabel: "Visit project",
      description: "Graphic design for Kaledo. A clean visual identity that combines a geometric symbol with a deep green palette. Simple shapes and generous space give the brand its distinctive character.",
      disciplines: ["Graphic design", "Visual identity"],
      gallery: ["Kaledo project artwork", "Kaledo photography logo and Instagram profile", "Kaledo logo concept, full logo and usage variations", "Kaledo typography and colour palette", "Kaledo brand applied to portrait photography"],
    },
    kria: {
      role: "Graphic Design", timeline: "3 months", year: "2025", team: null as string | null, hrefLabel: "View full collection",
      description: "Graphic design for Kria. Expressive lettering, detailed illustration and warm colours create an identity full of character, with bold contrasts across the artwork and its applications.",
      disciplines: ["Graphic design", "Illustration"],
      gallery: ["Kria black shirt with red dragon artwork, front and back", "Kria white shirts with black dragon illustrations", "Kria black shirt and red and cream dragon illustration", "Kria shirt details with embroidered dragon designs"],
    },
    Emily: {
      role: "Graphic Design", timeline: "2 months", year: "2025", team: null as string | null, hrefLabel: "Visit project",
      description: "Graphic design for Emily. A playful illustrated character comes to life in a light blue and white palette. Soft shapes, expressive details and small star accents bring personality to the artwork.",
      disciplines: ["Graphic design", "Illustration"],
      gallery: ["Emily Carina white shirts with blue flower character illustrations", "Emily Carina website featuring the official shirt, paintings and tattoo studio"],
    },
    solid: {
      role: "Graphic · Web Design · Social Media", timeline: "2 years", year: "2024 - present", team: "Marketing", hrefLabel: "Visit project",
      description: "Graphic design, web design and social media for Solid. A vivid purple palette and a compact, directional symbol form a recognisable visual foundation across the brand's digital communication.",
      disciplines: ["Graphic design", "Web design", "Social media"], gallery: [] as string[],
    },
  },
};

export type Translations = typeof en;
export type Language = "pt" | "en" | "es";

const pt: Translations = {
  navigation: {
    home: "Início", about: "Sobre", work: "Projetos", skillset: "Habilidades", contact: "Contato",
    openMenu: "Abrir menu", closeMenu: "Fechar menu", mainMenu: "Menu principal", language: "Idioma",
  },
  hero: {
    greeting: "Ah, olá!", question: "Vamos criar um projeto?", beforeWord: "Crie sites", afterWord: "comigo.",
    words: ["bonitos", "melhores", "modernos"], categories: ["Designer de sites", "UX | UI", "Designer gráfico"],
    portrait: "Retrato de Yuri Rocha",
  },
  about: {
    label: "Sobre Yuri",
    introduction: "Olá, sou Yuri, designer gráfico e de sites. Trabalho com identidades visuais, sistemas de design e as interfaces que dão vida a eles. Crio designs que as pessoas lembram e produtos intuitivos de usar.",
    tools: "(Ferramentas e tecnologias)", designTools: "Ferramentas de design", developmentTools: "Ferramentas de desenvolvimento",
  },
  projects: {
    heading: "Projetos selecionados", role: "Atuação", timeline: "Duração", years: "Ano", team: "Equipe",
    view: "Ver projeto", all: "Todos os projetos", selected: "Trabalhos selecionados", design: "Design",
    disciplines: "Áreas do projeto", more: "Mais projetos", visit: "Visitar projeto",
    preview: "Prévia de {name}", open: "Abrir projeto {name}", gallery: "Galeria do projeto {name}",
    artwork: "{name} — arte do projeto", palette: "Paleta de cores de {name}", detail: "Detalhe da identidade visual de {name}",
  },
  skills: {
    heading: "Habilidades",
    web: { title: "Design de sites", description: "Sites bem planejados que dão vida às marcas, com estrutura clara e uma experiência fluida em qualquer tela." },
    interface: { title: "UX | UI", description: "Interfaces intuitivas pensadas para pessoas reais, dos fluxos de navegação e protótipos ao último detalhe." },
    graphic: { title: "Design gráfico", description: "Identidades únicas e comunicação visual criadas para tornar as marcas reconhecíveis e memoráveis." },
  },
  signature: {
    label: "Yurlz Studio — assinatura criativa", backToTop: "Voltar ao topo",
    description: "Consistência, curiosidade e design cuidadoso que conecta marcas e pessoas.",
  },
  contact: {
    heading: "ENVIE UMA MENSAGEM", direct: "Ou escreva para:", name: "NOME", email: "E-MAIL", phone: "TELEFONE",
    optional: "(opcional)", reason: "MOTIVO", message: "MENSAGEM", namePlaceholder: "Seu nome completo",
    emailPlaceholder: "nome@empresa.com", messagePlaceholder: "Conte um pouco sobre sua ideia",
    projectReason: "Projeto freelance", helloReason: "Só para dar um oi", send: "Enviar detalhes",
    sendNote: "Seu aplicativo de e-mail abre com os detalhes prontos para enviar.",
    privacyNote: "Uma conversa direta, da sua caixa de entrada para a minha —", privacyLink: "política de privacidade",
    copy: "Copiar mensagem", viewMessage: "Ver sua mensagem", nameRequired: "Por favor, informe seu nome.",
    messageRequired: "Por favor, conte um pouco sobre sua ideia.", emailRequired: "Por favor, informe seu e-mail.",
    emailInvalid: "Por favor, informe um endereço de e-mail válido.",
    ready: "Seu rascunho está pronto. Envie pelo seu aplicativo de e-mail ou copie a mensagem abaixo.",
    copied: "Mensagem copiada. Você pode enviá-la para {email}.", copyFallback: "Você pode selecionar e copiar sua mensagem abaixo.",
    draftName: "Nome", draftEmail: "E-mail", draftPhone: "Telefone", draftReason: "Motivo",
  },
  footer: {
    backToTop: "Yurlz Studio — voltar ao topo", taglineStart: "EM ALGUM LUGAR ENTRE", taglineEnd: "ESTRUTURA E INSTINTO.",
    label: "Rodapé", projects: "PROJETOS", about: "SOBRE", privacy: "PRIVACIDADE", terms: "TERMOS",
    copyright: "Todos os direitos reservados.",
  },
  policy: {
    close: "Fechar", termsTitle: "Termos de uso", privacyTitle: "Privacidade",
    termsIntroduction: "Este portfólio apresenta trabalhos de design de Yuri Rocha / Yurlz Studio. Os trabalhos são exibidos como referência e permanecem propriedade de seus respectivos titulares.",
    termsDetails: "Enviar uma consulta inicia uma conversa. Escopo, prazos, valores e direitos de uso são combinados separadamente antes do início do trabalho.",
    privacyIntroduction: "O formulário de contato prepara uma mensagem no seu próprio aplicativo de e-mail. Este site não envia nem armazena os dados que você preenche no formulário.",
    privacyDetails: "Se você enviar esse e-mail, seu nome, endereço de e-mail e os detalhes incluídos serão usados para responder à sua consulta. Para dúvidas sobre sua mensagem, escreva para",
    languagePreference: "O idioma escolhido é salvo neste navegador para ser lembrado na sua próxima visita.",
  },
  pageTitle: "Yurlz | Portfólio",
  projectContent: {
    redragon: {
      role: "Design gráfico · Sites · Redes sociais", timeline: "2 anos", year: "2024 - atual", team: "Marketing", hrefLabel: "Visitar site da Redragon",
      description: "Design gráfico, design de sites e redes sociais para a Redragon. Uma seleção de trabalhos que conecta a identidade visual marcante da marca ao universo gamer, com fundos escuros, alto contraste e detalhes em vermelho.",
      disciplines: ["Design gráfico", "Design de sites", "Redes sociais"],
      gallery: ["Site da Redragon — coleção Flamengo", "Site da Redragon — equipes, produtos e notícias", "Artes das campanhas Redragon Spectra Pro e Sparda", "Tela de login do Match Mais e mascote da Redragon"],
    },
    kaledo: {
      role: "Design gráfico", timeline: "1 mês", year: "2025", team: null, hrefLabel: "Visitar projeto",
      description: "Design gráfico para a Kaledo. Uma identidade visual limpa que combina um símbolo geométrico com uma paleta de verde profundo. Formas simples e espaços generosos dão à marca sua personalidade única.",
      disciplines: ["Design gráfico", "Identidade visual"],
      gallery: ["Arte do projeto Kaledo", "Logo de fotografia e perfil do Instagram da Kaledo", "Conceito do logo Kaledo, logo completo e variações de uso", "Tipografia e paleta de cores da Kaledo", "Marca Kaledo aplicada à fotografia de retrato"],
    },
    kria: {
      role: "Design gráfico", timeline: "3 meses", year: "2025", team: null, hrefLabel: "Ver coleção completa",
      description: "Design gráfico para a Kria. Letras expressivas, ilustrações detalhadas e cores quentes criam uma identidade cheia de personalidade, com contrastes marcantes nas artes e em suas aplicações.",
      disciplines: ["Design gráfico", "Ilustração"],
      gallery: ["Camiseta preta da Kria com arte de dragão vermelho, frente e verso", "Camisetas brancas da Kria com ilustrações de dragões pretos", "Camiseta preta da Kria e ilustração de dragão em vermelho e creme", "Detalhes das camisetas Kria com dragões bordados"],
    },
    Emily: {
      role: "Design gráfico", timeline: "2 meses", year: "2025", team: null, hrefLabel: "Visitar projeto",
      description: "Design gráfico para a Emily. Uma personagem ilustrada e divertida ganha vida em uma paleta de azul claro e branco. Formas suaves, detalhes expressivos e pequenas estrelas dão personalidade à arte.",
      disciplines: ["Design gráfico", "Ilustração"],
      gallery: ["Camisetas brancas Emily Carina com ilustrações de uma personagem de flor azul", "Site Emily Carina com a camiseta oficial, pinturas e estúdio de tatuagem"],
    },
    solid: {
      role: "Design gráfico · Sites · Redes sociais", timeline: "2 anos", year: "2024 - atual", team: "Marketing", hrefLabel: "Visitar projeto",
      description: "Design gráfico, design de sites e redes sociais para a Solid. Uma paleta de roxo vibrante e um símbolo compacto e direcional formam uma base visual reconhecível em toda a comunicação digital da marca.",
      disciplines: ["Design gráfico", "Design de sites", "Redes sociais"], gallery: [],
    },
  },
};

const es: Translations = {
  navigation: {
    home: "Inicio", about: "Sobre mí", work: "Proyectos", skillset: "Habilidades", contact: "Contacto",
    openMenu: "Abrir menú", closeMenu: "Cerrar menú", mainMenu: "Menú principal", language: "Idioma",
  },
  hero: {
    greeting: "¡Hola!", question: "¿Creamos un proyecto?", beforeWord: "Crea sitios", afterWord: "conmigo.",
    words: ["bonitos", "mejores", "modernos"], categories: ["Diseñador web", "UX | UI", "Diseñador gráfico"],
    portrait: "Retrato de Yuri Rocha",
  },
  about: {
    label: "Sobre Yuri",
    introduction: "Hola, soy Yuri, diseñador gráfico y web. Trabajo con identidades visuales, sistemas de diseño y las interfaces que les dan vida. Creo diseños que las personas recuerdan y productos intuitivos de usar.",
    tools: "(Herramientas y tecnologías)", designTools: "Herramientas de diseño", developmentTools: "Herramientas de desarrollo",
  },
  projects: {
    heading: "Proyectos seleccionados", role: "Rol", timeline: "Duración", years: "Año", team: "Equipo",
    view: "Ver proyecto", all: "Todos los proyectos", selected: "Trabajos seleccionados", design: "Diseño",
    disciplines: "Áreas del proyecto", more: "Más proyectos", visit: "Visitar proyecto",
    preview: "Vista previa de {name}", open: "Abrir proyecto {name}", gallery: "Galería del proyecto {name}",
    artwork: "{name} — arte del proyecto", palette: "Paleta de colores de {name}", detail: "Detalle de la identidad visual de {name}",
  },
  skills: {
    heading: "Habilidades",
    web: { title: "Diseño web", description: "Sitios web bien pensados que dan vida a las marcas, con una estructura clara y una experiencia fluida en cualquier pantalla." },
    interface: { title: "UX | UI", description: "Interfaces intuitivas pensadas para personas reales, desde los flujos de navegación y prototipos hasta el último detalle." },
    graphic: { title: "Diseño gráfico", description: "Identidades únicas y comunicación visual diseñadas para que las marcas sean reconocibles y memorables." },
  },
  signature: {
    label: "Yurlz Studio — firma creativa", backToTop: "Volver arriba",
    description: "Consistencia, curiosidad y diseño cuidadoso que conecta marcas y personas.",
  },
  contact: {
    heading: "ENVÍAME UN MENSAJE", direct: "O escribe a:", name: "NOMBRE", email: "CORREO", phone: "TELÉFONO",
    optional: "(opcional)", reason: "MOTIVO", message: "MENSAJE", namePlaceholder: "Tu nombre completo",
    emailPlaceholder: "nombre@empresa.com", messagePlaceholder: "Cuéntame un poco sobre tu idea",
    projectReason: "Proyecto freelance", helloReason: "Solo para saludar", send: "Enviar detalles",
    sendNote: "Tu aplicación de correo se abre con los detalles listos para enviar.",
    privacyNote: "Una conversación directa, de tu bandeja de entrada a la mía —", privacyLink: "política de privacidad",
    copy: "Copiar mensaje", viewMessage: "Ver tu mensaje", nameRequired: "Por favor, indica tu nombre.",
    messageRequired: "Por favor, cuéntame un poco sobre tu idea.", emailRequired: "Por favor, indica tu correo electrónico.",
    emailInvalid: "Por favor, indica una dirección de correo válida.",
    ready: "Tu borrador está listo. Envíalo desde tu aplicación de correo o copia el mensaje de abajo.",
    copied: "Mensaje copiado. Puedes enviarlo a {email}.", copyFallback: "Puedes seleccionar y copiar tu mensaje de abajo.",
    draftName: "Nombre", draftEmail: "Correo", draftPhone: "Teléfono", draftReason: "Motivo",
  },
  footer: {
    backToTop: "Yurlz Studio — volver arriba", taglineStart: "EN ALGÚN LUGAR ENTRE", taglineEnd: "ESTRUCTURA E INSTINTO.",
    label: "Pie de página", projects: "PROYECTOS", about: "SOBRE MÍ", privacy: "PRIVACIDAD", terms: "TÉRMINOS",
    copyright: "Todos los derechos reservados.",
  },
  policy: {
    close: "Cerrar", termsTitle: "Términos de uso", privacyTitle: "Privacidad",
    termsIntroduction: "Este portafolio presenta trabajos de diseño de Yuri Rocha / Yurlz Studio. Los trabajos se muestran como referencia y siguen siendo propiedad de sus respectivos titulares.",
    termsDetails: "Enviar una consulta inicia una conversación. El alcance, los plazos, los precios y los derechos de uso se acuerdan por separado antes de comenzar el trabajo.",
    privacyIntroduction: "El formulario de contacto prepara un mensaje en tu propia aplicación de correo. Este sitio no envía ni almacena los datos que introduces en el formulario.",
    privacyDetails: "Si envías ese correo, tu nombre, dirección de correo y los detalles incluidos se utilizarán para responder a tu consulta. Si tienes preguntas sobre tu mensaje, escribe a",
    languagePreference: "El idioma elegido se guarda en este navegador para recordarlo en tu próxima visita.",
  },
  pageTitle: "Yurlz | Portafolio",
  projectContent: {
    redragon: {
      role: "Diseño gráfico · Web · Redes sociales", timeline: "2 años", year: "2024 - actualidad", team: "Marketing", hrefLabel: "Visitar sitio de Redragon",
      description: "Diseño gráfico, diseño web y redes sociales para Redragon. Una selección de trabajos que conecta la identidad visual de la marca con el mundo gamer, con fondos oscuros, contrastes marcados y detalles en rojo.",
      disciplines: ["Diseño gráfico", "Diseño web", "Redes sociales"],
      gallery: ["Sitio de Redragon — colección Flamengo", "Sitio de Redragon — equipos, productos y noticias", "Artes de las campañas Redragon Spectra Pro y Sparda", "Pantalla de inicio de sesión de Match Mais y mascota de Redragon"],
    },
    kaledo: {
      role: "Diseño gráfico", timeline: "1 mes", year: "2025", team: null, hrefLabel: "Visitar proyecto",
      description: "Diseño gráfico para Kaledo. Una identidad visual limpia que combina un símbolo geométrico con una paleta de verde profundo. Las formas simples y los espacios amplios dan a la marca su carácter distintivo.",
      disciplines: ["Diseño gráfico", "Identidad visual"],
      gallery: ["Arte del proyecto Kaledo", "Logo de fotografía y perfil de Instagram de Kaledo", "Concepto del logo Kaledo, logo completo y variantes de uso", "Tipografía y paleta de colores de Kaledo", "Marca Kaledo aplicada a fotografía de retrato"],
    },
    kria: {
      role: "Diseño gráfico", timeline: "3 meses", year: "2025", team: null, hrefLabel: "Ver colección completa",
      description: "Diseño gráfico para Kria. Letras expresivas, ilustraciones detalladas y colores cálidos crean una identidad llena de carácter, con contrastes marcados en las artes y sus aplicaciones.",
      disciplines: ["Diseño gráfico", "Ilustración"],
      gallery: ["Camiseta negra de Kria con arte de dragón rojo, frente y espalda", "Camisetas blancas de Kria con ilustraciones de dragones negros", "Camiseta negra de Kria e ilustración de dragón en rojo y crema", "Detalles de las camisetas Kria con dragones bordados"],
    },
    Emily: {
      role: "Diseño gráfico", timeline: "2 meses", year: "2025", team: null, hrefLabel: "Visitar proyecto",
      description: "Diseño gráfico para Emily. Un personaje ilustrado y divertido cobra vida en una paleta de azul claro y blanco. Las formas suaves, los detalles expresivos y las pequeñas estrellas dan personalidad al arte.",
      disciplines: ["Diseño gráfico", "Ilustración"],
      gallery: ["Camisetas blancas Emily Carina con ilustraciones de un personaje de flor azul", "Sitio Emily Carina con la camiseta oficial, pinturas y estudio de tatuajes"],
    },
    solid: {
      role: "Diseño gráfico · Web · Redes sociales", timeline: "2 años", year: "2024 - actualidad", team: "Marketing", hrefLabel: "Visitar proyecto",
      description: "Diseño gráfico, diseño web y redes sociales para Solid. Una paleta de morado vibrante y un símbolo compacto y direccional crean una base visual reconocible en toda la comunicación digital de la marca.",
      disciplines: ["Diseño gráfico", "Diseño web", "Redes sociales"], gallery: [],
    },
  },
};

export const translations: Record<Language, Translations> = { pt, en, es };
export const languageOptions: { value: Language; label: string; locale: string }[] = [
  { value: "pt", label: "Português", locale: "pt-BR" },
  { value: "en", label: "English", locale: "en" },
  { value: "es", label: "Español", locale: "es" },
];

export function interpolate(text: string, values: Record<string, string>) {
  return text.replace(/\{(\w+)\}/g, (match, key: string) => values[key] ?? match);
}
