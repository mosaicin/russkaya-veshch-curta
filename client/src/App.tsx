import { useMemo, useState } from "react";
import {
  ArrowDown, ArrowUpRight, BookOpen, ChevronRight, CircleHelp, Cog,
  ExternalLink, Fingerprint, Gauge, Gem, Menu, Plus, RotateCcw,
  ScrollText, X,
} from "lucide-react";

const layers = [
  { number: "01", title: "История", kicker: "Корпус", text: "Россия здесь не хроника дат, а длинное напряжение между Сушей и Морем — между судьбой пространства и свободой перемещения.", icon: ScrollText },
  { number: "02", title: "Культура", kicker: "Шарнир", text: "Литература, кино, музыка и символы работают как детали скрытого механизма: через них книга слышит то, что политика произносит вслух.", icon: BookOpen },
  { number: "03", title: "Душа", kicker: "Счётчик", text: "Страх, власть, тело, сон, алкоголь и смерть становятся не частностями, а показаниями внутреннего русского прибора.", icon: Fingerprint },
  { number: "04", title: "Миф", kicker: "Секрет", text: "На дне шкатулки — не определение, а образ: нечто узнаваемое, что всё ещё ускользает от окончательной формулы.", icon: Gem },
];

const chapters = [
  { part: "culture", number: "01", title: "Литература как Зло", tag: "вход", desc: "Культура здесь не украшение, а сила, которая нарушает спокойствие готовых понятий." },
  { part: "culture", number: "02", title: "Магический большевизм Андрея Платонова", tag: "миф", desc: "Революция читается как попытка изобрести новый язык и нового человека." },
  { part: "culture", number: "03", title: "Звезда невидимой Империи", tag: "символ", desc: "Империя существует не только на карте: она продолжает жить в знаках и ожидании." },
  { part: "culture", number: "04", title: "418 масок субъекта", tag: "личность", desc: "Лицо героя — это поверхность, за которой движется множество ролей и сил." },
  { part: "culture", number: "05", title: "Город Курехин", tag: "звук", desc: "Музыка и город становятся способом расслышать разрыв привычной реальности." },
  { part: "culture", number: "06", title: "Последний прыгун Империи", tag: "порог", desc: "Фигура перехода: человек, который ещё удерживает связь между эпохами." },
  { part: "soul", number: "07", title: "Порог свободы", tag: "воля", desc: "Свобода — не отсутствие границ, а напряжение между формой и выходом из неё." },
  { part: "soul", number: "08", title: "Империя Сна", tag: "сновидение", desc: "Россия мыслится как пространство, где границы между историей, природой и сном размыты." },
  { part: "soul", number: "09", title: "Восстание Эроса", tag: "тело", desc: "Телесное желание превращается в энергию, бросающую вызов холодной системе порядка." },
  { part: "soul", number: "10", title: "Структура мужской души", tag: "архетип", desc: "Автор собирает внутреннего человека из власти, риска, посвящения и ответственности." },
  { part: "soul", number: "11", title: "Математика", tag: "ключ", desc: "Последний поворот к форме: тайна не исчезает, но получает язык отношения и меры." },
  { part: "soul", number: "12", title: "Смерти звонкая песнь", tag: "финал", desc: "Шкатулка закрывается не точкой, а эхом — смертью как последним способом услышать целое." },
];

const sources = [
  { label: "Книга и оглавление тома 2", meta: "Books.ru", href: "https://www.books.ru/books/russkaya-veshch-tom-2-58254/lookinside/" },
  { label: "Критический контекст книги", meta: "Независимая газета", href: "https://www.ng.ru/kafedra/2003-07-24/3_esse.html" },
  { label: "Механика Curta", meta: "Smithsonian Institution", href: "https://www.si.edu/object/curta-mechanical-calculator%3Anasm_A20070038000" },
];

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <div className="section-label"><span className="section-label__line" />{children}</div>;
}

