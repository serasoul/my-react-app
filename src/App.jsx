import { useEffect, useState } from 'react'
import './App.css'
import Chatbot from './Chatbot'
import { supabase } from './supabaseClient'
import {
  BlogPage,
  CatalogCapPage,
  CatalogOuterPage,
  CatalogSocksPage,
  CatalogUniformPage,
  FinishedGalleryPage,
  FinishedReviewPage,
  GuideColorPage,
  GuideEmblemPage,
  GuideFabricPage,
  GuideFaqPage,
  GuideFontPage,
  GuideSamplePage,
  GuideSizePage,
  GuideStepPage,
  PaymentPage,
  ProductsPage,
} from './Pages'
import heroBanner from './assets/hero-banner.png'
import logo from './assets/logo.png'
import reason1 from './assets/reason1.png'
import reason2 from './assets/reason2.png'
import reason3 from './assets/reason3.png'
import reason4 from './assets/reason4.png'
import reason5 from './assets/reason5.png'
import reason6 from './assets/reason6.png'
import sale1 from './assets/sale1.png'
import sale2 from './assets/sale2.png'
import sale3 from './assets/sale3.png'
import sale4 from './assets/sale4.png'
import t1 from './assets/t1.png'
import t2 from './assets/t2.png'
import t3 from './assets/t3.png'
import t4 from './assets/t4.png'

const NAV_ITEMS = [
  { key: 'products', label: '商品ラインナップ' },
  { key: 'guide', label: 'ご注文ガイド' },
  { key: 'catalog', label: 'デザインカタログ' },
  { key: 'finished', label: '完成品・口コミ' },
  { key: 'blog', label: 'ブログ' },
  { key: 'payment', label: '個別決済' },
]

const SUBMENUS = {
  guide: [
    { key: 'guide-step',   label: '注文ガイド' },
    { key: 'guide-size',   label: 'サイズ' },
    { key: 'guide-fabric', label: '生地案内' },
    { key: 'guide-color',  label: 'カラー' },
    { key: 'guide-emblem', label: 'エンブレム' },
    { key: 'guide-font',   label: 'フォントガイド' },
    { key: 'guide-sample', label: 'サンプル貸し出し' },
    { key: 'guide-faq',    label: 'よくある質問' },
  ],
  catalog: [
    { key: 'catalog-uniform', label: 'ユニフォーム' },
    { key: 'catalog-cap',     label: 'キャップ' },
    { key: 'catalog-outer',   label: 'アウター' },
    { key: 'catalog-socks',   label: 'オリジナルソックス' },
  ],
  finished: [
    { key: 'finished-gallery', label: '完成品ギャラリー' },
    { key: 'finished-review',  label: 'お客様レビュー' },
  ],
}

const PARENT_OF = Object.entries(SUBMENUS).reduce((map, [parent, items]) => {
  items.forEach((it) => { map[it.key] = parent })
  return map
}, {})

const BENEFITS = [
  { icon: reason1, title: '16種類のカスタマイズ', desc: '自由自在なオリジナル設計' },
  { icon: reason2, title: '追加料金一切なし', desc: '明朗会計で安心ご注文' },
  { icon: reason4, title: '1着からご注文可能', desc: '個人ユーザーも大歓迎' },
  { icon: reason6, title: '3着以上デザイン無料', desc: 'プロが無料でデザイン' },
  { icon: reason3, title: '満足度 9.2 / 10', desc: '10,000チームの実績' },
  { icon: reason5, title: '平均28日でお届け', desc: '安定したスピード納期' },
]

