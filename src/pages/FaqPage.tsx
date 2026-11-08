import { useState } from 'react'
import { Link } from 'react-router-dom'
import { faqs } from '../data'
import { usePageTitle } from '../usePageTitle'

export function FaqPage() {
  usePageTitle('FAQ | JuHen Cleaning Services')
  const [activeId, setActiveId] = useState(faqs[0].id)
  const [openQuestion, setOpenQuestion] = useState<string | null>(
    faqs[0].items[0]?.question ?? null,
  )
  const activeGroup = faqs.find((group) => group.id === activeId) ?? faqs[0]

  function showGroup(id: string) {
    const group = faqs.find((item) => item.id === id) ?? faqs[0]
    setActiveId(id)
    setOpenQuestion(group.items[0]?.question ?? null)
  }

  return (
    <main>
      <section className="page-hero">
        <div className="wrap">
          <p className="eyebrow">FAQ</p>
          <h1>Short answers, less hunting.</h1>
          <p className="lede">
            You don't need to be home. The quote is confirmed before we start.
            We usually reply within a day.
          </p>
        </div>
      </section>

      <section className="section faq-section">
        <div className="wrap">
          <div className="faq-layout">
            <div className="faq-tabs" role="tablist" aria-label="FAQ topics">
              {faqs.map((group) => {
                const selected = group.id === activeId

                return (
                  <button
                    className={selected ? 'faq-tab is-selected' : 'faq-tab'}
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    key={group.id}
                    onClick={() => showGroup(group.id)}
                  >
                    {group.category}
                  </button>
                )
              })}
            </div>

            <div className="faq-panel">
              {activeGroup.items.map((item) => {
                const isOpen = openQuestion === item.question

                return (
                  <div
                    className={isOpen ? 'faq-item is-open' : 'faq-item'}
                    key={item.question}
                  >
                    <button
                      className="faq-question"
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() =>
                        setOpenQuestion(isOpen ? null : item.question)
                      }
                    >
                      {item.question}
                    </button>
                    <div className="faq-answer" aria-hidden={!isOpen}>
                      <div className="faq-answer-inner">
                        <p>{item.answer}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap cta-band">
          <div>
            <h2>Still stuck?</h2>
            <p>Ask us, or send the estimate form. We'll follow up.</p>
          </div>
          <div className="faq-cta-actions">
            <Link className="btn btn-primary" to="/estimate">
              Request an estimate
            </Link>
            <Link className="btn btn-ghost" to="/contact">
              Contact us
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
