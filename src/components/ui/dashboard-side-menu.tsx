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
  ChevronRight,
  ChevronLeft,
  Bell,
  Users,
  Heart,
  Menu,
  Settings,
  Search,
  Mic
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

interface DashboardSideMenuProps {
  isOpen: boolean;
  onToggle: () => void;
  isAdmin?: boolean;
}

export function DashboardSideMenu({ isOpen, onToggle, isAdmin = false }: DashboardSideMenuProps) {
  const [activeTab, setActiveTab] = useState<'announcements' | 'chat' | 'donation'>('announcements');
  const [newAnnouncement, setNewAnnouncement] = useState('');
  const [announcementType, setAnnouncementType] = useState<'event' | 'fundraising' | 'general'>('general');
  const [announcementTitle, setAnnouncementTitle] = useState('');
  const [isComposing, setIsComposing] = useState(false);
  const [expandedAnnouncementId, setExpandedAnnouncementId] = useState<string | null>(null);
  const [announcements, setAnnouncements] = useState<Announcement[]>([
    {
      id: '1',
      type: 'event',
      title: 'MIT Alumni Networking Event',
      content: 'Join us for our annual MIT alumni networking event on March 15th at the main campus auditorium. This event will feature keynote speakers, networking sessions, and opportunities to connect with fellow alumni and current students. Don’t miss out on this chance to expand your network and learn about the latest developments at MIT!\n\nSchedule:\n- 10:00 AM: Registration\n- 11:00 AM: Keynote Address\n- 12:30 PM: Networking Lunch\n- 2:00 PM: Panel Discussion\n- 4:00 PM: Closing Remarks',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      author: 'MIT College Admin',
      college: 'MIT'
    },
    {
      id: '2',
      type: 'fundraising',
      title: 'MIT Scholarship Fund Drive',
      content: 'Help us reach our $50,000 goal for the new MIT scholarship fund. Every contribution makes a difference! Your donation will support talented students in need and help them achieve their dreams.\n\nGoal: $50,000\nCurrent: $35,000',
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
      author: 'MIT College Admin',
      college: 'MIT'
    },
    {
      id: '3',
      type: 'general',
      title: 'MIT Campus Updates',
      content: 'New research facilities are now open at MIT. Alumni are welcome to visit and tour the new labs.\n\nFor more information, contact the alumni office.',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
      author: 'MIT College Admin',
      college: 'MIT'
    }
  ]);
  const [donationTabAnnouncementId, setDonationTabAnnouncementId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const donationSectionRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [announcements]);

  useEffect(() => {
    if (activeTab === 'donation' && donationSectionRef.current) {
      donationSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [activeTab]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAnnouncement.trim() || !announcementTitle.trim()) return;

    const announcement: Announcement = {
      id: Date.now().toString(),
      type: announcementType,
      title: announcementTitle,
      content: newAnnouncement,
      timestamp: new Date(),
      author: 'MIT College Admin',
      college: 'MIT'
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
      case 'event': return 'bg-gray-900 text-white border-gray-700';
      case 'fundraising': return 'bg-gray-900 text-white border-gray-700';
      default: return 'bg-gray-900 text-white border-gray-700';
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

  // Find the first fundraising announcement for the donation tab
  const fundraisingAnnouncement = announcements.find(a => a.type === 'fundraising');
  // Demo: $35,000 of $50,000
  const fundraisingGoal = 50000;
  const fundraisingCurrent = 35000;
  const fundraisingProgress = fundraisingCurrent / fundraisingGoal;

  return (
    <>
      {/* Toggle Button */}
      <motion.button
        initial={{ y: 0, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="fixed top-6 right-6 z-50 bg-black border border-gray-700 text-white p-3 rounded-lg shadow-2xl hover:bg-gray-800 transition-all duration-300"
        onClick={onToggle}
      >
        {isOpen ? <ChevronRight className="w-5 h-5" /> : <Megaphone className="w-5 h-5" />}
      </motion.button>

      {/* Side Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-96 bg-black border-l border-gray-800 z-40 flex flex-col"
          >
            {/* Header */}
            <div className="bg-black border-b border-gray-800 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-gray-800 p-2 rounded-lg">
                  <Bell className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">MIT College Hub</h3>
                  <p className="text-gray-400 text-sm">Announcements & Updates</p>
                </div>
              </div>
              <button
                onClick={onToggle}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Tab Navigation */}
            <div className="bg-black border-b border-gray-800 p-2">
              <div className="flex gap-1">
                {[
                  { id: 'announcements', label: 'Announcements', icon: Bell },
                  { id: 'chat', label: 'Chat', icon: MessageCircle },
                  { id: 'donation', label: 'Donation', icon: DollarSign }
                ].map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    onClick={() => setActiveTab(id as any)}
                    className={cn(
                      "flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                      activeTab === id
                        ? "bg-white text-black"
                        : "text-gray-400 hover:text-white hover:bg-gray-800"
                    )}
                  >
                    <Icon className="w-4 h-4" />
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
              {activeTab === 'announcements' && (
                <>
                  {/* Announcements List */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-3">
                    {announcements.map((announcement) => {
                      const isExpanded = expandedAnnouncementId === announcement.id;
                      return (
                        <motion.div
                          key={announcement.id}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          className={cn(
                            "bg-gray-800/50 rounded-lg p-3 border border-gray-800 hover:bg-gray-800/70 transition-colors cursor-pointer",
                            isExpanded && "bg-gray-900 border-white"
                          )}
                          onClick={() => setExpandedAnnouncementId(isExpanded ? null : announcement.id)}
                        >
                          <div className="flex items-start gap-3">
                            <div className={cn(
                              "p-2 rounded-lg border border-gray-700 bg-gray-900 text-white"
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
                              <p className={cn(
                                "text-gray-300 text-sm mb-2",
                                !isExpanded && "line-clamp-2"
                              )}>
                                {announcement.content}
                              </p>
                              {isExpanded && announcement.type === 'fundraising' && (
                                <>
                                  <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
                                    <div
                                      className="bg-white h-2 rounded-full transition-all duration-700"
                                      style={{ width: `${fundraisingProgress * 100}%` }}
                                    />
                                  </div>
                                  <div className="flex justify-between items-center mb-2">
                                    <span className="text-xs text-gray-400">${fundraisingCurrent.toLocaleString()} of ${fundraisingGoal.toLocaleString()}</span>
                                    <span className="text-xs text-gray-400">{Math.round(fundraisingProgress * 100)}%</span>
                                  </div>
                                  <button
                                    className="text-xs text-white bg-black border border-gray-700 rounded px-3 py-1 hover:bg-white hover:text-black transition-colors"
                                    onClick={e => {
                                      e.stopPropagation();
                                      setActiveTab('donation');
                                      setDonationTabAnnouncementId(announcement.id);
                                    }}
                                  >
                                    Donate
                                  </button>
                                </>
                              )}
                              {isExpanded && announcement.type === 'event' && (
                                <button
                                  className="text-xs text-white bg-black border border-gray-700 rounded px-3 py-1 hover:bg-white hover:text-black transition-colors mb-2"
                                  onClick={e => e.stopPropagation()}
                                >
                                  Register Now
                                </button>
                              )}
                              <div className="flex items-center gap-2 text-xs text-gray-500">
                                <span>{announcement.author}</span>
                                <span>•</span>
                                <span>{announcement.college}</span>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                    <div ref={messagesEndRef} />
                  </div>
                  {/* Compose New Announcement (admin only) */}
                  {isAdmin && (isComposing ? (
                    <motion.form
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      onSubmit={handleSubmit}
                      className="p-4 border-t border-gray-800 bg-gray-900"
                    >
                      <div className="space-y-3">
                        <div>
                          <label className="text-white text-sm font-medium mb-2 block">
                            Type
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
                                    ? "bg-white text-black"
                                    : "bg-gray-800 text-gray-300 hover:bg-gray-700"
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
                          placeholder="Title..."
                          value={announcementTitle}
                          onChange={(e) => setAnnouncementTitle(e.target.value)}
                          className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white text-sm"
                        />
                        <textarea
                          placeholder="Write announcement..."
                          value={newAnnouncement}
                          onChange={(e) => setNewAnnouncement(e.target.value)}
                          className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white text-sm resize-none h-20"
                        />
                        <div className="flex gap-2">
                          <button
                            type="submit"
                            disabled={!newAnnouncement.trim() || !announcementTitle.trim()}
                            className="flex-1 bg-white hover:bg-gray-200 disabled:bg-gray-700 disabled:cursor-not-allowed text-black px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
                          >
                            <Send className="w-4 h-4" />
                            Post
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setIsComposing(false);
                              setNewAnnouncement('');
                              setAnnouncementTitle('');
                            }}
                            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg text-sm font-medium transition-colors"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </motion.form>
                  ) : (
                    <div className="p-4 border-t border-gray-800">
                      <button
                        onClick={() => setIsComposing(true)}
                        className="w-full bg-white hover:bg-gray-200 text-black px-4 py-3 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2"
                      >
                        <Plus className="w-4 h-4" />
                        New Announcement
                      </button>
                    </div>
                  ))}
                </>
              )}

              {activeTab === 'chat' && (
                <div className="flex-1 flex flex-col p-4">
                  <div className="flex-1 flex flex-col justify-end">
                    <div className="mb-4">
                      <div className="flex items-end gap-2 mb-2">
                        <div className="bg-gray-800 text-white px-4 py-2 rounded-2xl max-w-xs">
                          Welcome to the MIT Alumni Portal! Reach out for any queries.
                        </div>
                        <div className="flex-shrink-0">
                          <img src="https://upload.wikimedia.org/wikipedia/commons/0/0c/MIT_logo.svg" alt="MIT" className="w-8 h-8 rounded-full bg-white" />
                        </div>
                      </div>
                      <div className="flex items-end gap-2 mb-2">
                        <div className="bg-gray-800 text-white px-4 py-2 rounded-2xl max-w-xs">
                          Don’t forget to register for the upcoming MIT Alumni Networking Event!
                        </div>
                        <div className="flex-shrink-0">
                          <img src="https://upload.wikimedia.org/wikipedia/commons/0/0c/MIT_logo.svg" alt="MIT" className="w-8 h-8 rounded-full bg-white" />
                        </div>
                      </div>
                      <div className="flex items-end gap-2 mb-2">
                        <div className="bg-gray-800 text-white px-4 py-2 rounded-2xl max-w-xs">
                          Support our Scholarship Fund Drive and help us reach our goal!
                        </div>
                        <div className="flex-shrink-0">
                          <img src="https://upload.wikimedia.org/wikipedia/commons/0/0c/MIT_logo.svg" alt="MIT" className="w-8 h-8 rounded-full bg-white" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'donation' && fundraisingAnnouncement && (
                <div className="flex-1 flex flex-col p-6" ref={donationSectionRef}>
                  <h2 className="text-xl font-bold text-white mb-2">{fundraisingAnnouncement.title}</h2>
                  <p className="text-gray-300 mb-4">{fundraisingAnnouncement.content}</p>
                  <div className="w-full bg-gray-700 rounded-full h-3 mb-2">
                    <div
                      className="bg-white h-3 rounded-full transition-all duration-700"
                      style={{ width: `${fundraisingProgress * 100}%` }}
                    />
                  </div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-xs text-gray-400">${fundraisingCurrent.toLocaleString()} of ${fundraisingGoal.toLocaleString()}</span>
                    <span className="text-xs text-gray-400">{Math.round(fundraisingProgress * 100)}%</span>
                  </div>
                  <button className="bg-white text-black px-6 py-2 rounded-lg font-semibold hover:bg-gray-200 transition-colors w-full">
                    Donate Now
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
