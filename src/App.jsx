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
  Info
} from 'lucide-react';

// --- Translations ---

const TRANSLATIONS = {
  th: {
    nav: { find: 'หางาน', saved: 'ที่บันทึก', training: 'ฝึกอบรม', profile: 'โปรไฟล์' },
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
      noResults: 'ไม่พบงานที่คุณค้นหา'
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
    toast: {
      saved: 'บันทึกงานแล้ว!',
      removed: 'ลบออกจากรายการบันทึก',
      applied: 'ส่งใบสมัครเรียบร้อยแล้ว!'
    }
  },
  en: {
    nav: { find: 'Find', saved: 'Saved', training: 'Training', profile: 'Profile' },
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
      noResults: 'No jobs found matching your search'
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
    title: 'พนักงานเสิร์ฟ (Evening)', 
    titleEn: 'Evening Server', 
    company: 'Roast Coffee - Thong Lo', 
    type: 'server', 
    distance: '0.8 km', 
    pay: '฿250', 
    rating: 4.8, 
    image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=80',
    description: 'Looking for an energetic server for our busy evening shifts. Must have experience with specialty coffee and be able to handle a fast-paced environment.',
    descriptionTh: 'มองหาพนักงานเสิร์ฟที่มีพลังสำหรับกะเย็นที่ยุ่งของเรา ต้องมีประสบการณ์เกี่ยวกับกาแฟพิเศษและสามารถจัดการกับสภาพแวดล้อมที่เร่งรีบได้',
    requirements: ['1+ year experience', 'English communication', 'Positive attitude'],
    requirementsTh: ['ประสบการณ์ 1 ปีขึ้นไป', 'สื่อสารภาษาอังกฤษได้', 'ทัศนคติเชิงบวก']
  },
  { 
    id: 2, 
    title: 'ผู้ช่วยกุ๊ก (Line Cook)', 
    titleEn: 'Line Cook', 
    company: 'Somtum Der', 
    type: 'kitchen', 
    distance: '1.2 km', 
    pay: '฿280', 
    rating: 4.5, 
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80',
    description: 'Join our award-winning kitchen team. You will be responsible for the grill station and maintaining high food safety standards.',
    descriptionTh: 'ร่วมทีมครัวระดับรางวัลของเรา คุณจะรับผิดชอบสถานีย่างและรักษามาตรฐานความปลอดภัยทางอาหารระดับสูง',
    requirements: ['Food safety certificate', 'Knife skills', 'Team player'],
    requirementsTh: ['ใบรับรองความปลอดภัยอาหาร', 'ทักษะการใช้มีด', 'ทำงานเป็นทีมได้']
  },
  { 
    id: 3, 
    title: 'พนักงานล้างจาน', 
    titleEn: 'Dishwasher', 
    company: 'Blue Elephant', 
    type: 'kitchen', 
    distance: '2.5 km', 
    pay: '฿180', 
    rating: 4.2, 
    image: 'https://images.unsplash.com/photo-1581349485608-9469926a8e5e?w=800&q=80',
    description: 'We need a reliable dishwasher for the weekend dinner rush. Meal included.',
    descriptionTh: 'ต้องการพนักงานล้างจานที่ไว้ใจได้สำหรับช่วงมื้อค่ำวันหยุดสุดสัปดาห์ มีอาหารเลี้ยง',
    requirements: ['Physical stamina', 'Reliable', 'Can work late'],
    requirementsTh: ['ร่างกายแข็งแรง', 'ตรงต่อเวลา', 'สามารถทำงานดึกได้']
  },
  { 
    id: 4, 
    title: 'บาร์เทนเดอร์', 
    titleEn: 'Bartender', 
    company: 'Sky Bar at Lebua', 
    type: 'server', 
    distance: '3.5 km', 
    pay: '฿450', 
    rating: 4.9, 
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800&q=80',
    description: 'High-end rooftop bar seeking experienced mixologist. Must know classic cocktails and have impeccable grooming.',
    descriptionTh: 'รูฟท็อปบาร์ระดับหรูต้องการมิกโซโลจิสต์ที่มีประสบการณ์ ต้องรู้จักค็อกเทลคลาสสิกและมีการแต่งกายที่ดูดี',
    requirements: ['3+ years experience', 'English fluent', 'Grooming standards'],
    requirementsTh: ['ประสบการณ์ 3 ปีขึ้นไป', 'ภาษาอังกฤษคล่องแคล่ว', 'บุคลิกภาพดี']
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
    className="bg-white rounded-3xl p-4 shadow-[0_2px_15px_-4px_rgba(0,0,0,0.05)] mb-5 border border-gray-50 active:scale-[0.98] transition-all duration-200 cursor-pointer"
  >
    <div className="flex gap-4">
      <div className="w-24 h-24 rounded-2xl bg-gray-100 overflow-hidden flex-shrink-0 relative shadow-inner">
        <img src={job.image} alt={job.company} className="w-full h-full object-cover" />
      </div>
      
      <div className="flex-1 flex flex-col justify-between py-0.5">
        <div>
          <div className="flex justify-between items-start">
            <h3 className="font-bold text-gray-900 text-lg leading-snug line-clamp-1">
              {lang === 'th' ? job.title : job.titleEn}
            </h3>
            <button onClick={(e) => { e.stopPropagation(); onToggleSave(job.id); }} className="p-1 -mr-2 -mt-2 text-gray-300 hover:text-red-500 transition-colors">
              <Heart size={22} fill={isSaved ? "#ef4444" : "none"} className={isSaved ? "text-red-500" : ""} />
            </button>
          </div>
          
          <p className="text-gray-500 text-sm font-medium">{job.company}</p>
          
          <div className="flex items-center mt-2 gap-3">
            <div className="flex items-center text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded-lg">
              <MapPin size={12} className="mr-1 text-orange-500" /> {job.distance}
            </div>
            <div className="flex items-center text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded-lg">
              <Star size={12} className="mr-1 text-yellow-500 fill-yellow-500" /> {job.rating}
            </div>
          </div>
        </div>

        <div className="flex justify-between items-end mt-3">
          <div className="flex items-baseline text-indigo-600">
            <span className="font-extrabold text-xl">{job.pay}</span>
            <span className="text-xs font-medium ml-1 text-gray-400">{t.home.perHr}</span>
          </div>
          <span className="text-orange-600 text-xs font-bold flex items-center">
            {t.home.seeAll} <ChevronRight size={14} />
          </span>
        </div>
      </div>
    </div>
  </div>
);

// --- NEW: Job Detail View Component ---
const JobDetailView = ({ job, isSaved, onToggleSave, onApply, onBack, lang, t }) => {
  if (!job) return null;

  return (
    <div className="fixed inset-0 bg-white z-50 overflow-y-auto flex flex-col animate-in slide-in-from-bottom duration-300">
      {/* Header Image & Nav */}
      <div className="relative h-72 w-full shrink-0">
        <img src={job.image} className="w-full h-full object-cover" alt="Header" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60"></div>
        
        {/* Nav Bar */}
        <div className="absolute top-0 left-0 w-full p-4 pt-6 flex justify-between items-center text-white">
          <button onClick={onBack} className="bg-white/20 backdrop-blur-md p-2 rounded-full hover:bg-white/30 transition">
            <ChevronLeft size={24} />
          </button>
          <div className="flex gap-3">
             <button className="bg-white/20 backdrop-blur-md p-2 rounded-full hover:bg-white/30 transition">
              <Share2 size={20} />
            </button>
             <button onClick={() => onToggleSave(job.id)} className="bg-white/20 backdrop-blur-md p-2 rounded-full hover:bg-white/30 transition">
              <Heart size={20} fill={isSaved ? "#ef4444" : "none"} className={isSaved ? "text-red-500" : "text-white"} />
            </button>
          </div>
        </div>

        {/* Title Block Over Image */}
        <div className="absolute bottom-0 left-0 w-full p-6 text-white">
          <h1 className="text-3xl font-bold mb-1 text-shadow-sm">{lang === 'th' ? job.title : job.titleEn}</h1>
          <p className="text-lg font-medium opacity-90">{job.company}</p>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 px-6 py-8 -mt-6 bg-white rounded-t-[2rem] relative z-10">
        {/* Meta Tags */}
        <div className="flex flex-wrap gap-3 mb-8">
          <div className="flex items-center text-sm font-semibold text-gray-700 bg-gray-100 px-3 py-1.5 rounded-xl">
            <MapPin size={16} className="mr-2 text-orange-500" /> {job.distance}
          </div>
          <div className="flex items-center text-sm font-semibold text-gray-700 bg-gray-100 px-3 py-1.5 rounded-xl">
            <Star size={16} className="mr-2 text-yellow-500 fill-yellow-500" /> {job.rating}
          </div>
          <div className="flex items-center text-sm font-semibold text-gray-700 bg-gray-100 px-3 py-1.5 rounded-xl">
             <Clock size={16} className="mr-2 text-blue-500" /> Full-time
          </div>
        </div>

        <div className="space-y-8">
          {/* About */}
          <section>
            <h3 className="text-lg font-bold text-gray-900 mb-3">{t.details.about}</h3>
            <p className="text-gray-600 leading-relaxed">
              {lang === 'th' ? job.descriptionTh : job.description}
            </p>
          </section>

          {/* Requirements */}
          <section>
            <h3 className="text-lg font-bold text-gray-900 mb-3">{t.details.requirements}</h3>
            <ul className="space-y-3">
              {(lang === 'th' ? job.requirementsTh : job.requirements).map((req, i) => (
                <li key={i} className="flex items-start text-gray-600">
                  <div className="bg-orange-100 p-1 rounded-full mr-3 mt-0.5">
                    <CheckCircle size={14} className="text-orange-600" />
                  </div>
                  {req}
                </li>
              ))}
            </ul>
          </section>

          {/* Map Placeholder */}
          <section>
            <h3 className="text-lg font-bold text-gray-900 mb-3">Location</h3>
            <div className="w-full h-40 bg-gray-200 rounded-2xl flex items-center justify-center text-gray-400 font-medium">
              <MapPin size={32} className="mb-2" />
              Map View
            </div>
          </section>
           <div className="h-24"></div> {/* Spacer for bottom bar */}
        </div>
      </div>

      {/* Sticky Bottom Bar */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-100 p-5 pb-8 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] z-20 flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-xs text-gray-400 font-bold uppercase">Pay Rate</span>
          <span className="text-2xl font-extrabold text-indigo-600">{job.pay}<span className="text-sm text-gray-400 font-medium">/hr</span></span>
        </div>
        <button 
          onClick={() => onApply(job)}
          className="bg-gray-900 text-white px-8 py-3.5 rounded-xl text-lg font-bold shadow-xl shadow-gray-200 active:scale-95 transition-transform"
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

  const [savedJobs, setSavedJobs] = useState(new Set([1])); 
  const [notification, setNotification] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null); // NEW: Selected Job for Detail View
  
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

  // Filter Logic
  const filteredJobs = MOCK_JOBS.filter(job => {
    const matchesType = filter === 'all' || job.type === filter;
    const query = searchQuery.toLowerCase();
    const matchesSearch = 
      job.title.toLowerCase().includes(query) || 
      job.titleEn.toLowerCase().includes(query) || 
      job.company.toLowerCase().includes(query);
    
    return matchesType && matchesSearch;
  });

  // --- Views ---

  const HomeView = () => (
    <div className="pb-32 animate-in fade-in duration-500">
      
      {/* Header Area */}
      <div className="px-5 pt-6 pb-4 bg-white/80 backdrop-blur-md sticky top-0 z-10 border-b border-gray-50">
        {/* 1. Location Bar */}
        <div className="flex items-center justify-between mb-3">
           <div className="flex items-center bg-gray-100/80 rounded-2xl px-4 py-2 flex-1 mr-3 shadow-inner">
            <MapPin className="text-orange-500 mr-2" size={16} />
            <input 
              type="text" 
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="bg-transparent border-none outline-none text-gray-700 text-xs w-full font-semibold placeholder-gray-400"
              placeholder={t.home.locationPlaceholder}
            />
          </div>
          <div className="bg-white p-2 rounded-full relative shadow-sm border border-gray-100">
            <Bell size={18} className="text-gray-600" />
            <span className="absolute top-2 right-2.5 w-1.5 h-1.5 bg-red-500 rounded-full border border-white"></span>
          </div>
        </div>

        {/* 2. Job Search Bar (NEW) */}
        <div className="flex items-center bg-white border-2 border-gray-100 rounded-2xl px-4 py-2.5 mb-4 shadow-sm focus-within:border-gray-900 focus-within:shadow-md transition-all">
          <Search className="text-gray-400 mr-3" size={20} />
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent border-none outline-none text-gray-900 text-sm w-full font-medium placeholder-gray-400"
            placeholder={t.home.jobSearchPlaceholder}
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} className="text-gray-400 hover:text-gray-600">
              <X size={16} />
            </button>
          )}
        </div>
        
        {/* 3. Time Picker Row */}
        <div className="flex justify-between items-center">
          <div>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-0.5">{t.home.startTime}</p>
            <h1 className="text-xl font-extrabold text-gray-900 tracking-tight">{t.home.findShifts}</h1>
          </div>
          
          <div className="flex items-center bg-orange-50 text-orange-700 px-4 py-2 rounded-2xl font-bold border border-orange-100/50">
            <Clock size={16} className="mr-2" />
            <input 
              type="time" 
              value={selectedTime} 
              onChange={(e) => setSelectedTime(e.target.value)}
              className="bg-transparent border-none outline-none w-auto text-center font-bold text-lg p-0 m-0"
            />
          </div>
        </div>
      </div>

      {/* Date Picker */}
      <div className="mt-4 mb-6">
        <DatePickerStrip selectedDate={selectedDate} onSelect={setSelectedDate} lang={lang} t={t} />
      </div>

      {/* Filters */}
      <div className="px-5 mb-8">
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {JOB_TYPES.map((type) => (
            <button
              key={type.id}
              onClick={() => setFilter(type.id)}
              className={`flex items-center px-5 py-2.5 rounded-full whitespace-nowrap text-sm font-semibold transition-all duration-300 border ${
                filter === type.id 
                  ? 'bg-gray-900 text-white border-gray-900 shadow-lg shadow-gray-200' 
                  : 'bg-white border-gray-100 text-gray-500 hover:border-gray-200'
              }`}
            >
              {type.icon && <span className="mr-2 opacity-90">{type.icon}</span>}
              {t.home.filters[type.id]}
            </button>
          ))}
        </div>
      </div>

      {/* Job List */}
      <div className="px-5">
        <div className="flex justify-between items-end mb-5">
          <h2 className="text-lg font-bold text-gray-900">{t.home.nearbyShifts}</h2>
          <button className="text-orange-600 text-xs font-bold hover:underline">{t.home.seeAll}</button>
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
            className="mt-6 bg-orange-500 text-white px-6 py-2.5 rounded-xl font-bold shadow-lg shadow-orange-200 active:scale-95 transition-transform"
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
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-6 text-white mb-10 relative overflow-hidden shadow-xl shadow-gray-200">
        <div className="relative z-10">
          <h2 className="font-bold text-xl mb-2 text-orange-400">{t.training.unlockTitle}</h2>
          <p className="text-gray-300 text-sm mb-6 leading-relaxed opacity-90">{t.training.unlockDesc}</p>
          <button className="bg-white text-gray-900 text-xs font-bold px-5 py-2.5 rounded-xl hover:bg-gray-50 transition-colors">
            {t.training.startBtn}
          </button>
        </div>
        <div className="absolute -right-6 -top-6 w-32 h-32 bg-orange-500/20 rounded-full blur-xl"></div>
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
                  <div className={`h-full rounded-full ${video.progress === 100 ? 'bg-emerald-500' : 'bg-orange-500'}`} style={{ width: `${video.progress}%` }} />
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
            <MapPin size={14} className="mr-1.5 text-orange-500" /> {location}
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
            <button onClick={() => setLang('th')} className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all z-10 ${lang === 'th' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'}`}>ไทย</button>
            <button onClick={() => setLang('en')} className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all z-10 ${lang === 'en' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'}`}>ENG</button>
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
            <input type="text" value={newSkill} onChange={(e) => setNewSkill(e.target.value)} placeholder={t.profile.addSkill} className="flex-1 bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm outline-none focus:border-orange-400 focus:bg-white transition-all" />
            <button onClick={() => { if(newSkill) { setSkills([...skills, newSkill]); setNewSkill(''); }}} className="bg-gray-900 text-white px-4 rounded-xl hover:bg-gray-800 transition-colors shadow-lg shadow-gray-200"><Plus size={24} /></button>
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
    <div className="bg-gray-50 h-screen w-full flex flex-col relative font-sans text-gray-900 overflow-hidden selection:bg-orange-100">
      
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
          <div className="flex-1 overflow-y-auto scrollbar-hide bg-white">
            {activeTab === 'home' && <HomeView />}
            {activeTab === 'saved' && <SavedView />}
            {activeTab === 'training' && <TrainingView />}
            {activeTab === 'profile' && <ProfileView />}
          </div>

          {/* Floating Navigation */}
          <div className="absolute bottom-6 left-4 right-4 z-20">
            <div className="bg-white/90 backdrop-blur-xl border border-white/20 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.12)] flex justify-between items-center px-6 py-3.5">
              <button onClick={() => setActiveTab('home')} className={`flex flex-col items-center gap-1 transition-all duration-300 p-2 rounded-2xl ${activeTab === 'home' ? 'text-gray-900 bg-gray-100' : 'text-gray-400 hover:text-gray-600'}`}><Search size={24} strokeWidth={activeTab === 'home' ? 2.5 : 2} /></button>
              <button onClick={() => setActiveTab('saved')} className={`flex flex-col items-center gap-1 transition-all duration-300 p-2 rounded-2xl ${activeTab === 'saved' ? 'text-gray-900 bg-gray-100' : 'text-gray-400 hover:text-gray-600'}`}><Heart size={24} strokeWidth={activeTab === 'saved' ? 2.5 : 2} fill={activeTab === 'saved' ? "currentColor" : "none"} /></button>
              <button onClick={() => setActiveTab('training')} className={`flex flex-col items-center gap-1 transition-all duration-300 p-2 rounded-2xl ${activeTab === 'training' ? 'text-gray-900 bg-gray-100' : 'text-gray-400 hover:text-gray-600'}`}><PlayCircle size={24} strokeWidth={activeTab === 'training' ? 2.5 : 2} /></button>
              <button onClick={() => setActiveTab('profile')} className={`flex flex-col items-center gap-1 transition-all duration-300 p-2 rounded-2xl ${activeTab === 'profile' ? 'text-gray-900 bg-gray-100' : 'text-gray-400 hover:text-gray-600'}`}><User size={24} strokeWidth={activeTab === 'profile' ? 2.5 : 2} /></button>
            </div>
          </div>
        </>
      )}

      {/* Toast */}
      {notification && (
        <div className="absolute top-6 left-6 right-6 bg-gray-900/95 text-white px-5 py-4 rounded-2xl shadow-2xl flex items-center animate-in slide-in-from-top duration-300 z-50 backdrop-blur-sm">
          <div className="bg-green-500/20 p-2 rounded-full mr-3.5"><CheckCircle className="text-green-400" size={20} /></div>
          <div><p className="text-sm font-bold">{notification}</p></div>
        </div>
      )}
    </div>
  );
}