const PRODUCTS = [
  {
    tag: 'BEST',
    title: '昇華 2ボタン ユニフォーム',
    price: '¥5,400',
    desc: '通気性抜群の昇華プリント。発色が美しく長持ち。',
    image: t1,
  },
  {
    tag: 'NEW',
    title: '昇華 フルボタン ユニフォーム',
    price: '¥5,900',
    desc: '本格派フルボタン仕様。チームの伝統を演出。',
    image: t2,
  },
  {
    tag: 'POPULAR',
    title: '刺繍 ユニフォーム',
    price: '¥6,400',
    desc: '高級感のある刺繍仕上げで存在感アップ。',
    image: t3,
  },
  {
    tag: 'PREMIUM',
    title: '昇華＋刺繍 ユニフォーム',
    price: '¥7,400',
    desc: '昇華プリントと刺繍のハイブリッド仕様。',
    image: t4,
  },
]

const PROMOS = [
  { title: '昇華 Tシャツ', price: '¥2,980', off: '25% OFF', image: sale1 },
  { title: 'フリースパーカー', price: '¥4,900', off: '25% OFF', image: sale2 },
  { title: '刺繍フリース', price: '¥5,900', off: '20% OFF', image: sale3 },
  { title: 'カスタムソックス 20足', price: '¥13,800', off: '15% OFF', image: sale4 },
]

const REVIEWS = [
  { team: 'Spirytus', date: '2026.04.24', body: 'デザインも価格も最高でした。スタッフの対応も丁寧。' },
  { team: 'TAKATSU BOYS', date: '2026.04.22', body: '生地が厚くしっかりしていて、子供たちも大満足です。' },
  { team: 'Seijyo leaguers', date: '2026.04.18', body: '何度もリピートしています。今回も期待通りの仕上がり！' },
  { team: 'SIRIUS MIRAGE', date: '2026.04.15', body: 'デザイン提案がプロ仕様。チームの一体感が出ました。' },
  { team: 'Satte Kings', date: '2026.04.10', body: '納期が早く、急な大会前でも間に合いました。感謝。' },
  { team: 'TOBETSU WINGS', date: '2026.04.05', body: '刺繍の質感が想像以上。みんなテンション上がってます。' },
]

const FEATURES = [
  'デザイン無料制作', 'デザイン豊富', '商品ラインナップ', 'パンツ仕様',
  'キャップ仕様', '7XLまでサイズ展開', 'カスタムサイズ', 'サンプル貸出',
  'ナンバービブ', 'キャプテンマーク', '生地選択', 'ワキ穴仕様',
]

const ADMIN_PASSWORD = 'admin1234'

