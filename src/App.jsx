import { useEffect, useState } from "react";
import {
  Bell,
  BookOpen,
  CircleAlert,
  Check,
  ChevronDown,
  Clock3,
  Copy,
  Download,
  Edit3,
  FileVideo,
  Folder,
  Grid2X2,
  Info,
  LayoutTemplate,
  Lock,
  MoreHorizontal,
  PackageOpen,
  Play,
  Plus,
  RefreshCw,
  Save,
  Settings,
  Sparkles,
  Star,
  Trash2,
  UploadCloud,
  UserRound,
  WandSparkles,
  X,
  Zap,
} from "lucide-react";

const AS = "./assets/";

const steps = ["商品信息", "平台与语言", "内容与脚本", "预览与生成"];

const platforms = [
  {
    key: "douyin",
    name: "抖音",
    lang: "中文",
    icon: "logo-douyin.png",
    ratio: "9:16 竖屏",
    audience: "18-30岁年轻用户\n潮流 / 娱乐 / 好物分享",
    tone: "短平快内容、热门音乐、视觉冲击、强节奏剪辑",
    selected: true,
  },
  {
    key: "redbook",
    name: "小红书",
    lang: "中文",
    icon: "logo-redbook.png",
    ratio: "9:16 竖屏",
    audience: "18-35岁女性用户\n生活方式 / 好物推荐",
    tone: "真实体验分享、图文结合、干货攻略、氛围感表达",
    selected: true,
  },
  {
    key: "tiktok",
    name: "TikTok",
    lang: "English",
    icon: "logo-tiktok.png",
    ratio: "9:16 竖屏",
    audience: "Global users\nTrends / Entertainment / Product discovery",
    tone: "Trendy content, Music, Hook-driven, Engaging edits",
    selected: true,
  },
  {
    key: "instagram",
    name: "Instagram Reels",
    lang: "English",
    icon: "logo-instagram.png",
    ratio: "9:16 竖屏",
    audience: "18-34岁全球用户\n时尚 / 生活方式 / 创意灵感",
    tone: "视觉美感、潮流音乐、创意剪辑、故事化表达",
  },
  {
    key: "youtube",
    name: "YouTube Shorts",
    lang: "English",
    icon: "logo-youtube.png",
    ratio: "9:16 竖屏",
    audience: "全球用户\n娱乐 / 教程 / 产品评测",
    tone: "实用信息、强标题、内容价值导向",
  },
];

const sellingPoints = [
  ["防水耐磨材质，日常出行更安心", true],
  ["大容量分区，可容纳15英寸电脑", true],
  ["轻量背负，适合通勤与短途旅行", true],
];

const scriptShots = [
  {
    no: "01",
    time: "0-3s",
    img: "product-main.png",
    title: "开头钩子",
    desc: "产品正面，简约通勤场景",
    line: "Your commute deserves a lighter upgrade.",
    cn: "你的通勤，值得一次更轻的升级。",
  },
  {
    no: "02",
    time: "3-7s",
    img: "product-detail.png",
    title: "商品细节",
    desc: "防泼水面料特写，水滴滑落",
    line: "Water-resistant fabric keeps essentials protected.",
    cn: "防泼水面料，守护你的随身物品。",
  },
  {
    no: "03",
    time: "7-11s",
    img: "thumb-3.png",
    title: "容量展示",
    desc: "主仓打开，15英寸电脑与日常物品收纳",
    line: "Organized space for a 15-inch laptop and daily gear.",
    cn: "科学分区，轻松容纳15英寸电脑与日常装备。",
    warn: true,
  },
  {
    no: "04",
    time: "11-15s",
    img: "thumb-4.png",
    title: "行动引导",
    desc: "产品 + 价格标签 + 折扣标识",
    line: "Travel light. Shop now and save 10%.",
    cn: "轻装出行，立即购买，限时9折。",
  },
];

const templates = [
  ["fast", "快节奏卖点", "template-fast.png", "98%", "适合突出防水与大容量", ["卖点展示", "产品功能", "促销活动"]],
  ["commute", "通勤生活方式", "template-commute.png", "92%", "强化真实使用场景", ["生活方式", "通勤场景", "品牌故事"]],
  ["minimal", "极简产品特写", "template-minimal.png", "90%", "突出材质与设计细节", ["产品展示", "品质感", "品牌升级"]],
];

const thumbs = ["thumb-1.png", "thumb-2.png", "thumb-3.png", "thumb-4.png"];
const subtitleOptions = [
  ["thumb-1.png", "default", "标准白字"],
  ["thumb-2.png", "boxed", "黑底字幕"],
  ["thumb-3.png", "brand", "品牌粉字"],
  ["thumb-4.png", "outline", "描边大字"],
];

function IconButton({ children, className = "", ...props }) {
  return (
    <button className={`icon-button ${className}`} type="button" {...props}>
      {children}
    </button>
  );
}

function Button({ children, variant = "secondary", icon: Icon, className = "", ...props }) {
  return (
    <button className={`button ${variant} ${className}`.trim()} type="button" {...props}>
      {Icon ? <Icon size={17} /> : null}
      <span>{children}</span>
    </button>
  );
}

function Card({ children, className = "" }) {
  return <section className={`card ${className}`}>{children}</section>;
}

function Sidebar({ activeSection = "创建视频", onNavigate }) {
  const projectItems = ["全部项目", "生成中", "已完成", "收藏 / 已下载", "回收站"];
  const [accountOpen, setAccountOpen] = useState(false);
  const [accountModal, setAccountModal] = useState(null);
  const go = (target) => onNavigate?.(target);
  const openAccountPanel = (panel) => {
    setAccountOpen(false);
    setAccountModal(panel);
  };
  return (
    <>
      <aside className="sidebar">
        <div className="brand-mark">
          <span className="brand-logo" aria-hidden="true"><i /><b /></span>
          <span className="brand-copy">
            <strong>AI短视频工作台</strong>
            <em>让商品视频更高效</em>
          </span>
        </div>
        <nav className="side-nav">
          <button className={activeSection === "首页" ? "active" : ""} onClick={() => go("首页")} type="button"><BookOpen size={18} /><span>首页</span></button>
          <button className={activeSection === "创建视频" ? "active" : ""} onClick={() => go("创建视频")} type="button"><FileVideo size={18} /><span>创建视频</span></button>

        <SidebarGroup icon={Folder} title="项目与资产" items={projectItems} activeSection={activeSection} onSelect={go} />

          <button className={activeSection === "模板中心" ? "active" : ""} onClick={() => go("模板中心")} type="button"><LayoutTemplate size={18} /><span>模板中心</span></button>

          <button className={activeSection === "通知中心" ? "active" : ""} onClick={() => go("通知中心")} type="button"><Bell size={18} /><span>通知中心</span></button>
        </nav>
        {accountOpen ? (
          <div className="account-popover">
            <button type="button" onClick={() => openAccountPanel("profile")}><UserRound size={16} /><span>账户资料</span><em>企业版</em></button>
            <button type="button" onClick={() => openAccountPanel("quota")}><Zap size={16} /><span>账户与额度</span><em>68 / 100</em></button>
            <button type="button" onClick={() => openAccountPanel("model")}><Settings size={16} /><span>模型设置</span><em>高清 · 15秒</em></button>
            <button type="button" onClick={() => openAccountPanel("notice")}><Bell size={16} /><span>通知偏好</span><em>站内通知</em></button>
            <button type="button" onClick={() => openAccountPanel("privacy")}><Lock size={16} /><span>数据与隐私</span><em>素材授权</em></button>
          </div>
        ) : null}
        <div className="quota-card">
          <div>本月生成额度 <Info size={14} /></div>
          <strong>68 <span>/ 100 条</span></strong>
          <i><b /></i>
          <small>重置时间：2025-06-30</small>
        </div>
        <button className={`side-user ${accountOpen ? "open" : ""}`} onClick={() => setAccountOpen((value) => !value)} type="button">
          <span>U</span>
          <div><strong>User_6789</strong><em>企业版</em></div>
          <ChevronDown size={17} />
        </button>
      </aside>
      {accountModal ? <AccountSettingsModal type={accountModal} onClose={() => setAccountModal(null)} /> : null}
    </>
  );
}

function AccountSettingsModal({ type, onClose }) {
  const config = {
    profile: {
      icon: UserRound,
      title: "账户资料",
      desc: "管理账号基础信息与默认工作区身份。",
      body: (
        <div className="modal-form-grid">
          <label><span>用户名</span><input value="User_6789" readOnly /></label>
          <label><span>套餐版本</span><input value="企业版" readOnly /></label>
          <label><span>联系邮箱</span><input value="user6789@company.com" readOnly /></label>
          <label><span>默认语言</span><select value="中文" onChange={() => {}}><option>中文</option><option>English</option></select></label>
        </div>
      ),
    },
    quota: {
      icon: Zap,
      title: "账户与额度",
      desc: "查看本月额度、存储状态和消耗提醒。",
      body: (
        <div className="quota-modal-body">
          <div><span>本月可用额度</span><strong>68 / 100 条</strong><i><b /></i></div>
          <div className="modal-stat-grid"><span>已冻结额度<b>36</b></span><span>失败退回<b>6</b></span><span>已下载视频<b>18</b></span></div>
          <label className="modal-switch"><span>低于 20 条时提醒我</span><input type="checkbox" defaultChecked /></label>
        </div>
      ),
    },
    model: {
      icon: Settings,
      title: "模型设置",
      desc: "设置新建任务时默认的视频生成参数。",
      body: (
        <div className="modal-form-grid">
          <label><span>默认清晰度</span><select value="高清" onChange={() => {}}><option>标清</option><option>高清</option><option>超清</option></select></label>
          <label><span>默认时长</span><select value="15秒" onChange={() => {}}><option>10秒</option><option>15秒</option><option>30秒</option></select></label>
          <label><span>默认比例</span><select value="9:16 竖屏" onChange={() => {}}><option>9:16 竖屏</option><option>1:1 方形</option><option>16:9 横屏</option></select></label>
          <label><span>每平台生成数量</span><select value="2 条" onChange={() => {}}><option>1 条</option><option>2 条</option><option>4 条</option></select></label>
          <label className="wide"><span>生成前确认脚本</span><input value="开启：降低商品事实错误" readOnly /></label>
        </div>
      ),
    },
    notice: {
      icon: Bell,
      title: "通知偏好",
      desc: "配置站内通知触发场景。",
      body: (
        <div className="modal-toggle-list">
          {["生成全部完成", "部分完成提醒", "失败与可重试", "额度退回", "资产到期提醒"].map((item, index) => (
            <label key={item}><span>{item}</span><input type="checkbox" defaultChecked={index !== 1} /></label>
          ))}
        </div>
      ),
    },
    privacy: {
      icon: Lock,
      title: "数据与隐私",
      desc: "管理素材授权、训练使用和数据导出。",
      body: (
        <div className="modal-toggle-list">
          <label><span>素材不用于模型训练</span><input type="checkbox" defaultChecked /></label>
          <label><span>生成记录导出</span><button type="button">导出 CSV</button></label>
          <label><span>清理本地草稿缓存</span><button type="button">立即清理</button></label>
          <p>默认不应未经授权将用户商品素材用于模型训练；删除账号入口后续接入正式账户系统。</p>
        </div>
      ),
    },
  }[type];
  const Icon = config.icon;
  return (
    <div className="account-modal-layer" role="dialog" aria-modal="true">
      <div className="account-modal-card">
        <header>
          <div><Icon size={20} /></div>
          <section>
            <h2>{config.title}</h2>
            <p>{config.desc}</p>
          </section>
          <button aria-label="关闭" onClick={onClose} type="button"><X size={18} /></button>
        </header>
        <div className="account-modal-content">{config.body}</div>
        <footer>
          <button onClick={onClose} type="button">取消</button>
          <button onClick={onClose} type="button">保存设置</button>
        </footer>
      </div>
    </div>
  );
}

