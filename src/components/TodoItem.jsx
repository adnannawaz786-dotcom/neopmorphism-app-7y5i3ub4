import { Check, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { PRIORITIES } from '../lib/constants'
import { motion } from 'framer-motion'

export default function TodoItem({ todo, onToggle, onDelete }) {
  const priorityConfig = PRIORITIES[todo.priority]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.2 }}
      className={`group p-4 rounded-xl border transition-all duration-200 ${
        todo.completed
          ? 'bg-gray-50 border-gray-200 opacity-75'
          : 'bg-white border-gray-200 shadow-[8px_8px_16px_#d1d9e6,-8px_-8px_16px_#ffffff] hover:shadow-[12px_12px_20px_#d1d9e6,-12px_-12px_20px_#ffffff]'
      }`}
    >
      <div className="flex items-start gap-3">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onToggle(todo.id)}
          className={`mt-0.5 h-6 w-6 p-0 rounded-full transition-all duration-200 ${
            todo.completed
              ? 'bg-green-100 text-green-600 hover:bg-green-200'
              : 'bg-gray-100 text-gray-400 hover:bg-green-100 hover:text-green-600 shadow-[4px_4px_8px_#d1d9e6,-4px_-4px_8px_#ffffff]'
          }`}
        >
          {todo.completed && <Check className="h-3 w-3" />}
        </Button>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3
              className={`font-medium text-gray-900 transition-all duration-200 ${
                todo.completed ? 'line-through text-gray-500' : ''
              }`}
            >
              {todo.title}
            </h3>
            <Badge
              variant="secondary"
              className={`shrink-0 text-xs ${priorityConfig.color} ${priorityConfig.bg} border-none`}
            >
              {priorityConfig.label}
            </Badge>
          </div>

          {todo.description && (
            <p
              className={`text-sm text-gray-600 mb-3 transition-all duration-200 ${
                todo.completed ? 'line-through text-gray-400' : ''
              }`}
            >
              {todo.description}
            </p>
          )}

          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-400">
              {new Date(todo.createdAt).toLocaleDateString()}
            </span>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(todo.id)}
              className="opacity-0 group-hover:opacity-100 h-8 w-8 p-0 text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all duration-200 shadow-[4px_4px_8px_#d1d9e6,-4px_-4px_8px_#ffffff] hover:shadow-[6px_6px_12px_#d1d9e6,-6px_-6px_12px_#ffffff]"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}