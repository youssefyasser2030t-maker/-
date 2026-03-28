import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ChevronRight, 
  Check,
  Trash2,
  AlertTriangle,
  Bell,
  Info
} from 'lucide-react';
import { SpeakerButton } from '@/components/SpeakerButton';
import type { Notification } from '@/types';

interface NotificationsScreenProps {
  onBack: () => void;
}

// Mock notifications
const mockNotifications: Notification[] = [
  {
    id: '1',
    userId: 'user1',
    type: 'urgent',
    title: 'موجة حر شديدة متوقعة',
    body: 'درجة الحرارة هتوصل 42°C بكرة في الداخلة. لازم تزود الري بنسبة 30% للنخيل.',
    isRead: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 30), // 30 mins ago
  },
  {
    id: '2',
    userId: 'user1',
    type: 'urgent',
    title: 'بياض زغبي مكتشف',
    body: 'تم رصد بياض زغبي في مزرعة أحمد محمود. يحتاج تدخل فوري.',
    isRead: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
  },
  {
    id: '3',
    userId: 'user1',
    type: 'reminder',
    title: 'تذكير بري المزارع',
    body: 'مزرعة محمود علي محتاجة ري النهاردة الساعة 6 مساءً.',
    isRead: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
  },
  {
    id: '4',
    userId: 'user1',
    type: 'reminder',
    title: 'موعد تسميد شهري',
    body: 'حان موعد التسميد الشهري لمزارع النخيل. استخدم سماد NPK.',
    isRead: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
  },
  {
    id: '5',
    userId: 'user1',
    type: 'info',
    title: 'نصيحة زيد اليومية',
    body: 'الطقس معتدل النهاردة. فرصة ممتازة لرش المبيدات.',
    isRead: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48), // 2 days ago
  },
  {
    id: '6',
    userId: 'user1',
    type: 'info',
    title: 'مزارع جديد انضم',
    body: 'خالد عبدالله انضم لقائمة عملائك. يمكنك إضافة بيانات مزرعته الآن.',
    isRead: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 72), // 3 days ago
  },
];

const typeConfig = {
  urgent: {
    icon: AlertTriangle,
    color: '#C62828',
    bgColor: '#FFEBEE',
    borderColor: '#C62828',
    label: 'عاجل',
  },
  reminder: {
    icon: Bell,
    color: '#FFB300',
    bgColor: '#FFFDE7',
    borderColor: '#FFB300',
    label: 'تذكير',
  },
  info: {
    icon: Info,
    color: '#43A047',
    bgColor: '#E8F5E9',
    borderColor: '#43A047',
    label: 'معلومة',
  },
};

