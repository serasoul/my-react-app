import { useState } from 'react'
import t1 from './assets/t1.png'
import t2 from './assets/t2.png'
import t3 from './assets/t3.png'
import t4 from './assets/t4.png'
import sale1 from './assets/sale1.png'
import sale2 from './assets/sale2.png'
import sale3 from './assets/sale3.png'
import sale4 from './assets/sale4.png'

function PageHero({ eyebrow, title, lead }) {
  return (
    <section className="page-hero">
      <div className="page-hero-inner">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        {lead && <p className="lead">{lead}</p>}
      </div>
    </section>
  )
}

/* ============ Products Page ============ */
const PRODUCT_CATEGORIES = [
  {
    title: '昇華 2ボタン ユニフォーム', price: '¥5,400', image: t1,
    desc: '通気性抜群の昇華プリント。発色が美しく長持ち。耐久性に優れ、洗濯にも強い素材です。',
    features: ['昇華プリント', '吸汗速乾', '4WAYストレッチ', '防臭加工'],
  },
  {
    title: '昇華 フルボタン ユニフォーム', price: '¥5,900', image: t2,
    desc: '本格派フルボタン仕様。チームの伝統を演出する正統派ユニフォーム。',
    features: ['フルボタン', '昇華プリント', '吸汗速乾', '高級ボタン'],
  },
  {
    title: '刺繍 ユニフォーム', price: '¥6,400', image: t3,
    desc: '高級感のある刺繍仕上げ。ロゴや番号がくっきり浮き立ち存在感アップ。',
    features: ['立体刺繍', '高密度生地', '抗菌加工', 'プロ仕様'],
  },
  {
    title: '昇華＋刺繍 ユニフォーム', price: '¥7,400', image: t4,
    desc: '昇華プリントと刺繍を組み合わせたハイブリッド仕様。最高峰のカスタム性。',
    features: ['昇華＋刺繍', 'プレミアム生地', 'カラー無制限', 'チームロゴ自由'],
  },
]

const APPAREL = [
  { title: '昇華 Tシャツ', price: '¥2,980', image: sale1 },
  { title: 'フリースパーカー', price: '¥4,900', image: sale2 },
  { title: '刺繍フリース', price: '¥5,900', image: sale3 },
  { title: 'カスタムソックス 20足', price: '¥13,800', image: sale4 },
]