function SidebarGroup({ icon: Icon, title, items, activeSection, onSelect }) {
  const hasActive = items.includes(activeSection);
  return (
    <div className="nav-group open static">
      <button className={`group-title ${hasActive ? "active-parent" : ""}`} type="button">
        <Icon size={18} />
        <span>{title}</span>
      </button>
      <div className="sub-list">
        {items.map((label) => (
          <button className={`sub-item ${activeSection === label ? "active" : ""}`} key={label} onClick={() => onSelect?.(label)} type="button"><span>{label}</span></button>
        ))}
      </div>
    </div>
  );
}

function Stepper({ step, setStep }) {
  return (
    <div className="stepper">
      {steps.map((label, index) => {
        const state = index < step ? "done" : index === step ? "current" : "";
        return (
          <button className={`step-node ${state}`} key={label} onClick={() => setStep(index)} type="button">
            <span>{index < step ? <Check size={18} /> : index + 1}</span>
            <b>{label}</b>
          </button>
        );
      })}
    </div>
  );
}

function navToStep(target) {
  if (target === "首页") return "home";
  if (target === "创建视频") return 0;
  if (target === "生成中") return 4;
  if (target === "全部项目") return "projects";
  if (target === "已完成") return 5;
  if (target === "收藏 / 已下载") return "assets";
  if (target === "回收站") return "trash";
  if (target === "模板中心") return "templates:推荐模板";
  if (target === "通知中心") return "notifications";
  if (["推荐模板", "商品展示", "新品发布", "限时促销", "种草推荐"].includes(target)) return `templates:${target}`;
  return null;
}

function AllProjectsPage({ setStep }) {
  const go = (target) => {
    const next = navToStep(target);
    if (next !== null) setStep(next);
  };
  const projects = [
    {
      title: "轻量防水通勤双肩包",
      image: "cover-backpack-rain.png",
      status: "已完成",
      scene: "商品展示",
      videos: "6 条视频",
      platforms: ["抖音", "小红书", "TikTok"],
      time: "2025-05-27 14:32",
      quota: "36 额度",
    },
    {
      title: "夏季防晒冰袖",
      image: "cover-sleeves-wide.png",
      status: "生成中",
      scene: "种草推荐",
      videos: "4 / 6",
      platforms: ["抖音", "小红书"],
      time: "预计约 2 分钟",
      quota: "24 额度",
    },
    {
      title: "无线降噪耳机",
      image: "cover-headphones-wide.png",
      status: "草稿",
      scene: "新品发布",
      videos: "待确认脚本",
      platforms: ["TikTok", "YouTube"],
      time: "今天 10:24",
      quota: "未消耗",
    },
    {
      title: "便携咖啡保温杯",
      image: "cover-thermos-wide.png",
      status: "已完成",
      scene: "限时促销",
      videos: "4 条视频",
      platforms: ["抖音", "Instagram"],
      time: "昨天 18:20",
      quota: "18 额度",
    },
    {
      title: "城市通勤双肩包 B 款",
      image: "cover-backpack-city.png",
      status: "已下载",
      scene: "生活方式",
      videos: "2 条视频",
      platforms: ["小红书"],
      time: "2025-05-25",
      quota: "12 额度",
    },
    {
      title: "户外轻量收纳包",
      image: "cover-storage-pouch-wide.png",
      status: "回收站",
      scene: "商品展示",
      videos: "草稿",
      platforms: ["抖音"],
      time: "保留 23 天",
      quota: "0 额度",
    },
    {
      title: "通勤双肩包 城市限定款",
      image: "product-main.png",
      status: "已完成",
      scene: "生活方式",
      videos: "4 条视频",
      platforms: ["抖音", "Instagram"],
      time: "2025-05-24 09:15",
      quota: "20 额度",
    },
    {
      title: "双肩包礼盒装",
      image: "product-package.png",
      status: "草稿",
      scene: "新品发布",
      videos: "待确认脚本",
      platforms: ["抖音", "小红书", "TikTok"],
      time: "2025-05-23 16:40",
      quota: "未消耗",
    },
    {
      title: "轻量双肩包（青柠绿）",
      image: "product-usage.png",
      status: "已下载",
      scene: "商品展示",
      videos: "2 条视频",
      platforms: ["小红书"],
      time: "2025-05-22 11:08",
      quota: "8 额度",
    },
  ];
  return (
    <div className="app-shell">
      <Sidebar activeSection="全部项目" onNavigate={go} />
      <main className="workspace">
        <div className="surface-shell projects-shell">
          <header className="projects-header">
            <div>
              <p>项目与资产 / 全部项目</p>
              <h1>全部项目</h1>
              <span>集中管理商品视频任务、草稿、已完成资产与可复用项目。</span>
            </div>
            <div>
              <Button icon={UploadCloud}>导入素材</Button>
              <Button variant="primary" icon={FileVideo} onClick={() => setStep(0)}>新建项目</Button>
            </div>
          </header>

          <section className="project-stats-grid">
            {[
              ["全部项目", "27", Folder],
              ["生成中", "1", Play],
              ["已完成", "21", Check],
              ["收藏 / 已下载", "10", Star],
            ].map(([label, value, Icon]) => (
              <Card className="project-stat" key={label}><Icon /><span>{label}</span><strong>{value}</strong></Card>
            ))}
          </section>

          <Card className="project-toolbar">
            <div className="project-tabs">
              {["全部", "生成中", "已完成", "草稿", "已下载", "回收站"].map((tab, index) => (
                <button className={index === 0 ? "active" : ""} key={tab} type="button">{tab}</button>
              ))}
            </div>
            <div className="project-filters">
              <input value="搜索项目名称 / 商品 / 场景" readOnly />
              <select value="最近更新" onChange={() => {}}><option>最近更新</option></select>
              <select value="全部场景" onChange={() => {}}><option>全部场景</option></select>
              <select value="全部平台" onChange={() => {}}><option>全部平台</option></select>
            </div>
          </Card>

          <div className="project-list-head">
            <h2>项目列表</h2>
            <div><button type="button">批量选择</button><button type="button">网格视图</button></div>
          </div>

          <section className="projects-grid">
            {projects.map((project) => (
              <Card className="project-card-item" key={project.title}>
                <div className="project-thumb">
                  <img src={`${AS}${project.image}`} alt="" />
                  <em className={project.status === "生成中" ? "running" : project.status === "已完成" || project.status === "已下载" ? "done" : project.status === "回收站" ? "deleted" : ""}>{project.status}</em>
                </div>
                <div className="project-card-body">
                  <h3>{project.title}</h3>
                  <p>{project.scene} · {project.time}</p>
                  <div className="project-platforms">
                    {project.platforms.map((platform) => <span key={platform}>{platform}</span>)}
                  </div>
                  <dl>
                    <div><dt>视频</dt><dd>{project.videos}</dd></div>
                    <div><dt>消耗</dt><dd>{project.quota}</dd></div>
                  </dl>
                  <div className="project-card-actions">
                    <button onClick={() => setStep(project.status === "生成中" ? 4 : 5)} type="button">打开</button>
                    <button type="button">制作同款</button>
                    <button type="button"><MoreHorizontal size={17} /></button>
                  </div>
                </div>
              </Card>
            ))}
          </section>
        </div>
      </main>
    </div>
  );
}

function SavedDownloadsPage({ setStep }) {
  const go = (target) => {
    const next = navToStep(target);
    if (next !== null) setStep(next);
  };
  const assets = [
    {
      title: "轻量防水通勤双肩包 A 版",
      image: "cover-backpack-rain.png",
      type: "已下载",
      scene: "商品展示",
      meta: "抖音 · 中文 · 00:15",
      date: "2025-05-27 15:42",
      downloads: "2 次下载",
      saved: true,
    },
    {
      title: "城市通勤双肩包 B 款",
      image: "cover-backpack-city.png",
      type: "已收藏",
      scene: "生活方式",
      meta: "小红书 · 中文 · 00:15",
      date: "2025-05-25 18:20",
      downloads: "待下载",
      saved: true,
    },
    {
      title: "便携咖啡保温杯",
      image: "cover-thermos-wide.png",
      type: "已下载",
      scene: "限时促销",
      meta: "Instagram · English · 00:15",
      date: "昨天 18:20",
      downloads: "1 次下载",
      saved: false,
    },
    {
      title: "无线降噪耳机脚本草案",
      image: "cover-headphones-wide.png",
      type: "已收藏",
      scene: "新品发布",
      meta: "TikTok · English · 脚本",
      date: "今天 10:24",
      downloads: "未生成",
      saved: true,
    },
    {
      title: "夏季防晒冰袖 场景版",
      image: "cover-sleeves-wide.png",
      type: "已下载",
      scene: "种草推荐",
      meta: "小红书 · 中文 · 00:15",
      date: "2025-05-21 09:30",
      downloads: "2 次下载",
      saved: false,
    },
    {
      title: "通勤双肩包 城市限定款",
      image: "product-main.png",
      type: "已收藏",
      scene: "生活方式",
      meta: "Instagram · English · 00:15",
      date: "2025-05-24 09:15",
      downloads: "待下载",
      saved: true,
    },
  ];
  return (
    <div className="app-shell">
      <Sidebar activeSection="收藏 / 已下载" onNavigate={go} />
      <main className="workspace">
        <div className="surface-shell projects-shell assets-shell">
          <header className="projects-header">
            <div>
              <p>项目与资产 / 收藏 / 已下载</p>
              <h1>收藏 / 已下载</h1>
              <span>集中查看已收藏的视频版本、已下载资产和可复用的生成结果。</span>
            </div>
            <div>
              <Button icon={Download}>批量下载</Button>
              <Button variant="primary" icon={FileVideo} onClick={() => setStep(0)}>制作同款</Button>
            </div>
          </header>

          <section className="project-stats-grid asset-stats-grid">
            {[
              ["已收藏", "7", Star],
              ["已下载", "5", Download],
              ["可复用模板", "4", Copy],
              ["本月节省时间", "42 分钟", Clock3],
            ].map(([label, value, Icon]) => (
              <Card className="project-stat" key={label}><Icon /><span>{label}</span><strong>{value}</strong></Card>
            ))}
          </section>

          <Card className="project-toolbar">
            <div className="project-tabs">
              {["全部资产", "已收藏", "已下载", "可复用", "近 7 天"].map((tab, index) => (
                <button className={index === 0 ? "active" : ""} key={tab} type="button">{tab}</button>
              ))}
            </div>
            <div className="project-filters">
              <input value="搜索视频标题 / 商品 / 平台" readOnly />
              <select value="最近收藏" onChange={() => {}}><option>最近收藏</option></select>
              <select value="全部类型" onChange={() => {}}><option>全部类型</option></select>
              <select value="全部平台" onChange={() => {}}><option>全部平台</option></select>
            </div>
          </Card>

          <div className="asset-layout">
            <section className="asset-list">
              {assets.map((asset) => (
                <Card className="asset-row" key={asset.title}>
                  <div className="asset-cover">
                    <img src={`${AS}${asset.image}`} alt="" />
                    <span>{asset.type}</span>
                  </div>
                  <div className="asset-info">
                    <h3>{asset.title}</h3>
                    <p>{asset.scene} · {asset.meta}</p>
                    <div>
                      <em>{asset.date}</em>
                      <em>{asset.downloads}</em>
                    </div>
                  </div>
                  <div className="asset-actions">
                    <button className={asset.saved ? "active" : ""} type="button"><Star size={17} />收藏</button>
                    <button type="button"><Download size={17} />下载</button>
                    <button type="button" onClick={() => setStep(0)}><Copy size={17} />同款</button>
                  </div>
                </Card>
              ))}
            </section>
            <Card className="asset-side-panel">
              <h2>资产整理建议</h2>
              <p>建议将同商品不同平台版本归档到同一项目，方便后续复用脚本、字幕样式与生成设置。</p>
              <div>
                <span>可清理重复下载</span>
                <strong>2 个</strong>
              </div>
              <div>
                <span>可制作同款资产</span>
                <strong>4 个</strong>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}

function TrashPage({ setStep }) {
  const go = (target) => {
    const next = navToStep(target);
    if (next !== null) setStep(next);
  };
  const deleted = [
    {
      title: "户外轻量收纳包",
      image: "cover-storage-pouch-wide.png",
      scene: "商品展示",
      removed: "今天 09:18",
      remain: "保留 23 天",
      files: "草稿项目 · 0 额度",
    },
    {
      title: "夏季防晒冰袖旧版",
      image: "cover-sleeves-wide.png",
      scene: "种草推荐",
      removed: "昨天 16:40",
      remain: "保留 22 天",
      files: "2 条视频 · 12 额度",
    },
    {
      title: "耳机促销测试版",
      image: "cover-headphones-wide.png",
      scene: "限时促销",
      removed: "2025-05-24",
      remain: "保留 18 天",
      files: "脚本草稿 · 未下载",
    },
  ];
  return (
    <div className="app-shell">
      <Sidebar activeSection="回收站" onNavigate={go} />
      <main className="workspace">
        <div className="surface-shell projects-shell trash-shell">
          <header className="projects-header">
            <div>
              <p>项目与资产 / 回收站</p>
              <h1>回收站</h1>
              <span>已删除的项目会临时保留 30 天，过期后将自动清理。</span>
            </div>
            <div>
              <Button icon={RefreshCw}>批量恢复</Button>
              <Button icon={Trash2}>清空回收站</Button>
            </div>
          </header>

          <Card className="trash-warning">
            <Info size={18} />
            <span>回收站中的项目不会占用可见资产列表，但视频文件到期后无法恢复。建议先确认是否已下载。</span>
          </Card>

          <Card className="project-toolbar">
            <div className="project-tabs">
              {["全部删除项", "项目", "草稿", "视频资产"].map((tab, index) => (
                <button className={index === 0 ? "active" : ""} key={tab} type="button">{tab}</button>
              ))}
            </div>
            <div className="project-filters trash-filters">
              <input value="搜索已删除项目" readOnly />
              <select value="剩余保留时间" onChange={() => {}}><option>剩余保留时间</option></select>
              <select value="最近删除" onChange={() => {}}><option>最近删除</option></select>
            </div>
          </Card>

          <section className="trash-list">
            {deleted.map((item) => (
              <Card className="trash-row" key={item.title}>
                <label><input type="checkbox" /></label>
                <img src={`${AS}${item.image}`} alt="" />
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.scene} · {item.files}</p>
                  <span>删除时间：{item.removed}</span>
                </div>
                <strong>{item.remain}</strong>
                <div>
                  <button type="button"><RefreshCw size={16} />恢复</button>
                  <button className="danger" type="button"><Trash2 size={16} />彻底删除</button>
                </div>
              </Card>
            ))}
          </section>
        </div>
      </main>
    </div>
  );
}