export function NotificationsScreen({ onBack }: NotificationsScreenProps) {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);

  const unreadCount = notifications.filter(n => !n.isRead).length;
  const urgentCount = notifications.filter(n => n.type === 'urgent' && !n.isRead).length;
  const reminderCount = notifications.filter(n => n.type === 'reminder' && !n.isRead).length;
  const infoCount = notifications.filter(n => n.type === 'info' && !n.isRead).length;

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, isRead: true } : n)
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 60) return `منذ ${minutes} دقيقة`;
    if (hours < 24) return `منذ ${hours} ساعة`;
    return `منذ ${days} يوم`;
  };

  const groupedNotifications = {
    urgent: notifications.filter(n => n.type === 'urgent'),
    reminder: notifications.filter(n => n.type === 'reminder'),
    info: notifications.filter(n => n.type === 'info'),
  };

  return (
    <div className="min-h-screen bg-[#E8F5E9]">
      {/* Header */}
      <div 
        className="px-6 pt-12 pb-6"
        style={{ background: 'linear-gradient(135deg, #1B5E20 0%, #2E7D32 100%)' }}
      >
        <div className="flex items-center justify-between">
          <button 
            onClick={onBack}
            className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center"
          >
            <ChevronRight size={24} className="text-white" />
          </button>
          <h1 className="text-white text-xl font-bold">🔔 التنبيهات</h1>
          <div className="w-10" />
        </div>
        
        {unreadCount > 0 && (
          <button
            onClick={markAllAsRead}
            className="mt-4 text-[#A5D6A7] text-sm hover:text-white transition-colors"
          >
            تحديد الكل كمقروء
          </button>
        )}
      </div>

      {/* Notifications List */}
      <div className="px-6 py-4 space-y-6">
        {/* Urgent Group */}
        {groupedNotifications.urgent.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[#C62828] font-bold">🔴 عاجل ({urgentCount})</span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>
            
            <div className="space-y-3">
              {groupedNotifications.urgent.map((notification) => {
                const config = typeConfig[notification.type];
                const Icon = config.icon;
                
                return (
                  <motion.div
                    key={notification.id}
                    layout
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`relative bg-white rounded-2xl shadow-lg overflow-hidden ${
                      !notification.isRead ? 'border-r-4' : ''
                    }`}
                    style={{ borderRightColor: config.borderColor }}
                  >
                    {/* Swipe Actions */}
                    <div className="absolute inset-0 flex">
                      <button
                        onClick={() => markAsRead(notification.id)}
                        className="flex-1 bg-[#43A047] flex items-center justify-center"
                      >
                        <Check size={24} className="text-white" />
                      </button>
                      <button
                        onClick={() => deleteNotification(notification.id)}
                        className="flex-1 bg-[#C62828] flex items-center justify-center"
                      >
                        <Trash2 size={24} className="text-white" />
                      </button>
                    </div>
                    
                    {/* Content */}
                    <div 
                      className={`relative bg-white p-4 ${notification.isRead ? '' : 'shadow-md'}`}
                    >
                      <div className="flex items-start gap-3">
                        {/* Icon */}
                        <div 
                          className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                          style={{ backgroundColor: config.bgColor }}
                        >
                          <Icon size={24} style={{ color: config.color }} />
                        </div>
                        
                        {/* Content */}
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <h3 className="font-bold text-base">{notification.title}</h3>
                            {!notification.isRead && (
                              <span className="w-2.5 h-2.5 rounded-full bg-[#C62828]" />
                            )}
                          </div>
                          <p className="text-gray-600 text-sm mt-1">{notification.body}</p>
                          
                          <div className="flex items-center justify-between mt-3">
                            <span className="text-gray-400 text-xs">
                              {formatTime(notification.createdAt)}
                            </span>
                            <SpeakerButton text={notification.body} size="sm" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}

        {/* Reminders Group */}
        {groupedNotifications.reminder.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[#FFB300] font-bold">🟡 تذكيرات ({reminderCount})</span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>
            
            <div className="space-y-3">
              {groupedNotifications.reminder.map((notification) => {
                const config = typeConfig[notification.type];
                const Icon = config.icon;
                
                return (
                  <motion.div
                    key={notification.id}
                    layout
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`relative bg-white rounded-2xl shadow-lg overflow-hidden ${
                      !notification.isRead ? 'border-r-4' : ''
                    }`}
                    style={{ borderRightColor: config.borderColor }}
                  >
                    <div className="p-4">
                      <div className="flex items-start gap-3">
                        <div 
                          className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                          style={{ backgroundColor: config.bgColor }}
                        >
                          <Icon size={24} style={{ color: config.color }} />
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <h3 className="font-bold text-base">{notification.title}</h3>
                            {!notification.isRead && (
                              <span className="w-2.5 h-2.5 rounded-full bg-[#FFB300]" />
                            )}
                          </div>
                          <p className="text-gray-600 text-sm mt-1">{notification.body}</p>
                          
                          <div className="flex items-center justify-between mt-3">
                            <span className="text-gray-400 text-xs">
                              {formatTime(notification.createdAt)}
                            </span>
                            <SpeakerButton text={notification.body} size="sm" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}

        {/* Info Group */}
        {groupedNotifications.info.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[#43A047] font-bold">🟢 معلومات ({infoCount})</span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>
            
            <div className="space-y-3">
              {groupedNotifications.info.map((notification) => {
                const config = typeConfig[notification.type];
                const Icon = config.icon;
                
                return (
                  <motion.div
                    key={notification.id}
                    layout
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`relative bg-white rounded-2xl shadow-lg overflow-hidden ${
                      !notification.isRead ? 'border-r-4' : ''
                    }`}
                    style={{ borderRightColor: config.borderColor }}
                  >
                    <div className="p-4">
                      <div className="flex items-start gap-3">
                        <div 
                          className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                          style={{ backgroundColor: config.bgColor }}
                        >
                          <Icon size={24} style={{ color: config.color }} />
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <h3 className="font-bold text-base">{notification.title}</h3>
                            {!notification.isRead && (
                              <span className="w-2.5 h-2.5 rounded-full bg-[#43A047]" />
                            )}
                          </div>
                          <p className="text-gray-600 text-sm mt-1">{notification.body}</p>
                          
                          <div className="flex items-center justify-between mt-3">
                            <span className="text-gray-400 text-xs">
                              {formatTime(notification.createdAt)}
                            </span>
                            <SpeakerButton text={notification.body} size="sm" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}

        {/* Empty State */}
        {notifications.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-12"
          >
            <div className="text-8xl mb-4">🌴</div>
            <h3 className="text-[#1B5E20] text-2xl font-bold mb-2">
              كل حاجة تمام يا دكتور 🌿
            </h3>
            <p className="text-gray-500">مفيش تنبيهات جديدة دلوقتي</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
