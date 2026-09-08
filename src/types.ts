export interface Chapter {
  id: string;
  title: string;
  subtitle: string;
  number: string;
}

export interface TimelineEvent {
  year: string;
  period: string;
  title: string;
  location: string;
  summary: string;
  details: string;
  latinQuote?: string;
  latinTranslation?: string;
  tag: string;
}

export interface EquationComponent {
  symbol: string;
  name: string;
  meaning: string;
  historicalNote: string;
  unit: string;
}