function TemplateCenterPage({ setStep, activeCategory = "推荐模板" }) {
  const [previewTemplate, setPreviewTemplate] = useState(null);
  const [trialState, setTrialState] = useState("idle");
  const openPreview = (item) => {
    setPreviewTemplate(item);
    setTrialState("idle");
  };
  const closePreview = () => {
    setPreviewTemplate(null);
    setTrialState("idle");
  };
  const startTrial = () => {
    setTrialState("generating");
    window.setTimeout(() => setTrialState("ready"), 900);
  };
  const go = (target) => {
    const next = navToStep(target);
    if (next !== null) setStep(next);
  };
  const primaryTabs = ["图片模型", "视频特效", "发现灵感", "工作流"];
  const categories = ["全部", "每周新选", "推荐模板", "商品展示", "新品发布", "限时促销", "种草推荐", "电商营销", "品牌种草", "直播切片"];
  const templates = [
    { title: "快节奏卖点开箱", type: "模板", model: "Video Commerce", category: "商品展示", image: "tpl-fast-unboxing.png", author: "官方推荐官", uses: "1.6k", saves: "320", badge: "推荐指数 98%", tone: "3 秒钩子 / 快切字幕 / 强 CTA" },
    { title: "新品首发质感片", type: "工作流", model: "Launch Flow", category: "新品发布", image: "tpl-launch-headphones.png", author: "新品增长组", uses: "936", saves: "188", badge: "上新首选", tone: "产品亮相 / 场景痛点 / 卖点递进" },
    { title: "限时促销爆点版", type: "视频特效", model: "Promo FX", category: "限时促销", image: "tpl-promo-thermos.png", author: "转化实验室", uses: "2.3k", saves: "512", badge: "高转化", tone: "价格锚点 / 倒计时 / 下单引导" },
    { title: "真实体验种草模板", type: "模板", model: "Lifestyle UGC", category: "种草推荐", image: "tpl-lifestyle-backpack.png", author: "内容策略官", uses: "1.2k", saves: "276", badge: "适合小红书", tone: "日常口吻 / 使用前后 / 收藏理由" },
    { title: "多平台字幕安全区", type: "工作流", model: "Safe Caption", category: "电商营销", image: "tpl-caption-safe.png", author: "平台适配组", uses: "884", saves: "141", badge: "工作流", tone: "9:16 安全区 / 中英字幕 / 自动避让" },
    { title: "商品详情页转视频", type: "图片模型", model: "Detail-to-Video", category: "商品展示", image: "tpl-detail-to-video.png", author: "电商模板库", uses: "736", saves: "205", badge: "AI 排版", tone: "详情图拆解 / 参数卡片 / 材质特写" },
    { title: "轻奢品牌氛围片", type: "模板", model: "Brand Mood", category: "品牌种草", image: "tpl-brand-mood.png", author: "品牌视觉组", uses: "682", saves: "170", badge: "品质感", tone: "低饱和画面 / 慢节奏 / 极简字幕" },
    { title: "直播切片二创包装", type: "视频特效", model: "Live Clip FX", category: "直播切片", image: "tpl-live-clip.png", author: "直播增长组", uses: "1.1k", saves: "233", badge: "批量复用", tone: "口播截取 / 爆点标题 / 贴片包装" },
    { title: "户外出行氛围短片", type: "模板", model: "Outdoor Mood", category: "种草推荐", image: "thumb-2.png", author: "内容策略官", uses: "468", saves: "76", badge: "场景氛围", tone: "山野场景 / 慢镜头 / 自然字幕" },
    { title: "节日礼盒开箱", type: "模板", model: "Gift Unboxing", category: "新品发布", image: "product-package.png", author: "电商模板库", uses: "389", saves: "64", badge: "礼盒场景", tone: "开箱仪式 / 包装特写 / 卖点字幕" },
  ];
  const filtered = ["全部", "推荐模板"].includes(activeCategory)
    ? templates
    : templates.filter((item) => item.category === activeCategory || item.category === "电商营销");
  return (
    <div className="app-shell">
      <Sidebar activeSection="模板中心" onNavigate={go} />
      <main className="workspace">
        <div className="template-market-shell">
          <section className="market-hero">
            <div>
              <p>模板中心</p>
              <h1>选择适合商品视频的模板、特效与工作流</h1>
              <span>参考模型广场和视频模板平台的信息架构，按用途、风格、平台适配和热度组织模板。</span>
            </div>
            <div className="market-search">
              <input value="搜索模板 / 商品场景 / 平台风格" readOnly />
              <Button variant="primary" icon={FileVideo} onClick={() => setStep(0)}>上传商品生成</Button>
            </div>
          </section>

          <Card className="market-nav-card">
            <div className="market-tabs">
              {primaryTabs.map((tab, index) => <button className={index === 0 ? "active" : ""} type="button" key={tab}>{tab}</button>)}
            </div>
            <div className="market-categories">
              {categories.map((item) => (
                <button className={item === activeCategory || (activeCategory === "推荐模板" && item === "推荐模板") ? "active" : ""} type="button" key={item} onClick={() => setStep(`templates:${item === "全部" ? "推荐模板" : item}`)}>
                  {item}
                </button>
              ))}
              <div className="market-sort">
                <button type="button"><Grid2X2 size={16} />推荐 <ChevronDown size={15} /></button>
                <button type="button"><Settings size={16} />筛选 <ChevronDown size={15} /></button>
              </div>
            </div>
          </Card>

          <section className="market-feature-grid">
            <Card className="market-feature-card dark">
              <span>官方精选</span>
              <h2>商品详情页一键变短视频</h2>
              <p>适合商详图、包装图、材质图自动拆成 15 秒脚本。</p>
              <button type="button" onClick={() => setStep(0)}>去使用</button>
            </Card>
            <Card className="market-feature-card">
              <span>本周上新</span>
              <h2>跨境平台英文字幕安全区</h2>
              <p>TikTok / Shorts 版本自动压缩句长，避免按钮遮挡。</p>
            </Card>
          </section>

          <div className="market-section-head">
            <div>
              <h2>{activeCategory === "推荐模板" ? "推荐模板" : activeCategory}</h2>
              <p>图片暂用占位和现有素材，后续可替换成你提供的正式封面。</p>
            </div>
            <button type="button">查看全部工作流</button>
          </div>

          <section className="template-market-grid">
            {filtered.map((item, index) => (
              <Card className="market-template-card" key={item.title}>
                <div className={`market-cover placeholder-${index % 4}`}>
                  <img src={`${AS}${item.image}`} alt="" />
                  <div className="market-cover-tags">
                    <span>{item.type}</span>
                    <span>{item.model}</span>
                  </div>
                  <button className="template-preview-trigger" type="button" onClick={() => openPreview(item)} aria-label={`预览${item.title}`}>
                    <Play size={20} fill="currentColor" />
                    <span>预览示例</span>
                  </button>
                  <button className="template-use-trigger" type="button" onClick={() => openPreview(item)}>使用模板</button>
                </div>
                <div className="market-template-body">
                  <h3>{item.title}</h3>
                  <p>{item.tone}</p>
                  <div className="market-template-meta">
                    <span>{item.author}</span>
                    <em>{item.badge}</em>
                  </div>
                  <div className="market-template-stats">
                    <span><Play size={15} />{item.uses}</span>
                    <span><Star size={15} />{item.saves}</span>
                    <b>{item.category}</b>
                  </div>
                </div>
              </Card>
            ))}
          </section>
        </div>
      </main>
      {previewTemplate && <TemplatePreviewModal template={previewTemplate} trialState={trialState} onClose={closePreview} onTrial={startTrial} onUse={() => setStep(0)} />}
    </div>
  );
}

function TemplatePreviewModal({ template, trialState, onClose, onTrial, onUse }) {
  const [isPlaying, setIsPlaying] = useState(false);
  return (
    <div className="account-modal-layer template-preview-layer" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <div className="account-modal-card template-preview-modal" role="dialog" aria-modal="true" aria-labelledby="template-preview-title">
        <header className="template-preview-header">
          <div>
            <span className="eyebrow">模板示例预览</span>
            <h2 id="template-preview-title">{template.title}</h2>
            <p>{template.tone}</p>
          </div>
          <button type="button" onClick={onClose} aria-label="关闭预览"><X size={20} /></button>
        </header>
        <div className="template-preview-content">
          <div className={`template-preview-video ${isPlaying ? "is-playing" : ""}`}>
            <img src={`${AS}${template.image}`} alt={`${template.title}示例画面`} />
            <button className="template-preview-play" type="button" onClick={() => setIsPlaying((value) => !value)} aria-label={isPlaying ? "暂停示例" : "播放示例"}>
              {isPlaying ? <span className="pause-glyph" aria-hidden="true">Ⅱ</span> : <Play size={28} fill="currentColor" />}
            </button>
            <div className="template-preview-progress"><span style={{ width: isPlaying ? "42%" : "0%" }} /></div>
            <span className="template-preview-watermark">示例预览 · 15秒 · 9:16</span>
          </div>
          <aside className="template-preview-info">
            <div className="template-preview-facts"><span>模板类型</span><strong>{template.type}</strong></div>
            <div className="template-preview-facts"><span>适用场景</span><strong>{template.category}</strong></div>
            <div className="template-preview-facts"><span>支持平台</span><strong>抖音 / 小红书 / TikTok</strong></div>
            <div className={`template-trial-status ${trialState}`} role="status">
              {trialState === "generating" && <><RefreshCw size={16} className="spin" />正在生成低清水印样片…</>}
              {trialState === "ready" && <><Check size={16} />试用样片已生成，可直接使用模板</>}
              {trialState === "idle" && <><Info size={16} />先预览示例，再用当前商品试用</>}
            </div>
          </aside>
        </div>
        <footer className="template-preview-footer">
          <Button onClick={onClose}>返回模板列表</Button>
          {trialState === "ready" ? <Button variant="primary" onClick={onUse} icon={FileVideo}>使用此模板</Button> : <Button variant="primary" onClick={onTrial} icon={Play} disabled={trialState === "generating"}>试用当前商品</Button>}
        </footer>
      </div>
    </div>
  );
}

