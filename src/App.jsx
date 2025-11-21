import React, { useState, useEffect, useRef } from 'react';
import { 
  MapPin, 
  Calendar, 
  Clock, 
  Search, 
  Heart, 
  User, 
  Briefcase, 
  PlayCircle, 
  CreditCard, 
  Plus, 
  Bell, 
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  Utensils,
  Coffee,
  MoreHorizontal,
  Star,
  CalendarDays,
  Globe,
  Settings,
  X,
  Share2,
  Info,
  Filter,
  SlidersHorizontal,
  MessageCircle,
  ClipboardList,
  Users,
  Wallet,
  Menu,
  LogOut,
  HelpCircle
} from 'lucide-react';

// --- Translations ---

const TRANSLATIONS = {
  th: {
    nav: { find: 'ประกาศงาน', myJobs: 'งาน', messages: 'ข้อความ', earnings: 'รายได้' },
    home: {
      locationPlaceholder: 'ค้นหาสถานที่...',
      jobSearchPlaceholder: 'ค้นหางาน, ชื่อร้าน...',
      next12Days: '12 วันถัดไป',
      startTime: 'เวลาเริ่มงาน',
      findShifts: 'ค้นหากะงาน',
      nearbyShifts: 'งานใกล้คุณ',
      seeAll: 'ดูทั้งหมด',
      filters: { all: 'ทั้งหมด', server: 'เสิร์ฟ', kitchen: 'ครัว', other: 'อื่นๆ' },
      apply: 'สมัครทันที',
      applied: 'สมัครแล้ว',
      perHr: '/ชม.',
      noResults: 'ไม่พบงานที่คุณค้นหา',
      advancedFilters: 'ตัวกรองขั้นสูง',
      payRange: 'อัตราค่าจ้าง',
      distance: 'ระยะทาง',
      rating: 'คะแนน',
      jobType: 'ประเภทงาน',
      clearFilters: 'ล้างตัวกรอง',
      applyFilters: 'ใช้ตัวกรอง',
      minPay: 'ขั้นต่ำ',
      maxPay: 'สูงสุด',
      anyDistance: 'ระยะใดก็ได้',
      anyRating: 'คะแนนใดก็ได้'
    },
    details: {
      about: 'เกี่ยวกับงานนี้',
      requirements: 'คุณสมบัติ',
      responsibilities: 'หน้าที่ความรับผิดชอบ',
      back: 'กลับ',
      save: 'บันทึก',
      share: 'แชร์'
    },
    saved: {
      title: 'งานที่บันทึกไว้',
      empty: 'ยังไม่มีงานที่บันทึก',
      findBtn: 'ค้นหางาน'
    },
    training: {
      title: 'ศูนย์ฝึกอบรม',
      level: 'ระดับ 1',
      unlockTitle: 'ปลดล็อกรายได้เพิ่ม',
      unlockDesc: 'ผ่านหลักสูตร "การบริการแบบไทย" เพื่อรับงานโรงแรม 5 ดาว',
      startBtn: 'เริ่มเรียน',
      required: 'หลักสูตรบังคับ',
      completed: 'เสร็จสิ้น'
    },
    profile: {
      skills: 'ทักษะ',
      addSkill: 'เพิ่มทักษะ (เช่น ชงกาแฟ)',
      payout: 'ช่องทางรับเงิน',
      change: 'เปลี่ยน',
      language: 'ภาษา / Language',
      workHistory: 'ประวัติการทำงาน'
    },
    menu: {
      profile: 'โปรไฟล์',
      settings: 'ตั้งค่า',
      help: 'ช่วยเหลือ',
      logout: 'ออกจากระบบ'
    },
    toast: {
      saved: 'บันทึกงานแล้ว!',
      removed: 'ลบออกจากรายการบันทึก',
      applied: 'ส่งใบสมัครเรียบร้อยแล้ว!'
    }
  },
  en: {
    nav: { find: 'Jobs', myJobs: 'My Work', messages: 'Messages', earnings: 'Earnings' },
    home: {
      locationPlaceholder: 'Search location...',
      jobSearchPlaceholder: 'Search jobs, company...',
      next12Days: 'Next 12 Days',
      startTime: 'Start Time',
      findShifts: 'Find Shifts',
      nearbyShifts: 'Nearby Shifts',
      seeAll: 'See all',
      filters: { all: 'All Jobs', server: 'Server', kitchen: 'Kitchen', other: 'Other' },
      apply: 'Apply Now',
      applied: 'Applied',
      perHr: '/hr',
      noResults: 'No jobs found matching your search',
      advancedFilters: 'Advanced Filters',
      payRange: 'Pay Rate',
      distance: 'Distance',
      rating: 'Rating',
      jobType: 'Job Type',
      clearFilters: 'Clear All',
      applyFilters: 'Apply Filters',
      minPay: 'Min',
      maxPay: 'Max',
      anyDistance: 'Any distance',
      anyRating: 'Any rating'
    },
    details: {
      about: 'About this Job',
      requirements: 'Requirements',
      responsibilities: 'Responsibilities',
      back: 'Back',
      save: 'Save',
      share: 'Share'
    },
    saved: {
      title: 'My Favorites',
      empty: 'No saved jobs yet.',
      findBtn: 'Find jobs'
    },
    training: {
      title: 'Training Center',
      level: 'Level 1',
      unlockTitle: 'Unlock Higher Pay',
      unlockDesc: 'Complete "Thai Hospitality" to access 5-star hotel shifts.',
      startBtn: 'Start Learning',
      required: 'Required Courses',
      completed: 'Completed'
    },
    profile: {
      skills: 'Skills',
      addSkill: 'Add skill (e.g. Latte Art)',
      payout: 'Payout Method',
      change: 'Change',
      language: 'Language',
      workHistory: 'Work History'
    },
    toast: {
      saved: 'Saved to favorites!',
      removed: 'Removed from favorites',
      applied: 'Application sent!'
    }
  }
};

// --- Mock Data & Constants ---

const JOB_TYPES = [
  { id: 'all', icon: null },
  { id: 'server', icon: <Coffee size={16} /> },
  { id: 'kitchen', icon: <Utensils size={16} /> },
  { id: 'other', icon: <MoreHorizontal size={16} /> },
];

