curl -
  XPOST -
  H('Content-Type: application/json') -
  H('x-client-id: "1310921f7496fa884f34f1b7e2290131"') -
  H('x-client-secret: "TEST2546b55a7e8f61ed7122b82aeb9cf09c41b7716e') -
  H('x-api-version: "2022-09-01"') -
  H('x-request-id: "developer_name"') -
  d({
    order_amount: 1.0,
    order_id: 'order_id',
    order_currency: 'INR',
    customer_details: {
      customer_id: 'customer_id-123',
      customer_name: 'customer_name',
      customer_email: 'wixmanipur@gmail.com',
      customer_phone: 9612920993,
    },
    order_meta: {
      notify_url: 'https://test.cashfree.com',
    },
    order_note: 'some order note here',
  })('https://sandbox.cashfree.com/pg/orders');
