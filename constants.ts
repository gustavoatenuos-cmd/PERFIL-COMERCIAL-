
import { Question, QuestionType, QuizResultProfile } from './types';

export const QUESTIONS: Question[] = [
  {
    id: 1,
    type: QuestionType.MULTIPLE_CHOICE,
    title: "Ao receber uma demanda diária de 20 novos potenciais clientes, como você estrutura seu acompanhamento?",
    description: "Foco em organização e método de trabalho.",
    choices: [
      { id: '1A', text: "Utilizo uma planilha de controle rigorosa para registrar cada interação e garantir que nenhum contato seja negligenciado.", points: 4 },
      { id: '1B', text: "Mantenho anotações organizadas em um caderno ou agenda, priorizando os contatos por ordem de importância.", points: 3 },
      { id: '1C', text: "Realizo os contatos conforme a demanda chega, confiando na minha capacidade de memória para os retornos.", points: 1 },
      { id: '1D', text: "Sigo o fluxo natural das mensagens no WhatsApp, respondendo conforme a disponibilidade de tempo.", points: 0 },
    ]
  },
  {
    id: 2,
    type: QuestionType.MULTIPLE_CHOICE,
    title: "Diante de um agendamento confirmado onde o cliente não comparece à reunião, qual é o seu procedimento padrão?",
    choices: [
      { id: '2A', text: "Aguardo 10 minutos e envio uma mensagem formal consultando se houve algum imprevisto e propondo novos horários.", points: 4 },
      { id: '2B', text: "Registro a ausência no meu controle e aguardo que o cliente entre em contato para se justificar.", points: 0 },
      { id: '2C', text: "Tento contato telefônico imediato para entender a situação e tentar realizar a reunião no momento.", points: 3 },
      { id: '2D', text: "Envio um e-mail de acompanhamento e movo o cliente para uma lista de 'repescagem' para a próxima semana.", points: 2 },
    ]
  },
  {
    id: 3,
    type: QuestionType.MULTIPLE_CHOICE,
    title: "Durante uma reunião, o cliente desvia o foco para assuntos pessoais ou irrelevantes ao negócio. Como você conduz a situação?",
    choices: [
      { id: '3A', text: "Ouço atentamente para fortalecer o relacionamento, mesmo que isso comprometa o tempo técnico da reunião.", points: 2 },
      { id: '3B', text: "Interrompo de forma profissional e redireciono a conversa para os objetivos comerciais e indicadores de sucesso.", points: 4 },
      { id: '3C', text: "Anoto os pontos citados para usar como rapport futuramente, mas tento retomar o script de forma sutil.", points: 3 },
      { id: '3D', text: "Permito que o cliente dite o ritmo da conversa, intervindo apenas quando solicitado.", points: 1 },
    ]
  },
  {
    id: 4,
    type: QuestionType.MULTIPLE_CHOICE,
    title: "Quando questionado sobre garantias de retorno sobre investimento (ROI), qual é o seu posicionamento técnico?",
    choices: [
      { id: '4A', text: "Explico que em marketing de performance trabalhamos com dados e processos, garantindo a execução de excelência, não resultados fixos.", points: 4 },
      { id: '4B', text: "Apresento métricas médias do mercado para dar segurança ao cliente e facilitar o fechamento.", points: 2 },
      { id: '4C', text: "Enfatizo que nossa metodologia é validada e que o insucesso é improvável se as diretrizes forem seguidas.", points: 3 },
      { id: '4D', text: "Evito o assunto técnico e foco nos benefícios subjetivos que a parceria trará para a marca dele.", points: 0 },
    ]
  },
  {
    id: 5,
    type: QuestionType.MULTIPLE_CHOICE,
    title: "Como você gerencia o fechamento de metas em períodos de maior pressão ou proximidade de prazos?",
    choices: [
      { id: '5A', text: "Intensifico o volume de contatos e reviso minha planilha de follow-up para identificar oportunidades esquecidas.", points: 4 },
      { id: '5B', text: "Mantenho o ritmo habitual, acreditando que a constância do processo trará o resultado naturalmente.", points: 2 },
      { id: '5C', text: "Busco orientação da gestão para priorizar os leads com maior probabilidade de conversão imediata.", points: 3 },
      { id: '5D', text: "Aceito as variações do mercado, focando em preparar um terreno melhor para o próximo período.", points: 1 },
    ]
  },
  {
    id: 6,
    type: QuestionType.MULTIPLE_CHOICE,
    title: "Qual princípio melhor define sua conduta profissional em vendas consultivas?",
    choices: [
      { id: '6A', text: "A disciplina na execução do método supera o talento individual.", points: 4 },
      { id: '6B', text: "O fechamento é o objetivo final e deve ser buscado com persistência.", points: 3 },
      { id: '6C', text: "O entendimento profundo das necessidades do cliente precede qualquer oferta.", points: 4 },
      { id: '6D', text: "A flexibilidade para se adaptar ao perfil do cliente é o diferencial mais importante.", points: 2 },
    ]
  },
  {
    id: 7,
    type: QuestionType.MULTIPLE_CHOICE,
    title: "O lead solicita tempo para discutir a proposta com outros decisores. Como você formaliza o próximo passo?",
    choices: [
      { id: '7A', text: "Proponho uma nova reunião com todos os decisores presentes para sanar dúvidas técnicas de forma conjunta.", points: 4 },
      { id: '7B', text: "Solicito uma data específica para o retorno e coloco um lembrete no meu controle pessoal.", points: 3 },
      { id: '7C', text: "Deixo o cliente à vontade para retornar quando se sentir seguro, evitando pressionar a decisão.", points: 0 },
      { id: '7D', text: "Envio material complementar para auxiliar na defesa da proposta perante os outros sócios.", points: 2 },
    ]
  },
  {
    id: 8,
    type: QuestionType.MULTIPLE_CHOICE,
    title: "Em relação ao ambiente de trabalho, qual estrutura você considera ideal para sua alta performance?",
    choices: [
      { id: '8A', text: "Um ambiente meritocrático com cobrança por resultados e processos bem definidos.", points: 4 },
      { id: '8B', text: "Um ambiente dinâmico com liberdade para criar minhas próprias estratégias de abordagem.", points: 2 },
      { id: '8C', text: "Um ambiente focado em treinamento contínuo e acompanhamento próximo da liderança.", points: 3 },
      { id: '8D', text: "Um ambiente estável onde as demandas sejam previsíveis e o clima seja harmônico.", points: 1 },
    ]
  },
  {
    id: 9,
    type: QuestionType.MULTIPLE_CHOICE,
    title: "Como você analisa uma negociação que não resultou em contrato assinado?",
    choices: [
      { id: '9A', text: "Realizo um diagnóstico pós-venda para identificar em qual etapa do processo houve a ruptura e como evitar na próxima.", points: 4 },
      { id: '9B', text: "Atribuo o resultado a fatores externos como falta de fit do cliente ou questões de orçamento.", points: 0 },
      { id: '9C', text: "Busco feedback direto com o cliente para entender os pontos de melhoria na minha apresentação.", points: 3 },
      { id: '9D', text: "Desconsidero o caso e foco imediatamente no próximo lead qualificado para não perder produtividade.", points: 2 },
    ]
  },
  {
    id: 10,
    type: QuestionType.MULTIPLE_CHOICE,
    title: "Diante da infraestrutura fornecida pela Percentfy, qual será sua maior contribuição para a organização?",
    choices: [
      { id: '10A', text: "A organização impecável do fluxo de trabalho e o compromisso inegociável com as metas estabelecidas.", points: 4 },
      { id: '10B', text: "A facilidade em lidar com pessoas e converter objeções em oportunidades de negócio.", points: 3 },
      { id: '10C', text: "O conhecimento prévio de mercado que agilizará minha curva de aprendizado.", points: 2 },
      { id: '10D', text: "A capacidade de trabalhar sob pressão mantendo a qualidade técnica do atendimento.", points: 3 },
    ]
  },
  {
    id: 11,
    type: QuestionType.MULTIPLE_CHOICE,
    title: "O que motiva sua dedicação diária à atividade comercial de alta performance?",
    choices: [
      { id: '11A', text: "O alcance de objetivos profissionais claros e o retorno financeiro proporcional ao esforço.", points: 4 },
      { id: '11B', text: "O reconhecimento como um especialista referência no setor de marketing e vendas.", points: 3 },
      { id: '11C', text: "O desafio constante de superar meus próprios recordes de produtividade.", points: 4 },
      { id: '11D', text: "A oportunidade de integrar um time de elite em uma empresa em crescimento.", points: 2 },
    ]
  },
  {
    id: 12,
    type: QuestionType.OPEN_ENDED,
    title: "Declaração de Competência",
    description: "Descreva de forma sucinta: Como sua metodologia de organização pessoal contribuirá para que nenhum lead gerado pela Percentfy seja perdido por falta de acompanhamento?",
    placeholder: "Escreva sua resposta profissional aqui...",
  }
];

