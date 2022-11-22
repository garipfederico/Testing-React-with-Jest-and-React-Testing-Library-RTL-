import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import SummaryForm from '../SummaryForm';
import userEvent from '@testing-library/user-event';

test('Checkbox is unchecked by default', () => {
  render(<SummaryForm />);
  const checkbox = screen.getByRole('checkbox', {
    name: /i agree to terms and conditions/i,
  });
  expect(checkbox).not.toBeChecked();
});

test('Checking checkbox enabled button', () => {
  render(<SummaryForm />);
  const checkbox = screen.getByRole('checkbox', {
    name: 'I agree to Terms and Conditions',
  });
  const button = screen.getByRole('button', { name: 'Confirm order' });

  userEvent.click(checkbox);
  expect(button).toBeEnabled();
});

test('Unchecking checkbox again disables button', () => {
  render(<SummaryForm />);
  const checkbox = screen.getByRole('checkbox', {
    name: 'I agree to Terms and Conditions',
  });
  const button = screen.getByRole('button', { name: /confirm order/i });
  userEvent.click(checkbox);
  expect(button).toBeEnabled();

  userEvent.click(checkbox);
  expect(button).toBeDisabled();
});

test('popover responds to hover', async () => {
  // popover starts out hidden
  render(<SummaryForm />);
  const nullPopover = screen.queryByText(
    /no ice cream will actually be delivered/i,
  );
  expect(nullPopover).not.toBeInTheDocument();

  // popover appears upn mouseover of checkbox label
  const termsAndConditions = screen.getByText(/terms and conditions/i);
  userEvent.hover(termsAndConditions);

  // la siguiente linea falla si no hay texto, o sea arroja un error (continua)
  const popover = screen.getByText(/no ice cream will actually be delivered/i);
  // por lo que la siguiente no se llega a ejecutar, pero se considera una
  // buena practica incluirla ya que hace el codigo mas legible
  expect(popover).toBeInTheDocument();

  // popover disappears when we mouse out
  userEvent.unhover(termsAndConditions);
  await waitForElementToBeRemoved(() =>
    screen.queryByText(/no ice cream will actually be delivered/i),
  );
  // la siguiente linea ya no se usa??, de usarse deberia ser asicrono
  // expect(nullPopoverAgain).not.toBeInTheDocument();
});