export function ProductsPage({ goHome }) {
  return (
    <div className="page">
      <PageHero
        eyebrow="PRODUCTS"
        title="商品ラインナップ"
        lead="プロ仕様のユニフォームから、カジュアルなアパレルまで。"
      />
      <section className="page-section">
        <div className="section-head"><h2>ユニフォーム</h2><p>本気のチームに選ばれる4タイプ</p></div>
        <div className="page-products">
          {PRODUCT_CATEGORIES.map((p) => (
            <div className="page-product" key={p.title}>
              <div className="page-product-thumb"><img src={p.image} alt={p.title} /></div>
              <div className="page-product-info">
                <h3>{p.title}</h3>
                <div className="page-product-price">{p.price}<span>〜 / 着</span></div>
                <p>{p.desc}</p>
                <ul>{p.features.map((f) => <li key={f}>✓ {f}</li>)}</ul>
                <a href="#contact" onClick={goHome} className="btn-primary">無料デザイン依頼</a>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="page-section alt">
        <div className="section-head"><h2>アパレル</h2><p>普段使いにもチーム使いにも</p></div>
        <div className="apparel-grid">
          {APPAREL.map((a) => (
            <div className="apparel-card" key={a.title}>
              <div className="apparel-thumb"><img src={a.image} alt={a.title} /></div>
              <h3>{a.title}</h3>
              <div className="apparel-price">{a.price}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

/* ============================================================ */
/* ============ ご注文ガイド (Order Guide) Sub-pages ========== */
/* ============================================================ */

/* --- 注文ガイド (Order Step) --- */
const ORDER_STEPS = [
  { num: 1, title: 'デザイン相談', desc: 'LINE またはフォームから、ご希望のデザインや要望をお送りください。' },
  { num: 2, title: 'デザイン作成', desc: '担当デザイナーがオリジナル案を作成（3着以上で無料）。' },
  { num: 3, title: 'デザイン確定', desc: '修正は何度でも無料。納得いくまでお打ち合わせ。' },
  { num: 4, title: 'お見積り・ご入金', desc: '正式お見積りをご確認のうえ、お振込みください。' },
  { num: 5, title: '製作開始', desc: '工場にて製作スタート。途中経過もご報告します。' },
  { num: 6, title: 'お届け', desc: '平均28日でお届け。検品済みで安心の品質。' },
]

export function GuideStepPage() {
  return (
    <div className="page">
      <PageHero
        eyebrow="ORDER STEP"
        title="注文ガイド"
        lead="初めての方でも安心。6ステップでオリジナルユニフォームが完成します。"
      />
      <section className="page-section">
        <div className="section-head"><h2>ご注文の流れ</h2></div>
        <div className="steps">
          {ORDER_STEPS.map((s) => (
            <div className="step-card" key={s.num}>
              <div className="step-num">{String(s.num).padStart(2, '0')}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="page-section alt">
        <div className="section-head"><h2>納期の目安</h2><p>受注からお届けまで平均 28 日</p></div>
        <div className="timeline">
          <div className="timeline-row"><span>Day 1〜3</span><p>デザイン提案</p></div>
          <div className="timeline-row"><span>Day 4〜7</span><p>デザイン修正・最終確認</p></div>
          <div className="timeline-row"><span>Day 8〜10</span><p>ご入金確認・製作準備</p></div>
          <div className="timeline-row"><span>Day 11〜25</span><p>工場での製作</p></div>
          <div className="timeline-row"><span>Day 26〜28</span><p>検品・発送・お届け</p></div>
        </div>
      </section>
    </div>
  )
}

/* --- サイズ (Size) --- */
const SIZE_TABLE = [
  { size: '130', length: 50, chest: 38, shoulder: 35, sleeve: 16 },
  { size: '140', length: 54, chest: 40, shoulder: 37, sleeve: 17 },
  { size: '150', length: 58, chest: 42, shoulder: 39, sleeve: 18 },
  { size: '160', length: 62, chest: 44, shoulder: 41, sleeve: 19 },
  { size: 'S',   length: 65, chest: 46, shoulder: 43, sleeve: 20 },
  { size: 'M',   length: 68, chest: 49, shoulder: 45, sleeve: 21 },
  { size: 'L',   length: 71, chest: 52, shoulder: 47, sleeve: 22 },
  { size: 'XL',  length: 74, chest: 55, shoulder: 49, sleeve: 23 },
  { size: '2XL', length: 77, chest: 58, shoulder: 51, sleeve: 24 },
  { size: '3XL', length: 80, chest: 61, shoulder: 53, sleeve: 25 },
  { size: '4XL', length: 83, chest: 64, shoulder: 55, sleeve: 26 },
  { size: '5XL', length: 86, chest: 67, shoulder: 57, sleeve: 27 },
]

export function GuideSizePage() {
  return (
    <div className="page">
      <PageHero
        eyebrow="SIZE GUIDE"
        title="サイズ"
        lead="130cm のジュニアサイズから 7XL まで対応。カスタムサイズもご相談ください。"
      />
      <section className="page-section">
        <div className="section-head"><h2>シャツ サイズ表（cm）</h2></div>
        <div className="size-table-wrap">
          <table className="size-table">
            <thead>
              <tr>
                <th>サイズ</th>
                <th>着丈</th>
                <th>身幅</th>
                <th>肩幅</th>
                <th>袖丈</th>
              </tr>
            </thead>
            <tbody>
              {SIZE_TABLE.map((s) => (
                <tr key={s.size}>
                  <td><strong>{s.size}</strong></td>
                  <td>{s.length}</td>
                  <td>{s.chest}</td>
                  <td>{s.shoulder}</td>
                  <td>{s.sleeve}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="size-note">
          ※ 表記サイズは目安です。±2cm 程度の誤差が出る場合があります。<br />
          ※ カスタムサイズ（採寸対応）は 1 着 +¥800 にて承ります。
        </p>
      </section>
      <section className="page-section alt">
        <div className="section-head"><h2>サイズ選びのコツ</h2></div>
        <div className="tip-grid">
          <div className="tip-card">
            <h3>① お手持ちの服と比較</h3>
            <p>普段着ているシャツを平置きし、身幅・着丈を測って表と比較するのが最も確実です。</p>
          </div>
          <div className="tip-card">
            <h3>② 動きやすさ重視で +1 サイズ</h3>
            <p>ピッチャー・キャッチャーなど可動域が広いポジションは 1 サイズ大きめがおすすめ。</p>
          </div>
          <div className="tip-card">
            <h3>③ サンプル貸出を活用</h3>
            <p>実物で確認したい方は、無料サンプル貸出をご利用ください（最大 5 サイズまで）。</p>
          </div>
        </div>
      </section>
    </div>
  )
}

/* --- 生地案内 (Fabric) --- */
const FABRICS = [
  {
    name: 'ハイブリッドメッシュ',
    badge: '標準',
    image: t1,
    desc: '軽量でありながら高い耐久性。吸汗速乾・通気性に優れ、夏場でも快適に着用できます。',
    specs: ['ポリエステル 100%', '120g/m²', '4WAYストレッチ'],
  },
  {
    name: 'ダブルニット',
    badge: 'プロ仕様',
    image: t2,
    desc: '本格派の厚手生地。プロ野球の練習着にも採用される耐久性とフィット感。',
    specs: ['ポリエステル 100%', '210g/m²', '抗菌防臭加工'],
  },
  {
    name: 'ストレッチクール',
    badge: '夏向け',
    image: t3,
    desc: '冷感素材を採用した夏特化の高機能生地。日差しの強い屋外練習に。',
    specs: ['ポリエステル 92% / ポリウレタン 8%', '140g/m²', 'UV カット 90%'],
  },
  {
    name: '高密度メッシュ',
    badge: '高級',
    image: t4,
    desc: '緻密な編み目で発色が美しく、昇華プリントを最大限に活かす上位生地。',
    specs: ['ポリエステル 100%', '160g/m²', '高発色仕上げ'],
  },
]

export function GuideFabricPage() {
  return (
    <div className="page">
      <PageHero
        eyebrow="FABRIC GUIDE"
        title="生地案内"
        lead="4 種類の高機能生地から、用途・季節に合わせてお選びいただけます。"
      />
      <section className="page-section">
        <div className="fabric-grid">
          {FABRICS.map((f) => (
            <article className="fabric-card" key={f.name}>
              <div className="fabric-thumb"><img src={f.image} alt={f.name} /></div>
              <span className="fabric-badge">{f.badge}</span>
              <h3>{f.name}</h3>
              <p>{f.desc}</p>
              <ul>{f.specs.map((s) => <li key={s}>● {s}</li>)}</ul>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}

/* --- カラー (Color) --- */
const COLOR_GROUPS = [
  {
    group: 'ネイビー / ブルー系',
    colors: [
      { name: 'ネイビー', code: '#0b1c3c' },
      { name: 'ロイヤル', code: '#1a4cc4' },
      { name: 'スカイ', code: '#5fb6e8' },
      { name: 'ターコイズ', code: '#1cb6ad' },
      { name: 'コバルト', code: '#1351a0' },
    ],
  },
  {
    group: 'レッド / ピンク系',
    colors: [
      { name: 'レッド', code: '#c8102e' },
      { name: 'ワインレッド', code: '#7b1d2a' },
      { name: 'オレンジ', code: '#e85a1f' },
      { name: 'ピンク', code: '#e98ab1' },
      { name: 'コーラル', code: '#f17a6c' },
    ],
  },
  {
    group: 'イエロー / ゴールド系',
    colors: [
      { name: 'ゴールド', code: '#d9a22f' },
      { name: 'イエロー', code: '#f4cc1f' },
      { name: 'マスタード', code: '#c2902a' },
      { name: 'ベージュ', code: '#d8c5a0' },
    ],
  },
  {
    group: 'グリーン系',
    colors: [
      { name: 'フォレスト', code: '#1f5d3a' },
      { name: 'ケリーグリーン', code: '#2ba14c' },
      { name: 'ライム', code: '#a4d23c' },
      { name: 'カーキ', code: '#7b6b3f' },
    ],
  },
  {
    group: 'モノトーン',
    colors: [
      { name: 'ホワイト', code: '#ffffff' },
      { name: 'グレー', code: '#9aa0a8' },
      { name: 'チャコール', code: '#3a3f48' },
      { name: 'ブラック', code: '#101418' },
      { name: 'シルバー', code: '#c5c8cc' },
    ],
  },
]

export function GuideColorPage() {
  return (
    <div className="page">
      <PageHero
        eyebrow="COLOR GUIDE"
        title="カラー"
        lead="昇華プリントは色数無制限。チームカラーをそのまま再現できます。"
      />
      <section className="page-section">
        <div className="section-head"><h2>標準カラーパレット</h2><p>下記以外のカラーも DIC / PANTONE 番号でご指定可能です</p></div>
        <div className="color-groups">
          {COLOR_GROUPS.map((g) => (
            <div className="color-group" key={g.group}>
              <h3>{g.group}</h3>
              <div className="color-row">
                {g.colors.map((c) => (
                  <div className="color-chip" key={c.name}>
                    <span className="chip" style={{ background: c.code, border: c.name === 'ホワイト' ? '1px solid #ddd' : 'none' }} />
                    <span className="chip-name">{c.name}</span>
                    <span className="chip-code">{c.code.toUpperCase()}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

/* --- エンブレム (Emblem) --- */
const EMBLEMS = [
  { title: '胸マーク', desc: 'チームロゴを胸に。昇華 / 刺繍 / ワッペンから選択可能。', spec: 'W 18cm × H 8cm 推奨', image: t1 },
  { title: '袖番号', desc: '左右の袖に番号を配置。視認性アップ。', spec: 'W 6cm × H 8cm', image: t2 },
  { title: '背番号', desc: '背中に大きく番号を配置。チーム指定の書体で。', spec: 'W 20cm × H 25cm', image: t3 },
  { title: 'ネーム', desc: '背番号上部にローマ字で選手名。最大 12 文字。', spec: 'W 20cm × H 4cm', image: t4 },
  { title: 'ワッペン', desc: '取り外し可能なベルクロワッペン。複数チーム兼用にも。', spec: '直径 8cm まで', image: sale1 },
  { title: 'パンツ番号', desc: 'パンツの腿部分に番号を配置。', spec: 'W 8cm × H 10cm', image: sale2 },
]

export function GuideEmblemPage() {
  return (
    <div className="page">
      <PageHero
        eyebrow="EMBLEM GUIDE"
        title="エンブレム"
        lead="胸マーク・背番号・ネームなど、6 種類のマーキング位置を自由に指定できます。"
      />
      <section className="page-section">
        <div className="emblem-grid">
          {EMBLEMS.map((e) => (
            <div className="emblem-card" key={e.title}>
              <div className="emblem-thumb"><img src={e.image} alt={e.title} /></div>
              <div className="emblem-body">
                <h3>{e.title}</h3>
                <p>{e.desc}</p>
                <span className="emblem-spec">推奨サイズ: {e.spec}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

/* --- フォントガイド (Font) --- */
const FONTS = [
  { name: 'BLOCK', sample: 'TIGERS', family: '"Arial Black", sans-serif', desc: '視認性抜群の定番ブロック体' },
  { name: 'VARSITY', sample: 'EAGLES', family: '"Stencil Std", "Impact", sans-serif', desc: 'カレッジスタイルの王道書体' },
  { name: 'SCRIPT', sample: 'Lions', family: '"Brush Script MT", cursive', desc: '勢いある筆記体でクラシックに' },
  { name: 'OLD ENGLISH', sample: 'Knights', family: '"UnifrakturCook", "Times New Roman", serif', desc: '荘厳な雰囲気の中世風書体' },
  { name: 'GOTHIC', sample: 'WOLVES', family: '"Impact", sans-serif', desc: '太く力強いゴシック体' },
  { name: 'CONDENSED', sample: 'BEARS', family: '"Oswald", "Arial Narrow", sans-serif', desc: '縦長でスマートな印象' },
  { name: 'SERIF', sample: 'Hawks', family: 'Georgia, "Times New Roman", serif', desc: '伝統と格調を感じさせる書体' },
  { name: 'BUBBLE', sample: 'Stars', family: '"Comic Sans MS", cursive', desc: '丸みのある親しみやすい書体' },
]

export function GuideFontPage() {
  return (
    <div className="page">
      <PageHero
        eyebrow="FONT GUIDE"
        title="フォントガイド"
        lead="チーム名・選手名に使える 8 種類の標準書体。オリジナルフォントの持ち込みも可能。"
      />
      <section className="page-section">
        <div className="font-grid">
          {FONTS.map((f) => (
            <div className="font-card" key={f.name}>
              <div className="font-sample" style={{ fontFamily: f.family }}>{f.sample}</div>
              <div className="font-meta">
                <h3>{f.name}</h3>
                <p>{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

/* --- サンプル貸し出し (Sample Rental) --- */
export function GuideSamplePage() {
  return (
    <div className="page">
      <PageHero
        eyebrow="SAMPLE RENTAL"
        title="サンプル貸し出し"
        lead="生地・サイズを実物で確認してからご注文いただけます（送料弊社負担）。"
      />
      <section className="page-section">
        <div className="sample-feature">
          <div className="sample-card">
            <div className="sample-num">無料</div>
            <h3>レンタル料金</h3>
            <p>サンプルのレンタル料・往復送料はすべて無料でご利用いただけます。</p>
          </div>
          <div className="sample-card">
            <div className="sample-num">最大 5 着</div>
            <h3>貸出枚数</h3>
            <p>サイズ違い・生地違いで合計 5 着まで同時にお試しいただけます。</p>
          </div>
          <div className="sample-card">
            <div className="sample-num">7 日間</div>
            <h3>貸出期間</h3>
            <p>到着日から 7 日以内にご返送ください（着払いで OK）。</p>
          </div>
        </div>
      </section>
      <section className="page-section alt">
        <div className="section-head"><h2>ご利用の流れ</h2></div>
        <div className="steps">
          <div className="step-card"><div className="step-num">01</div><h3>お申込み</h3><p>LINE または専用フォームから希望サンプルを選択。</p></div>
          <div className="step-card"><div className="step-num">02</div><h3>発送</h3><p>営業日 1〜2 日でお手元に到着します。</p></div>
          <div className="step-card"><div className="step-num">03</div><h3>試着・検討</h3><p>サイズ感・生地感をチームで確認。</p></div>
          <div className="step-card"><div className="step-num">04</div><h3>ご返送</h3><p>同梱の着払い伝票でご返送ください。</p></div>
        </div>
      </section>
    </div>
  )
}

/* --- よくある質問 (FAQ) --- */
const FAQS = [
  { q: '何着から注文できますか？', a: '1 着からご注文可能です。デザイン無料制作は 3 着以上が対象です。' },
  { q: '納期はどのくらいですか？', a: '平均 28 日でお届けしています。お急ぎの場合はご相談ください（特急便 +¥3,000）。' },
  { q: '追加料金はかかりますか？', a: 'いいえ。表記の価格に追加料金は一切ありません。デザイン修正・カラー変更も無料です。' },
  { q: 'サンプルを借りることはできますか？', a: 'はい。サンプル貸出サービスを無料でご利用いただけます（最大 5 着・7 日間）。' },
  { q: '支払い方法は？', a: '銀行振込、クレジットカード、LINE Pay に対応しています。' },
  { q: '海外発送は可能ですか？', a: '現在は日本国内のみ対応しています。' },
  { q: 'デザインの著作権はどうなりますか？', a: '弊社で制作したオリジナルデザインの権利は、ご注文チーム様に帰属します。' },
  { q: '同じデザインで再注文できますか？', a: 'はい。デザインデータは弊社で 5 年間保管していますので、いつでも追加注文可能です。' },
  { q: 'チーム以外の個人注文も大丈夫ですか？', a: 'もちろんです。1 着からのご注文も大歓迎です。' },
  { q: 'デザインの持ち込みは可能ですか？', a: 'はい。Illustrator (.ai) または高解像度の画像データをお送りください。' },
]

export function GuideFaqPage() {
  const [openIdx, setOpenIdx] = useState(0)
  return (
    <div className="page">
      <PageHero
        eyebrow="FAQ"
        title="よくあるご質問"
        lead="お問い合わせの多いご質問をまとめました。"
      />
      <section className="page-section">
        <div className="faq-list">
          {FAQS.map((f, i) => (
            <div className={`faq-item ${openIdx === i ? 'open' : ''}`} key={f.q}>
              <button type="button" onClick={() => setOpenIdx(openIdx === i ? -1 : i)}>
                <span>Q. {f.q}</span>
                <span className="faq-toggle">{openIdx === i ? '−' : '+'}</span>
              </button>
              {openIdx === i && <div className="faq-answer">A. {f.a}</div>}
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

/* ============================================================ */
/* ============ デザインカタログ Sub-pages ===================== */
/* ============================================================ */

const CATALOG_DATA = {
  uniform: {
    title: 'ユニフォーム',
    eyebrow: 'UNIFORM CATALOG',
    lead: '320 種類のユニフォームデザインからお選びいただけます。',
    count: 320,
    items: [
      { name: 'CLASSIC ネイビー', code: 'U-001', image: t1 },
      { name: 'GOLD STRIPE', code: 'U-002', image: t2 },
      { name: 'WHITE PURE', code: 'U-003', image: t3 },
      { name: 'BLACK STORM', code: 'U-004', image: t4 },
      { name: 'CRIMSON FIRE', code: 'U-005', image: t1 },
      { name: 'OCEAN BLUE', code: 'U-006', image: t2 },
      { name: 'FOREST GREEN', code: 'U-007', image: t3 },
      { name: 'SUNSET ORANGE', code: 'U-008', image: t4 },
    ],
  },
  cap: {
    title: 'キャップ',
    eyebrow: 'CAP CATALOG',
    lead: '145 種類のキャップから、お気に入りの 1 つを。',
    count: 145,
    items: [
      { name: 'CLASSIC CAP', code: 'C-001', image: t3 },
      { name: 'MESH CAP', code: 'C-002', image: t4 },
      { name: 'STRAPBACK', code: 'C-003', image: t1 },
      { name: 'EMBROIDERED', code: 'C-004', image: t2 },
      { name: 'TRUCKER CAP', code: 'C-005', image: t3 },
      { name: 'FLAT BRIM', code: 'C-006', image: t4 },
    ],
  },
  outer: {
    title: 'アウター',
    eyebrow: 'OUTER CATALOG',
    lead: '88 種類のアウター。練習・遠征・観戦まで活躍。',
    count: 88,
    items: [
      { name: 'WIND BREAKER', code: 'O-001', image: sale2 },
      { name: 'FLEECE HOODY', code: 'O-002', image: sale3 },
      { name: 'PADDED JACKET', code: 'O-003', image: sale1 },
      { name: 'TEAM PARKA', code: 'O-004', image: sale2 },
      { name: 'COACH JACKET', code: 'O-005', image: sale3 },
      { name: 'BENCH COAT', code: 'O-006', image: sale1 },
    ],
  },
  socks: {
    title: 'オリジナルソックス',
    eyebrow: 'SOCKS CATALOG',
    lead: '52 種類のソックス。チームカラーで足元から統一感を。',
    count: 52,
    items: [
      { name: 'STRIPE SOCKS', code: 'S-001', image: sale4 },
      { name: 'PLAIN SOCKS', code: 'S-002', image: sale4 },
      { name: 'JACQUARD SOCKS', code: 'S-003', image: sale4 },
      { name: 'LONG SOCKS', code: 'S-004', image: sale4 },
    ],
  },
}

function CatalogSubPage({ data }) {
  return (
    <div className="page">
      <PageHero eyebrow={data.eyebrow} title={data.title} lead={data.lead} />
      <section className="page-section">
        <div className="catalog-meta">
          <span>合計 <strong>{data.count}</strong> 種類のデザイン</span>
        </div>
        <div className="catalog-grid">
          {data.items.map((item) => (
            <div className="catalog-item" key={item.code}>
              <div className="catalog-thumb"><img src={item.image} alt={item.name} /></div>
              <h3>{item.name}</h3>
              <p>{item.code}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export function CatalogUniformPage() { return <CatalogSubPage data={CATALOG_DATA.uniform} /> }
export function CatalogCapPage()     { return <CatalogSubPage data={CATALOG_DATA.cap} /> }
export function CatalogOuterPage()   { return <CatalogSubPage data={CATALOG_DATA.outer} /> }
export function CatalogSocksPage()   { return <CatalogSubPage data={CATALOG_DATA.socks} /> }

/* ============================================================ */
/* ============ 完成品・口コミ Sub-pages ====================== */
/* ============================================================ */

const TEAMS = [
  { team: 'Spirytus',        date: '2026.04.24', stars: 5, image: t1, body: 'デザインも価格も最高でした。スタッフの対応も丁寧で、納期も早かったです。' },
  { team: 'TAKATSU BOYS',    date: '2026.04.22', stars: 5, image: t2, body: '生地が厚くしっかりしていて、子供たちも大満足。来年もリピート確定です。' },
  { team: 'Seijyo leaguers', date: '2026.04.18', stars: 5, image: t3, body: '何度もリピートしています。今回も期待通りの仕上がり！' },
  { team: 'SIRIUS MIRAGE',   date: '2026.04.15', stars: 5, image: t4, body: 'デザイン提案がプロ仕様。チームの一体感が出ました。' },
  { team: 'Satte Kings',     date: '2026.04.10', stars: 5, image: t1, body: '納期が早く、急な大会前でも間に合いました。本当に感謝です。' },
  { team: 'TOBETSU WINGS',   date: '2026.04.05', stars: 5, image: t2, body: '刺繍の質感が想像以上。みんなテンション上がってます。' },
  { team: 'NORTH STARS',     date: '2026.03.30', stars: 5, image: t3, body: 'カラーリングが鮮やかで、夜のグラウンドでも映える！' },
  { team: 'TIGER PAWS',      date: '2026.03.22', stars: 4, image: t4, body: 'デザイン豊富で迷いましたが、結果大満足の仕上がりでした。' },
  { team: 'BLUE OCEANS',     date: '2026.03.15', stars: 5, image: t1, body: '個別の名前刺繍も綺麗で、選手たちが喜んでくれました。' },
]

export function FinishedGalleryPage() {
  return (
    <div className="page">
      <PageHero
        eyebrow="GALLERY"
        title="完成品ギャラリー"
        lead="10,000 チーム以上の制作実績。実際の完成品をご覧ください。"
      />
      <section className="page-section">
        <div className="rating-banner">
          <div className="rating-num">9.2<span>/10</span></div>
          <div className="rating-stars">★★★★★</div>
          <p>10,000 チーム以上の制作実績</p>
        </div>
        <div className="gallery-grid">
          {TEAMS.map((t) => (
            <article className="gallery-card" key={t.team + t.date}>
              <div className="gallery-thumb"><img src={t.image} alt={t.team} /></div>
              <div className="gallery-body">
                <h3>{t.team}</h3>
                <p className="review-date">{t.date} 納品</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}

export function FinishedReviewPage() {
  const [filter, setFilter] = useState('all')
  const filtered = filter === 'all' ? TEAMS : TEAMS.filter((t) => t.stars === Number(filter))
  return (
    <div className="page">
      <PageHero
        eyebrow="CUSTOMER REVIEW"
        title="お客様レビュー"
        lead="ご注文いただいたチーム様からのリアルな口コミ。"
      />
      <section className="page-section">
        <div className="review-filter">
          <button className={filter === 'all' ? 'active' : ''} onClick={() => setFilter('all')}>すべて</button>
          <button className={filter === '5' ? 'active' : ''} onClick={() => setFilter('5')}>★ 5</button>
          <button className={filter === '4' ? 'active' : ''} onClick={() => setFilter('4')}>★ 4</button>
        </div>
        <div className="review-list">
          {filtered.map((t) => (
            <article className="review-row" key={t.team + t.date}>
              <div className="review-row-stars">{'★'.repeat(t.stars)}{'☆'.repeat(5 - t.stars)}</div>
              <div className="review-row-body">
                <div className="review-row-head">
                  <h3>{t.team}</h3>
                  <span>{t.date}</span>
                </div>
                <p>{t.body}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}

/* ============ Blog Page ============ */
const POSTS = [
  { title: '【2026年版】野球ユニフォーム最新トレンド', date: '2026.04.28', tag: 'TREND', excerpt: '今シーズン注目のカラーリング、ロゴデザインのトレンドを徹底解説。' },
  { title: '昇華プリント vs 刺繍 — どっちを選ぶ？', date: '2026.04.20', tag: 'GUIDE', excerpt: 'メリット・デメリットを比較。チームに合った選び方をご紹介。' },
  { title: '失敗しないチームロゴの作り方', date: '2026.04.12', tag: 'DESIGN', excerpt: 'プロのデザイナーが教える、印象に残るロゴの作り方5つのポイント。' },
  { title: 'ナンバービブで個性を出すアイデア集', date: '2026.04.05', tag: 'IDEA', excerpt: 'ありきたりのナンバーから卒業しよう。特徴的な10事例を公開。' },
  { title: '初めてのオーダーメイド完全ガイド', date: '2026.03.28', tag: 'GUIDE', excerpt: 'はじめてユニフォームをオーダーする方向けに、流れと注意点をまとめました。' },
  { title: '生地の種類と特徴を完全解説', date: '2026.03.20', tag: 'KNOWLEDGE', excerpt: 'ポリエステルメッシュ、ニット、ダブルニット — 違いと選び方。' },
]

export function BlogPage() {
  return (
    <div className="page">
      <PageHero
        eyebrow="BLOG"
        title="ブログ"
        lead="ユニフォーム選びに役立つ情報・最新ニュース。"
      />
      <section className="page-section">
        <div className="blog-grid">
          {POSTS.map((p) => (
            <article className="blog-card" key={p.title}>
              <span className="blog-tag">{p.tag}</span>
              <h3>{p.title}</h3>
              <p className="blog-date">{p.date}</p>
              <p>{p.excerpt}</p>
              <a href="#" className="blog-readmore">続きを読む →</a>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}

/* ============ Payment Page ============ */
export function PaymentPage() {
  const [data, setData] = useState({ orderId: '', amount: '', name: '', email: '', method: 'card' })
  const handle = (k) => (e) => setData((d) => ({ ...d, [k]: e.target.value }))
  const submit = (e) => {
    e.preventDefault()
    alert(`お支払い情報を受け付けました。\n注文番号: ${data.orderId}\n金額: ¥${data.amount}`)
  }

  return (
    <div className="page">
      <PageHero
        eyebrow="PAYMENT"
        title="個別決済"
        lead="ご担当者からご案内された注文番号でお支払いください。"
      />
      <section className="page-section narrow">
        <form className="payment-form" onSubmit={submit}>
          <label>
            注文番号 <span className="req">必須</span>
            <input type="text" required value={data.orderId} onChange={handle('orderId')} placeholder="例: ILB-20260501-001" />
          </label>
          <label>
            お支払い金額（円） <span className="req">必須</span>
            <input type="number" required value={data.amount} onChange={handle('amount')} placeholder="例: 54000" />
          </label>
          <label>
            お名前 <span className="req">必須</span>
            <input type="text" required value={data.name} onChange={handle('name')} />
          </label>
          <label>
            メールアドレス <span className="req">必須</span>
            <input type="email" required value={data.email} onChange={handle('email')} />
          </label>
          <fieldset className="pay-method">
            <legend>お支払い方法</legend>
            <label className="pay-radio">
              <input type="radio" name="method" value="card" checked={data.method === 'card'} onChange={handle('method')} />
              <span>クレジットカード</span>
            </label>
            <label className="pay-radio">
              <input type="radio" name="method" value="bank" checked={data.method === 'bank'} onChange={handle('method')} />
              <span>銀行振込</span>
            </label>
            <label className="pay-radio">
              <input type="radio" name="method" value="line" checked={data.method === 'line'} onChange={handle('method')} />
              <span>LINE Pay</span>
            </label>
          </fieldset>
          <button type="submit" className="btn-primary full">お支払いに進む</button>
        </form>
      </section>
    </div>
  )
}