export const RESULT_PROFILES: QuizResultProfile[] = [
  {
    title: "Consultor de Alta Performance",
    description: "Você demonstra um perfil maduro, com foco em processos e organização rigorosa. Sua mentalidade está alinhada aos padrões de excelência da Percentfy.",
    icon: "📈",
    color: "text-cyan-400",
    minScore: 40,
    pillars: ["Rigor Organizacional", "Assertividade Consultiva", "Foco em Indicadores"]
  },
  {
    title: "Profissional em Desenvolvimento",
    description: "Você possui boas competências comerciais, mas ainda apresenta oportunidades de melhoria na sistematização do seu fluxo de trabalho.",
    icon: "📋",
    color: "text-blue-400",
    minScore: 30,
    pillars: ["Potencial Comercial", "Disciplina Operacional", "Necessidade de Método"]
  },
  {
    title: "Perfil Operacional",
    description: "Sua abordagem é mais voltada à execução de tarefas do que à gestão estratégica de oportunidades.",
    icon: "⚙️",
    color: "text-slate-400",
    minScore: 18,
    pillars: ["Execução Técnica", "Reatividade Comercial", "Curva de Aprendizado"]
  },
  {
    title: "Baixa Aderência ao Modelo",
    description: "O perfil apresentado demonstra dificuldade em lidar com demandas recorrentes e métodos de acompanhamento formais.",
    icon: "⭕",
    color: "text-red-400",
    minScore: 0,
    pillars: ["Descompasso Metodológico", "Gestão de Demanda", "Baixo Rigor Processual"]
  }
];
