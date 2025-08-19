export const PRIORITIES = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high'
};

export const TODO_STORAGE_KEY = 'neomorphism_todos';

export const PRIORITY_COLORS = {
  [PRIORITIES.LOW]: {
    bg: 'bg-green-100',
    text: 'text-green-800',
    border: 'border-green-200',
    shadow: 'shadow-green-100'
  },
  [PRIORITIES.MEDIUM]: {
    bg: 'bg-yellow-100',
    text: 'text-yellow-800',
    border: 'border-yellow-200',
    shadow: 'shadow-yellow-100'
  },
  [PRIORITIES.HIGH]: {
    bg: 'bg-red-100',
    text: 'text-red-800',
    border: 'border-red-200',
    shadow: 'shadow-red-100'
  }
};

export const NEOMORPHIC_STYLES = {
  container: 'bg-gray-100 min-h-screen p-4',
  card: 'bg-gray-100 rounded-2xl shadow-[8px_8px_16px_#bebebe,-8px_-8px_16px_#ffffff] border-0',
  cardInset: 'bg-gray-100 rounded-2xl shadow-[inset_8px_8px_16px_#bebebe,inset_-8px_-8px_16px_#ffffff] border-0',
  button: 'bg-gray-100 rounded-xl shadow-[4px_4px_8px_#bebebe,-4px_-4px_8px_#ffffff] border-0 hover:shadow-[2px_2px_4px_#bebebe,-2px_-2px_4px_#ffffff] active:shadow-[inset_2px_2px_4px_#bebebe,inset_-2px_-2px_4px_#ffffff] transition-all duration-200',
  input: 'bg-gray-100 rounded-xl shadow-[inset_4px_4px_8px_#bebebe,inset_-4px_-4px_8px_#ffffff] border-0 focus:shadow-[inset_6px_6px_12px_#bebebe,inset_-6px_-6px_12px_#ffffff] outline-none',
  checkbox: 'appearance-none bg-gray-100 rounded-lg shadow-[inset_2px_2px_4px_#bebebe,inset_-2px_-2px_4px_#ffffff] checked:shadow-[2px_2px_4px_#bebebe,-2px_-2px_4px_#ffffff] border-0'
};

export const ANIMATION_VARIANTS = {
  fadeIn: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  },
  slideIn: {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 }
  },
  scaleIn: {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.9 }
  }
};

export const DEFAULT_TODO = {
  id: '',
  text: '',
  completed: false,
  priority: PRIORITIES.MEDIUM,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
};