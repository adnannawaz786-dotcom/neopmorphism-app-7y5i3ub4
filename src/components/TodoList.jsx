import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Filter, Search, Calendar, CheckCircle2, Circle, Clock, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import TodoItem from './TodoItem';
import { PRIORITIES, TODO_STORAGE_KEY } from '../lib/constants';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  // Load todos from localStorage on component mount
  useEffect(() => {
    try {
      const savedTodos = localStorage.getItem(TODO_STORAGE_KEY);
      if (savedTodos) {
        const parsedTodos = JSON.parse(savedTodos);
        setTodos(parsedTodos);
      }
    } catch (error) {
      console.error('Error loading todos from localStorage:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Save todos to localStorage whenever todos change
  useEffect(() => {
    if (!isLoading) {
      try {
        localStorage.setItem(TODO_STORAGE_KEY, JSON.stringify(todos));
      } catch (error) {
        console.error('Error saving todos to localStorage:', error);
      }
    }
  }, [todos, isLoading]);

  const addTodo = () => {
    if (typeof newTodo !== 'string' || !newTodo.trim()) return;

    const todo = {
      id: Date.now().toString(),
      text: newTodo.trim(),
      completed: false,
      priority: PRIORITIES.MEDIUM,
      createdAt: new Date().toISOString(),
      dueDate: null
    };

    setTodos(prevTodos => [todo, ...prevTodos]);
    setNewTodo('');
  };

  const updateTodo = (id, updates) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, ...updates } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
  };

  const toggleTodo = (id) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // Filter todos based on search term, status, and priority
  const filteredTodos = todos.filter(todo => {
    const matchesSearch = typeof todo.text === 'string' && 
      todo.text.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || 
      (filterStatus === 'completed' && todo.completed) ||
      (filterStatus === 'pending' && !todo.completed);
    
    const matchesPriority = filterPriority === 'all' || todo.priority === filterPriority;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTodo();
    }
  };

  const getStats = () => {
    const total = todos.length;
    const completed = todos.filter(todo => todo.completed).length;
    const pending = total - completed;
    const highPriority = todos.filter(todo => todo.priority === PRIORITIES.HIGH && !todo.completed).length;
    
    return { total, completed, pending, highPriority };
  };

  const stats = getStats();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-slate-800 mb-2">
            Neo Todo
          </h1>
          <p className="text-slate-600">
            Beautiful task management with neomorphic design
          </p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-[8px_8px_16px_#d1d9e6,-8px_-8px_16px_#ffffff]">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <CheckCircle2 className="h-5 w-5 text-slate-600" />
              </div>
              <p className="text-2xl font-bold text-slate-800">{stats.total}</p>
              <p className="text-sm text-slate-600">Total</p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-[8px_8px_16px_#d1d9e6,-8px_-8px_16px_#ffffff]">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <Circle className="h-5 w-5 text-green-600" />
              </div>
              <p className="text-2xl font-bold text-green-600">{stats.completed}</p>
              <p className="text-sm text-slate-600">Done</p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-[8px_8px_16px_#d1d9e6,-8px_-8px_16px_#ffffff]">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <Clock className="h-5 w-5 text-blue-600" />
              </div>
              <p className="text-2xl font-bold text-blue-600">{stats.pending}</p>
              <p className="text-sm text-slate-600">Pending</p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-[8px_8px_16px_#d1d9e6,-8px_-8px_16px_#ffffff]">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <AlertTriangle className="h-5 w-5 text-red-600" />
              </div>
              <p className="text-2xl font-bold text-red-600">{stats.highPriority}</p>
              <p className="text-sm text-slate-600">High Priority</p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Add Todo Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="mb-8 bg-white/80 backdrop-blur-sm border-0 shadow-[inset_8px_8px_16px_#d1d9e6,inset_-8px_-8px_16px_#ffffff]">
            <CardContent className="p-6">
              <div className="flex gap-4">
                <div className="flex-1">
                  <Input
                    type="text"
                    placeholder="What needs to be done?"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="bg-transparent border-0 shadow-[inset_4px_4px_8px_#d1d9e6,inset_-4px_-4px_8px_#ffffff] focus-visible:ring-0 focus-visible:ring-offset-0"
                  />
                </div>
                <Button
                  onClick={addTodo}
                  disabled={!newTodo.trim()}
                  className="bg-slate-200 hover:bg-slate-300 text-slate-800 border-0 shadow-[8px_8px_16px_#d1d9e6,-8px_-8px_16px_#ffffff] hover:shadow-[4px_4px_8px_#d1d9e6,-4px_-4px_8px_#ffffff] transition-all duration-200"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="mb-8 bg-white/80 backdrop-blur-sm border-0 shadow-[8px_8px_16px_#d1d9e6,-8px_-8px_16px_#ffffff]">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                    <Input
                      type="text"
                      placeholder="Search todos..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 bg-transparent border-0 shadow-[inset_4px_4px_8px_#d1d9e6,inset_-4px_-4px_8px_#ffffff] focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                  </div>
                </div>
                <div className="flex gap-4">
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-32 bg-transparent border-0 shadow-[inset_4px_4px_8px_#d1d9e6,inset_-4px_-4px_8px_#ffffff] focus:ring-0 focus:ring-offset-0">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={filterPriority} onValueChange={setFilterPriority}>
                    <SelectTrigger className="w-32 bg-transparent border-0 shadow-[inset_4px_4px_8px_#d1d9e6,inset_-4px_-4px_8px_#ffffff] focus:ring-0 focus:ring-offset-0">
                      <SelectValue placeholder="Priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value={PRIORITIES.HIGH}>High</SelectItem>
                      <SelectItem value={PRIORITIES.MEDIUM}>Medium</SelectItem>
                      <SelectItem value={PRIORITIES.LOW}>Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Todo Items */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="space-y-4"
        >
          <AnimatePresence mode="popLayout">
            {filteredTodos.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="text-center py-12"
              >
                <div className="text-6xl mb-4">📝</div>
                <h3 className="text-xl font-semibold text-slate-700 mb-2">
                  {searchTerm || filterStatus !== 'all' || filterPriority !== 'all'
                    ? 'No todos match your filters'
                    : 'No todos yet'}
                </h3>
                <p className="text-slate-500">
                  {searchTerm || filterStatus !== 'all' || filterPriority !== 'all'
                    ? 'Try adjusting your search or filters'
                    : 'Add your first todo to get started!'}
                </p>
              </motion.div>
            ) : (
              filteredTodos.map((todo, index) => (
                <motion.div
                  key={todo.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <TodoItem
                    todo={todo}
                    onUpdate={updateTodo}
                    onDelete={deleteTodo}
                    onToggle={toggleTodo}
                  />
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </motion.div>

        {/* Footer */}
        {todos.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-12 text-center text-slate-500 text-sm"
          >
            <p>
              {stats.completed} of {stats.total} tasks completed
              {stats.completed === stats.total && stats.total > 0 && (
                <span className="ml-2">🎉 All done!</span>
              )}
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default TodoList;