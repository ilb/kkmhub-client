import ExampleReceipt from "./ExampleReceipt.mjs";

const receiptData = {
  id: 123,
  uid: "9b56c472-fbc8-439d-8510",
  date: "2024-11-01",
  products: [
    {
      name: "Плюшевый мишка",
      price: 899.99,
      quantity: 2,
    },
    {
      name: "Пазлы",
      price: 2399,
      quantity: 1,
    },
  ],
  cashier: {
    fullName: "Иванов Иван Иванович",
    inn: "123456789012",
  },
  buyer: {
    contacts: {
      phone: "79604955627"
    }
  },
};

const receipt = new ExampleReceipt(receiptData);
const formattedData = receipt.format();

console.log(formattedData);