function NotificationCenterPage({ setStep }) {
  const go = (target) => {
    const next = navToStep(target);
    if (next !== null) setStep(next);
  };
  const notices = [
    {
      type: "生成完成",
      title: "轻量防水通勤双肩包已全部生成完成",
      desc: "抖音、小红书、TikTok 共 6 条视频已进入资产库，可预览、下载或制作同款。",
      project: "轻量防水通勤双肩包",
      time: "刚刚",
      unread: true,
      icon: Check,
      action: "查看资产",
      target: 5,
    },
    {
      type: "部分完成",
      title: "夏季防晒冰袖已有 4/6 条视频完成",
      desc: "小红书 B 版本仍在排队，已完成版本可先下载或继续等待全部完成。",
      project: "夏季防晒冰袖",
      time: "12 分钟前",
      unread: true,
      icon: Play,
      action: "查看任务",
      target: 4,
    },
    {
      type: "失败 / 异常",
      title: "TikTok 版本生成失败，请查看原因",
      desc: "失败原因：英文字幕过长导致安全区遮挡。失败版本额度已自动进入退回流程。",
      project: "无线降噪耳机",
      time: "今天 10:48",
      unread: true,
      icon: X,
      action: "去重试",
      target: 2,
      danger: true,
    },
    {
      type: "额度变动",
      title: "失败版本消耗的 6 额度已退回",
      desc: "退回额度已加入本月可用额度，可用于重新生成或制作同款。",
      project: "无线降噪耳机",
      time: "今天 10:50",
      unread: false,
      icon: Zap,
      action: "查看额度",
      target: "home",
    },
    {
      type: "到期提醒",
      title: "户外轻量收纳包将在 23 天后清理",
      desc: "该项目位于回收站，过期后将无法恢复。你可以恢复项目或彻底删除。",
      project: "户外轻量收纳包",
      time: "昨天 18:20",
      unread: false,
      icon: Trash2,
      action: "去处理",
      target: "trash",
    },
    {
      type: "生成完成",
      title: "便携咖啡保温杯已全部生成完成",
      desc: "抖音与 Instagram 共 4 条视频已进入资产库，可预览、下载或制作同款。",
      project: "便携咖啡保温杯",
      time: "昨天 18:26",
      unread: false,
      icon: Check,
      action: "查看资产",
      target: 5,
    },
    {
      type: "到期提醒",
      title: "耳机促销测试版将在 18 天后清理",
      desc: "该项目位于回收站，过期后将无法恢复。你可以恢复项目或彻底删除。",
      project: "耳机促销测试版",
      time: "2025-05-24 10:30",
      unread: false,
      icon: Trash2,
      action: "去处理",
      target: "trash",
    },
  ];
  return (
    <div className="app-shell">
      <Sidebar activeSection="通知中心" onNavigate={go} />
      <main className="workspace">
        <div className="surface-shell notification-shell">
          <header className="notification-header">
            <div>
              <p>通知中心</p>
              <h1>任务提醒与系统通知</h1>
              <span>承接生成完成、失败异常、退额和资产到期提醒，避免异步任务结果被漏看。</span>
            </div>
            <div>
              <Button icon={Check}>全部已读</Button>
              <Button variant="primary" icon={FileVideo} onClick={() => setStep(0)}>新建任务</Button>
            </div>
          </header>

          <section className="notification-layout">
            <div>
              <Card className="notification-toolbar">
                <div className="project-tabs">
                  {["全部", "生成完成", "失败 / 异常", "额度变动", "到期提醒"].map((tab, index) => (
                    <button className={index === 0 ? "active" : ""} key={tab} type="button">{tab}</button>
                  ))}
                </div>
                <div className="notification-filter-row">
                  <input value="搜索项目、平台或通知内容" readOnly />
                  <select value="未读优先" onChange={() => {}}><option>未读优先</option></select>
                </div>
              </Card>

              <div className="notification-list">
                {notices.map((notice) => {
                  const Icon = notice.icon;
                  return (
                    <Card className={`notification-item ${notice.unread ? "unread" : ""} ${notice.danger ? "danger" : ""}`} key={notice.title}>
                      <div className="notice-icon"><Icon size={19} /></div>
                      <div className="notice-content">
                        <div>
                          <span>{notice.type}</span>
                          {notice.unread ? <em>未读</em> : null}
                        </div>
                        <h3>{notice.title}</h3>
                        <p>{notice.desc}</p>
                        <small>关联项目：{notice.project} · {notice.time}</small>
                      </div>
                      <button type="button" onClick={() => setStep(notice.target)}>{notice.action}</button>
                    </Card>
                  );
                })}
              </div>
            </div>

            <aside className="notification-side">
              <Card className="notice-summary-card">
                <h2>待处理</h2>
                <div><span>未读通知</span><strong>3</strong></div>
                <div><span>失败待重试</span><strong>1</strong></div>
                <div><span>即将过期资产</span><strong>1</strong></div>
                <div><span>本月退回额度</span><strong>6</strong></div>
              </Card>
              <Card className="notice-tip-card">
                <Info size={18} />
                <h3>站内通知策略</h3>
                <p>MVP 阶段仅做站内通知。用户离开生成页后，可在这里统一查看完成、失败、退额和到期提醒。</p>
              </Card>
            </aside>
          </section>
        </div>
      </main>
    </div>
  );
}

function HomePage({ setStep }) {
  const go = (target) => {
    const next = navToStep(target);
    if (next !== null) setStep(next);
  };
  return (
    <div className="app-shell">
      <Sidebar activeSection="首页" onNavigate={go} />
      <main className="workspace">
        <div className="surface-shell home-shell">
          <section className="home-hero">
            <div>
              <span className="eyebrow">AI Ecommerce Video Workbench</span>
              <h1>把商品图片快速变成多平台短视频</h1>
              <p>上传商品素材，确认 AI 脚本，选择模板，一次生成抖音、小红书、TikTok、Instagram Reels 与 YouTube Shorts 版本。</p>
              <div className="home-actions">
                <Button variant="primary" icon={FileVideo} onClick={() => setStep(0)}>创建商品视频</Button>
                <Button icon={LayoutTemplate} onClick={() => setStep("templates:推荐模板")}>查看推荐模板</Button>
              </div>
            </div>
            <Card className="home-quota">
              <span>本月生成额度</span>
              <strong>68 <em>/ 100 条</em></strong>
              <i><b /></i>
              <small>剩余额度可生成约 5 个多平台任务</small>
            </Card>
          </section>

          <section className="quick-create-grid">
            {[
              ["上传商品图", "1-8 张图，可标记主图/细节/场景", UploadCloud],
              ["复用同款", "基于已完成项目快速换商品生成", RefreshCw],
              ["平台适配", "中英脚本、节奏和字幕长度自动适配", Sparkles],
              ["批量导出", "统一管理下载、收藏与再编辑", Download],
            ].map(([title, desc, Icon]) => (
              <button className="quick-card" key={title} onClick={() => setStep(0)} type="button">
                <Icon />
                <strong>{title}</strong>
                <span>{desc}</span>
              </button>
            ))}
          </section>

          <div className="home-dashboard">
            <Card className="home-main-card">
              <div className="home-card-head"><h2>最近项目</h2><button onClick={() => setStep("projects")} type="button">查看全部</button></div>
              {[
                ["轻量防水通勤双肩包", "已完成", "6 条视频", "商品展示", "2025-05-27", "project-cover.png"],
                ["夏季防晒冰袖", "生成中", "4 / 6", "种草推荐", "约 2 分钟", "product-sleeves.png"],
                ["无线降噪耳机", "草稿", "待确认脚本", "新品发布", "今天 10:24", "product-headphones.png"],
                ["便携咖啡保温杯", "已完成", "4 条视频", "限时促销", "昨天 18:20", "cover-thermos-wide.png"],
                ["城市通勤双肩包 B 款", "已下载", "2 条视频", "生活方式", "2025-05-25", "cover-backpack-city.png"],
              ].map(([name, status, count, scene, time, image]) => (
                <button className="project-row-home" key={name} onClick={() => setStep(status === "生成中" ? 4 : 5)} type="button">
                  <img src={`${AS}${image}`} alt="" />
                  <div><strong>{name}</strong><span>{scene} · {time}</span></div>
                  <em className={status === "生成中" ? "running" : status === "已完成" ? "done" : ""}>{status}</em>
                  <b>{count}</b>
                </button>
              ))}
            </Card>

            <Card className="home-side-card">
              <div className="home-card-head"><h2>推荐模板</h2><button onClick={() => setStep("templates:推荐模板")} type="button">更多</button></div>
              {[
                ["快节奏卖点", "推荐指数 98%", "template-fast.png"],
                ["通勤生活方式", "推荐指数 92%", "template-commute.png"],
                ["极简产品特写", "推荐指数 90%", "template-minimal.png"],
              ].map(([name, score, img]) => (
                <button className="template-row-home" key={name} onClick={() => setStep("templates:推荐模板")} type="button">
                  <img src={`${AS}${img}`} alt="" />
                  <div><strong>{name}</strong><span>{score}</span></div>
                </button>
              ))}
            </Card>
          </div>

          <section className="home-insights">
            {[
              ["今日待确认脚本", "3", Clock3],
              ["生成中任务", "1", Play],
              ["本月已下载", "18", Download],
              ["收藏模板", "7", Star],
            ].map(([label, value, Icon]) => (
              <Card className="insight-card" key={label}><Icon /><span>{label}</span><strong>{value}</strong></Card>
            ))}
          </section>
        </div>
      </main>
    </div>
  );
}

function Workspace({ step, setStep, children, right }) {
  const go = (target) => {
    const next = navToStep(target);
    if (next !== null) setStep(next);
  };
  return (
    <div className="app-shell">
      <Sidebar activeSection={step <= 3 ? "创建视频" : "全部项目"} onNavigate={go} />
      <main className="workspace">
        <div className="surface-shell">
          {step <= 3 ? <Stepper step={step} setStep={setStep} /> : null}
          <div className={right ? "two-column" : "wide-column"}>
            <div>{children}</div>
            {right}
          </div>
        </div>
      </main>
    </div>
  );
}

