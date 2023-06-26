import Order from "../src/entity/Order";
import Product from "../src/entity/Product";

test('Deve testar a ordem', () => {
  const order = new Order('A');

  order.addItem(new Product('1', "A", 1000));
  order.addItem(new Product('1', "A", 1000));
  order.addItem(new Product('1', "A", 1000));

  expect(order.total).toEqual(3000)
  expect(order.items.length).toEqual(1)
});