function App() {
  const [form, setForm] = useState({ name: '', email: '', team: '', product: '', message: '' })
  const [menuOpen, setMenuOpen] = useState(false)
  const [page, setPage] = useState('home')
  const [openMobileSub, setOpenMobileSub] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const [adminOpen, setAdminOpen] = useState(false)
  const [inquiries, setInquiries] = useState([])
  const [loadingInquiries, setLoadingInquiries] = useState(false)
  const [selectedInquiry, setSelectedInquiry] = useState(null)
  const handleChange = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))
  const openAdmin = async () => {
    const pw = window.prompt('管理者パスワードを入力してください(admin1234)')
    if (pw === null) return
    if (pw !== ADMIN_PASSWORD) {
      alert('パスワードが正しくありません')
      return
    }
    setAdminOpen(true)
    setSelectedInquiry(null)
    setLoadingInquiries(true)
    const { data, error } = await supabase
      .from('inquiries')
      .select('*')
      .order('created_at', { ascending: false })
    setLoadingInquiries(false)
    if (error) {
      console.error('inquiries fetch failed:', error)
      alert('お問い合わせの取得に失敗しました。RLS の SELECT 許可を確認してください。')
      setInquiries([])
      return
    }
    setInquiries(data || [])
  }
  const closeAdmin = () => {
    setAdminOpen(false)
    setSelectedInquiry(null)
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (submitting) return
    setSubmitting(true)
    const { error } = await supabase.from('inquiries').insert({
      name: form.name,
      email: form.email,
      team: form.team,
      product: form.product,
      message: form.message,
    })
    setSubmitting(false)
    if (error) {
      console.error('inquiry insert failed:', error)
      alert('送信に失敗しました。時間をおいて再度お試しください。')
      return
    }
    alert('お問い合わせを受け付けました。担当者よりご連絡いたします。')
    setForm({ name: '', email: '', team: '', product: '', message: '' })
  }
  const closeMenu = () => { setMenuOpen(false); setOpenMobileSub(null) }
  const goTo = (key) => (e) => {
    if (e) e.preventDefault()
    setPage(key)
    setMenuOpen(false)
    setOpenMobileSub(null)
  }
  const goHome = goTo('home')
  const handleParentClick = (item) => (e) => {
    e.preventDefault()
    const subs = SUBMENUS[item.key]
    if (subs && subs.length) {
      setPage(subs[0].key)
    } else {
      setPage(item.key)
    }
    setMenuOpen(false)
    setOpenMobileSub(null)
  }
  const isItemActive = (key) => page === key || PARENT_OF[page] === key

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' })
  }, [page])

  return (
    <>
      <header className="site-header">
        <div className="topbar">
          <span>📞 050-1808-1750</span>
          <span>📩 info@ilb-max.com</span>
          <span>営業時間 平日 10:00 - 18:00</span>
        </div>
        <div className="nav-wrap">
          <a className="logo" href="#" onClick={goHome}>
            <img src={logo} alt="ILB-MAX" className="logo-img" />
          </a>
          <nav className="nav-desktop">
            <ul>
              {NAV_ITEMS.map((item) => {
                const subs = SUBMENUS[item.key]
                return (
                  <li key={item.key} className={subs ? 'has-sub' : ''}>
                    <a
                      href="#"
                      onClick={handleParentClick(item)}
                      className={isItemActive(item.key) ? 'active' : ''}
                    >
                      {item.label}
                    </a>
                    {subs && (
                      <ul className="submenu">
                        {subs.map((s) => (
                          <li key={s.key}>
                            <a
                              href="#"
                              onClick={goTo(s.key)}
                              className={page === s.key ? 'active' : ''}
                            >
                              {s.label}
                            </a>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                )
              })}
            </ul>
          </nav>
          <a className="cta-btn nav-cta" href="#contact" onClick={goHome}>無料デザイン依頼</a>
          <button
            type="button"
            className={`hamburger ${menuOpen ? 'open' : ''}`}
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? 'メニューを閉じる' : 'メニューを開く'}
            aria-expanded={menuOpen}
          >
            <span /><span /><span />
          </button>
        </div>

        <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
          <ul>
            {NAV_ITEMS.map((item) => {
              const subs = SUBMENUS[item.key]
              const expanded = openMobileSub === item.key
              if (!subs) {
                return (
                  <li key={item.key}>
                    <a
                      href="#"
                      onClick={goTo(item.key)}
                      className={isItemActive(item.key) ? 'active' : ''}
                    >
                      {item.label}
                    </a>
                  </li>
                )
              }
              return (
                <li key={item.key}>
                  <button
                    type="button"
                    className={`has-sub-toggle ${isItemActive(item.key) ? 'active' : ''}`}
                    onClick={() => setOpenMobileSub(expanded ? null : item.key)}
                    aria-expanded={expanded}
                  >
                    <span>{item.label}</span>
                    <span className={`sub-toggle-icon ${expanded ? 'open' : ''}`}>▾</span>
                  </button>
                  {expanded && (
                    <ul className="sub-list">
                      {subs.map((s) => (
                        <li key={s.key}>
                          <a
                            href="#"
                            onClick={goTo(s.key)}
                            className={page === s.key ? 'active' : ''}
                          >
                            {s.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              )
            })}
            <li><a href="#contact" className="mobile-cta" onClick={goHome}>無料デザイン依頼</a></li>
          </ul>
          <div className="mobile-contact">
            <a href="tel:050-1808-1750">📞 050-1808-1750</a>
            <a href="mailto:info@ilb-max.com">📩 info@ilb-max.com</a>
          </div>
        </div>
        {menuOpen && <div className="menu-backdrop" onClick={closeMenu} />}
      </header>

      {page === 'products' && <ProductsPage goHome={goHome} />}
      {page === 'guide-step'   && <GuideStepPage />}
      {page === 'guide-size'   && <GuideSizePage />}
      {page === 'guide-fabric' && <GuideFabricPage />}
      {page === 'guide-color'  && <GuideColorPage />}
      {page === 'guide-emblem' && <GuideEmblemPage />}
      {page === 'guide-font'   && <GuideFontPage />}
      {page === 'guide-sample' && <GuideSamplePage />}
      {page === 'guide-faq'    && <GuideFaqPage />}
      {page === 'catalog-uniform' && <CatalogUniformPage />}
      {page === 'catalog-cap'     && <CatalogCapPage />}
      {page === 'catalog-outer'   && <CatalogOuterPage />}
      {page === 'catalog-socks'   && <CatalogSocksPage />}
      {page === 'finished-gallery' && <FinishedGalleryPage />}
      {page === 'finished-review'  && <FinishedReviewPage />}
      {page === 'blog' && <BlogPage />}
      {page === 'payment' && <PaymentPage />}

      {page === 'home' && (
        <>

      <div className="hero-banner">
        <img src={heroBanner} alt="オリジナル野球ユニフォーム 簡単オーダー" />
      </div>

      <section className="hero" id="top">
        <div className="hero-inner">
          <p className="eyebrow">業界最多 700+ デザイン保有</p>
          <h1>ご希望のデザインを<br />簡単に注文まで！</h1>
          <p className="lead">
            10,000チーム以上の制作実績。プロのデザイナーが無料でオリジナルユニフォームを作成します。
          </p>
          <div className="hero-actions">
            <a href="#contact" className="btn-primary">無料デザイン依頼</a>
            <a href="#products" className="btn-ghost">商品を見る</a>
          </div>
          <div className="hero-sports">
            <a href="#" className="sport-card baseball">⚾ 野球</a>
            <a href="#" className="sport-card soccer">⚽ サッカー</a>
            <a href="#" className="sport-card basketball">🏀 バスケットボール</a>
          </div>
        </div>
      </section>

      <section className="benefits">
        <div className="section-head">
          <h2>選ばれる 6 つの理由</h2>
          <p>最安値保証 × 高品質 × スピード納期</p>
        </div>
        <div className="benefit-grid">
          {BENEFITS.map((b) => (
            <div className="benefit-card" key={b.title}>
              <div className="benefit-icon">
                <img src={b.icon} alt="" />
              </div>
              <h3>{b.title}</h3>
              <p>{b.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="products" id="products">
        <div className="section-head">
          <h2>ユニフォーム ラインナップ</h2>
          <p>1着あたりの価格（税込）— 追加料金なし</p>
        </div>
        <div className="product-grid">
          {PRODUCTS.map((p) => (
            <article className="product-card" key={p.title}>
              <span className={`tag tag-${p.tag.toLowerCase()}`}>{p.tag}</span>
              <div className="product-thumb">
                <img src={p.image} alt={p.title} />
              </div>
              <h3>{p.title}</h3>
              <p className="product-desc">{p.desc}</p>
              <div className="product-price">{p.price}<span>〜 / 着</span></div>
              <a href="#contact" className="btn-outline">詳細を見る</a>
            </article>
          ))}
        </div>
      </section>

      <section className="promos">
        <div className="section-head">
          <h2>最大 25% OFF キャンペーン</h2>
          <p>期間限定の特別価格でアパレルもお得に</p>
        </div>
        <div className="promo-grid">
          {PROMOS.map((p) => (
            <div className="promo-card" key={p.title}>
              <span className="promo-off">{p.off}</span>
              <div className="promo-thumb">
                <img src={p.image} alt={p.title} />
              </div>
              <h3>{p.title}</h3>
              <div className="promo-price">{p.price}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="line-cta">
        <div className="line-inner">
          <div className="line-text">
            <span className="line-badge">LINE で簡単</span>
            <h2>デザイン依頼・お見積もり<br />すべて LINE で完結</h2>
            <p>友だち追加後、チャットで写真や要望を送るだけ。最短当日でデザイン案をご提案します。</p>
            <a href="#" className="btn-line">LINE で問い合わせる</a>
          </div>
          <div className="line-mock">
            <div className="bubble in">こんにちは！デザインを相談したいです。</div>
            <div className="bubble out">承知しました！チームカラーは何色ですか？</div>
            <div className="bubble in">ネイビーとゴールドでお願いします ⚾</div>
            <div className="bubble out">3パターンほどデザインをお作りしますね！</div>
          </div>
        </div>
      </section>

      <section className="reviews">
        <div className="section-head">
          <h2>お客様の声</h2>
          <p>平均満足度 ★ 9.2 / 10</p>
        </div>
        <div className="review-grid">
          {REVIEWS.map((r) => (
            <div className="review-card" key={r.team}>
              <div className="review-stars">★★★★★</div>
              <h3>{r.team}</h3>
              <p className="review-date">{r.date}</p>
              <p className="review-body">{r.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="features">
        <div className="section-head">
          <h2>カスタマイズ機能</h2>
          <p>細部までこだわれる 12 のオプション</p>
        </div>
        <div className="feature-grid">
          {FEATURES.map((f, i) => (
            <a href="#" className="feature-tile" key={f}>
              <span className="feature-num">{String(i + 1).padStart(2, '0')}</span>
              <span className="feature-name">{f}</span>
            </a>
          ))}
        </div>
      </section>

      <section className="contact" id="contact">
        <div className="contact-inner">
          <div className="contact-head">
            <h2>無料デザイン依頼フォーム</h2>
            <p>ご記入いただいた内容をもとに、担当デザイナーよりご連絡いたします。</p>
          </div>
          <form className="contact-form" onSubmit={handleSubmit}>
            <label>
              お名前 <span className="req">必須</span>
              <input type="text" required value={form.name} onChange={handleChange('name')} />
            </label>
            <label>
              メールアドレス <span className="req">必須</span>
              <input type="email" required value={form.email} onChange={handleChange('email')} />
            </label>
            <label>
              チーム名（ローマ字）
              <input type="text" value={form.team} onChange={handleChange('team')} />
            </label>
            <label>
              ご検討中の商品
              <select value={form.product} onChange={handleChange('product')}>
                <option value="">選択してください</option>
                <option>昇華 2ボタン ユニフォーム</option>
                <option>昇華 フルボタン ユニフォーム</option>
                <option>刺繍 ユニフォーム</option>
                <option>昇華＋刺繍 ユニフォーム</option>
                <option>Tシャツ</option>
                <option>パーカー</option>
                <option>キャップ</option>
                <option>ソックス</option>
              </select>
            </label>
            <label className="full">
              お問い合わせ内容
              <textarea rows="5" value={form.message} onChange={handleChange('message')}></textarea>
            </label>
            <button type="submit" className="btn-primary full" disabled={submitting}>
              {submitting ? '送信中…' : '送信する'}
            </button>
          </form>
        </div>
      </section>
        </>
      )}

      <footer className="site-footer">
        <div className="footer-inner">
          <div className="footer-col">
            <div className="logo">
              <img src={logo} alt="ILB-MAX" className="logo-img" />
            </div>
            <p>カスタム野球ユニフォームの専門ショップ。10,000チーム以上のオーダー実績。</p>
            <p className="contact-line">📞 050-1808-1750</p>
            <p className="contact-line">📩 info@ilb-max.com</p>
            <p className="contact-line">LINE ID: @ilovebaseball</p>
          </div>
          <div className="footer-col">
            <h4>ショップ</h4>
            <ul>
              <li><a href="#">商品ラインナップ</a></li>
              <li><a href="#">ご注文ガイド</a></li>
              <li><a href="#">デザインカタログ</a></li>
              <li><a href="#">完成品ギャラリー</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>会社情報</h4>
            <ul>
              <li><a href="#">運営会社</a></li>
              <li><a href="#">特定商取引法に基づく表記</a></li>
              <li><a href="#">利用規約</a></li>
              <li><a href="#">消費者保証情報</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>関連サイト</h4>
            <ul>
              <li><a href="#">MAX2MAX サッカー専門</a></li>
              <li><a href="#">MAX2MAX バスケ専門</a></li>
            </ul>
            <div className="socials">
              <a href="#" aria-label="Instagram">📷</a>
              <a href="#" aria-label="X">𝕏</a>
              <a href="#" aria-label="Facebook">f</a>
              <a href="#" aria-label="Blog">📝</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>©2015-2025 ILB-MAX by KALRON Co., Ltd. All Rights Reserved.</p>
        </div>
      </footer>

      <Chatbot />

      <button className="admin-fab" onClick={openAdmin} aria-label="管理者ページを開く">
        管理者
      </button>

      {adminOpen && (
        <div
          className="admin-overlay"
          onClick={(e) => { if (e.target === e.currentTarget) closeAdmin() }}
        >
          <div className="admin-panel" role="dialog" aria-label="管理者パネル">
            <div className="admin-header">
              <h3>
                {selectedInquiry
                  ? 'お問い合わせ詳細'
                  : `お問い合わせ一覧（${inquiries.length}件）`}
              </h3>
              <div className="admin-actions">
                {selectedInquiry && (
                  <button className="admin-btn" onClick={() => setSelectedInquiry(null)}>
                    ← 一覧へ戻る
                  </button>
                )}
                <button className="admin-btn admin-close" onClick={closeAdmin} aria-label="閉じる">
                  ×
                </button>
              </div>
            </div>
            <div className="admin-body">
              {!selectedInquiry ? (
                loadingInquiries ? (
                  <p className="admin-empty">読み込み中…</p>
                ) : inquiries.length === 0 ? (
                  <p className="admin-empty">お問い合わせはまだありません。</p>
                ) : (
                  <ul className="inquiry-list">
                    <li className="inquiry-row inquiry-head">
                      <span>お名前</span>
                      <span>商品</span>
                      <span>受信日時</span>
                    </li>
                    {inquiries.map((q) => (
                      <li
                        key={q.id}
                        className="inquiry-row"
                        onClick={() => setSelectedInquiry(q)}
                      >
                        <span className="inquiry-name">{q.name}</span>
                        <span className="inquiry-product">{q.product || '—'}</span>
                        <span className="inquiry-date">
                          {new Date(q.created_at).toLocaleString('ja-JP')}
                        </span>
                      </li>
                    ))}
                  </ul>
                )
              ) : (
                <dl className="inquiry-detail">
                  <dt>お名前</dt>
                  <dd>{selectedInquiry.name}</dd>
                  <dt>メールアドレス</dt>
                  <dd>
                    <a href={`mailto:${selectedInquiry.email}`}>{selectedInquiry.email}</a>
                  </dd>
                  <dt>チーム名</dt>
                  <dd>{selectedInquiry.team || '—'}</dd>
                  <dt>ご検討中の商品</dt>
                  <dd>{selectedInquiry.product || '—'}</dd>
                  <dt>お問い合わせ内容</dt>
                  <dd className="inquiry-message">{selectedInquiry.message || '—'}</dd>
                  <dt>受信日時</dt>
                  <dd>{new Date(selectedInquiry.created_at).toLocaleString('ja-JP')}</dd>
                </dl>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default App