function ProductInfo({ setStep }) {
  const [showAllMaterials, setShowAllMaterials] = useState(false);
  const [showPointSuggestions, setShowPointSuggestions] = useState(false);
  const [appliedSuggestions, setAppliedSuggestions] = useState({});
  const [editingSuggestion, setEditingSuggestion] = useState(null);
  const [editedSuggestions, setEditedSuggestions] = useState({});
  const [editingDraft, setEditingDraft] = useState("");
  const pointSuggestions = [
    ["防水耐磨材质，日常出行更安心", "防水耐磨面料，雨天通勤也能保持干爽"],
    ["大容量分区，可容纳15英寸电脑", "大容量分区，可稳妥收纳 15 英寸电脑与日常装备"],
    ["轻量背负，适合通勤与短途旅行", "轻量减负设计，通勤与短途旅行都更轻松"],
  ];
  const productImages = [
    { img: "product-main.png", title: "商品主图", purpose: "主图", note: "封面 / 开头钩子" },
    { img: "product-detail.png", title: "防水细节", purpose: "细节图", note: "材质卖点" },
    { img: "product-usage.png", title: "通勤场景", purpose: "场景图", note: "可多张" },
    { img: "product-package.png", title: "包装展示", purpose: "包装图", note: "结尾背书" },
    { img: "thumb-1.png", title: "街景补充", purpose: "场景图", note: "通勤氛围" },
    { img: "thumb-2.png", title: "背负展示", purpose: "场景图", note: "真人使用" },
    { img: "thumb-3.png", title: "容量补充", purpose: "细节图", note: "收纳空间" },
    { img: "thumb-4.png", title: "结尾画面", purpose: "封底图", note: "CTA 画面" },
  ];
  const previewImages = productImages.slice(0, 4);
  return (
    <Workspace
      step={0}
      setStep={setStep}
      right={<ProductSummary />}
    >
      <Card className="main-panel product-page">
        <header className="page-title">
          <h1>上传商品信息</h1>
          <p>添加商品图片与核心卖点，AI 将为你整理成适合短视频表达的内容。</p>
        </header>
        <div className="section-head">
          <h2>商品图片（1-8张，建议至少3张）</h2>
          <span className="ai-pill"><Sparkles size={15} /> 已自动识别图片用途</span>
        </div>
        <div className="media-upload-panel">
          <button className="primary-dropzone" type="button">
            <span className="dropzone-icon"><UploadCloud size={28} /></span>
            <strong>上传商品素材</strong>
            <p>拖拽图片到这里，或从素材库选择</p>
            <em>1-8 张 · JPG / PNG / WEBP · 单张≤10MB</em>
            <b>继续上传</b>
          </button>
          <div className="material-slot-board">
            <div className="slot-board-head">
              <div><strong>已上传素材</strong><span>4 / 8 张 · 可手动调整用途</span></div>
              <div className="slot-actions">
                <button type="button" onClick={() => setShowAllMaterials(true)}>查看全部</button>
                <button type="button"><Sparkles size={14} /> 自动整理</button>
              </div>
            </div>
            <div className="upload-grid">
              {previewImages.map(({ img, title, purpose, note }, index) => (
                <div className={`image-tile ${index === 3 ? "has-more" : ""}`} key={title}>
                  <div className="tile-tools"><MoreHorizontal size={16} /><RefreshCw size={15} /><Trash2 size={15} /></div>
                  <img src={`${AS}${img}`} alt={title} />
                  {index === 3 ? <button className="more-mask" type="button" onClick={() => setShowAllMaterials(true)}>+4<br />查看全部</button> : null}
                  <strong>{title}</strong>
                  <div className="image-purpose">
                    <span>{purpose}</span>
                    <em>{note}</em>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="assist-option-row">
          <button type="button">
            <UploadCloud size={18} />
            <span><strong>继续上传场景图</strong><em>最多再添加 4 张</em></span>
          </button>
          <button type="button">
            <WandSparkles size={18} />
            <span><strong>AI 生成补充画面</strong><em>适合素材不足 3 张</em></span>
          </button>
          <button type="button">
            <FileVideo size={18} />
            <span><strong>纯文字动画方案</strong><em>无细节图时降级生成</em></span>
          </button>
        </div>
        <div className="material-rule-bar">
          <div><Check size={15} /><span>主图 1 张</span></div>
          <div><Check size={15} /><span>细节图 1 张</span></div>
          <div><Check size={15} /><span>场景图可多张</span></div>
          <div><Info size={15} /><span>少于 3 张时需选择补图或文字动画</span></div>
        </div>
        <FormRow label="商品名称">
          <input value="轻量防水通勤双肩包" readOnly />
        </FormRow>
        <FormRow label="商品卖点">
          <div className="point-list">
            <div className="muted-line">请填写核心卖点，便于 AI 生成脚本。</div>
            {sellingPoints.map(([text, ok], index) => (
              <div className="point-row" key={text}>
                <MoreHorizontal size={16} />
                <span className="check-dot">{ok ? <Check size={13} /> : null}</span>
                <input value={appliedSuggestions[index] ? pointSuggestions[index][1] : text} readOnly />
                {index === 1 ? <em><Info size={14} /> 请确认参数</em> : <Edit3 size={16} />}
                <Trash2 size={16} />
              </div>
           ))}
          </div>
          <Button icon={WandSparkles} onClick={() => setShowPointSuggestions(true)}>AI 优化卖点</Button>
        </FormRow>
        {showPointSuggestions && <div className="point-suggestions"><div className="point-suggestions-head"><div><strong>AI 卖点优化建议</strong><span>原文不会被覆盖，可逐条选择采用</span></div><button type="button" onClick={() => setShowPointSuggestions(false)} aria-label="关闭">×</button></div>{pointSuggestions.map(([original, optimized], index) => { const suggestion = editedSuggestions[index] || optimized; const isEditing = editingSuggestion === index; return <div className="point-compare-row" key={original}><div className="point-compare-copy"><div><em>原文</em><span>{original}</span></div><div><em className="suggested">AI 建议</em>{isEditing ? <input className="suggestion-edit-input" value={editingDraft} onChange={(e) => setEditingDraft(e.target.value)} /> : <span>{suggestion}</span>}</div></div><div className="point-compare-actions">{isEditing ? <><button className="selected" type="button" onClick={() => { setEditedSuggestions((prev) => ({ ...prev, [index]: editingDraft })); setEditingSuggestion(null); }}>保存</button><button type="button" onClick={() => setEditingSuggestion(null)}>取消</button></> : <><button className={appliedSuggestions[index] ? "selected" : ""} type="button" onClick={() => setAppliedSuggestions((prev) => ({ ...prev, [index]: true }))}>{appliedSuggestions[index] ? "已采用" : "采用"}</button><button type="button" onClick={() => { setEditingSuggestion(index); setEditingDraft(suggestion); }}>编辑</button><button type="button" onClick={() => setAppliedSuggestions((prev) => { const next = { ...prev }; delete next[index]; return next; })}>忽略</button></>}</div></div>; })}<div className="point-suggestions-foot"><span><Info size={14} />数字、尺寸和价格信息不会被自动改写</span><Button variant="primary" onClick={() => setShowPointSuggestions(false)}>应用选中建议</Button></div></div>}
        <FormRow label="价格/促销（选填）"><input value="￥199  |  限时9折" readOnly /></FormRow>
        <FormRow label="目标人群">
          <div className="chip-input"><span>上班族 <X size={13} /></span><span>学生党 <X size={13} /></span><span>短途旅行 <X size={13} /></span><ChevronDown size={16} /></div>
        </FormRow>
        <FormRow label="营销场景">
          <div className="scenario-row">
            {["商品展示", "新品发布", "限时促销", "种草推荐"].map((item, i) => (
              <button className={i === 0 ? "active" : ""} key={item} type="button">
                {i === 0 ? <PackageOpen /> : i === 1 ? <Sparkles /> : i === 2 ? <Zap /> : <Star />}
                <span>{item}</span>
                {i === 0 ? <Check className="corner" /> : null}
              </button>
            ))}
          </div>
        </FormRow>
        <footer className="panel-actions">
          <Button icon={Save}>保存草稿</Button>
          <Button variant="primary" onClick={() => setStep(1)}>下一步</Button>
        </footer>
      </Card>
      {showAllMaterials ? <MaterialManagerModal materials={productImages} onClose={() => setShowAllMaterials(false)} /> : null}
    </Workspace>
  );
}

function MaterialManagerModal({ materials, onClose }) {
  return (
    <div className="account-modal-layer" role="presentation">
      <div className="material-modal" role="dialog" aria-modal="true" aria-labelledby="material-modal-title">
        <header>
          <div>
            <h2 id="material-modal-title">全部商品素材</h2>
            <p>共 8 张，支持调整顺序、修改用途、替换或删除素材。</p>
          </div>
          <button type="button" onClick={onClose} aria-label="关闭"><X size={18} /></button>
        </header>
        <div className="material-modal-toolbar">
          <button type="button"><UploadCloud size={16} />继续上传</button>
          <button type="button"><Sparkles size={16} />AI 自动整理用途</button>
          <button type="button"><WandSparkles size={16} />生成缺失场景图</button>
        </div>
        <div className="material-modal-grid">
          {materials.map(({ img, title, purpose, note }, index) => (
            <article className={index === 0 ? "primary" : ""} key={`${title}-${index}`}>
              <span>{index + 1}</span>
              <img src={`${AS}${img}`} alt={title} />
              <div>
                <strong>{title}</strong>
                <select value={purpose} onChange={() => {}}>
                  <option>主图</option>
                  <option>细节图</option>
                  <option>场景图</option>
                  <option>包装图</option>
                  <option>对比图</option>
                  <option>封底图</option>
                </select>
                <em>{note}</em>
              </div>
              <button type="button"><MoreHorizontal size={16} /></button>
            </article>
          ))}
        </div>
        <footer>
          <span>建议将主图放在第 1 位，场景图可多张用于生成不同镜头。</span>
          <Button onClick={onClose}>取消</Button>
          <Button variant="primary" onClick={onClose}>保存素材设置</Button>
        </footer>
      </div>
    </div>
  );
}

function FormRow({ label, children }) {
  return (
    <div className="form-row">
      <label>{label}</label>
      <div className="form-control">{children}</div>
    </div>
  );
}

function ProductSummary() {
  return (
    <Card className="right-card">
      <h2>商品摘要</h2>
      <div className="summary-product">
        <img src={`${AS}product-main.png`} alt="商品摘要" />
        <div><strong>商品名称</strong><span>轻量防水通勤双肩包</span></div>
      </div>
      <dl className="summary-list">
        <div><dt>已上传图片</dt><dd>4 / 8 张</dd></div>
        <div><dt>用途标记</dt><dd>4 类</dd></div>
        <div><dt>已确认卖点</dt><dd>3 条</dd></div>
        <div><dt>营销场景</dt><dd>商品展示</dd></div>
      </dl>
      <div className="material-summary">
        <h3>素材完整度</h3>
        <div><span>主图</span><b>已满足</b></div>
        <div><span>细节/场景</span><b>可继续补充</b></div>
        <div><span>兜底方案</span><b>AI 补画面 / 文字动画</b></div>
      </div>
      <div className="note-box"><Info size={18} />AI 不会自行添加价格、参数或功效，请确认商品事实。</div>
    </Card>
  );
}

function PlatformLanguage({ setStep }) {
  const [goal, setGoal] = useState("商品展示");
  return (
    <Workspace step={1} setStep={setStep} right={<PlatformSummary />}>
      <Card className="main-panel platform-page">
        <header className="page-title">
          <h1>选择发布平台与语言</h1>
          <p>选择要发布的平台并设置内容语言，系统将为每个平台生成适配脚本。</p>
        </header>
        <div className="platform-grid">
          {platforms.map((p) => <PlatformCard platform={p} key={p.key} />)}
        </div>
        <section className="goal-section">
          <h2>选择营销目标</h2>
          <p>选择一个最符合你需求的目标，帮助 AI 更好地生成内容。</p>
          <div className="goal-grid">
            {[
              ["商品展示", PackageOpen, "突出商品卖点与使用场景，吸引用户了解并产生兴趣"],
              ["新品发布", Sparkles, "新品上市推广，快速建立认知，吸引首批尝鲜用户"],
              ["限时促销", Zap, "强调优惠信息与紧迫感，促进立即购买转化"],
              ["种草推荐", Star, "真实体验分享与口碑种草，激发兴趣与收藏"],
            ].map(([name, Icon, desc]) => (
              <button className={goal === name ? "active" : ""} key={name} onClick={() => setGoal(name)} type="button">
                <Icon size={34} />
                <strong>{name}</strong>
                <span>{desc}</span>
                {goal === name ? <em><Check size={12} /> 推荐</em> : null}
              </button>
            ))}
          </div>
        </section>
        <div className="ai-reason"><Sparkles size={16} />AI 推荐理由：基于上一页选择的商品类目与受众定位，“商品展示”目标最能有效突出商品卖点。</div>
        <footer className="panel-actions">
          <Button onClick={() => setStep(0)}>上一步</Button>
          <Button variant="primary" onClick={() => setStep(2)}>下一步</Button>
        </footer>
      </Card>
    </Workspace>
  );
}

function PlatformCard({ platform }) {
  return (
    <button className={`platform-card ${platform.selected ? "selected" : ""}`} type="button">
      <div className="platform-title">
        <img src={`${AS}${platform.icon}`} alt={platform.name} />
        <strong>{platform.name}</strong>
        {platform.selected ? <em>已选</em> : null}
        <span className="select-check">{platform.selected ? <Check size={16} /> : null}</span>
      </div>
      <div className="platform-ratio"><FileVideo size={18} />{platform.ratio}</div>
      <div className="mini-info"><UserRound size={17} /><span>{platform.audience}</span></div>
      <div className="mini-info"><Star size={17} /><span>{platform.tone}</span></div>
      <select value={platform.lang} onChange={() => {}} aria-label={`${platform.name}语言`}>
        <option>{platform.lang}</option>
        <option>中文</option>
        <option>English</option>
      </select>
    </button>
  );
}

function PlatformSummary() {
  return (
    <Card className="right-card platform-summary">
      <h2>选择摘要</h2>
      <h3>已选平台（3）<button type="button">编辑</button></h3>
      {platforms.slice(0, 3).map((p) => (
        <div className="platform-mini" key={p.key}>
          <img src={`${AS}${p.icon}`} alt="" />
          <div><strong>{p.name}</strong><span>{p.lang}</span></div>
          <Check size={17} />
        </div>
      ))}
      <div className="estimate">
        <span>预计生成</span>
        <strong>6 <em>条视频</em></strong>
        <p>3个平台 × 每个平台2条 = 6条视频</p>
      </div>
      <div className="lang-tags"><span>中文 × 4</span><span>English × 2</span></div>
      <div className="note-box"><Info size={18} />下一步可为每个平台自定义脚本内容与语言风格。</div>
    </Card>
  );
}

function ScriptConfirm({ setStep }) {
  const [active, setActive] = useState("TikTok");
  const [confirmed, setConfirmed] = useState({ 抖音: true, 小红书: true, TikTok: false });
  const [edits, setEdits] = useState({});
  const [showConfirmAll, setShowConfirmAll] = useState(false);
  const confirmedCount = platforms.slice(0, 3).filter((p) => confirmed[p.name]).length;
  const allConfirmed = confirmedCount === 3;
  const activePlatform = platforms.find((p) => p.name === active) || platforms[2];
  const markEdited = (no, value) => {
    setEdits((prev) => ({ ...prev, [no]: value }));
    setConfirmed((prev) => ({ ...prev, [active]: false }));
  };
  const confirmCurrent = () => setConfirmed((prev) => ({ ...prev, [active]: true }));
  const confirmAll = () => {
    setConfirmed({ 抖音: true, 小红书: true, TikTok: true });
    setShowConfirmAll(false);
  };
  return (
    <Workspace step={2} setStep={setStep} right={<ScriptCheck confirmed={confirmed} confirmedCount={confirmedCount} onConfirmAll={() => setShowConfirmAll(true)} />}>
      <div className="script-layout">
        <Card className="script-sidebar">
          <h2>脚本版本</h2>
          <h3>主脚本 <Lock size={14} /></h3>
          {platforms.slice(0, 3).map((p) => (
            <button className={active === p.name ? "active" : ""} key={p.name} onClick={() => setActive(p.name)} type="button">
              <img src={`${AS}${p.icon}`} alt="" />
              <span><strong>{p.name}</strong><em>{p.lang}</em></span>
              {confirmed[p.name] ? <Check size={16} /> : <Info size={16} className="warn" />}
            </button>
          ))}
          <div className="locked-facts">
            <h3>商品事实 <Lock size={14} /></h3>
            <p><Lock size={13} />轻量防水通勤双肩包</p>
            <p><Lock size={13} />可容纳15英寸电脑</p>
            <p><Lock size={13} />￥199限时9折</p>
          </div>
        </Card>
        <Card className="main-panel script-main">
          <header className="page-title inline">
            <div>
              <h1>确认内容与脚本</h1>
              <p>AI 已根据商品信息与平台特征生成脚本，请逐个平台确认后继续。</p>
            </div>
            <label className="switch-line">中英对照 <input type="checkbox" defaultChecked /><i /></label>
          </header>
          <div className="script-doc-head">
            <div><img src={`${AS}${activePlatform.icon}`} alt="" /><strong>{activePlatform.name} · {activePlatform.lang}</strong><em className={confirmed[active] ? "confirmed" : ""}>{confirmed[active] ? "已确认" : "待确认"}</em></div>
            <span>建议时长 15秒</span>
            <Button icon={RefreshCw}>重新生成</Button>
          </div>
          <div className="shot-list">
            {scriptShots.map((shot) => <ScriptShot shot={shot} value={edits[shot.no] ?? shot.line} onChange={(value) => markEdited(shot.no, value)} key={shot.no} />)}
          </div>
          <footer className="panel-actions three">
            <Button onClick={() => setStep(1)}>上一步</Button>
            <Button icon={Save}>保存草稿</Button>
            <Button onClick={confirmCurrent}>{confirmed[active] ? "已确认" : "确认当前脚本"}</Button>
            <Button variant="primary" disabled={!allConfirmed} onClick={() => allConfirmed && setStep(3)}>{allConfirmed ? "全部确认，下一步" : `还需确认 ${3 - confirmedCount} 个平台`}</Button>
          </footer>
        </Card>
      </div>
      {showConfirmAll && <div className="account-modal-layer" role="presentation"><div className="account-modal-card confirm-modal" role="dialog" aria-modal="true" aria-labelledby="confirm-all-title"><header><div><Check size={20} /></div><section><h2 id="confirm-all-title">确认全部脚本？</h2><p>确认后将使用当前脚本生成 3 个平台的视频。后续修改脚本需要重新确认。</p></section><button type="button" onClick={() => setShowConfirmAll(false)} aria-label="关闭">×</button></header><footer><Button onClick={() => setShowConfirmAll(false)}>取消</Button><Button variant="primary" onClick={confirmAll}>确认全部</Button></footer></div></div>}
    </Workspace>
  );
}

function ScriptShot({ shot, value, onChange }) {
  return (
    <article className="shot-row">
      <div className="shot-index"><b>{shot.no}</b><span>{shot.time}</span></div>
      <img src={`${AS}${shot.img}`} alt="" />
      <div className="shot-copy">
        <h3>{shot.title}</h3>
        <p>画面说明：{shot.desc}</p>
        <label>字幕（English）</label>
        <div className="script-input"><input value={value} onChange={(e) => onChange(e.target.value)} aria-label={`${shot.title}字幕`} />{shot.warn ? <Info size={18} /> : null}</div>
        <p>参考翻译：{shot.cn}</p>
      </div>
      <div className="shot-tools"><Copy size={18} /><Trash2 size={18} /></div>
    </article>
  );
}

function ScriptCheck({ confirmed, confirmedCount, onConfirmAll }) {
  return (
    <Card className="right-card">
      <h2>脚本检查</h2>
      <div className="progress-mini"><span>脚本确认进度</span><strong>{confirmedCount}/3 <em>个平台已确认</em></strong><i><b style={{ width: `${confirmedCount / 3 * 100}%` }} /></i></div>
      <div className="platform-confirm-list">
        {platforms.slice(0, 3).map((p) => <div className="platform-confirm-row" key={p.name}><span className={confirmed[p.name] ? "status-dot done" : "status-dot pending"}>{confirmed[p.name] ? "✓" : "!"}</span><span>{p.name}</span><em className={confirmed[p.name] ? "done-text" : "pending-text"}>{confirmed[p.name] ? "已确认" : "待确认"}</em></div>)}
      </div>
      <Button className="confirm-all-button" variant="primary" onClick={onConfirmAll}>全部确认</Button>
      {["商品名称一致", "核心参数一致", "折扣信息需确认", "CTA已添加"].map((item, i) => (
        <div className="check-line" key={item}>
          {i === 2 ? <Info size={18} className="warn" /> : <Check size={18} />}
          <span>{item}</span>
          {i === 2 ? <Info size={18} className="warn" /> : <Check size={18} />}
        </div>
      ))}
      <h3>平台适配建议 <Info size={14} /></h3>
      {["节奏", "语气", "字幕"].map((item, i) => (
        <div className="slider-line" key={item}><span>{item}</span><i><b style={{ width: `${82 - i * 10}%` }} /></i></div>
      ))}
      <div className="note-box"><Sparkles size={18} />我们会基于平台文化与用户偏好进行本地化改写。</div>
    </Card>
  );
}

function TemplateGenerate({ setStep }) {
  const [template, setTemplate] = useState("fast");
  const [duration, setDuration] = useState("15秒");
  const [scriptFit, setScriptFit] = useState(true);
  const [showRegenerateScript, setShowRegenerateScript] = useState(false);
  const [scriptGenerationState, setScriptGenerationState] = useState("idle");
  const [showScriptPreview, setShowScriptPreview] = useState(false);
  const changeDuration = (next) => { setDuration(next); setScriptFit(next === "15秒"); setScriptGenerationState("idle"); };
  const startRegenerateScript = () => { setShowRegenerateScript(false); setScriptGenerationState("generating"); setScriptFit(false); window.setTimeout(() => { setScriptGenerationState("done"); setScriptFit(true); }, 1400); };
  return (
    <Workspace step={3} setStep={setStep} right={<GenerateSummary duration={duration} scriptFit={scriptFit} scriptGenerationState={scriptGenerationState} />}>
      <Card className="main-panel template-page">
        <header className="page-title">
          <h1>选择模板并生成</h1>
          <p>AI 已根据商品、营销目标和平台脚本推荐适合的模板。</p>
        </header>
        <div className="section-head"><h2>AI 推荐模板</h2><button type="button">查看全部模板 ›</button></div>
        <div className="template-grid">
          {templates.map(([key, name, img, score, reason, tags]) => (
            <button className={`template-card ${template === key ? "active" : ""}`} key={key} onClick={() => setTemplate(key)} type="button">
              <div className="template-cover"><img src={`${AS}${img}`} alt={name} /></div>
              <div className="template-meta">
                <h3>{name}</h3>
                <em>推荐指数 {score}</em>
                <p>推荐理由<br />{reason}</p>
                <div>{tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                <small>支持平台 <img src={`${AS}logo-douyin.png`} alt="" /><img src={`${AS}logo-redbook.png`} alt="" /><img src={`${AS}logo-tiktok.png`} alt="" /></small>
              </div>
              {template === key ? <Check className="corner-check" /> : null}
            </button>
          ))}
        </div>
        <Card className="settings-panel">
          <h2>生成设置</h2>
          <div className="control-grid">
             <Segment title="视频时长" items={["5秒", "10秒", "15秒", "30秒"]} active={duration} onChange={changeDuration} />
            <Segment title="清晰度" items={["标清", "高清", "超清"]} active="高清" />
            <Segment title="每个平台生成数量" items={["1条", "2条", "4条"]} active="2条" />
          </div>
          <table className="platform-table">
            <tbody>
              {platforms.slice(0, 3).map((p) => (
                <tr key={p.key}>
                  <td><img src={`${AS}${p.icon}`} alt="" />{p.name}</td>
                  <td className="language-cell"><select value={p.lang} onChange={() => {}}><option>{p.lang}</option></select></td>
                  <td>▯ 9:16 竖屏</td>
                  <td className="quantity-cell"><div className="qty-stepper"><button type="button">−</button><span>2</span><button type="button">＋</button></div></td>
                </tr>
              ))}
            </tbody>
           </table>
             {duration !== "15秒" && <div className={`duration-warning ${scriptGenerationState === "done" || scriptFit ? "is-ready" : ""} ${scriptGenerationState === "generating" ? "is-generating" : ""}`}><CircleAlert size={18} /><div><strong>{scriptGenerationState === "generating" ? `正在按 ${duration} 重新生成脚本` : scriptGenerationState === "done" ? `脚本已按 ${duration} 重新生成` : `当前脚本与 ${duration} 不匹配`}</strong><span>{scriptGenerationState === "generating" ? "正在重新编排镜头、字幕和行动引导，请稍候。" : scriptGenerationState === "done" ? "新脚本已生成，可查看内容或继续进入生成流程。" : "当前脚本按 15 秒生成，可能出现字幕超时或内容缺失。"}</span></div>{scriptGenerationState === "generating" ? <div className="duration-loading"><RefreshCw size={15} />生成中</div> : scriptGenerationState === "done" ? <div className="duration-actions"><button type="button" onClick={() => setShowScriptPreview(true)}>查看新脚本</button><button type="button" onClick={() => setStep(2)}>编辑脚本</button></div> : <div className="duration-actions"><button type="button" onClick={() => setScriptFit(true)}>适应时长</button><button type="button" onClick={() => setShowRegenerateScript(true)}>重新生成脚本</button></div>}</div>}
         </Card>
        <div className="bottom-options">
          <Card><label>背景音乐风格 <Info size={14} /></label><select><option>轻快电子 / 产品感</option></select></Card>
          <Card><label>字幕样式 <Info size={14} /></label><div className="subtitle-styles">{subtitleOptions.map(([img, style, name], i) => <button className={i === 0 ? `active ${style}` : style} type="button" key={style}><img src={`${AS}${img}`} alt="" /><span>Aa</span><em>{name}</em></button>)}</div></Card>
        </div>
        <footer className="panel-actions">
          <Button onClick={() => setStep(2)}>上一步</Button>
          <Button icon={Save}>保存草稿</Button>
        </footer>
      </Card>
      {showRegenerateScript && <RegenerateScriptModal duration={duration} onClose={() => setShowRegenerateScript(false)} onConfirm={startRegenerateScript} />}
      {showScriptPreview && <ScriptPreviewModal duration={duration} onClose={() => setShowScriptPreview(false)} onEdit={() => setStep(2)} />}
    </Workspace>
  );
}

function RegenerateScriptModal({ duration, onClose, onConfirm }) {
  const [platformsToRegenerate, setPlatformsToRegenerate] = useState(["抖音", "小红书", "TikTok"]);
  const [keepEdits, setKeepEdits] = useState(true);
  const toggle = (name) => setPlatformsToRegenerate((items) => items.includes(name) ? items.filter((item) => item !== name) : [...items, name]);
  return (
    <div className="account-modal-layer" role="presentation">
      <div className="account-modal-card regenerate-modal" role="dialog" aria-modal="true" aria-labelledby="regenerate-script-title">
        <header><div className="regenerate-icon"><WandSparkles size={20} /></div><section><h2 id="regenerate-script-title">重新生成脚本</h2><p>将按 {duration} 重新编排镜头、字幕和行动引导。</p></section><button type="button" onClick={onClose} aria-label="关闭">×</button></header>
        <div className="account-modal-content regenerate-content"><div className="regenerate-section"><strong>选择需要重新生成的平台</strong><div className="regenerate-platforms">{["抖音", "小红书", "TikTok"].map((name) => <label key={name}><input type="checkbox" checked={platformsToRegenerate.includes(name)} onChange={() => toggle(name)} /><span>{name}</span></label>)}</div></div><label className="regenerate-preserve"><input type="checkbox" checked={keepEdits} onChange={(e) => setKeepEdits(e.target.checked)} /><span><strong>保留已有脚本修改</strong><em>保留用户手动编辑的标题、卖点和 CTA</em></span></label><div className="regenerate-note"><Info size={16} />重新生成会覆盖所选平台当前脚本，不会返回上一步。</div></div>
        <footer><Button onClick={onClose}>取消</Button><Button variant="primary" disabled={!platformsToRegenerate.length} onClick={onConfirm}>确认重新生成</Button></footer>
      </div>
    </div>
  );
}

function ScriptPreviewModal({ duration, onClose, onEdit }) {
  return (
    <div className="account-modal-layer" role="presentation">
      <div className="account-modal-card script-preview-modal" role="dialog" aria-modal="true" aria-labelledby="script-preview-title">
        <header><div className="regenerate-icon"><Check size={20} /></div><section><h2 id="script-preview-title">新脚本已生成</h2><p>已按 {duration} 重新编排以下内容。</p></section><button type="button" onClick={onClose} aria-label="关闭">×</button></header>
        <div className="account-modal-content script-preview-content"><div className="script-preview-row"><b>00:00</b><span>雨天出行，装备更靠谱</span></div><div className="script-preview-row"><b>00:02</b><span>轻量背负，通勤更轻松</span></div><div className="script-preview-row"><b>00:04</b><span>多层收纳，装下日常装备</span></div><div className="script-preview-row"><b>00:06</b><span>轻量防水通勤双肩包</span></div><div className="regenerate-note"><Info size={16} />平台字幕、行动引导和镜头节奏已同步调整。</div></div>
        <footer><Button onClick={onClose}>稍后查看</Button><Button variant="primary" onClick={onEdit}>编辑脚本</Button></footer>
      </div>
    </div>
  );
}

function Segment({ title, items, active, onChange }) {
  return (
    <div className="segment-block">
      <label>{title} <Info size={14} /></label>
      <div>{items.map((item) => <button className={item === active ? "active" : ""} key={item} type="button" onClick={() => onChange?.(item)}>{item}</button>)}</div>
    </div>
  );
}

function GenerateSummary({ duration = "15秒", scriptFit = true, scriptGenerationState = "idle" }) {
  return (
    <Card className="right-card generate-summary">
      <h2>生成摘要</h2>
      <div className="summary-product compact"><img src={`${AS}product-main.png`} alt="" /><div><strong>都市通勤防水双肩包</strong><span>深空黑</span></div></div>
      <h3>已选择模板</h3>
      <div className="selected-template"><img src={`${AS}template-fast.png`} alt="" /><div><strong>快节奏卖点</strong><em>推荐指数 98%</em></div></div>
      <h3>生成内容</h3>
      {platforms.slice(0, 3).map((p) => <div className="generate-line" key={p.key}><img src={`${AS}${p.icon}`} alt="" /><strong>{p.name}</strong><span>{p.lang} × 2</span></div>)}
       <div className="big-number"><span>总计生成 · {duration}</span><strong>6 <em>条视频</em></strong></div>
        {!scriptFit && <div className="summary-blocker"><CircleAlert size={16} />{scriptGenerationState === "generating" ? "脚本正在重新生成，请稍候" : "请先在左侧让脚本适配当前时长"}</div>}
      <div className="quota-sum"><span>预计消耗额度</span><strong>36 额度</strong><i><b /></i></div>
       <Button variant="primary" disabled={!scriptFit} onClick={() => scriptFit && window.dispatchEvent(new CustomEvent("go-generating"))}>{scriptFit ? "确认生成 6 条视频" : "先适配脚本后生成"}</Button>
      <small>点击即表示您同意《AI 视频生成服务条款》</small>
    </Card>
  );
}

function Generating({ setStep }) {
  const [retrying, setRetrying] = useState(false);
  const [retried, setRetried] = useState(false);
  const go = (target) => {
    const next = navToStep(target);
    if (next !== null) setStep(next);
  };
  return (
    <div className="app-shell">
      <Sidebar activeSection="生成中" onNavigate={go} />
      <main className="workspace">
        <div className="surface-shell project-shell">
          <header className="project-header">
            <div><p>我的项目 / 轻量防水通勤双肩包 / 生成任务</p><h1>{retried ? "正在重试失败版本" : "商品视频部分完成"}</h1><span>{retried ? "TikTok 版本正在重新生成，已退回额度优先用于本次重试。" : "3 个平台中已有 2 个平台完成，失败版本可单独重试。"}</span></div>
            <div><Button>取消任务</Button><Button onClick={() => setStep(5)}>前往资产库</Button></div>
          </header>
          <div className="two-column">
            <div>
              <Card className="process-card">
                <div className={`ring ${retried ? "ring-retry" : "ring-partial"}`}><strong>{retried ? "76%" : "68%"}</strong><span>{retried ? "重试中" : "部分完成"}</span></div>
                <div className="process-meta"><p>创建时间：2025-05-27 14:32:18</p><p>{retried ? "预计剩余时间：约 1 分钟" : "已完成 4 / 6 条视频"}</p></div>
                <div className="process-steps">
                  {["商品素材分析", "平台脚本", "视频生成", "字幕与音频", "渲染导出", "完成"].map((s, i) => (
                    <div className={i < 2 ? "done" : i === 2 ? "active" : ""} key={s}><span>{i < 2 ? <Check /> : i === 2 ? <Play /> : <Check />}</span><strong>{s}</strong><em>{i < 2 ? `00:${18 + i * 4}` : i === 2 ? "进行中" : "等待中"}</em></div>
                  ))}
                </div>
                {!retried && <div className="partial-complete-banner"><CircleAlert size={18} /><div><strong>部分完成 · 2 / 3 个平台</strong><span>TikTok 版本生成失败，失败版本已退回 6 额度；重试不重复扣费。</span></div><button type="button" onClick={() => { setRetrying(true); setRetried(true); setTimeout(() => setRetrying(false), 1200); }}><RefreshCw size={15} />重试失败平台</button></div>}
              </Card>
              <h2 className="block-title">平台生成进度</h2>
              {platforms.slice(0, 3).map((p, i) => <ProgressPlatform p={p} index={i} completed={p.key === "tiktok" && retried && !retrying} failed={p.key === "tiktok" && !retried} retrying={p.key === "tiktok" && retrying} onRetry={() => { setRetrying(true); setRetried(true); setTimeout(() => setRetrying(false), 1200); }} key={p.key} />)}
            </div>
            <div>
              <Card className="right-card task-detail">
                <h2>任务详情</h2>
                <div className="summary-product compact"><img src={`${AS}product-main.png`} alt="" /><div><strong>轻量防水通勤双肩包</strong><span>黑色 | 常规款</span></div></div>
                <dl className="task-list"><div><dt>提交时间</dt><dd>2025-05-27 14:32:18</dd></div><div><dt>所选模板</dt><dd>快节奏卖点</dd></div><div><dt>生成总数</dt><dd>6条视频</dd></div><div><dt>消耗额度</dt><dd>已冻结 36 额度</dd></div></dl>
                <div className="task-stats"><span>已完成<b>{retried ? "6" : "4"}</b></span><span>{retried ? "重试中" : "失败待重试"}<b>{retried ? "2" : "1"}</b></span><span>已退回额度<b>{retried ? "0" : "6"}</b></span></div>
                <div className="note-box"><Info /><span>{retried ? "已使用退回额度重试 TikTok 版本，完成后会自动写入资产库。" : "已完成的视频会保留在资产库；失败版本已退回 6 额度，可重试 2 次。"}</span></div>
                <label className="notify-line"><span>完成后站内通知</span><input type="checkbox" defaultChecked /></label>
              </Card>
              <Card className="right-card log-card"><h2>生成日志</h2>{["任务提交成功", "商品素材分析完成", "平台脚本生成完成", "开始生成视频", "抖音 A 版本缺帧导出中 82%", "小红书 A 版本字幕与音频合成中 64%"].map((l, i) => <p key={l}><i />14:3{i}:20 {l}</p>)}</Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function ProgressPlatform({ p, index, completed = false, failed = false, retrying = false, onRetry }) {
  const rows = failed ? [["生成视频", 0, "失败"], ["字幕与音频", 0, "失败"]] : retrying ? [["生成视频", 42, "重试中"], ["字幕与音频", 18, "等待中"]] : completed ? [["渲染导出", 100, "已完成"], ["字幕与音频合成", 100, "已完成"]] : index === 0 ? [["渲染导出", 100, "已完成"], ["字幕与音频合成", 100, "已完成"]] : index === 1 ? [["字幕与音频合成", 100, "已完成"], ["生成视频", 100, "已完成"]] : [["生成视频", 55, "约 1分20秒"], ["排队中", 0, "排在第 2 位"]];
  return (
    <Card className="progress-card">
      <div className="progress-platform"><img src={`${AS}${p.icon}`} alt="" /><strong>{p.name}</strong><span>{failed ? "2 条失败版本" : retrying ? "2 条重试版本" : "2 条视频"}</span></div>
      <em className="progress-lang">{p.lang}</em>
      <div className="progress-area"><div className="progress-rows">{rows.map(([name, pct, time], i) => <div className={`progress-row ${failed ? "is-failed" : retrying ? "is-retrying" : ""}`} key={name}><b>{i === 0 ? "A" : "B"} 版本</b><span>{name} <em>{pct ? `${pct}%` : ""}</em></span><i><u style={{ width: `${pct}%` }} /></i><small>{time}</small><ChevronDown size={17} /></div>)}</div>{failed && <button className="progress-retry" type="button" onClick={onRetry}><RefreshCw size={13} />重试 TikTok</button>}</div>
    </Card>
  );
}

function ResultPage({ setStep }) {
  const [tab, setTab] = useState("抖音");
  const [version, setVersion] = useState("A");
  const [showRemakeGuard, setShowRemakeGuard] = useState(false);
  const go = (target) => {
    const next = navToStep(target);
    if (next !== null) setStep(next);
  };
  return (
    <div className="app-shell">
      <Sidebar activeSection="已完成" onNavigate={go} />
      <main className="workspace">
        <div className="surface-shell project-shell result-shell">
          <header className="result-header">
            <img src={`${AS}project-cover.png`} alt="" />
            <div><p>我的项目 / 轻量防水通勤双肩包</p><h1>轻量防水通勤双肩包 <em>全部完成</em></h1><span>创建于 2025-05-27　 商品展示　 6 条视频</span></div>
            <div><Button variant="primary" onClick={() => setShowRemakeGuard(true)}>制作同款</Button><Button icon={Download}>批量下载</Button><IconButton><MoreHorizontal /></IconButton></div>
          </header>
          <div className="two-column">
            <Card className="result-main">
              <div className="tabs">
                {["抖音", "小红书", "TikTok"].map((item) => <button className={tab === item ? "active" : ""} onClick={() => setTab(item)} key={item} type="button"><img src={`${AS}${item === "小红书" ? "logo-redbook.png" : item === "TikTok" ? "logo-tiktok.png" : "logo-douyin.png"}`} alt="" />{item}<span>2</span></button>)}
              </div>
              <div className="filters"><label>语言：<select><option>{tab === "TikTok" ? "English" : "中文"}</option></select></label><label>状态：<select><option>全部完成</option></select></label></div>
              <div className="result-grid">
                <div>
                  <div className="video-frame"><img src={`${AS}video-main.png`} alt="视频预览" /><span>9:16</span><div><Play /><i><b /></i><em>00:06 / 00:15</em><Bell /><Grid2X2 /></div></div>
                  <div className="thumb-strip">{thumbs.map((t, i) => <button className={i === 0 ? "active" : ""} key={t} type="button"><img src={`${AS}${t}`} alt="" /><span>00:0{i * 3}</span></button>)}</div>
                  <div className="video-actions">
                    <Button variant="primary" icon={Download}>下载视频</Button><Button icon={Edit3}>字幕编辑</Button><Button icon={RefreshCw}>重新生成</Button><Button icon={Edit3}>继续编辑</Button><Button icon={Copy}>复制设置</Button><Button icon={Star}>收藏</Button><Button icon={Trash2}>删除</Button>
                  </div>
                </div>
                <div className="version-column">
                  {["A", "B"].map((v) => <button className={version === v ? "active" : ""} onClick={() => setVersion(v)} key={v} type="button">{v} 版本</button>)}
                  <button type="button"><Plus size={16} />生成新版本</button>
                </div>
                <div className="video-info">
                  <div className="info-tabs"><span className="active">视频信息</span><span>字幕编辑</span><span>生成设置</span></div>
                  <InfoField label="视频标题" value="通勤装备升级｜轻量防水双肩包" />
                  <InfoField label="字幕列表" value="00:00　雨天出行，装备要靠谱&#10;00:03　轻量背负，通勤更轻松&#10;00:07　多层收纳，装下你的日常&#10;00:11　轻量防水通勤双肩包" textarea />
                  <InfoField label="行动引导" value="立即购买，限时9折" />
                  <div className="meta-cards"><span>时长<br /><b>15秒</b></span><span>画面比例<br /><b>9:16</b></span><span>清晰度<br /><b>高清</b></span><span>语言<br /><b>中文</b></span><span>消耗额度<br /><b>6 条</b></span></div>
                </div>
              </div>
            </Card>
            <ResultSide />
          </div>
          <Card className="stat-row">{[["已下载", "2条", Download], ["已收藏", "1条", Star], ["生成耗时", "1分42秒", Clock3], ["消耗额度", "36条", PackageOpen]].map(([k, v, Icon]) => <div key={k}><Icon /><span>{k}</span><strong>{v}</strong></div>)}</Card>
        </div>
      </main>
      {showRemakeGuard && <RemakeGuardModal onClose={() => setShowRemakeGuard(false)} onContinue={() => { setShowRemakeGuard(false); setStep("remake"); }} />}
    </div>
  );
}

function RemakeGuardModal({ onClose, onContinue }) {
  return (
    <div className="account-modal-layer" role="presentation">
      <div className="account-modal-card remake-guard-modal" role="dialog" aria-modal="true" aria-labelledby="remake-guard-title">
        <header>
          <div className="remake-guard-icon"><CircleAlert size={21} /></div>
          <section><h2 id="remake-guard-title">制作同款前，请确认商品信息</h2><p>本次只复用视频结构与生成设置，不会自动把原商品事实带入新商品。</p></section>
          <button type="button" onClick={onClose} aria-label="关闭">×</button>
        </header>
        <div className="account-modal-content remake-guard-content">
          <div className="remake-risk-box"><strong>需要重新确认的内容</strong><div><span>商品名称</span><span>核心卖点</span><span>价格 / 促销</span><span>参数 / 规格</span></div><p>数字、尺寸、价格等敏感信息会被高亮，未确认前不能直接生成。</p></div>
          <div className="remake-inherit-box"><strong>将继续复用</strong><span>模板 · 脚本结构 · 镜头顺序 · 平台语言 · 时长清晰度 · 字幕样式 · CTA 位置 · 音乐风格</span></div>
        </div>
        <footer><Button onClick={onClose}>取消</Button><Button onClick={onContinue}>检查并替换商品信息</Button><Button variant="primary" onClick={onContinue}>只复用模板</Button></footer>
      </div>
    </div>
  );
}

function RemakePage({ setStep }) {
  const [facts, setFacts] = useState({ name: "", selling: "", price: "", spec: "" });
  const filled = Object.values(facts).filter(Boolean).length;
  const complete = filled === 4;
  const update = (key, value) => setFacts((prev) => ({ ...prev, [key]: value }));
  const go = (target) => { const next = navToStep(target); if (next !== null) setStep(next); };
  return (
    <div className="app-shell">
      <Sidebar activeSection="全部项目" onNavigate={go} />
      <main className="workspace">
        <div className="surface-shell remake-shell">
          <header className="remake-header"><div><p>我的项目 / 轻量防水通勤双肩包 / 制作同款</p><h1>制作同款</h1><span>复用原视频结构，重新填写商品事实后生成新商品视频。</span></div><Button onClick={() => setStep(5)}>返回项目</Button></header>
          <div className="remake-grid">
            <Card className="remake-card reuse-card"><div className="remake-card-title"><div><h2>继续复用</h2><p>以下内容会保留到新任务</p></div><span className="reuse-badge">已锁定</span></div><div className="reuse-list">{["快节奏卖点模板", "脚本结构与镜头顺序", "抖音 / 小红书 / TikTok", "15 秒 · 高清 · 9:16", "字幕样式与 CTA 位置", "轻快电子 / 产品感"].map((item) => <div key={item}><Check size={16} />{item}</div>)}</div><div className="reuse-preview"><img src={`${AS}project-cover.png`} alt="原项目封面" /><div><strong>原项目</strong><span>轻量防水通勤双肩包</span></div></div></Card>
            <Card className="remake-card facts-card"><div className="remake-card-title"><div><h2>填写新商品信息</h2><p>带橙色标记的字段不能直接继承</p></div><span className="required-badge">需重新确认</span></div><div className="remake-form">{[["name", "商品名称", "例如：夏季防晒冰袖"], ["selling", "核心卖点", "例如：UPF50+、凉感速干"], ["price", "价格 / 促销", "例如：¥39 · 第二件半价"], ["spec", "参数 / 规格", "例如：均码 · 黑色 · 2 只装"]].map(([key, label, placeholder]) => <label key={key}><span>{label}<em>需填写</em></span><input value={facts[key]} onChange={(e) => update(key, e.target.value)} placeholder={placeholder} /></label>)}</div><div className="fact-tip"><CircleAlert size={17} /><span>数字、尺寸、价格和促销信息会用于脚本与字幕，请确认真实有效。</span></div></Card>
            <Card className="remake-card check-card"><div className="remake-card-title"><div><h2>生成前检查</h2><p>完成全部商品事实后才能继续</p></div><span className={complete ? "check-status ready" : "check-status"}>{complete ? "可继续" : "待补充"}</span></div><div className="check-progress"><div><strong>{filled}</strong><span>/ 4 项已填写</span></div><i><b style={{ width: `${filled * 25}%` }} /></i></div><div className="fact-check-list">{[["商品名称", facts.name], ["核心卖点", facts.selling], ["价格 / 促销", facts.price], ["参数 / 规格", facts.spec]].map(([label, value]) => <div key={label}><span>{value ? <Check size={15} /> : <CircleAlert size={15} />}{label}</span><em className={value ? "done" : "pending"}>{value ? "已填写" : "待填写"}</em></div>)}</div><div className="check-note"><Info size={16} />未完成检查前不会生成或消耗额度。</div></Card>
          </div>
          <footer className="remake-footer"><Button onClick={() => setStep(5)}>取消</Button><div><span>{complete ? "商品事实已完整，可进入平台与语言设置" : "请先补充 4 项商品事实"}</span><Button variant="primary" disabled={!complete} onClick={() => complete && setStep(1)}>确认信息，继续设置</Button></div></footer>
        </div>
      </main>
    </div>
  );
}

function InfoField({ label, value, textarea }) {
  return <label className="info-field"><span>{label} <Edit3 size={14} /></span>{textarea ? <textarea value={value.replaceAll("&#10;", "\n")} readOnly /> : <input value={value} readOnly />}</label>;
}

function ResultSide() {
  return (
    <Card className="right-card result-side">
      <h2>项目版本 <Info size={14} /></h2>
      <div className="batch-line">全部完成 6/6 <button type="button">批量选择</button></div>
      {["抖音", "小红书", "TikTok"].map((name, group) => (
        <section key={name}>
          <h3><img src={`${AS}${name === "小红书" ? "logo-redbook.png" : name === "TikTok" ? "logo-tiktok.png" : "logo-douyin.png"}`} alt="" />{name}（2）</h3>
          {[0, 1].map((i) => <div className={`version-item ${group === 0 && i === 0 ? "active" : ""}`} key={i}><input type="checkbox" defaultChecked={group === 0 && i === 0} /><img src={`${AS}${thumbs[(group + i) % thumbs.length]}`} alt="" /><span>{i === 0 ? "A" : "B"} 版本<br /><em>00:15</em></span><b><Check size={14} />全部完成</b><Download size={18} /></div>)}
        </section>
      ))}
      <div className="note-box"><Info />视频文件将为免费用户保存 30 天，请及时下载以避免过期。</div>
    </Card>
  );
}

export function App() {
  const [step, setStep] = useState("home");

  useEffect(() => {
    const handler = () => setStep(4);
    window.addEventListener("go-generating", handler);
    return () => window.removeEventListener("go-generating", handler);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [step]);

  if (step === "home") return <HomePage setStep={setStep} />;
  if (step === "projects") return <AllProjectsPage setStep={setStep} />;
  if (step === "assets") return <SavedDownloadsPage setStep={setStep} />;
  if (step === "trash") return <TrashPage setStep={setStep} />;
  if (step === "notifications") return <NotificationCenterPage setStep={setStep} />;
  if (step === "remake") return <RemakePage setStep={setStep} />;
  if (typeof step === "string" && step.startsWith("templates:")) return <TemplateCenterPage setStep={setStep} activeCategory={step.split(":")[1] || "推荐模板"} />;
  if (step === 0) return <ProductInfo setStep={setStep} />;
  if (step === 1) return <PlatformLanguage setStep={setStep} />;
  if (step === 2) return <ScriptConfirm setStep={setStep} />;
  if (step === 3) return <TemplateGenerate setStep={setStep} />;
  if (step === 4) return <Generating setStep={setStep} />;
  return <ResultPage setStep={setStep} />;
}
