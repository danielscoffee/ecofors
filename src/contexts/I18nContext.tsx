import { getLocales } from "expo-localization";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

// Translation keys
type TranslationKeys = {
  // Common
  "common.loading": string;
  "common.error": string;
  "common.success": string;
  "common.cancel": string;
  "common.continue": string;
  "common.back": string;
  "common.next": string;
  "common.skip": string;
  "common.save": string;
  "common.submit": string;
  "common.close": string;
  "common.ok": string;
  "common.yes": string;
  "common.no": string;
  "common.retry": string;
  "common.done": string;
  "common.of": string;
  "common.getStarted": string;

  // Auth screens
  "auth.login.title": string;
  "auth.login.subtitle": string;
  "auth.login.welcome": string;
  "auth.login.signin": string;
  "auth.login.email": string;
  "auth.login.password": string;
  "auth.login.forgotPassword": string;
  "auth.login.createAccount": string;
  "auth.signup.title": string;
  "auth.signup.subtitle": string;
  "auth.signup.firstName": string;
  "auth.signup.lastName": string;
  "auth.signup.schoolName": string;
  "auth.signup.role": string;
  "auth.signup.confirmPassword": string;
  "auth.signup.createAccount": string;
  "auth.signup.alreadyHaveAccount": string;
  "auth.forgot.title": string;
  "auth.forgot.subtitle": string;
  "auth.forgot.sendResetLink": string;
  "auth.forgot.checkEmail": string;
  "auth.forgot.backToSignIn": string;

  // Onboarding
  "onboarding.step": string;
  "onboarding.of": string;
  "onboarding.welcome.title": string;
  "onboarding.welcome.subtitle": string;
  "onboarding.welcome.description": string;
  "onboarding.ecosystems.title": string;
  "onboarding.ecosystems.subtitle": string;
  "onboarding.ecosystems.description": string;
  "onboarding.evaluation.title": string;
  "onboarding.evaluation.subtitle": string;
  "onboarding.evaluation.description": string;
  "onboarding.rankings.title": string;
  "onboarding.rankings.subtitle": string;
  "onboarding.rankings.description": string;
  "onboarding.ready.title": string;
  "onboarding.ready.subtitle": string;
  "onboarding.ready.description": string;

  // Home screen
  "home.header.greeting": string;
  "home.header.subtitle": string;
  "home.header.notifications": string;
  "home.metrics.title": string;
  "home.quickActions.title": string;
  "home.highlights.title": string;
  "home.highlights.subtitle": string;
  "home.projects.title": string;
  "home.projects.description": string;
  "home.projects.joinNow": string;

  // Evaluation
  "evaluation.title": string;
  "evaluation.subtitle": string;
  "evaluation.instructions": string;
  "evaluation.selectClass": string;
  "evaluation.selectClassTitle": string;
  "evaluation.criteriaTitle": string;
  "evaluation.currentIndex": string;
  "evaluation.rateLabel": string;
  "evaluation.weight": string;
  "evaluation.incompleteEvaluation": string;
  "evaluation.incompleteMessage": string;
  "evaluation.submitted": string;
  "evaluation.submittedMessage": string;
  "evaluation.viewRankings": string;
  "evaluation.evaluateAnother": string;
  "evaluation.backToHome": string;
  "evaluation.criteria.cleanliness": string;
  "evaluation.criteria.cleanlinessDesc": string;
  "evaluation.criteria.commonAreas": string;
  "evaluation.criteria.commonAreasDesc": string;
  "evaluation.criteria.garbageSorting": string;
  "evaluation.criteria.garbageSortingDesc": string;
  "evaluation.criteria.sustainability": string;
  "evaluation.criteria.sustainabilityDesc": string;
  "evaluation.criteria.organization": string;
  "evaluation.criteria.recycling": string;
  "evaluation.criteria.participation": string;
  "evaluation.rating.excellent": string;
  "evaluation.rating.good": string;
  "evaluation.rating.average": string;
  "evaluation.rating.poor": string;
  "evaluation.comments": string;
  "evaluation.submitEvaluation": string;
  "evaluation.submissionSuccess": string;

  // Rankings
  "rankings.title": string;
  "rankings.subtitle": string;
  "rankings.period.daily": string;
  "rankings.period.weekly": string;
  "rankings.period.monthly": string;
  "rankings.topPerformers": string;
  "rankings.byGarbageIndex": string;
  "rankings.lastEvaluated": string;
  "rankings.noData": string;
  "rankings.viewDetails": string;
  "rankings.overview": string;
  "rankings.avgIndex": string;
  "rankings.classes": string;
  "rankings.improving": string;
  "rankings.details.classroom": string;
  "rankings.details.commonAreas": string;
  "rankings.details.sorting": string;
  "rankings.details.sustainability": string;
  "rankings.tips.title": string;
  "rankings.tips.consistency": string;
  "rankings.tips.consistencyDesc": string;
  "rankings.tips.teamwork": string;
  "rankings.tips.teamworkDesc": string;
  "rankings.tips.sustainability": string;
  "rankings.tips.sustainabilityDesc": string;

  // Reports
  "reports.title": string;
  "reports.subtitle": string;
  "reports.weeklySummary": string;
  "reports.totalCollected": string;
  "reports.byCategory": string;
  "reports.recentReports": string;
  "reports.newReport": string;
  "reports.selectType": string;
  "reports.amount": string;
  "reports.location": string;
  "reports.reporter": string;
  "reports.submit": string;
  "reports.submitted": string;
  "reports.viewAll": string;
  "reports.filter": string;
  "reports.exportData": string;
  "reports.incompleteReport": string;
  "reports.fillAllFields": string;
  "reports.reportSubmitted": string;
  "reports.successfullyRecorded": string;
  "reports.reportedBy": string;
  "reports.amountKg": string;
  "reports.placeholders.amount": string;
  "reports.placeholders.location": string;
  "reports.placeholders.reporter": string;

  // Garbage types
  "garbage.recyclable": string;
  "garbage.organic": string;
  "garbage.paper": string;
  "garbage.plastic": string;
  "garbage.general": string;
  "garbage.hazardous": string;
  "garbage.glass": string;
  "garbage.metal": string;
  "garbage.electronic": string;

  // Metrics
  "metrics.totalGarbageCollected": string;
  "metrics.recycledMaterials": string;
  "metrics.organicWaste": string;
  "metrics.trend.up": string;
  "metrics.trend.down": string;
  "metrics.thisWeek": string;
  "metrics.thisMonth": string;

  // Units
  "units.kg": string;
  "units.percent": string;
  "units.tons": string;
  "units.liters": string;

  // Quick Actions
  "actions.classEvaluation": string;
  "actions.classEvaluation.subtitle": string;
  "actions.garbageReport": string;
  "actions.garbageReport.subtitle": string;
  "actions.classRankings": string;
  "actions.classRankings.subtitle": string;
  "actions.recyclingGuide": string;
  "actions.recyclingGuide.subtitle": string;

  // Recycling Guide
  "recyclingGuide.title": string;
  "recyclingGuide.quickTips": string;
  "recyclingGuide.tip1": string;
  "recyclingGuide.tip2": string;
  "recyclingGuide.tip3": string;
  "recyclingGuide.tip4": string;
  "recyclingGuide.moreInfo": string;

  // Days/Time
  "time.today": string;
  "time.yesterday": string;
  "time.thisWeek": string;
  "time.lastWeek": string;
  "time.thisMonth": string;
  "time.lastMonth": string;
  "time.daysAgo": string;
  "time.hoursAgo": string;
  "time.minutesAgo": string;
  "time.justNow": string;

  // Classes/Subjects
  "classes.mathematics": string;
  "classes.science": string;
  "classes.history": string;
  "classes.geography": string;
  "classes.portuguese": string;
  "classes.english": string;
  "classes.physicalEducation": string;
  "classes.arts": string;
  "classes.library": string;
  "classes.cafeteria": string;
  "classes.playground": string;
  "classes.other": string;
};

