import { render, screen } from '@testing-library/react';

import Options from '../Options';

// test('displays image for each scoop option from server', () => {
// ver nota *1
test('displays image for each scoop option from server', async () => {
  render(<Options optionType="scoops" />);

  // Find images
  // const scoopImages = screen.getByRole('img', { name: /scoop$/i });
  // *1  La linea anterior se reemplaza con la siguiente para resolver problemas de sincronia
  //     segun video 53 minuto 2 segundo 15
  const scoopImages = await screen.findAllByRole('img', { name: /scoop$/i });
  expect(scoopImages).toHaveLength(2);

  // confirm alt text
  const altText = scoopImages.map(element => element.alt);
  expect(altText).toEqual(['Chocolate scoop', 'Vanilla scoop']);
});

test('displays image for each topping options from server', async () => {
  render(<Options optionType="toppings" />);
  // Find images and expect that servermock returns 3 images
  const images = await screen.findAllByRole('img', { name: /topping$/i });
  expect(images).toHaveLength(3);

  const imageTitles = images.map(img => img.alt);
  expect(imageTitles).toEqual([
    'Cherries topping',
    'M&Ms topping',
    'Hot fudge topping',
  ]);
});