const MOCK_JOBS = [
  { 
    id: 1, 
    title: 'พนักงานเสิร์ฟ (งานพาร์ทไทม์ เย็น)', 
    titleEn: 'Part-Time Evening Server', 
    company: 'Roast Coffee - Thong Lo', 
    type: 'server', 
    distance: '0.8 km', 
    pay: '฿250', 
    rating: 4.8, 
    image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=80',
    description: 'Part-time evening shift (3-4 hours). Perfect for students or those looking for extra income. Flexible schedule, work 2-3 days per week.',
    descriptionTh: 'งานพาร์ทไทม์กะเย็น (3-4 ชั่วโมง) เหมาะสำหรับนักศึกษาหรือผู้ที่ต้องการรายได้เสริม ตารางงานยืดหยุ่น ทำงาน 2-3 วันต่อสัปดาห์',
    requirements: ['Part-time availability', 'English communication', 'Positive attitude'],
    requirementsTh: ['มีเวลาทำงานพาร์ทไทม์', 'สื่อสารภาษาอังกฤษได้', 'ทัศนคติเชิงบวก']
  },
  { 
    id: 2, 
    title: 'ผู้ช่วยกุ๊ก (กะเที่ยง-บ่าย)', 
    titleEn: 'Part-Time Line Cook (Lunch Shift)', 
    company: 'Somtum Der', 
    type: 'kitchen', 
    distance: '1.2 km', 
    pay: '฿280', 
    rating: 4.5, 
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80',
    description: 'Lunch shift only (11AM-3PM). Great for students with morning classes. Weekend shifts available with extra pay.',
    descriptionTh: 'กะเที่ยงเท่านั้น (11.00-15.00 น.) เหมาะสำหรับนักศึกษาที่เรียนเช้า มีกะวันหยุดสุดสัปดาห์พร้อมค่าแรงพิเศษ',
    requirements: ['Food safety basic knowledge', 'Can work weekends', 'Team player'],
    requirementsTh: ['ความรู้พื้นฐานความปลอดภัยอาหาร', 'ทำงานวันหยุดได้', 'ทำงานเป็นทีมได้']
  },
  { 
    id: 3, 
    title: 'พนักงานล้างจาน (วันเสาร์-อาทิตย์)', 
    titleEn: 'Weekend Dishwasher (Part-Time)', 
    company: 'Blue Elephant', 
    type: 'kitchen', 
    distance: '2.5 km', 
    pay: '฿180', 
    rating: 4.2, 
    image: 'https://images.unsplash.com/photo-1581349485608-9469926a8e5e?w=800&q=80',
    description: 'Weekend shifts only (Sat-Sun, 5PM-11PM). Perfect for extra weekend income. Free dinner included.',
    descriptionTh: 'กะวันหยุดสุดสัปดาห์เท่านั้น (เสาร์-อาทิตย์ 17.00-23.00 น.) เหมาะสำหรับหารายได้พิเศษช่วงวันหยุด ฟรีอาหารเย็น',
    requirements: ['Weekend availability', 'Physical stamina', 'Reliable'],
    requirementsTh: ['มีเวลาวันหยุดสุดสัปดาห์', 'ร่างกายแข็งแรง', 'ตรงต่อเวลา']
  },
  { 
    id: 4, 
    title: 'บาร์เทนเดอร์ (กะพิเศษ 4 ชม.)', 
    titleEn: 'Bartender (4-Hour Shift)', 
    company: 'Sky Bar at Lebua', 
    type: 'server', 
    distance: '3.5 km', 
    pay: '฿450', 
    rating: 4.9, 
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800&q=80',
    description: 'Premium evening shift (8PM-12AM). High tips expected. Perfect for experienced bartenders looking for extra income.',
    descriptionTh: 'กะเย็นพรีเมี่ยม (20.00-00.00 น.) ได้ทิปสูง เหมาะสำหรับบาร์เทนเดอร์มืออาชีพที่ต้องการรายได้เสริม',
    requirements: ['2+ years experience', 'English fluent', 'Professional appearance'],
    requirementsTh: ['ประสบการณ์ 2 ปีขึ้นไป', 'ภาษาอังกฤษคล่องแคล่ว', 'บุคลิกภาพดี']
  },
  { 
    id: 5, 
    title: 'พนักงานอีเวนต์', 
    titleEn: 'Event Staff', 
    company: 'Siam Paragon Hall', 
    type: 'other', 
    distance: '5.0 km', 
    pay: '฿220', 
    rating: 4.0, 
    image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&q=80',
    description: 'Staff needed for a 3-day exhibition. Checking tickets and guiding guests.',
    descriptionTh: 'ต้องการพนักงานสำหรับงานนิทรรศการ 3 วัน ตรวจตั๋วและแนะนำแขก',
    requirements: ['Good communication', 'Stand for long periods', 'Polite'],
    requirementsTh: ['สื่อสารดี', 'ยืนได้นาน', 'สุภาพ']
  },
];

const TRAINING_VIDEOS = [
  { id: 1, title: 'มาตรฐานความปลอดภัยอาหาร', titleEn: 'Thai Food Safety Standards', duration: '12:30', progress: 100, thumb: 'bg-emerald-100 text-emerald-600' },
  { id: 2, title: 'การบริการแบบไทย (ใจเย็น)', titleEn: 'Thai Hospitality (Jai Yen)', duration: '15:45', progress: 60, thumb: 'bg-blue-100 text-blue-600' },
  { id: 3, title: 'การใช้ระบบ POS', titleEn: 'POS System Mastery', duration: '08:20', progress: 0, thumb: 'bg-purple-100 text-purple-600' },
  { id: 4, title: 'การเสิร์ฟไวน์และค็อกเทล', titleEn: 'Wine & Cocktail Service', duration: '22:10', progress: 0, thumb: 'bg-rose-100 text-rose-600' },
];

// --- Components ---