// Portuguese translations (DEFAULT)
const pt: TranslationKeys = {
  // Common
  "common.loading": "Carregando...",
  "common.error": "Erro",
  "common.success": "Sucesso",
  "common.cancel": "Cancelar",
  "common.continue": "Continuar",
  "common.back": "Voltar",
  "common.next": "Próximo",
  "common.skip": "Pular",
  "common.save": "Salvar",
  "common.submit": "Enviar",
  "common.close": "Fechar",
  "common.ok": "OK",
  "common.yes": "Sim",
  "common.no": "Não",
  "common.retry": "Tentar novamente",
  "common.done": "Concluído",
  "common.of": "de",
  "common.getStarted": "Começar",

  // Auth screens
  "auth.login.title": "Bem-vindo de volta",
  "auth.login.subtitle": "Entre em sua conta EcoFors",
  "auth.login.welcome": "Fazer login no EcoFors",
  "auth.login.signin": "Entrar",
  "auth.login.email": "Email",
  "auth.login.password": "Senha",
  "auth.login.forgotPassword": "Esqueceu a senha?",
  "auth.login.createAccount": "Criar nova conta",
  "auth.signup.title": "Criar conta",
  "auth.signup.subtitle": "Junte-se à nossa comunidade ecológica",
  "auth.signup.firstName": "Nome",
  "auth.signup.lastName": "Sobrenome",
  "auth.signup.schoolName": "Nome da escola",
  "auth.signup.role": "Função",
  "auth.signup.confirmPassword": "Confirmar senha",
  "auth.signup.createAccount": "Criar conta",
  "auth.signup.alreadyHaveAccount": "Já tem uma conta? Entrar",
  "auth.forgot.title": "Esqueceu a senha?",
  "auth.forgot.subtitle": "Digite seu email para receber o link de redefinição",
  "auth.forgot.sendResetLink": "Enviar link",
  "auth.forgot.checkEmail": "Verifique seu email",
  "auth.forgot.backToSignIn": "Voltar ao login",

  // Onboarding
  "onboarding.step": "Passo",
  "onboarding.of": "de",
  "onboarding.welcome.title": "Bem-vindo ao EcoFors",
  "onboarding.welcome.subtitle": "Sua jornada ecológica começa aqui",
  "onboarding.welcome.description":
    "Transforme sua escola em um ambiente mais sustentável através da educação ambiental e gestão inteligente de resíduos.",
  "onboarding.ecosystems.title": "Ecossistemas Escolares",
  "onboarding.ecosystems.subtitle": "Monitore e melhore",
  "onboarding.ecosystems.description":
    "Acompanhe o desempenho ambiental de cada sala de aula e área da escola com ferramentas de avaliação inteligentes.",
  "onboarding.evaluation.title": "Avaliações Inteligentes",
  "onboarding.evaluation.subtitle": "Meça o progresso",
  "onboarding.evaluation.description":
    "Use critérios objetivos para avaliar limpeza, organização, reciclagem e participação dos estudantes.",
  "onboarding.rankings.title": "Rankings e Competição",
  "onboarding.rankings.subtitle": "Motive através da gamificação",
  "onboarding.rankings.description":
    "Crie uma competição saudável entre as turmas e acompanhe o progresso ao longo do tempo.",
  "onboarding.ready.title": "Pronto para começar!",
  "onboarding.ready.subtitle": "Vamos transformar sua escola",
  "onboarding.ready.description":
    "Agora você tem todas as ferramentas necessárias para iniciar sua jornada rumo a uma escola mais sustentável.",

  // Home screen
  "home.header.greeting": "Olá, Educador!",
  "home.header.subtitle": "Vamos tornar nossa escola mais verde hoje",
  "home.header.notifications": "Notificações",
  "home.metrics.title": "Métricas Ambientais",
  "home.quickActions.title": "Ações Rápidas",
  "home.highlights.title": "Destaque da Semana",
  "home.highlights.subtitle": "Sua escola coletou mais lixo reciclável!",
  "home.projects.title": "Projeto Escola Verde",
  "home.projects.description":
    "Junte-se ao maior movimento de sustentabilidade escolar do Brasil. Transforme sua escola, inspire os alunos.",
  "home.projects.joinNow": "Participar Agora",

  // Evaluation
  "evaluation.title": "Avaliação de Turma",
  "evaluation.subtitle": "Avalie o desempenho ambiental",
  "evaluation.instructions":
    "Selecione a turma e avalie cada critério de 1 a 5 estrelas",
  "evaluation.selectClass": "Selecionar turma",
  "evaluation.selectClassTitle": "📚 Selecione a Turma para Avaliar",
  "evaluation.criteriaTitle": "📊 Critérios de Avaliação para",
  "evaluation.currentIndex": "Índice de Sustentabilidade Atual",
  "evaluation.rateLabel": "Avaliar (1-5):",
  "evaluation.weight": "Peso:",
  "evaluation.incompleteEvaluation": "Avaliação Incompleta",
  "evaluation.incompleteMessage":
    "Por favor, avalie todos os critérios para a turma selecionada.",
  "evaluation.submitted": "Avaliação Enviada!",
  "evaluation.submittedMessage": "recebeu um Índice de Sustentabilidade de",
  "evaluation.viewRankings": "Ver Rankings",
  "evaluation.evaluateAnother": "Avaliar Outra",
  "evaluation.backToHome": "Voltar ao Início",
  "evaluation.criteria.cleanliness": "Limpeza da Sala",
  "evaluation.criteria.cleanlinessDesc":
    "Quão bem mantida está a sala de aula?",
  "evaluation.criteria.commonAreas": "Cuidado com Áreas Comuns",
  "evaluation.criteria.commonAreasDesc":
    "Responsabilidade com espaços compartilhados da escola",
  "evaluation.criteria.garbageSorting": "Separação Adequada do Lixo",
  "evaluation.criteria.garbageSortingDesc":
    "Separação correta de recicláveis e resíduos orgânicos",
  "evaluation.criteria.sustainability": "Práticas de Sustentabilidade",
  "evaluation.criteria.sustainabilityDesc":
    "Seguindo hábitos e iniciativas ecológicas",
  "evaluation.criteria.organization": "Organização",
  "evaluation.criteria.recycling": "Reciclagem",
  "evaluation.criteria.participation": "Participação",
  "evaluation.rating.excellent": "Excelente",
  "evaluation.rating.good": "Bom",
  "evaluation.rating.average": "Regular",
  "evaluation.rating.poor": "Precisa melhorar",
  "evaluation.comments": "Comentários (opcional)",
  "evaluation.submitEvaluation": "Enviar avaliação",
  "evaluation.submissionSuccess": "Avaliação enviada com sucesso!",

  // Rankings
  "rankings.title": "Rankings das Turmas",
  "rankings.subtitle": "Acompanhe o desempenho das turmas",
  "rankings.period.daily": "Diário",
  "rankings.period.weekly": "Semanal",
  "rankings.period.monthly": "Mensal",
  "rankings.topPerformers": "Melhores desempenhos",
  "rankings.byGarbageIndex": "📊 Rankings por Índice de Sustentabilidade",
  "rankings.lastEvaluated": "Última avaliação:",
  "rankings.noData": "Nenhum dado disponível",
  "rankings.viewDetails": "Ver detalhes",
  "rankings.overview": "🏆 Visão Geral da Escola",
  "rankings.avgIndex": "Índice Médio",
  "rankings.classes": "Turmas",
  "rankings.improving": "Melhorando",
  "rankings.details.classroom": "Sala de Aula",
  "rankings.details.commonAreas": "Áreas Comuns",
  "rankings.details.sorting": "Separação",
  "rankings.details.sustainability": "Sustentabilidade",
  "rankings.tips.title": "💡 Dicas para Melhor Classificação",
  "rankings.tips.consistency": "Consistência é Fundamental",
  "rankings.tips.consistencyDesc":
    "Hábitos diários como separação adequada de resíduos e manutenção de espaços limpos levam a melhores pontuações.",
  "rankings.tips.teamwork": "Esforço em Equipe",
  "rankings.tips.teamworkDesc":
    "Incentive todos os alunos a participarem na manutenção da limpeza da sala e da escola.",
  "rankings.tips.sustainability": "Seja Verde",
  "rankings.tips.sustainabilityDesc":
    "Implemente práticas sustentáveis como reutilização de materiais e compostagem de resíduos orgânicos.",

  // Reports
  "reports.title": "Relatórios de Coleta",
  "reports.subtitle": "Acompanhe a coleta de resíduos",
  "reports.weeklySummary": "📊 Resumo Semanal",
  "reports.totalCollected": "Total Coletado",
  "reports.byCategory": "🗂️ Por Categoria",
  "reports.recentReports": "📝 Relatórios Recentes",
  "reports.newReport": "Novo Relatório de Resíduos",
  "reports.selectType": "Selecionar Tipo de Resíduo",
  "reports.amount": "Quantidade (kg)",
  "reports.location": "Local",
  "reports.reporter": "Nome do Relator",
  "reports.submit": "Enviar Relatório",
  "reports.submitted": "Relatório Enviado",
  "reports.viewAll": "Ver Todos os Relatórios",
  "reports.filter": "Filtrar Resultados",
  "reports.exportData": "Exportar Dados",
  "reports.incompleteReport": "Relatório Incompleto",
  "reports.fillAllFields":
    "Por favor, preencha todos os campos para enviar o relatório.",
  "reports.reportSubmitted": "Relatório Enviado!",
  "reports.successfullyRecorded": "Registrado com sucesso",
  "reports.reportedBy": "Relatado por",
  "reports.amountKg": "kg",
  "reports.placeholders.amount": "Digite a quantidade em quilogramas",
  "reports.placeholders.location": "ex: Sala 5A, Refeitório, Biblioteca",
  "reports.placeholders.reporter": "Seu nome",

  // Garbage types
  "garbage.recyclable": "Reciclável",
  "garbage.organic": "Orgânico",
  "garbage.paper": "Papel",
  "garbage.plastic": "Plástico",
  "garbage.general": "Geral",
  "garbage.hazardous": "Perigoso",
  "garbage.glass": "Vidro",
  "garbage.metal": "Metal",
  "garbage.electronic": "Eletrônico",

  // Metrics
  "metrics.totalGarbageCollected": "Total de Lixo Coletado",
  "metrics.recycledMaterials": "Materiais Reciclados",
  "metrics.organicWaste": "Resíduo Orgânico",
  "metrics.trend.up": "em alta",
  "metrics.trend.down": "em baixa",
  "metrics.thisWeek": "Esta semana",
  "metrics.thisMonth": "Este mês",

  // Units
  "units.kg": "kg",
  "units.percent": "%",
  "units.tons": "toneladas",
  "units.liters": "litros",

  // Quick Actions
  "actions.classEvaluation": "Avaliação de Turma",
  "actions.classEvaluation.subtitle": "Avaliar limpeza da sala",
  "actions.garbageReport": "Relatório de Coleta",
  "actions.garbageReport.subtitle": "Registrar coleta diária",
  "actions.classRankings": "Rankings das Turmas",
  "actions.classRankings.subtitle": "Ver melhores turmas",
  "actions.recyclingGuide": "Guia de Reciclagem",
  "actions.recyclingGuide.subtitle": "Aprender a reciclar",

  // Recycling Guide
  "recyclingGuide.title": "Guia de Reciclagem",
  "recyclingGuide.quickTips": "🌱 Dicas Rápidas de Reciclagem:",
  "recyclingGuide.tip1": "♻️ Separe plástico, papel, vidro e metal",
  "recyclingGuide.tip2": "🗑️ Limpe os recipientes antes de descartar",
  "recyclingGuide.tip3": "🍃 Composte resíduos orgânicos quando possível",
  "recyclingGuide.tip4": "🔄 Reutilize materiais sempre que possível",
  "recyclingGuide.moreInfo":
    "💡 Lembre-se: Pequenas ações fazem grande diferença para o meio ambiente!",

  // Days/Time
  "time.today": "Hoje",
  "time.yesterday": "Ontem",
  "time.thisWeek": "Esta semana",
  "time.lastWeek": "Semana passada",
  "time.thisMonth": "Este mês",
  "time.lastMonth": "Mês passado",
  "time.daysAgo": "dias atrás",
  "time.hoursAgo": "horas atrás",
  "time.minutesAgo": "minutos atrás",
  "time.justNow": "agora mesmo",

  // Classes/Subjects
  "classes.mathematics": "Matemática",
  "classes.science": "Ciências",
  "classes.history": "História",
  "classes.geography": "Geografia",
  "classes.portuguese": "Português",
  "classes.english": "Inglês",
  "classes.physicalEducation": "Educação Física",
  "classes.arts": "Artes",
  "classes.library": "Biblioteca",
  "classes.cafeteria": "Refeitório",
  "classes.playground": "Pátio",
  "classes.other": "Outro",
};

