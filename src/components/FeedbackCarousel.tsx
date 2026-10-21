import { useState } from 'react';
import type { Feedback } from '../data/site';

interface Props {
  feedbacks: Feedback[];
}

export default function FeedbackCarousel({ feedbacks }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (feedbacks.length === 0) {
    return (
      <div className="feedback-empty" role="status">
        <span className="feedback-empty__mark" aria-hidden="true">
          “
        </span>
        <div>
          <p className="feedback-empty__label">Espaço preparado</p>
          <h2>Os feedbacks serão adicionados aqui.</h2>
          <p>A seção já está pronta para receber relatos autorizados, sem publicar nomes ou experiências fictícias.</p>
        </div>
      </div>
    );
  }

  const active = feedbacks[activeIndex];
  const goTo = (nextIndex: number) => {
    setActiveIndex((nextIndex + feedbacks.length) % feedbacks.length);
  };

  return (
    <section className="feedback-card" aria-roledescription="carrossel" aria-label="Feedbacks">
      <p className="feedback-card__count" aria-live="polite">
        {String(activeIndex + 1).padStart(2, '0')} / {String(feedbacks.length).padStart(2, '0')}
      </p>
      <blockquote>“{active.quote}”</blockquote>
      <p className="feedback-card__author">
        <strong>{active.author}</strong>
        {active.context && <span>{active.context}</span>}
      </p>
      {feedbacks.length > 1 && (
        <div className="feedback-card__actions">
          <button type="button" onClick={() => goTo(activeIndex - 1)} aria-label="Feedback anterior">
            ←
          </button>
          <button type="button" onClick={() => goTo(activeIndex + 1)} aria-label="Próximo feedback">
            →
          </button>
        </div>
      )}
    </section>
  );
}