function App() {
  const [activePart, setActivePart] = useState<"all" | "culture" | "soul">("all");
  const [selectedChapter, setSelectedChapter] = useState(chapters[0]);
  const [digits, setDigits] = useState([2, 0, 0]);
  const [turns, setTurns] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const number = digits[0] * 100 + digits[1] * 10 + digits[2];
  const result = number * turns;
  const filteredChapters = useMemo(() => activePart === "all" ? chapters : chapters.filter((chapter) => chapter.part === activePart), [activePart]);
  const updateDigit = (index: number, value: number) => {
    setDigits((current) => current.map((digit, digitIndex) => digitIndex === index ? value : digit));
    setTurns(0);
  };
  const resetCalculator = () => { setDigits([2, 0, 0]); setTurns(0); };

  return (
    <main>
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="Русская вещь — в начало"><span className="wordmark__mark"><span>Р</span><span>В</span></span><span className="wordmark__text">Русская вещь <em>×</em> Curta</span></a>
        <button className="mobile-menu" type="button" onClick={() => setMenuOpen((open) => !open)} aria-label="Открыть меню" aria-expanded={menuOpen}>{menuOpen ? <X size={20} /> : <Menu size={20} />}</button>
        <nav className={`site-nav ${menuOpen ? "site-nav--open" : ""}`}>
          <a href="#book" onClick={() => setMenuOpen(false)}>Книга</a><a href="#layers" onClick={() => setMenuOpen(false)}>Слои</a><a href="#chapters" onClick={() => setMenuOpen(false)}>Главы</a><a className="nav-cta" href="#curta" onClick={() => setMenuOpen(false)}>Открыть механизм <ArrowDown size={15} /></a>
        </nav>
      </header>

      <section className="hero" id="top">
        <div className="hero__copy"><div className="eyebrow"><span className="eyebrow__dot" />исследование / 01—05</div><h1>Русская вещь<br /><i>— шкатулка Curta</i></h1><p className="hero__lead">Двухтомник Александра Дугина как механизм чтения: поверните ручку — и разрозненные главы начинают складываться в образ.</p><div className="hero__actions"><a className="button button--copper" href="#book">Войти в книгу <ChevronRight size={17} /></a><a className="text-link" href="#curta">Смотреть аналогию <ArrowDown size={16} /></a></div><div className="hero__note"><span>«</span><p>Не готовый ответ,<br />а устройство для его поиска.</p></div></div>
        <div className="hero__object" aria-label="Схематичная иллюстрация механической шкатулки Curta"><div className="object-caption object-caption--top">ПАРАДИГМА / КУЛЬТУРЫ</div><div className="chest"><div className="chest__lid"><span>РВ</span><small>2001 · ТОМ 02</small></div><div className="chest__body"><div className="chest__spine" /><div className="chest__dial"><div className="dial__inner"><Cog size={42} /><span>CURTA</span></div></div><div className="chest__sliders"><span /><span /><span /><span /><span /></div><div className="chest__hinge" /><div className="chest__handle"><span className="handle__stem" /><span className="handle__grip" /></div></div><div className="chest__shadow" /></div><div className="object-caption object-caption--bottom"><span>«РУССКАЯ ВЕЩЬ»</span><span>КЛЮЧ ВНУТРИ</span></div></div><div className="hero__side-note">01<br /><span>ОТКРЫТЬ<br />СЛОЙ</span></div>
      </section>

      <section className="statement" id="book"><div className="statement__aside"><span>А. Г. Дугин</span><span>2001</span><span>1160 стр.</span></div><div className="statement__main"><SectionLabel>Сначала — предмет</SectionLabel><h2>«Русская вещь» —<br /><em>не роман.</em> Не трактат.</h2><p className="statement__intro">Это философская эссеистика с «вольным дыханием»: история, геополитика, литература, религия и психология здесь соединены не линейным доказательством, а системой повторяющихся образов.</p><div className="statement__columns"><p>В центре — поиск русского принципа: не набора государственных институтов, а глубинной культурной стихии, которая движется между <strong>Сушей и Морем</strong>, судьбой и свободой, матерью-землёй и абстрактным пространством.</p><p className="statement__pull">Том 2 — <strong>«Парадигма культуры»</strong> — открывает внутреннюю сторону машины: от литературы и большевизма к душе, телу, сну, Эросу и смерти.</p></div></div></section>

      <section className="layers-section" id="layers"><div className="section-heading"><div><SectionLabel>Четыре запора</SectionLabel><h2>Слои внутри<br /><em>шкатулки</em></h2></div><p>Один предмет — четыре глубины. Каждая следующая не отменяет предыдущую, а переводит её на другой язык.</p></div><div className="layers-list">{layers.map((layer) => { const Icon = layer.icon; return <article className="layer-card" key={layer.number}><div className="layer-card__number">{layer.number}</div><div className="layer-card__icon"><Icon size={21} strokeWidth={1.5} /></div><div className="layer-card__body"><div className="layer-card__kicker">{layer.kicker}</div><h3>{layer.title}</h3><p>{layer.text}</p></div><span className="layer-card__arrow"><ArrowUpRight size={20} /></span></article>; })}</div></section>

      <section className="chapters-section" id="chapters"><div className="chapters__rail"><span>02</span><span>КАРТА ГЛАВ</span><span className="rail-line" /></div><div className="chapters__content"><div className="section-heading section-heading--chapters"><div><SectionLabel>Второй том</SectionLabel><h2>Маршрут<br /><em>внутри механизма</em></h2></div><p>Не линейный сюжет, а ряд поворотов. Выберите часть и нажмите на главу, чтобы увидеть её роль в общей конструкции.</p></div><div className="chapter-layout"><div className="chapter-list-wrap"><div className="chapter-tabs" role="tablist" aria-label="Части второго тома">{([["all", "Все главы"], ["culture", "Парадигма культуры"], ["soul", "Парадигма души"]] as const).map(([value, label]) => <button key={value} className={activePart === value ? "is-active" : ""} type="button" onClick={() => setActivePart(value)}>{label}</button>)}</div><div className="chapter-list">{filteredChapters.map((chapter) => <button className={`chapter-row ${selectedChapter.title === chapter.title ? "is-selected" : ""}`} key={chapter.title} type="button" onClick={() => setSelectedChapter(chapter)}><span className="chapter-row__number">{chapter.number}</span><span className="chapter-row__title">{chapter.title}<small>{chapter.tag}</small></span><ChevronRight size={16} /></button>)}</div></div><aside className="chapter-detail"><div className="detail__top"><span>ГЛАВА {selectedChapter.number}</span><span className="detail__gear"><Cog size={15} /></span></div><h3>{selectedChapter.title}</h3><div className="detail__rule" /><p>{selectedChapter.desc}</p><div className="detail__formula"><span>ЧАСТЬ</span><strong>{selectedChapter.part === "culture" ? "04" : "05"}</strong><span>{selectedChapter.part === "culture" ? "КУЛЬТУРЫ" : "ДУШИ"}</span></div></aside></div></div></section>

      <section className="curta-section" id="curta"><div className="curta-intro"><SectionLabel>Самостоятельная метафора</SectionLabel><h2>Поверните<br /><em>ручку</em></h2><p>Курт Херцштарк собрал Curta как карманный арифмометр: ползунки вводят число, ступенчатый барабан переводит его в движение, счётчик накапливает результат.</p><p className="curta-intro__small">Здесь мы делаем то же с чтением. Это не связь, заявленная Дугиным, а наш способ увидеть, как книга собирает смысл.</p></div><div className="calculator"><div className="calculator__topline"><span><Gauge size={15} /> CURTA / READING ENGINE</span><span>TYPE II · 1954</span></div><div className="calculator__display"><span className="display__label">НАКОПЛЕНО</span><strong>{String(result).padStart(5, "0")}</strong><span className="display__turns">ОБОРОТЫ <b>{String(turns).padStart(2, "0")}</b></span></div><div className="calculator__body"><div className="calculator__sliders">{digits.map((digit, index) => <label className="calc-slider" key={index}><span>{index === 0 ? "СОТНИ" : index === 1 ? "ДЕСЯТКИ" : "ЕДИНИЦЫ"}</span><input type="range" min="0" max="9" value={digit} onChange={(event) => updateDigit(index, Number(event.target.value))} /><strong>{digit}</strong></label>)}</div><div className="calculator__knob"><div className="knob__gear"><Cog size={64} strokeWidth={1} /></div><button type="button" onClick={() => setTurns((current) => current + 1)} aria-label="Сделать один оборот">ПОВОРОТ<br /><span>+</span> 1</button></div></div><div className="calculator__footer"><span>ЧИСЛО <b>{String(number).padStart(3, "0")}</b></span><button type="button" className="reset-button" onClick={resetCalculator}><RotateCcw size={14} /> Сбросить механизм</button></div></div></section>

      <section className="reveal-section"><div className="reveal__seal"><span>РВ</span><div className="seal-orbit" /></div><div className="reveal__copy"><SectionLabel>Ключ найден</SectionLabel><h2>Секрет не в ответе.<br /><em>Секрет — в сборке.</em></h2><p>Curta не хранит заранее написанное число — она вычисляет его из положения деталей и повторения операции. «Русская вещь» работает похоже: одна и та же оппозиция возвращается в истории, культуре, душе и мифе, пока не начинает звучать как целое.</p><div className="reveal__equation"><span>ИСТОРИЯ</span><Plus size={14} /><span>КУЛЬТУРА</span><Plus size={14} /><span>ДУША</span><ArrowUpRight size={18} /><strong>ВЕЩЬ</strong></div></div></section>

      <section className="sources-section"><div><SectionLabel>Для дальнейшего чтения</SectionLabel><h2>Следы,<br /><em>которые остались</em></h2></div><div className="source-list">{sources.map((source, index) => <a className="source-row" href={source.href} target="_blank" rel="noreferrer" key={source.label}><span className="source-row__index">0{index + 1}</span><span><strong>{source.label}</strong><small>{source.meta}</small></span><ExternalLink size={16} /></a>)}</div></section>
      <footer className="site-footer"><div className="footer-mark"><span className="wordmark__mark"><span>Р</span><span>В</span></span><span>РУССКАЯ ВЕЩЬ<br /><i>× CURTA</i></span></div><p>Интерпретационный сайт о книге Александра Дугина<br />и механике чтения, собранной вокруг Curta.</p><a href="#top">Наверх <ArrowUpRight size={15} /></a></footer>
      <div className="disclaimer"><CircleHelp size={15} /><span>Связь книги с Curta — авторская метафора этого сайта, а не установленное автором сопоставление.</span></div>
    </main>
  );
}

export default App;