// English translations
const en: TranslationKeys = {
  // Common
  "common.loading": "Loading...",
  "common.error": "Error",
  "common.success": "Success",
  "common.cancel": "Cancel",
  "common.continue": "Continue",
  "common.back": "Back",
  "common.next": "Next",
  "common.skip": "Skip",
  "common.save": "Save",
  "common.submit": "Submit",
  "common.close": "Close",
  "common.ok": "OK",
  "common.yes": "Yes",
  "common.no": "No",
  "common.retry": "Try again",
  "common.done": "Done",
  "common.of": "of",
  "common.getStarted": "Get Started",

  // Auth screens
  "auth.login.title": "Welcome Back",
  "auth.login.subtitle": "Sign in to your EcoFors account",
  "auth.login.welcome": "Sign in to EcoFors",
  "auth.login.signin": "Sign In",
  "auth.login.email": "Email",
  "auth.login.password": "Password",
  "auth.login.forgotPassword": "Forgot password?",
  "auth.login.createAccount": "Create new account",
  "auth.signup.title": "Create Account",
  "auth.signup.subtitle": "Join our ecological community",
  "auth.signup.firstName": "First Name",
  "auth.signup.lastName": "Last Name",
  "auth.signup.schoolName": "School Name",
  "auth.signup.role": "Role",
  "auth.signup.confirmPassword": "Confirm Password",
  "auth.signup.createAccount": "Create Account",
  "auth.signup.alreadyHaveAccount": "Already have an account? Sign in",
  "auth.forgot.title": "Forgot Password?",
  "auth.forgot.subtitle": "Enter your email to receive reset link",
  "auth.forgot.sendResetLink": "Send Reset Link",
  "auth.forgot.checkEmail": "Check your email",
  "auth.forgot.backToSignIn": "Back to Sign In",

  // Onboarding
  "onboarding.step": "Step",
  "onboarding.of": "of",
  "onboarding.welcome.title": "Welcome to EcoFors",
  "onboarding.welcome.subtitle": "Your environmental journey starts here",
  "onboarding.welcome.description":
    "Transform your school into a more sustainable environment through environmental education and intelligent waste management systems.",
  "onboarding.ecosystems.title": "School Environment",
  "onboarding.ecosystems.subtitle": "Monitor and improve",
  "onboarding.ecosystems.description":
    "Track the environmental performance of each classroom and school area using intelligent assessment tools.",
  "onboarding.evaluation.title": "Smart Assessments",
  "onboarding.evaluation.subtitle": "Measure progress",
  "onboarding.evaluation.description":
    "Use objective criteria to evaluate cleanliness, organization, recycling practices, and student engagement.",
  "onboarding.rankings.title": "Rankings & Competition",
  "onboarding.rankings.subtitle": "Motivate through gamification",
  "onboarding.rankings.description":
    "Foster healthy competition between classes while tracking environmental progress over time.",
  "onboarding.ready.title": "Ready to Begin!",
  "onboarding.ready.subtitle": "Let's transform your school",
  "onboarding.ready.description":
    "You now have all the tools needed to start your journey toward creating a more sustainable school environment.",

  // Home screen
  "home.header.greeting": "Hello, Educator!",
  "home.header.subtitle": "Let's make our school more sustainable today",
  "home.header.notifications": "Notifications",
  "home.metrics.title": "Environmental Impact",
  "home.quickActions.title": "Quick Actions",
  "home.highlights.title": "This Week's Highlight",
  "home.highlights.subtitle":
    "Your school increased recyclable waste collection!",
  "home.projects.title": "Green School Initiative",
  "home.projects.description":
    "Join Brazil's largest school sustainability movement. Transform your school and inspire students to create a greener future.",
  "home.projects.joinNow": "Join Now",

  // Evaluation
  "evaluation.title": "Class Assessment",
  "evaluation.subtitle": "Evaluate environmental performance",
  "evaluation.instructions":
    "Select the class and rate each criterion from 1 to 5 stars",
  "evaluation.selectClass": "Select class",
  "evaluation.selectClassTitle": "📚 Select Class to Evaluate",
  "evaluation.criteriaTitle": "📊 Evaluation Criteria for",
  "evaluation.currentIndex": "Current Sustainability Index",
  "evaluation.rateLabel": "Rate (1-5):",
  "evaluation.weight": "Weight:",
  "evaluation.incompleteEvaluation": "Incomplete Evaluation",
  "evaluation.incompleteMessage":
    "Please rate all criteria for the selected class.",
  "evaluation.submitted": "Evaluation Submitted!",
  "evaluation.submittedMessage": "received a Sustainability Index of",
  "evaluation.viewRankings": "View Rankings",
  "evaluation.evaluateAnother": "Evaluate Another",
  "evaluation.backToHome": "Back to Home",
  "evaluation.criteria.cleanliness": "Classroom Cleanliness",
  "evaluation.criteria.cleanlinessDesc":
    "How well maintained is the classroom?",
  "evaluation.criteria.commonAreas": "Common Areas Care",
  "evaluation.criteria.commonAreasDesc":
    "Responsibility for shared school spaces",
  "evaluation.criteria.garbageSorting": "Proper Garbage Sorting",
  "evaluation.criteria.garbageSortingDesc":
    "Correct separation of recyclables and organic waste",
  "evaluation.criteria.sustainability": "Sustainability Practices",
  "evaluation.criteria.sustainabilityDesc":
    "Following eco-friendly habits and initiatives",
  "evaluation.criteria.organization": "Organization",
  "evaluation.criteria.recycling": "Recycling Practices",
  "evaluation.criteria.participation": "Student Engagement",
  "evaluation.rating.excellent": "Excellent",
  "evaluation.rating.good": "Good",
  "evaluation.rating.average": "Average",
  "evaluation.rating.poor": "Needs Improvement",
  "evaluation.comments": "Additional Comments (optional)",
  "evaluation.submitEvaluation": "Submit Assessment",
  "evaluation.submissionSuccess": "Assessment submitted successfully!",

  // Rankings
  "rankings.title": "Class Rankings",
  "rankings.subtitle": "Track class performance",
  "rankings.period.daily": "Daily",
  "rankings.period.weekly": "Weekly",
  "rankings.period.monthly": "Monthly",
  "rankings.topPerformers": "Top Performing Classes",
  "rankings.byGarbageIndex": "📊 Rankings by Sustainability Index",
  "rankings.lastEvaluated": "Last Assessment:",
  "rankings.noData": "No data available",
  "rankings.viewDetails": "View Details",
  "rankings.overview": "🏆 School Overview",
  "rankings.avgIndex": "Avg. Index",
  "rankings.classes": "Classes",
  "rankings.improving": "Improving",
  "rankings.details.classroom": "Classroom",
  "rankings.details.commonAreas": "Common Areas",
  "rankings.details.sorting": "Sorting",
  "rankings.details.sustainability": "Sustainability",
  "rankings.tips.title": "💡 Tips for Higher Rankings",
  "rankings.tips.consistency": "Consistency is Key",
  "rankings.tips.consistencyDesc":
    "Daily habits like proper waste sorting and keeping spaces clean lead to better scores.",
  "rankings.tips.teamwork": "Team Effort",
  "rankings.tips.teamworkDesc":
    "Encourage all students to participate in maintaining classroom and school cleanliness.",
  "rankings.tips.sustainability": "Go Green",
  "rankings.tips.sustainabilityDesc":
    "Implement sustainable practices like reusing materials and composting organic waste.",

  // Reports
  "reports.title": "Garbage Reports",
  "reports.subtitle": "Track waste collection data",
  "reports.weeklySummary": "📊 Weekly Summary",
  "reports.totalCollected": "Total Collected",
  "reports.byCategory": "🗂️ By Category",
  "reports.recentReports": "📝 Recent Reports",
  "reports.newReport": "New Garbage Report",
  "reports.selectType": "Select Garbage Type",
  "reports.amount": "Amount (kg)",
  "reports.location": "Location",
  "reports.reporter": "Reporter Name",
  "reports.submit": "Submit Report",
  "reports.submitted": "Report Submitted",
  "reports.viewAll": "View All Reports",
  "reports.filter": "Filter Results",
  "reports.exportData": "Export Data",
  "reports.incompleteReport": "Incomplete Report",
  "reports.fillAllFields": "Please fill all fields to submit the report.",
  "reports.reportSubmitted": "Report Submitted!",
  "reports.successfullyRecorded": "Successfully recorded",
  "reports.reportedBy": "Reported by",
  "reports.amountKg": "kg",
  "reports.placeholders.amount": "Enter amount in kilograms",
  "reports.placeholders.location": "e.g. Classroom 5A, Cafeteria, Library",
  "reports.placeholders.reporter": "Your name",

  // Garbage types
  "garbage.recyclable": "Recyclable Materials",
  "garbage.organic": "Organic Waste",
  "garbage.paper": "Paper & Cardboard",
  "garbage.plastic": "Plastic",
  "garbage.general": "General Waste",
  "garbage.hazardous": "Hazardous Materials",
  "garbage.glass": "Glass",
  "garbage.metal": "Metal",
  "garbage.electronic": "Electronic Waste",

  // Metrics
  "metrics.totalGarbageCollected": "Total Waste Collected",
  "metrics.recycledMaterials": "Materials Recycled",
  "metrics.organicWaste": "Organic Waste Processed",
  "metrics.trend.up": "increasing",
  "metrics.trend.down": "decreasing",
  "metrics.thisWeek": "This Week",
  "metrics.thisMonth": "This Month",

  // Units
  "units.kg": "kg",
  "units.percent": "%",
  "units.tons": "tons",
  "units.liters": "liters",

  // Quick Actions
  "actions.classEvaluation": "Class Evaluation",
  "actions.classEvaluation.subtitle": "Assess classroom cleanliness",
  "actions.garbageReport": "Collection Report",
  "actions.garbageReport.subtitle": "Log daily waste collection",
  "actions.classRankings": "Class Rankings",
  "actions.classRankings.subtitle": "View top performing classes",
  "actions.recyclingGuide": "Recycling Guide",
  "actions.recyclingGuide.subtitle": "Learn proper recycling methods",

  // Recycling Guide
  "recyclingGuide.title": "Recycling Guide",
  "recyclingGuide.quickTips": "🌱 Quick Recycling Tips:",
  "recyclingGuide.tip1": "♻️ Separate plastic, paper, glass, and metal",
  "recyclingGuide.tip2": "🗑️ Clean containers before disposing",
  "recyclingGuide.tip3": "🍃 Compost organic waste when possible",
  "recyclingGuide.tip4": "🔄 Reuse materials whenever you can",
  "recyclingGuide.moreInfo":
    "💡 Remember: Small actions make a big difference for the environment!",

  // Days/Time
  "time.today": "Today",
  "time.yesterday": "Yesterday",
  "time.thisWeek": "This week",
  "time.lastWeek": "Last week",
  "time.thisMonth": "This month",
  "time.lastMonth": "Last month",
  "time.daysAgo": "days ago",
  "time.hoursAgo": "hours ago",
  "time.minutesAgo": "minutes ago",
  "time.justNow": "just now",

  // Classes/Subjects
  "classes.mathematics": "Mathematics",
  "classes.science": "Science",
  "classes.history": "History",
  "classes.geography": "Geography",
  "classes.portuguese": "Portuguese",
  "classes.english": "English",
  "classes.physicalEducation": "Physical Education",
  "classes.arts": "Arts",
  "classes.library": "Library",
  "classes.cafeteria": "Cafeteria",
  "classes.playground": "Playground",
  "classes.other": "Other",
};

