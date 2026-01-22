import { motion } from "framer-motion"
import Icon from "@/components/ui/icon"

interface MyTicketsProps {
  onClose: () => void
}

interface Ticket {
  id: string
  subject: string
  status: "new" | "in_progress" | "resolved" | "closed"
  priority: "low" | "medium" | "high" | "urgent"
  createdAt: string
  updatedAt: string
}

const mockTickets: Ticket[] = [
  {
    id: "1",
    subject: "Не работает функция экспорта данных",
    status: "in_progress",
    priority: "high",
    createdAt: "2025-01-20",
    updatedAt: "2025-01-22"
  },
  {
    id: "2",
    subject: "Вопрос по настройке уведомлений",
    status: "resolved",
    priority: "medium",
    createdAt: "2025-01-18",
    updatedAt: "2025-01-19"
  },
  {
    id: "3",
    subject: "Ошибка при входе в систему",
    status: "closed",
    priority: "urgent",
    createdAt: "2025-01-15",
    updatedAt: "2025-01-16"
  }
]

const statusConfig = {
  new: { label: "Новый", color: "bg-blue-500" },
  in_progress: { label: "В работе", color: "bg-yellow-500" },
  resolved: { label: "Решён", color: "bg-green-500" },
  closed: { label: "Закрыт", color: "bg-gray-500" }
}

const priorityConfig = {
  low: { label: "Низкий", color: "text-gray-600" },
  medium: { label: "Средний", color: "text-blue-600" },
  high: { label: "Высокий", color: "text-orange-600" },
  urgent: { label: "Срочный", color: "text-red-600" }
}

export function MyTickets({ onClose }: MyTicketsProps) {
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
        className="w-full max-w-3xl rounded-3xl p-6 relative max-h-[80vh] overflow-y-auto"
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

        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Мои обращения</h2>

        {mockTickets.length === 0 ? (
          <div className="text-center py-12">
            <Icon name="Inbox" size={48} className="mx-auto text-gray-400 mb-4" />
            <p className="text-gray-500">У вас пока нет обращений</p>
          </div>
        ) : (
          <div className="space-y-3">
            {mockTickets.map((ticket) => (
              <motion.div
                key={ticket.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-2xl cursor-pointer hover:bg-white/50 transition-all"
                style={{
                  background: "rgba(255, 255, 255, 0.3)",
                  border: "1px solid rgba(255, 255, 255, 0.4)",
                }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-medium text-gray-500">#{ticket.id}</span>
                      <div className="flex items-center gap-1">
                        <div className={`w-2 h-2 rounded-full ${statusConfig[ticket.status].color}`} />
                        <span className="text-xs font-medium text-gray-700">
                          {statusConfig[ticket.status].label}
                        </span>
                      </div>
                    </div>
                    
                    <h3 className="text-base font-semibold text-gray-800 mb-2">
                      {ticket.subject}
                    </h3>
                    
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <Icon name="Clock" size={14} />
                        <span>Создан: {ticket.createdAt}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Icon name="RefreshCw" size={14} />
                        <span>Обновлён: {ticket.updatedAt}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-end gap-2">
                    <span className={`text-xs font-semibold ${priorityConfig[ticket.priority].color}`}>
                      {priorityConfig[ticket.priority].label}
                    </span>
                    <Icon name="ChevronRight" size={20} className="text-gray-400" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        <div className="mt-6 pt-4 border-t border-gray-200/50">
          <button
            onClick={onClose}
            className="w-full px-6 py-3 rounded-xl font-medium text-gray-700 bg-white/50 hover:bg-white/80 border border-gray-200/50 transition-all"
          >
            Закрыть
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}
