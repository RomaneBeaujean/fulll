import { render } from '@testing-library/react';
import App from './App';

describe('App component', () => {
  it('renders Header and UserSearch components', () => {
    render(<App />);

    expect(document.querySelector('.header')).toBeInTheDocument();
    expect(document.querySelector('.user-search')).toBeInTheDocument();
  });
});
