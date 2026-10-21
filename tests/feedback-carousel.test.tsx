import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import FeedbackCarousel from '../src/components/FeedbackCarousel';

describe('FeedbackCarousel', () => {
  it('mostra um estado vazio transparente quando não existem feedbacks', () => {
    render(<FeedbackCarousel feedbacks={[]} />);

    expect(screen.getByText('Os feedbacks serão adicionados aqui.')).toBeInTheDocument();
    expect(screen.getByText(/sem publicar nomes ou experiências fictícias/i)).toBeInTheDocument();
  });

  it('permite navegar entre feedbacks cadastrados', () => {
    render(
      <FeedbackCarousel
        feedbacks={[
          { id: 'um', quote: 'Primeiro relato autorizado para o site.', author: 'Pessoa 1', context: '' },
          { id: 'dois', quote: 'Segundo relato autorizado para o site.', author: 'Pessoa 2', context: 'Tutora' },
        ]}
      />,
    );

    expect(screen.getByText(/Primeiro relato autorizado/)).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Próximo feedback' }));
    expect(screen.getByText(/Segundo relato autorizado/)).toBeInTheDocument();
    expect(screen.getByText('Tutora')).toBeInTheDocument();
  });
});
