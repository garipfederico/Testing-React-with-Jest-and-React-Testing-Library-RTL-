import { render, screen } from 'testing-library/react';
import userEvent from '@testing-library/user-event';
import Options from '../Options';

test('update scoop subtotal when sxoops change', async () => {
    const user = userEvent.setUp();
  render(<Options optionType="scoops" />);

  // make sure total start out $0,00
  const scoopsSubtotal = screen.getByText('Scoops total: $', { exact: false });

  expect(scoopsSubtotal).toHaveTextContent('0.00');

  //update vanilla sxoops to 1 and check the subtotal
    const vanillaInput = await screen.findByRole('spinbutton', {name:'Vanilla'});

    await user.clear(vanillaInput)
    await user.Type(vanillaInput,'1');
    expect(scoopsSubtotal).toHaveTextContent('2.00');

  //update chocolate scoops to 2 and check subtotal
const chocolateInput = await screen.findByRole('spinbutton', {name:'Chocolate'});

await user.clear(chocolateInput);
await user.Type(chocolateInput,'2');
expect(scoopsSubtotal).toHaveTextContent("6.00");

});
