import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Filter, Search, Moon, Sun } from 'lucide-react';
import TodoList from '../components/TodoList.jsx';
import { PRIORITIES, TODO_STORAGE_KEY } from '../lib/constants.jsx';
import { Card, CardContent } from '@/components/ui/card';

export default function TodoPage() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Load todos from localStorage on component mount
  useEffect(() => {
    try {
      const savedTodos = localStorage.getItem(TODO_STORAGE_KEY);
      if (savedTodos) {
        setTodos(JSON.parse(savedTodos));
      }
    } catch (error) {
      console.error('Error loading todos from localStorage:', error);
    }
  }, []);

  // Save todos to localStorage whenever todos change
  useEffect(() => {
    try {
      localStorage.setItem(TODO_STORAGE_KEY, JSON.stringify(todos));
    } catch (error) {
      console.error('Error saving todos to localStorage:', error);
    }
  }, [todos]);

  const addTodo = () => {
    if (typeof newTodo === 'string' && newTodo.trim()) {
      const todo = {
        id: Date.now().toString(),
        text: newTodo.trim(),
        completed: false,
        priority: PRIORITIES.MEDIUM,
        createdAt: new Date().toISOString()
      };
      setTodos(prevTodos => [...prevTodos, todo]);
      setNewTodo('');
    }
  };

  const deleteTodo = (id) => {
    if (typeof id === 'string' || typeof id === 'number') {
      setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id.toString()));
    }
  };

  const toggleTodo = (id) => {
    if (typeof id === 'string' || typeof id === 'number') {
      setTodos(prevTodos =>
        prevTodos.map(todo =>
          todo.id === id.toString() ? { ...todo, completed: !todo.completed } : todo
        )
      );
    }
  };

  const updateTodo = (id, updates) => {
    if ((typeof id === 'string' || typeof id === 'number') && updates && typeof updates === 'object') {
      setTodos(prevTodos =>
        prevTodos.map(todo =>
          todo.id === id.toString() ? { ...todo, ...updates } : todo
        )
      );
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTodo();
    }
  };

  const filteredTodos = todos.filter(todo => {
    if (!todo || typeof todo.text !== 'string') return false;
    
    const matchesSearch = todo.text.toLowerCase().includes(searchTerm.toLowerCase());
    
    switch (filter) {
      case 'active':
        return !todo.completed && matchesSearch;
      case 'completed':
        return todo.completed && matchesSearch;
      default:
        return matchesSearch;
    }
  });

  const todoStats = {
    total: todos.length,
    completed: todos.filter(todo => todo.completed).length,
    active: todos.filter(todo => !todo.completed).length
  };

  return (
    <div className={`min-h-screen transition-all duration-300 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' 
        : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'
    }`}>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex justify-between items-center mb-4">
            <h1 className={`text-4xl font-bold ${
              isDarkMode ? 'text-white' : 'text-gray-800'
            }`}>
              Neomorphic Todos
            </h1>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`p-3 rounded-full shadow-lg transition-all duration-300 ${
                isDarkMode
                  ? 'bg-gray-800 text-yellow-400 shadow-gray-700/50'
                  : 'bg-white text-gray-600 shadow-gray-300/50'
              }`}
              style={{
                boxShadow: isDarkMode 
                  ? 'inset 5px 5px 10px #1f2937, inset -5px -5px 10px #374151'
                  : 'inset 5px 5px 10px #e5e7eb, inset -5px -5px 10px #ffffff'
              }}
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </motion.button>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            {[
              { label: 'Total', value: todoStats.total, color: 'blue' },
              { label: 'Active', value: todoStats.active, color: 'orange' },
              { label: 'Completed', value: todoStats.completed, color: 'green' }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className={`p-4 rounded-xl transition-all duration-300 ${
                  isDarkMode
                    ? 'bg-gray-800 text-white shadow-gray-700/50'
                    : 'bg-white text-gray-800 shadow-gray-300/50'
                }`}
                style={{
                  boxShadow: isDarkMode
                    ? '5px 5px 15px #1f2937, -5px -5px 15px #374151'
                    : '5px 5px 15px #e5e7eb, -5px -5px 15px #ffffff'
                }}
              >
                <div className={`text-2xl font-bold text-${stat.color}-500`}>
                  {stat.value}
                </div>
                <div className="text-sm opacity-70">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Add Todo Section */}
        <Card className={`mb-6 border-0 ${
          isDarkMode ? 'bg-gray-800' : 'bg-white'
        }`}
        style={{
          boxShadow: isDarkMode
            ? '10px 10px 20px #1f2937, -10px -10px 20px #374151'
            : '10px 10px 20px #e5e7eb, -10px -10px 20px #ffffff'
        }}>
          <CardContent className="p-6">
            <div className="flex gap-3">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={newTodo}
                  onChange={(e) => setNewTodo(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Add a new todo..."
                  className={`w-full p-4 rounded-lg border-0 focus:outline-none transition-all duration-300 ${
                    isDarkMode
                      ? 'bg-gray-700 text-white placeholder-gray-400'
                      : 'bg-gray-50 text-gray-800 placeholder-gray-500'
                  }`}
                  style={{
                    boxShadow: isDarkMode
                      ? 'inset 5px 5px 10px #1f2937, inset -5px -5px 10px #374151'
                      : 'inset 5px 5px 10px #e5e7eb, inset -5px -5px 10px #ffffff'
                  }}
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={addTodo}
                className="p-4 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600 transition-all duration-300"
                style={{
                  boxShadow: '5px 5px 15px rgba(59, 130, 246, 0.3), -5px -5px 15px rgba(147, 197, 253, 0.1)'
                }}
              >
                <Plus size={24} />
              </motion.button>
            </div>
          </CardContent>
        </Card>

        {/* Search and Filter Section */}
        <Card className={`mb-6 border-0 ${
          isDarkMode ? 'bg-gray-800' : 'bg-white'
        }`}
        style={{
          boxShadow: isDarkMode
            ? '10px 10px 20px #1f2937, -10px -10px 20px #374151'
            : '10px 10px 20px #e5e7eb, -10px -10px 20px #ffffff'
        }}>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-500'
                }`} size={20} />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search todos..."
                  className={`w-full pl-10 pr-4 py-3 rounded-lg border-0 focus:outline-none transition-all duration-300 ${
                    isDarkMode
                      ? 'bg-gray-700 text-white placeholder-gray-400'
                      : 'bg-gray-50 text-gray-800 placeholder-gray-500'
                  }`}
                  style={{
                    boxShadow: isDarkMode
                      ? 'inset 5px 5px 10px #1f2937, inset -5px -5px 10px #374151'
                      : 'inset 5px 5px 10px #e5e7eb, inset -5px -5px 10px #ffffff'
                  }}
                />
              </div>
              
              {/* Filter Buttons */}
              <div className="flex gap-2">
                {['all', 'active', 'completed'].map((filterType) => (
                  <motion.button
                    key={filterType}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setFilter(filterType)}
                    className={`px-4 py-2 rounded-lg capitalize transition-all duration-300 ${
                      filter === filterType
                        ? 'bg-blue-500 text-white shadow-lg'
                        : isDarkMode
                        ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                    style={{
                      boxShadow: filter === filterType
                        ? '5px 5px 15px rgba(59, 130, 246, 0.3), -5px -5px 15px rgba(147, 197, 253, 0.1)'
                        : isDarkMode
                        ? 'inset 3px 3px 6px #1f2937, inset -3px -3px 6px #374151'
                        : 'inset 3px 3px 6px #e5e7eb, inset -3px -3px 6px #ffffff'
                    }}
                  >
                    {filterType}
                  </motion.button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Todo List */}
        <AnimatePresence>
          {filteredTodos.length > 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <TodoList
                todos={filteredTodos}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
                onUpdate={updateTodo}
                isDarkMode={isDarkMode}
              />
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="text-center py-12"
            >
              <Card className={`border-0 ${
                isDarkMode ? 'bg-gray-800' : 'bg-white'
              }`}
              style={{
                boxShadow: isDarkMode
                  ? '10px 10px 20px #1f2937, -10px -10px 20px #374151'
                  : '10px 10px 20px #e5e7eb, -10px -10px 20px #ffffff'
              }}>
                <CardContent className="p-8">
                  <div className={`text-6xl mb-4 ${
                    isDarkMode ? 'text-gray-600' : 'text-gray-300'
                  }`}>
                    📝
                  </div>
                  <h3 className={`text-xl font-semibold mb-2 ${
                    isDarkMode ? 'text-white' : 'text-gray-800'
                  }`}>
                    {searchTerm || filter !== 'all' ? 'No todos match your criteria' : 'No todos yet'}
                  </h3>
                  <p className={`${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {searchTerm || filter !== 'all' 
                      ? 'Try adjusting your search or filter settings'
                      : 'Add your first todo to get started!'
                    }
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}