import { motion } from "framer-motion"
import { useState } from "react"
import Icon from "@/components/ui/icon"

interface TicketFormProps {
  onClose: () => void
}

export function TicketForm({ onClose }: TicketFormProps) {
  const [formData, setFormData] = useState({
    subject: "",
    description: "",
    priority: "medium",
    email: ""
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.subject.trim()) {
      newErrors.subject = "Укажите тему обращения"
    }
    
    if (!formData.description.trim()) {
      newErrors.description = "Опишите вашу проблему"
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Укажите email для связи"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Некорректный email"
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (validateForm()) {
      console.log("Тикет создан:", formData)
      // Здесь будет отправка на сервер
      alert("Тикет успешно создан! Мы свяжемся с вами в ближайшее время.")
      onClose()
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="w-full max-w-lg rounded-3xl p-6 relative"
        style={{
          background: "rgba(255, 255, 255, 0.85)",
          backdropFilter: "blur(40px) saturate(180%)",
          WebkitBackdropFilter: "blur(40px) saturate(180%)",
          boxShadow: `
            inset 0 1px 1px rgba(255, 255, 255, 0.9),
            0 0 0 1px rgba(255, 255, 255, 0.6),
            0 8px 32px rgba(0, 0, 0, 0.12),
            0 16px 64px rgba(0, 0, 0, 0.08)
          `,
          border: "1px solid rgba(255, 255, 255, 0.5)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100/50 transition-colors"
        >
          <Icon name="X" size={20} />
        </button>

        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Создать тикет</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Тема обращения
            </label>
            <input
              type="text"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-gray-200/50 bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
              placeholder="Кратко опишите проблему"
            />
            {errors.subject && (
              <p className="text-red-500 text-xs mt-1">{errors.subject}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Описание
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={4}
              className="w-full px-4 py-3 rounded-xl border border-gray-200/50 bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all resize-none"
              placeholder="Подробно опишите вашу проблему"
            />
            {errors.description && (
              <p className="text-red-500 text-xs mt-1">{errors.description}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Приоритет
            </label>
            <select
              value={formData.priority}
              onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-gray-200/50 bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
            >
              <option value="low">Низкий</option>
              <option value="medium">Средний</option>
              <option value="high">Высокий</option>
              <option value="urgent">Срочный</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email для связи
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-gray-200/50 bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
              placeholder="your@email.com"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 rounded-xl font-medium text-gray-700 bg-white/50 hover:bg-white/80 border border-gray-200/50 transition-all"
            >
              Отмена
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 rounded-xl font-medium text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg shadow-purple-500/25"
            >
              Создать тикет
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  )
}