// Available languages
const translations = { pt, en };

type I18nContextType = {
  locale: keyof typeof translations;
  t: (key: keyof TranslationKeys) => string;
  changeLanguage: (locale: keyof typeof translations) => void;
};

// Create context
const I18nContext = createContext<I18nContextType | undefined>(undefined);

// Provider component
interface I18nProviderProps {
  children: ReactNode;
}

export const I18nProvider: React.FC<I18nProviderProps> = ({ children }) => {
  // Set Portuguese as default locale
  const [locale, setLocale] = useState<keyof typeof translations>("pt");

  useEffect(() => {
    // Try to detect device locale, but fallback to Portuguese
    try {
      const deviceLocales = getLocales();
      const deviceLocale = deviceLocales[0]?.languageCode;

      // Only switch to English if explicitly English, otherwise use Portuguese
      if (deviceLocale === "en") {
        setLocale("en");
      } else {
        setLocale("pt"); // Default to Portuguese for all other locales
      }
    } catch {
      console.log(
        "Could not detect device locale, using Portuguese as default",
      );
      setLocale("pt");
    }
  }, []);

  const t = (key: keyof TranslationKeys): string => {
    const translation = translations[locale][key];
    if (!translation) {
      console.warn(`Missing translation for key: ${key} in locale: ${locale}`);
      return key;
    }
    return translation;
  };

  const changeLanguage = (newLocale: keyof typeof translations) => {
    setLocale(newLocale);
  };

  const value: I18nContextType = {
    locale,
    t,
    changeLanguage,
  };

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

// Hook to use the context
export const useI18n = (): I18nContextType => {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error("useI18n must be used within an I18nProvider");
  }
  return context;
};

export default I18nContext;

