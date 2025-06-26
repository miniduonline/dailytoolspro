export interface Tool {
  id: string;
  name: string;
  description: string;
  category: 'text' | 'image' | 'developer' | 'converter' | 'utility' | 'web' | 'business';
  icon: string;
  isPremium: boolean;
  component: React.ComponentType;
}

export interface ToolCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
}