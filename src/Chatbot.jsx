import { useEffect, useRef, useState } from 'react'

const SUGGESTIONS = [
  '商品の価格は？',
  '納期はどのくらい？',
  '注文方法を教えて',
  'カスタマイズできる項目',
  '割引キャンペーン',
  '営業時間・連絡先',
]

const KNOWLEDGE = [
  {
    keys: ['価格', '値段', 'いくら', '料金', 'price', '가격'],
    answer:
      '【ユニフォーム価格 (1着・税込)】\n• 昇華 2ボタン: ¥5,400〜\n• 昇華 フルボタン: ¥5,900〜\n• 刺繍: ¥6,400〜\n• 昇華＋刺繍: ¥7,400〜\n\n追加料金は一切ありません！',
  },
  {
    keys: ['納期', '届く', '配送', 'いつ', 'delivery', '배송', '언제'],
    answer:
      'ご注文確定から平均 28 日でお届けしています。お急ぎの場合はお問い合わせください。',
  },
  {
    keys: ['注文', 'order', '頼み', '주문', '발주'],
    answer:
      'ご注文の流れ：\n1. LINE または無料デザイン依頼フォームからご相談\n2. 担当デザイナーがオリジナル案を作成（3着以上で無料）\n3. デザイン承認・ご入金\n4. 製作 → 平均28日でお届け',
  },
  {
    keys: ['カスタマイズ', 'カスタム', 'オプション', 'custom', '커스터마이징'],
    answer:
      '16種類のカスタマイズに対応：\nデザイン無料制作 / 商品ラインナップ / パンツ仕様 / キャップ仕様 / 7XLまでサイズ展開 / カスタムサイズ / サンプル貸出 / ナンバービブ / キャプテンマーク / 生地選択 / ワキ穴仕様 など',
  },
  {
    keys: ['割引', 'キャンペーン', 'セール', 'off', 'discount', '할인', '캠페인'],
    answer:
      '最大25%OFFキャンペーン実施中！\n• 昇華Tシャツ ¥2,980\n• フリースパーカー ¥4,900\n• 刺繍フリース ¥5,900\n• カスタムソックス20足 ¥13,800',
  },
  {
    keys: ['営業', '時間', '連絡', '電話', 'メール', 'line', '問い合わせ', '연락', '시간'],
    answer:
      '【お問い合わせ】\n📞 050-1808-1750\n📩 info@ilb-max.com\nLINE ID: @ilovebaseball\n\n営業時間: 平日 10:00 - 18:00（土日祝休み）',
  },
  {
    keys: ['素材', '生地', 'fabric', '원단'],
    answer:
      'ポリエステルメッシュ、ニット、ダブルニットなど複数の生地から選択可能です。サンプル貸出も承っています。',
  },
  {
    keys: ['サイズ', 'size', '사이즈'],
    answer:
      '7XL までの幅広いサイズ展開に加え、ご希望に応じたカスタムサイズの製作も可能です。',
  },
  {
    keys: ['レビュー', '口コミ', '評価', 'review', '평점', '리뷰'],
    answer:
      '平均満足度 ★ 9.2 / 10 ！ 10,000チーム以上の制作実績があります。',
  },
  {
    keys: ['野球', 'サッカー', 'バスケ', 'スポーツ', 'sport'],
    answer:
      'ILB-MAX は野球専門ですが、姉妹サイト MAX2MAX でサッカー・バスケットボール用ユニフォームも取り扱っています。',
  },
  {
    keys: ['会社', '運営', 'company', '회사'],
    answer:
      '運営: KALRON Co., Ltd. / 代表者: LEE DONG HOON / 登録番号: 2023-Seoul-3140',
  },
  {
    keys: ['こんにちは', 'hello', 'hi', 'やあ', '안녕'],
    answer: 'こんにちは！ILB-MAX サポートボットです 🤖⚾ 何でもお気軽にご質問ください。',
  },
]

const FALLBACK =
  'ご質問の内容について詳しくお調べします。お急ぎの場合は LINE (@ilovebaseball) または 050-1808-1750 までお問い合わせください。下のメニューからもご確認いただけます。'

function findAnswer(text) {
  const lower = text.toLowerCase()
  for (const item of KNOWLEDGE) {
    if (item.keys.some((k) => lower.includes(k.toLowerCase()))) {
      return item.answer
    }
  }
  return FALLBACK
}

export default function Chatbot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      role: 'bot',
      text: 'こんにちは！ILB-MAX サポートボットです ⚾\nご注文・商品・カスタマイズなど、何でもお気軽にご質問ください。',
    },
  ])
  const [input, setInput] = useState('')
  const listRef = useRef(null)

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight
    }
  }, [messages, open])

  const send = (text) => {
    const value = (text ?? input).trim()
    if (!value) return
    setMessages((prev) => [...prev, { role: 'user', text: value }])
    setInput('')
    setTimeout(() => {
      setMessages((prev) => [...prev, { role: 'bot', text: findAnswer(value) }])
    }, 350)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    send()
  }

  return (
    <>
      <button
        type="button"
        className={`chatbot-fab ${open ? 'open' : ''}`}
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'チャットを閉じる' : 'チャットを開く'}
      >
        {open ? '✕' : '💬'}
      </button>

      {open && (
        <div className="chatbot-window" role="dialog" aria-label="ILB-MAX サポートチャット">
          <div className="chatbot-header">
            <div className="chatbot-avatar">⚾</div>
            <div>
              <div className="chatbot-title">ILB-MAX サポート</div>
              <div className="chatbot-status">
                <span className="dot" /> オンライン
              </div>
            </div>
          </div>

          <div className="chatbot-messages" ref={listRef}>
            {messages.map((m, i) => (
              <div key={i} className={`msg msg-${m.role}`}>
                {m.text.split('\n').map((line, j) => (
                  <p key={j}>{line}</p>
                ))}
              </div>
            ))}
          </div>

          <div className="chatbot-suggest">
            {SUGGESTIONS.map((s) => (
              <button key={s} type="button" onClick={() => send(s)}>
                {s}
              </button>
            ))}
          </div>

          <form className="chatbot-input" onSubmit={handleSubmit}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="メッセージを入力..."
              aria-label="メッセージ入力"
            />
            <button type="submit" aria-label="送信">➤</button>
          </form>
        </div>
      )}
    </>
  )
}
