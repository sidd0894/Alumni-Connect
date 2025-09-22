"use client";

import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { 
  MessageCircle, 
  X, 
  Send, 
  Calendar, 
  DollarSign, 
  Megaphone, 
  Plus,
  ChevronDown,
  ChevronUp,
  Bell,
  Users,
  Heart
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Announcement {
  id: string;
  type: 'event' | 'fundraising' | 'general';
  title: string;
  content: string;
  timestamp: Date;
  author: string;
  college: string;
}

export function AnnouncementChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [newAnnouncement, setNewAnnouncement] = useState('');
  const [announcementType, setAnnouncementType] = useState<'event' | 'fundraising' | 'general'>('general');
  const [announcementTitle, setAnnouncementTitle] = useState('');
  const [isComposing, setIsComposing] = useState(false);
  const [announcements, setAnnouncements] = useState<Announcement[]>([
    {
      id: '1',
      type: 'event',
      title: 'Alumni Networking Event',
      content: 'Join us for our annual alumni networking event on March 15th at the main campus auditorium.',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      author: 'Sarah Johnson',
      college: 'MIT'
    },
    {
      id: '2',
      type: 'fundraising',
      title: 'Scholarship Fund Drive',
      content: 'Help us reach our $50,000 goal for the new scholarship fund. Every contribution makes a difference!',
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
      author: 'Dr. Michael Chen',
      college: 'Stanford'
    },
    {
      id: '3',
      type: 'general',
      title: 'Campus Updates',
      content: 'New research facilities are now open. Alumni are welcome to visit and tour the new labs.',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
      author: 'Admin Team',
      college: 'Harvard'
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [announcements]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAnnouncement.trim() || !announcementTitle.trim()) return;

    const announcement: Announcement = {
      id: Date.now().toString(),
      type: announcementType,
      title: announcementTitle,
      content: newAnnouncement,
      timestamp: new Date(),
      author: 'College Admin',
      college: 'Your University'
    };

    setAnnouncements(prev => [announcement, ...prev]);
    setNewAnnouncement('');
    setAnnouncementTitle('');
    setIsComposing(false);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'event': return <Calendar className="w-4 h-4" />;
      case 'fundraising': return <DollarSign className="w-4 h-4" />;
      default: return <Megaphone className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'event': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'fundraising': return 'bg-green-500/20 text-green-400 border-green-500/30';
      default: return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
    }
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor(diff / (1000 * 60));
    
    if (hours < 1) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Toggle Button */}
      {!isOpen && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 rounded-full shadow-2xl hover:shadow-blue-500/25 transition-all duration-300"
        >
          <MessageCircle className="w-6 h-6" />
        </motion.button>
      )}

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className={cn(
              "bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl overflow-hidden",
              isMinimized ? "w-80 h-16" : "w-96 h-[500px]"
            )}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-white/20 p-2 rounded-lg">
                  <Bell className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">College Announcements</h3>
                  <p className="text-blue-100 text-sm">Share events & updates</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="text-white/80 hover:text-white transition-colors"
                >
                  {isMinimized ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white/80 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 h-[300px]">
                  {announcements.map((announcement) => (
                    <motion.div
                      key={announcement.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="bg-gray-800/50 rounded-lg p-3 border border-gray-700/50"
                    >
                      <div className="flex items-start gap-3">
                        <div className={cn(
                          "p-2 rounded-lg border",
                          getTypeColor(announcement.type)
                        )}>
                          {getTypeIcon(announcement.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="text-white font-medium text-sm truncate">
                              {announcement.title}
                            </h4>
                            <span className="text-xs text-gray-400">
                              {formatTime(announcement.timestamp)}
                            </span>
                          </div>
                          <p className="text-gray-300 text-sm mb-2">
                            {announcement.content}
                          </p>
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <span>{announcement.author}</span>
                            <span>•</span>
                            <span>{announcement.college}</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>

                {/* Compose New Announcement */}
                {isComposing ? (
                  <motion.form
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    onSubmit={handleSubmit}
                    className="p-4 border-t border-gray-700 bg-gray-800/30"
                  >
                    <div className="space-y-3">
                      <div>
                        <label className="text-white text-sm font-medium mb-2 block">
                          Announcement Type
                        </label>
                        <div className="flex gap-2">
                          {[
                            { type: 'general', label: 'General', icon: Megaphone },
                            { type: 'event', label: 'Event', icon: Calendar },
                            { type: 'fundraising', label: 'Fundraising', icon: DollarSign }
                          ].map(({ type, label, icon: Icon }) => (
                            <button
                              key={type}
                              type="button"
                              onClick={() => setAnnouncementType(type as any)}
                              className={cn(
                                "flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-colors",
                                announcementType === type
                                  ? "bg-blue-500 text-white"
                                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                              )}
                            >
                              <Icon className="w-3 h-3" />
                              {label}
                            </button>
                          ))}
                        </div>
                      </div>
                      <input
                        type="text"
                        placeholder="Announcement title..."
                        value={announcementTitle}
                        onChange={(e) => setAnnouncementTitle(e.target.value)}
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                      />
                      <textarea
                        placeholder="Write your announcement..."
                        value={newAnnouncement}
                        onChange={(e) => setNewAnnouncement(e.target.value)}
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm resize-none h-20"
                      />
                      <div className="flex gap-2">
                        <button
                          type="submit"
                          disabled={!newAnnouncement.trim() || !announcementTitle.trim()}
                          className="flex-1 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
                        >
                          <Send className="w-4 h-4" />
                          Post Announcement
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setIsComposing(false);
                            setNewAnnouncement('');
                            setAnnouncementTitle('');
                          }}
                          className="px-4 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded-lg text-sm font-medium transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </motion.form>
                ) : (
                  <div className="p-4 border-t border-gray-700">
                    <button
                      onClick={() => setIsComposing(true)}
                      className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-4 py-3 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      New Announcement
                    </button>
                  </div>
                )}
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