const AdvancedFiltersModal = ({ isOpen, onClose, filters, onFilterChange, lang, t }) => {
  if (!isOpen) return null;

  const jobTypes = [
    { value: 'all', label: t.home.filters.all, icon: Briefcase },
    { value: 'server', label: t.home.filters.server, icon: Coffee },
    { value: 'kitchen', label: t.home.filters.kitchen, icon: Utensils },
    { value: 'other', label: t.home.filters.other, icon: MoreHorizontal }
  ];

  const distances = [
    { value: 'all', label: t.home.anyDistance },
    { value: '2', label: '< 2 km' },
    { value: '5', label: '< 5 km' },
    { value: '10', label: '< 10 km' }
  ];

  const ratings = [
    { value: 'all', label: t.home.anyRating },
    { value: '4.5', label: '4.5+ ⭐' },
    { value: '4.0', label: '4.0+ ⭐' },
    { value: '3.5', label: '3.5+ ⭐' }
  ];

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end animate-[fadeIn_0.2s_ease-out]" onClick={onClose}>
      <div 
        className="bg-white rounded-t-3xl w-full max-h-[85vh] overflow-y-auto animate-[slideUp_0.3s_ease-out]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between z-10">
          <h2 className="text-xl font-bold text-gray-900">{t.home.advancedFilters}</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X size={24} className="text-gray-600" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Job Type Filter */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-3">{t.home.jobType}</label>
            <div className="grid grid-cols-2 gap-3">
              {jobTypes.map(({ value, label, icon: Icon }) => (
                <button
                  key={value}
                  onClick={() => onFilterChange('jobType', value)}
                  className={`
                    flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-medium transition-all
                    ${filters.jobType === value 
                      ? 'bg-red-600 text-white shadow-lg' 
                      : 'bg-gray-50 text-gray-700 border border-gray-200 hover:border-red-300'
                    }
                  `}
                >
                  <Icon size={18} />
                  <span>{label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Pay Range Filter */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-3">{t.home.payRange}</label>
            <div className="flex gap-3">
              <div className="flex-1">
                <label className="text-xs text-gray-500 mb-1 block">{t.home.minPay}</label>
                <input
                  type="number"
                  value={filters.minPay}
                  onChange={(e) => onFilterChange('minPay', e.target.value)}
                  placeholder="0"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-red-600 focus:ring-2 focus:ring-red-100 outline-none transition-all"
                />
              </div>
              <div className="flex items-end pb-3 text-gray-400">-</div>
              <div className="flex-1">
                <label className="text-xs text-gray-500 mb-1 block">{t.home.maxPay}</label>
                <input
                  type="number"
                  value={filters.maxPay}
                  onChange={(e) => onFilterChange('maxPay', e.target.value)}
                  placeholder="1000"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-red-600 focus:ring-2 focus:ring-red-100 outline-none transition-all"
                />
              </div>
            </div>
          </div>

          {/* Distance Filter */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-3">{t.home.distance}</label>
            <div className="grid grid-cols-2 gap-3">
              {distances.map(({ value, label }) => (
                <button
                  key={value}
                  onClick={() => onFilterChange('distance', value)}
                  className={`
                    py-3 px-4 rounded-xl font-medium transition-all
                    ${filters.distance === value 
                      ? 'bg-red-600 text-white shadow-lg' 
                      : 'bg-gray-50 text-gray-700 border border-gray-200 hover:border-red-300'
                    }
                  `}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Rating Filter */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-3">{t.home.rating}</label>
            <div className="grid grid-cols-2 gap-3">
              {ratings.map(({ value, label }) => (
                <button
                  key={value}
                  onClick={() => onFilterChange('rating', value)}
                  className={`
                    py-3 px-4 rounded-xl font-medium transition-all
                    ${filters.rating === value 
                      ? 'bg-red-600 text-white shadow-lg' 
                      : 'bg-gray-50 text-gray-700 border border-gray-200 hover:border-red-300'
                    }
                  `}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="sticky bottom-0 bg-white border-t border-gray-100 px-6 py-4 flex gap-3">
          <button
            onClick={() => {
              onFilterChange('reset');
            }}
            className="flex-1 py-3 px-4 bg-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-200 transition-all"
          >
            {t.home.clearFilters}
          </button>
          <button
            onClick={onClose}
            className="flex-1 py-3 px-4 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 transition-all shadow-lg"
          >
            {t.home.applyFilters}
          </button>
        </div>
      </div>
    </div>
  );
};

const DatePickerStrip = ({ selectedDate, onSelect, lang, t }) => {
  const scrollRef = useRef(null);
  const dates = [];
  const today = new Date();
  
  for (let i = 0; i < 12; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    dates.push(d);
  }

  const thaiMonths = ["ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.", "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."];
  const currentMonth = lang === 'th' 
    ? `${thaiMonths[selectedDate.getMonth()]} ${selectedDate.getFullYear() + 543}`
    : selectedDate.toLocaleString('en-US', { month: 'long', year: 'numeric' });

  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center px-5 mb-4">
        <span className="text-lg font-bold text-gray-800 flex items-center tracking-tight">
          <CalendarDays size={20} className="mr-2 text-orange-500" />
          {currentMonth}
        </span>
        <span className="text-[11px] font-semibold text-orange-600 bg-orange-50 px-3 py-1.5 rounded-full tracking-wide">
          {t.home.next12Days}
        </span>
      </div>
      
      <div ref={scrollRef} className="overflow-x-auto pb-6 pl-5 scrollbar-hide flex gap-3 snap-x snap-mandatory">
        {dates.map((date, idx) => {
          const isSelected = selectedDate.getDate() === date.getDate();
          const dayName = date.toLocaleDateString(lang === 'th' ? 'th-TH' : 'en-US', { weekday: 'short' });
          const dayNum = date.getDate();
          
          return (
            <button
              key={idx}
              onClick={() => onSelect(date)}
              className={`
                snap-center flex flex-col items-center justify-center py-3 min-w-[68px] h-[90px] rounded-2xl transition-all duration-300 relative
                ${isSelected 
                  ? 'bg-gray-900 text-white shadow-xl shadow-gray-200 scale-105' 
                  : 'bg-white text-gray-400 border border-gray-100 hover:border-orange-200 hover:shadow-md'
                }
              `}
            >
              <span className={`text-xs font-medium mb-1 ${isSelected ? 'text-gray-300' : 'text-gray-400'}`}>{dayName}</span>
              <span className={`text-2xl font-bold ${isSelected ? 'text-white' : 'text-gray-800'}`}>{dayNum}</span>
              {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-2 absolute bottom-3" />}
            </button>
          );
        })}
        <div className="w-2 flex-shrink-0" /> 
      </div>
    </div>
  );
};

const JobCard = ({ job, isSaved, onToggleSave, onClick, lang, t }) => (
  <div 
    onClick={() => onClick(job)}
    className="group bg-white rounded-2xl p-3 shadow-sm hover:shadow-md mb-3 border border-gray-100 active:scale-[0.98] transition-all duration-200 cursor-pointer hover:border-gray-200"
  >
    <div className="flex gap-3">
      <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-gray-100 to-gray-50 overflow-hidden flex-shrink-0 relative">
        <img src={job.image} alt={job.company} className="w-full h-full object-cover" />
      </div>
      
      <div className="flex-1 flex flex-col justify-between min-w-0">
        <div>
          <div className="flex justify-between items-start mb-0.5">
            <h3 className="font-bold text-gray-900 text-base leading-tight line-clamp-1 pr-1">
              {lang === 'th' ? job.title : job.titleEn}
            </h3>
            <button 
              onClick={(e) => { e.stopPropagation(); onToggleSave(job.id); }}
              className="text-gray-300 hover:text-red-500 transition-colors flex-shrink-0"
            >
              <Heart 
                size={18} 
                className={`${isSaved ? 'fill-red-500 text-red-500' : ''} transition-all`}
              />
            </button>
          </div>
          
          <p className="text-gray-500 text-xs mb-1.5 line-clamp-1 font-medium">{job.company}</p>
          
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <span className="flex items-center">
              <Clock size={11} className="mr-1 text-gray-400" />
              ทำ 1 วัน
            </span>
            <span className="text-gray-300">•</span>
            <span className="flex items-center">
              <MapPin size={11} className="mr-1 text-red-600" />
              {job.distance}
            </span>
          </div>
        </div>
        
        <div className="flex items-center justify-between mt-1">
          <span className="text-xl font-bold text-gray-900">
            {job.pay}<span className="text-xs font-medium text-gray-400">/ชม.</span>
          </span>
          <button 
            onClick={(e) => { e.stopPropagation(); onClick(job); }}
            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-all active:scale-95 shadow-sm shadow-red-200"
          >
            {t.home.apply}
          </button>
        </div>
      </div>
    </div>
  </div>
);

// --- NEW: Job Detail View Component ---
const JobDetailView = ({ job, isSaved, onToggleSave, onApply, onBack, lang, t }) => {
  if (!job) return null;

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-white to-gray-50 z-50 overflow-y-auto flex flex-col animate-slide-up">
      {/* Header Image & Nav */}
      <div className="relative h-80 w-full shrink-0">
        <img src={job.image} className="w-full h-full object-cover" alt="Header" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/70"></div>
        
        {/* Nav Bar */}
        <div className="absolute top-0 left-0 w-full p-4 pt-8 flex justify-between items-center text-white">
          <button onClick={onBack} className="glass p-3 rounded-full hover:bg-white/30 transition-all active:scale-95">
            <ChevronLeft size={24} />
          </button>
          <div className="flex gap-3">
             <button className="glass p-3 rounded-full hover:bg-white/30 transition-all active:scale-95">
              <Share2 size={20} />
            </button>
             <button onClick={() => onToggleSave(job.id)} className="glass p-3 rounded-full hover:bg-white/30 transition-all active:scale-95">
              <Heart size={20} fill={isSaved ? "#f43f5e" : "none"} className={isSaved ? "text-accent-500" : "text-white"} />
            </button>
          </div>
        </div>

        {/* Title Block Over Image */}
        <div className="absolute bottom-0 left-0 w-full p-6 pb-8 text-white">
          <h1 className="font-display text-4xl font-extrabold mb-2 text-shadow-md">{lang === 'th' ? job.title : job.titleEn}</h1>
          <p className="text-xl font-semibold text-white/90 text-shadow-sm">{job.company}</p>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 px-6 py-8 -mt-8 bg-white rounded-t-4xl relative z-10 shadow-soft-lg">
        {/* Meta Tags */}
        <div className="flex flex-wrap gap-2.5 mb-8">
          <div className="flex items-center text-sm font-bold text-gray-700 bg-orange-50 border border-orange-200 px-4 py-2 rounded-2xl">
            <MapPin size={16} className="mr-2 text-primary-500" /> {job.distance}
          </div>
          <div className="flex items-center text-sm font-bold text-gray-700 bg-yellow-50 border border-yellow-200 px-4 py-2 rounded-2xl">
            <Star size={16} className="mr-2 text-yellow-500 fill-yellow-500" /> {job.rating}
          </div>
          <div className="flex items-center text-sm font-bold text-gray-700 bg-blue-50 border border-blue-200 px-4 py-2 rounded-2xl">
             <Clock size={16} className="mr-2 text-blue-500" /> {lang === 'th' ? 'งานชั่วคราว' : 'Part-time'}
          </div>
        </div>

        <div className="space-y-8 pb-32">
          {/* About */}
          <section className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-3xl border border-gray-100">
            <h3 className="font-display text-xl font-bold text-gray-900 mb-4 flex items-center">
              <div className="w-1 h-6 bg-gradient-to-b from-primary-500 to-accent-500 rounded-full mr-3"></div>
              {t.details.about}
            </h3>
            <p className="text-gray-600 leading-relaxed text-base">
              {lang === 'th' ? job.descriptionTh : job.description}
            </p>
          </section>

          {/* Requirements */}
          <section className="bg-gradient-to-br from-primary-50/30 to-white p-6 rounded-3xl border border-primary-100">
            <h3 className="font-display text-xl font-bold text-gray-900 mb-4 flex items-center">
              <div className="w-1 h-6 bg-gradient-to-b from-primary-500 to-accent-500 rounded-full mr-3"></div>
              {t.details.requirements}
            </h3>
            <ul className="space-y-3.5">
              {(lang === 'th' ? job.requirementsTh : job.requirements).map((req, i) => (
                <li key={i} className="flex items-start text-gray-700 font-medium">
                  <div className="bg-gradient-to-br from-success-500 to-success-600 p-1.5 rounded-full mr-3 mt-0.5 shadow-sm">
                    <CheckCircle size={14} className="text-white" />
                  </div>
                  {req}
                </li>
              ))}
            </ul>
          </section>

          {/* Map Placeholder */}
          <section>
            <h3 className="font-display text-xl font-bold text-gray-900 mb-4 flex items-center">
              <div className="w-1 h-6 bg-gradient-to-b from-primary-500 to-accent-500 rounded-full mr-3"></div>
              Location
            </h3>
            <div className="w-full h-48 bg-gradient-to-br from-gray-100 to-gray-50 rounded-3xl flex flex-col items-center justify-center text-gray-400 font-medium border border-gray-200 shadow-inner-soft">
              <MapPin size={40} className="mb-3 text-primary-400" />
              <span className="text-sm">Map View Coming Soon</span>
            </div>
          </section>
        </div>
      </div>

      {/* Sticky Bottom Bar - Enhanced */}
      <div className="fixed bottom-0 left-0 w-full glass border-t border-white/50 p-5 pb-8 shadow-[0_-8px_30px_rgba(0,0,0,0.08)] z-20 flex items-center justify-between backdrop-blur-xl">
        <div className="flex flex-col">
          <span className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">{lang === 'th' ? 'อัตราค่าจ้าง' : 'Pay Rate'}</span>
          <span className="text-3xl font-extrabold text-gray-900">
            {job.pay}<span className="text-base text-gray-400 font-semibold ml-1">{t.home.perHr}</span>
          </span>
        </div>
        <button 
          onClick={() => onApply(job)}
          className="bg-gradient-to-br from-red-600 to-red-700 text-white px-10 py-4 rounded-2xl text-base font-bold shadow-[0_8px_30px_rgba(220,38,38,0.25)] active:scale-95 transition-all hover:shadow-[0_12px_40px_rgba(220,38,38,0.35)] hover:from-red-700 hover:to-red-800"
        >
          {t.home.apply}
        </button>
      </div>
    </div>
  );
};

// 3. Main App Component
export default function App() {
  const [lang, setLang] = useState('th');
  const [activeTab, setActiveTab] = useState('home');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState('18:00');
  const [filter, setFilter] = useState('all');
  
  // Search States
  const [location, setLocation] = useState(lang === 'th' ? 'กรุงเทพมหานคร' : 'Bangkok, Thailand');
  const [searchQuery, setSearchQuery] = useState(''); // NEW: Job Search Query
  const [isSearchOpen, setIsSearchOpen] = useState(false); // NEW: Search bar visibility
  const [isFiltersOpen, setIsFiltersOpen] = useState(false); // NEW: Advanced filters visibility
  const [advancedFilters, setAdvancedFilters] = useState({
    jobType: 'all',
    minPay: '',
    maxPay: '',
    distance: 'all',
    rating: 'all'
  });

  const [savedJobs, setSavedJobs] = useState(new Set([1])); 
  const [notification, setNotification] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null); // NEW: Selected Job for Detail View
  const [isMenuOpen, setIsMenuOpen] = useState(false); // NEW: Side menu visibility
  
  // Profile State
  const [skills, setSkills] = useState(['Thai Cuisine', 'English (Basic)', 'Service Mind']);
  const [newSkill, setNewSkill] = useState('');

  const t = TRANSLATIONS[lang];

  useEffect(() => {
    setLocation(lang === 'th' ? 'กรุงเทพมหานคร' : 'Bangkok, Thailand');
  }, [lang]);

  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 2500);
  };

  const toggleSave = (id) => {
    const newSaved = new Set(savedJobs);
    if (newSaved.has(id)) {
      newSaved.delete(id);
      showNotification(t.toast.removed);
    } else {
      newSaved.add(id);
      showNotification(t.toast.saved);
    }
    setSavedJobs(newSaved);
  };

  const handleApply = (job) => {
    showNotification(`${t.toast.applied} ${job.company}`);
    setSelectedJob(null); // Close detail view after applying
  };

  // Advanced Filter Handler
  const handleFilterChange = (key, value) => {
    if (key === 'reset') {
      setAdvancedFilters({
        jobType: 'all',
        minPay: '',
        maxPay: '',
        distance: 'all',
        rating: 'all'
      });
      setFilter('all');
    } else if (key === 'jobType') {
      setFilter(value);
      setAdvancedFilters(prev => ({ ...prev, jobType: value }));
    } else {
      setAdvancedFilters(prev => ({ ...prev, [key]: value }));
    }
  };

  // Check if any advanced filters are active
  const hasActiveFilters = advancedFilters.minPay || advancedFilters.maxPay || 
                          advancedFilters.distance !== 'all' || 
                          advancedFilters.rating !== 'all';

  // Filter Logic
  const filteredJobs = MOCK_JOBS.filter(job => {
    // Basic type filter
    const matchesType = filter === 'all' || job.type === filter;
    
    // Search query filter
    const query = searchQuery.toLowerCase();
    const matchesSearch = 
      job.title.toLowerCase().includes(query) || 
      job.titleEn.toLowerCase().includes(query) || 
      job.company.toLowerCase().includes(query);
    
    // Pay range filter
    const jobPay = parseInt(job.pay.replace('฿', ''));
    const matchesMinPay = !advancedFilters.minPay || jobPay >= parseInt(advancedFilters.minPay);
    const matchesMaxPay = !advancedFilters.maxPay || jobPay <= parseInt(advancedFilters.maxPay);
    
    // Distance filter
    const jobDistance = parseFloat(job.distance.replace(' km', ''));
    const matchesDistance = advancedFilters.distance === 'all' || 
                           jobDistance <= parseFloat(advancedFilters.distance);
    
    // Rating filter
    const matchesRating = advancedFilters.rating === 'all' || 
                         job.rating >= parseFloat(advancedFilters.rating);
    
    return matchesType && matchesSearch && matchesMinPay && matchesMaxPay && 
           matchesDistance && matchesRating;
  });

  // --- Views ---

  // Side Menu Component
  const SideMenu = () => (
    <>
      {/* Overlay */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 animate-[fadeIn_0.2s_ease-out]"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
      
      {/* Menu Drawer */}
      <div className={`fixed top-0 left-0 h-full w-72 bg-white z-50 shadow-2xl transform transition-transform duration-300 ${
        isMenuOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="bg-gradient-to-br from-red-600 to-red-700 p-6 text-white">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Menu</h2>
              <button onClick={() => setIsMenuOpen(false)} className="p-1 hover:bg-white/20 rounded-lg">
                <X size={24} />
              </button>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center">
                <User size={28} />
              </div>
              <div>
                <p className="font-bold">นภัสสร พลอยแก้ว</p>
                <p className="text-xs text-white/80">naphat@example.com</p>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="flex-1 overflow-y-auto py-2">
            <button
              onClick={() => {
                setActiveTab('profile');
                setIsMenuOpen(false);
              }}
              className="w-full flex items-center gap-4 px-6 py-4 hover:bg-gray-50 transition-colors"
            >
              <User size={20} className="text-gray-600" />
              <span className="font-medium text-gray-900">{t.menu.profile}</span>
            </button>

            <button
              onClick={() => {
                // Add settings view later
                setIsMenuOpen(false);
              }}
              className="w-full flex items-center gap-4 px-6 py-4 hover:bg-gray-50 transition-colors"
            >
              <Settings size={20} className="text-gray-600" />
              <span className="font-medium text-gray-900">{t.menu.settings}</span>
            </button>

            <button
              onClick={() => setLang(lang === 'th' ? 'en' : 'th')}
              className="w-full flex items-center gap-4 px-6 py-4 hover:bg-gray-50 transition-colors"
            >
              <Globe size={20} className="text-gray-600" />
              <span className="font-medium text-gray-900">{t.profile.language}</span>
              <span className="ml-auto text-xs text-gray-500">{lang === 'th' ? 'ไทย' : 'English'}</span>
            </button>

            <button
              className="w-full flex items-center gap-4 px-6 py-4 hover:bg-gray-50 transition-colors"
            >
              <HelpCircle size={20} className="text-gray-600" />
              <span className="font-medium text-gray-900">{t.menu.help}</span>
            </button>

            <div className="border-t border-gray-100 my-2"></div>

            <button
              className="w-full flex items-center gap-4 px-6 py-4 hover:bg-red-50 transition-colors text-red-600"
            >
              <LogOut size={20} />
              <span className="font-medium">{t.menu.logout}</span>
            </button>
          </div>

          {/* Footer */}
          <div className="border-t border-gray-100 p-4 text-center text-xs text-gray-400">
            <p>TEMP Gigwork v1.0</p>
          </div>
        </div>
      </div>
    </>
  );

  const HomeView = () => (
    <div className="pb-32 animate-in fade-in duration-500">
      
      {/* Compact Header */}
      <div className="px-4 pt-3 pb-2 bg-white/95 backdrop-blur-md sticky top-0 z-10 border-b border-gray-100">
        {/* Single Row: Menu + Location + Icons */}
        <div className="flex items-center justify-between gap-2 mb-2">
          <button 
            onClick={() => setIsMenuOpen(true)}
            className="bg-gray-50 p-1.5 rounded-lg hover:bg-gray-100 transition-colors flex-shrink-0"
          >
            <Menu size={20} className="text-gray-700" />
          </button>
          
          <div className="flex items-center bg-gray-50 rounded-xl px-3 py-1.5 flex-1 min-w-0">
            <MapPin className="text-red-600 mr-1.5 flex-shrink-0" size={14} />
            <input 
              type="text" 
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="bg-transparent border-none outline-none text-gray-700 text-xs w-full font-medium placeholder-gray-400 truncate"
              placeholder={t.home.locationPlaceholder}
            />
          </div>
          
          <div className="flex items-center gap-1.5 flex-shrink-0">
            <button 
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="bg-gray-50 p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Search size={16} className="text-gray-600" />
            </button>
            <button 
              onClick={() => setIsFiltersOpen(true)}
              className={`relative p-1.5 rounded-lg transition-colors ${
                hasActiveFilters 
                  ? 'bg-red-600 text-white' 
                  : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
              }`}
            >
              <SlidersHorizontal size={16} />
              {hasActiveFilters && (
                <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
              )}
            </button>
          </div>
        </div>

        {/* Collapsible Search Bar */}
        {isSearchOpen && (
          <div className="flex items-center bg-gray-50 rounded-xl px-3 py-2 mb-2 animate-[slideDown_0.2s_ease-out]">
            <Search className="text-gray-400 mr-2" size={16} />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none outline-none text-gray-900 text-sm w-full placeholder-gray-400"
              placeholder={t.home.jobSearchPlaceholder}
              autoFocus
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="text-gray-400 hover:text-gray-600 mr-1">
                <X size={14} />
              </button>
            )}
            <button 
              onClick={() => setIsSearchOpen(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X size={16} />
            </button>
          </div>
        )}
      </div>

      {/* Compact Date Picker - Horizontal Scroll Only */}
      <div className="bg-white border-b border-gray-100 py-2">
        <div className="overflow-x-auto scrollbar-hide">
          <div className="flex gap-2 px-4">
            {(() => {
              const dates = [];
              const today = new Date();
              for (let i = 0; i < 12; i++) {
                const d = new Date(today);
                d.setDate(today.getDate() + i);
                dates.push(d);
              }
              return dates.map((date, idx) => {
                const isSelected = selectedDate.getDate() === date.getDate();
                const dayName = date.toLocaleDateString(lang === 'th' ? 'th-TH' : 'en-US', { weekday: 'short' });
                const dayNum = date.getDate();
                const monthName = date.toLocaleDateString(lang === 'th' ? 'th-TH' : 'en-US', { month: 'short' });
                
                return (
                  <button
                    key={idx}
                    onClick={() => setSelectedDate(date)}
                    className={`
                      flex-shrink-0 flex flex-col items-center justify-center px-3 py-2 min-w-[58px] rounded-xl transition-all
                      ${isSelected 
                        ? 'bg-red-600 text-white shadow-md shadow-red-200' 
                        : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                      }
                    `}
                  >
                    <span className={`text-[10px] font-medium ${isSelected ? 'text-gray-300' : 'text-gray-400'}`}>
                      {dayName}
                    </span>
                    <span className={`text-lg font-bold ${isSelected ? 'text-white' : 'text-gray-800'}`}>
                      {dayNum}
                    </span>
                    <span className={`text-[9px] font-medium ${isSelected ? 'text-gray-400' : 'text-gray-400'}`}>
                      {monthName}
                    </span>
                  </button>
                );
              });
            })()}
          </div>
        </div>
      </div>

      {/* Compact Job Type Filters */}
      <div className="bg-white border-b border-gray-100 px-4 py-2">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {JOB_TYPES.map((type) => (
            <button
              key={type.id}
              onClick={() => setFilter(type.id)}
              className={`flex items-center px-3 py-1.5 rounded-lg whitespace-nowrap text-xs font-semibold transition-all ${
                filter === type.id 
                  ? 'bg-red-600 text-white shadow-sm shadow-red-200' 
                  : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
              }`}
            >
              {type.icon && <span className="mr-1.5 opacity-90 text-sm">{type.icon}</span>}
              {t.home.filters[type.id]}
            </button>
          ))}
        </div>
      </div>

      {/* Job List */}
      <div className="px-4 pt-3">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-base font-bold text-gray-900">{t.home.nearbyShifts}</h2>
          <button className="text-red-600 text-xs font-semibold hover:underline">{t.home.seeAll}</button>
        </div>
        
        {filteredJobs.length > 0 ? (
          filteredJobs.map(job => (
            <JobCard 
              key={job.id} 
              job={job} 
              isSaved={savedJobs.has(job.id)} 
              onToggleSave={toggleSave}
              onClick={() => setSelectedJob(job)} 
              lang={lang}
              t={t}
            />
          ))
        ) : (
          <div className="text-center py-10 text-gray-400">
            <Search size={48} className="mx-auto mb-2 opacity-20" />
            <p>{t.home.noResults}</p>
          </div>
        )}
      </div>

      {/* Advanced Filters Modal */}
      <AdvancedFiltersModal 
        isOpen={isFiltersOpen}
        onClose={() => setIsFiltersOpen(false)}
        filters={advancedFilters}
        onFilterChange={handleFilterChange}
        lang={lang}
        t={t}
      />
    </div>
  );

  const SavedView = () => (
    <div className="p-5 pb-32 animate-in fade-in">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-8">{t.saved.title}</h1>
      {savedJobs.size === 0 ? (
        <div className="flex flex-col items-center justify-center mt-24 text-gray-400">
          <div className="bg-gray-50 p-8 rounded-full mb-6 animate-pulse">
            <Heart size={48} className="opacity-20 text-gray-900" />
          </div>
          <p className="font-medium text-lg text-gray-500">{t.saved.empty}</p>
          <button 
            onClick={() => setActiveTab('home')} 
            className="mt-6 bg-red-600 text-white px-6 py-2.5 rounded-xl font-bold shadow-lg shadow-red-200 active:scale-95 transition-transform"
          >
            {t.saved.findBtn}
          </button>
        </div>
      ) : (
        MOCK_JOBS.filter(job => savedJobs.has(job.id)).map(job => (
          <JobCard 
            key={job.id} 
            job={job} 
            isSaved={true} 
            onToggleSave={toggleSave}
            onClick={() => setSelectedJob(job)}
            lang={lang}
            t={t}
          />
        ))
      )}
    </div>
  );

  const TrainingView = () => (
    <div className="p-5 pb-32 animate-in slide-in-from-right duration-300">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900">{t.training.title}</h1>
        <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-3 py-1.5 rounded-full">{t.training.level}</span>
      </div>
      <div className="bg-gradient-to-br from-red-600 to-red-700 rounded-3xl p-6 text-white mb-10 relative overflow-hidden shadow-xl shadow-red-200">
        <div className="relative z-10">
          <h2 className="font-bold text-xl mb-2 text-red-50">{t.training.unlockTitle}</h2>
          <p className="text-red-50 text-sm mb-6 leading-relaxed opacity-90">{t.training.unlockDesc}</p>
          <button className="bg-white text-red-600 text-xs font-bold px-5 py-2.5 rounded-xl hover:bg-red-50 transition-colors shadow-sm">
            {t.training.startBtn}
          </button>
        </div>
        <div className="absolute -right-6 -top-6 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
      </div>
      <h3 className="font-bold text-gray-900 mb-5 text-lg">{t.training.required}</h3>
      <div className="grid grid-cols-1 gap-5">
        {TRAINING_VIDEOS.map(video => (
          <div key={video.id} className="bg-white p-4 rounded-3xl shadow-[0_2px_12px_-2px_rgba(0,0,0,0.05)] border border-gray-50 flex gap-5 items-center hover:border-orange-100 transition-colors">
            <div className={`w-20 h-20 rounded-2xl ${video.thumb} flex items-center justify-center relative overflow-hidden group shadow-inner`}>
              <PlayCircle size={28} className="opacity-80 group-hover:scale-110 transition-transform" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-gray-900 text-sm mb-2.5 line-clamp-2">{lang === 'th' ? video.title : video.titleEn}</h3>
              <div className="flex items-center gap-3">
                <div className="flex-1 bg-gray-100 h-2 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${video.progress === 100 ? 'bg-emerald-500' : 'bg-red-600'}`} style={{ width: `${video.progress}%` }} />
                </div>
                <span className="text-[10px] font-bold text-gray-400 min-w-[24px]">{video.progress}%</span>
              </div>
            </div>
            {video.progress === 100 && <CheckCircle size={22} className="text-emerald-500 flex-shrink-0" />}
          </div>
        ))}
      </div>
    </div>
  );

  const MessagesView = () => (
    <div className="pb-32 animate-in slide-in-from-right duration-300">
      <div className="px-5 pt-6 pb-4 bg-white sticky top-0 z-10 border-b border-gray-100">
        <h1 className="text-2xl font-extrabold text-gray-900">{lang === 'th' ? 'ข้อความ' : 'Messages'}</h1>
      </div>
      <div className="flex flex-col items-center justify-center mt-32 text-gray-400 px-5">
        <div className="bg-gray-50 p-8 rounded-full mb-6">
          <MessageCircle size={48} className="opacity-20" />
        </div>
        <p className="font-medium text-lg text-gray-500">{lang === 'th' ? 'ยังไม่มีข้อความ' : 'No messages yet'}</p>
        <p className="text-sm text-gray-400 mt-2 text-center">
          {lang === 'th' ? 'ข้อความจากนายจ้างจะปรากฏที่นี่' : 'Messages from employers will appear here'}
        </p>
      </div>
    </div>
  );

  const EarningsView = () => (
    <div className="pb-32 animate-in slide-in-from-right duration-300">
      <div className="px-5 pt-6 pb-4 bg-white sticky top-0 z-10 border-b border-gray-100">
        <h1 className="text-2xl font-extrabold text-gray-900">{lang === 'th' ? 'รายได้' : 'Earnings'}</h1>
      </div>
      <div className="px-5 pt-6">
        {/* Total Earnings Card */}
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-6 text-white mb-6 relative overflow-hidden shadow-xl">
          <div className="relative z-10">
            <p className="text-gray-400 text-sm mb-2">{lang === 'th' ? 'รายได้สะสม' : 'Total Earnings'}</p>
            <h2 className="text-4xl font-extrabold mb-1">฿12,450</h2>
            <p className="text-green-400 text-sm font-semibold">+฿2,340 {lang === 'th' ? 'เดือนนี้' : 'this month'}</p>
          </div>
          <div className="absolute -right-6 -top-6 w-32 h-32 bg-orange-500/20 rounded-full blur-xl"></div>
          <Wallet size={80} className="absolute -right-4 -bottom-4 opacity-10" />
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
            <p className="text-gray-500 text-xs mb-1">{lang === 'th' ? 'งานที่ทำ' : 'Jobs Completed'}</p>
            <p className="text-2xl font-bold text-gray-900">24</p>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
            <p className="text-gray-500 text-xs mb-1">{lang === 'th' ? 'ชั่วโมง' : 'Hours Worked'}</p>
            <p className="text-2xl font-bold text-gray-900">158</p>
          </div>
        </div>

        {/* Recent Transactions */}
        <h3 className="font-bold text-gray-900 mb-4 text-sm">{lang === 'th' ? 'รายการล่าสุด' : 'Recent Transactions'}</h3>
        <div className="space-y-3">
          {[
            { company: 'After You Cafe', amount: '฿450', date: '19 พ.ย. 2568', hours: '5 ชม.' },
            { company: 'Siam Paragon Hall', amount: '฿660', date: '17 พ.ย. 2568', hours: '3 ชม.' },
            { company: 'The Commons', amount: '฿320', date: '15 พ.ย. 2568', hours: '4 ชม.' }
          ].map((transaction, idx) => (
            <div key={idx} className="bg-white p-4 rounded-2xl border border-gray-100 flex justify-between items-center">
              <div>
                <p className="font-bold text-gray-900 text-sm">{transaction.company}</p>
                <p className="text-xs text-gray-500 mt-0.5">{transaction.date} • {transaction.hours}</p>
              </div>
              <p className="font-bold text-green-600 text-lg">{transaction.amount}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const ProfileView = () => (
    <div className="pb-32 bg-gray-50 min-h-screen animate-in slide-in-from-right duration-300">
      <div className="bg-white pb-12 pt-8 rounded-b-[3rem] shadow-sm text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-orange-50 to-white/0"></div>
        <div className="relative z-10 px-6">
          <div className="w-32 h-32 bg-gray-100 rounded-full mx-auto mb-5 flex items-center justify-center text-gray-400 text-4xl font-bold border-4 border-white shadow-xl overflow-hidden">
            <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&q=80" alt="Profile" className="w-full h-full object-cover" />
          </div>
          <h2 className="text-2xl font-extrabold text-gray-900">{lang === 'th' ? 'สมชาย ใจดี' : 'Somchai Jaidee'}</h2>
          <p className="text-gray-500 text-sm flex items-center justify-center mt-2 font-medium">
            <MapPin size={14} className="mr-1.5 text-red-600" /> {location}
          </p>
        </div>
      </div>

      <div className="px-5 space-y-5 -mt-8 relative z-10">
        <div className="bg-white p-5 rounded-3xl shadow-md shadow-gray-100/50 border border-gray-100 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-50 p-2.5 rounded-xl text-indigo-600"><Globe size={20} /></div>
            <span className="font-bold text-gray-700">{t.profile.language}</span>
          </div>
          <div className="flex bg-gray-100 p-1 rounded-xl relative">
            <button onClick={() => setLang('th')} className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all z-10 ${lang === 'th' ? 'bg-red-600 text-white shadow-sm' : 'text-gray-500'}`}>ไทย</button>
            <button onClick={() => setLang('en')} className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all z-10 ${lang === 'en' ? 'bg-red-600 text-white shadow-sm' : 'text-gray-500'}`}>ENG</button>
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl shadow-md shadow-gray-100/50 border border-gray-100">
          <h3 className="font-bold text-gray-900 flex items-center text-lg mb-4"><Star size={20} className="mr-2.5 text-yellow-400 fill-yellow-400" /> {t.profile.skills}</h3>
          <div className="flex flex-wrap gap-2 mb-6">
            {skills.map((skill, i) => (
              <span key={i} className="bg-gray-50 border border-gray-100 text-gray-700 px-3.5 py-1.5 rounded-xl text-sm font-semibold">{skill}</span>
            ))}
          </div>
          <div className="flex gap-2">
            <input type="text" value={newSkill} onChange={(e) => setNewSkill(e.target.value)} placeholder={t.profile.addSkill} className="flex-1 bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm outline-none focus:border-red-600 focus:bg-white transition-all" />
            <button onClick={() => { if(newSkill) { setSkills([...skills, newSkill]); setNewSkill(''); }}} className="bg-red-600 text-white px-4 rounded-xl hover:bg-red-700 transition-colors shadow-lg shadow-red-200"><Plus size={24} /></button>
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl shadow-md shadow-gray-100/50 border border-gray-100">
          <h3 className="font-bold text-gray-900 flex items-center mb-4 text-lg"><CreditCard size={20} className="mr-2.5 text-emerald-500" /> {t.profile.payout}</h3>
          <div className="flex items-center justify-between bg-emerald-50/50 p-4 rounded-2xl border border-emerald-100/50">
            <div className="flex items-center gap-4">
              <div className="bg-[#138f2d] text-white px-3 py-2 rounded-lg text-[10px] font-bold shadow-sm tracking-wider border border-[#138f2d]">KBANK</div>
              <div><p className="text-sm font-bold text-gray-800">•••• 8899</p><p className="text-xs text-gray-500 font-medium">Somchai J.</p></div>
            </div>
            <button className="text-emerald-700 text-xs font-bold bg-white px-4 py-2 rounded-xl border border-emerald-100 shadow-sm hover:bg-emerald-50">{t.profile.change}</button>
          </div>
        </div>
      </div>
    </div>
  );

  // Render either the main app or the job details
  return (
    <div className="bg-gray-50 h-screen w-full flex flex-col relative font-sans text-gray-900 overflow-hidden selection:bg-red-100">
      
      {selectedJob ? (
        <JobDetailView 
          job={selectedJob} 
          isSaved={savedJobs.has(selectedJob.id)}
          onToggleSave={toggleSave}
          onApply={handleApply}
          onBack={() => setSelectedJob(null)}
          lang={lang}
          t={t}
        />
      ) : (
        <>
          {/* Side Menu */}
          <SideMenu />
          
          <div className="flex-1 overflow-y-auto scrollbar-hide bg-white">
            {activeTab === 'home' && <HomeView />}
            {activeTab === 'myJobs' && <SavedView />}
            {activeTab === 'messages' && <MessagesView />}
            {activeTab === 'earnings' && <EarningsView />}
            {activeTab === 'profile' && <ProfileView />}
          </div>

          {/* Bottom Navigation - Matching Reference Design */}
          <div className="absolute bottom-0 left-0 right-0 z-20 bg-red-600 border-t border-red-700 shadow-2xl">
            <div className="flex justify-around items-center px-4 py-2 safe-area-bottom">
              <button 
                onClick={() => setActiveTab('home')} 
                className={`flex flex-col items-center gap-1 transition-all duration-200 py-2 px-4 ${activeTab === 'home' ? 'text-white' : 'text-red-100'}`}
              >
                <Users size={22} strokeWidth={activeTab === 'home' ? 2.5 : 2} />
                <span className="text-[10px] font-medium">{t.nav.find}</span>
              </button>
              
              <button 
                onClick={() => setActiveTab('myJobs')} 
                className={`flex flex-col items-center gap-1 transition-all duration-200 py-2 px-4 ${activeTab === 'myJobs' ? 'text-white' : 'text-red-100'}`}
              >
                <ClipboardList size={22} strokeWidth={activeTab === 'myJobs' ? 2.5 : 2} />
                <span className="text-[10px] font-medium">{t.nav.myJobs}</span>
              </button>
              
              <button 
                onClick={() => setActiveTab('messages')} 
                className={`flex flex-col items-center gap-1 transition-all duration-200 py-2 px-4 relative ${activeTab === 'messages' ? 'text-white' : 'text-red-100'}`}
              >
                <Bell size={22} strokeWidth={activeTab === 'messages' ? 2.5 : 2} />
                <span className="text-[10px] font-medium">{t.nav.messages}</span>
                <span className="absolute top-1 right-3 w-2 h-2 bg-yellow-400 rounded-full border border-red-600"></span>
              </button>
              
              <button 
                onClick={() => setActiveTab('earnings')} 
                className={`flex flex-col items-center gap-1 transition-all duration-200 py-2 px-4 ${activeTab === 'earnings' ? 'text-white' : 'text-red-100'}`}
              >
                <Wallet size={22} strokeWidth={activeTab === 'earnings' ? 2.5 : 2} />
                <span className="text-[10px] font-medium">{t.nav.earnings}</span>
              </button>
            </div>
          </div>
        </>
      )}

      {/* Toast */}
      {notification && (
        <div className="absolute top-6 left-6 right-6 bg-red-600/95 text-white px-5 py-4 rounded-2xl shadow-2xl shadow-red-300 flex items-center animate-in slide-in-from-top duration-300 z-50 backdrop-blur-sm">
          <div className="bg-green-500/20 p-2 rounded-full mr-3.5"><CheckCircle className="text-green-400" size={20} /></div>
          <div><p className="text-sm font-bold">{notification}</p></div>
        </div>
      )}
    </div>
  );
}