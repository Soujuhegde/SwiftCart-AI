export function generateInvoiceHtml(orderDetails: any) {
    const date = orderDetails?.date || new Date().toLocaleDateString();
    const total = orderDetails?.total || 0;
    const items = orderDetails?.items || [];
    const tax = total - (total / 1.08); // Assuming 8% tax included
    const subtotal = total - tax;

    const itemsHtml = items.map((item: any) => `
    <tr style="border-bottom: 1px solid #eee;">
      <td style="padding: 12px 0;">${item.product?.name || item.name || 'Item'}</td>
      <td style="padding: 12px 0; text-align: center;">${item.quantity}</td>
      <td style="padding: 12px 0; text-align: right;">Rs. ${item.price?.toFixed(2)}</td>
      <td style="padding: 12px 0; text-align: right;">Rs. ${(item.price * item.quantity).toFixed(2)}</td>
    </tr>
  `).join('');

    return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 8px; }
        .header { text-align: center; margin-bottom: 30px; }
        .header h1 { color: #2563eb; margin: 0; }
        .invoice-details { margin-bottom: 20px; }
        .table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
        .table th { text-align: left; border-bottom: 2px solid #eee; padding-bottom: 10px; color: #666; font-size: 12px; text-transform: uppercase; }
        .table td { padding: 10px 0; }
        .totals { padding-top: 20px; border-top: 2px solid #eee; }
        .total-row { display: flex; justify-content: space-between; margin-bottom: 5px; }
        .final-total { font-weight: bold; font-size: 18px; color: #2563eb; margin-top: 10px; }
        .footer { margin-top: 40px; text-align: center; font-size: 12px; color: #999; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>SwiftCart AI</h1>
          <p>Payment Receipt</p>
        </div>

        <div class="invoice-details">
          <p><strong>Date:</strong> ${date}</p>
          <p><strong>Transaction ID:</strong> #${Math.floor(Math.random() * 1000000)}</p>
        </div>

        <table class="table">
          <thead>
            <tr>
              <th style="width: 40%;">Item</th>
              <th style="text-align: center; width: 20%;">Qty</th>
              <th style="text-align: right; width: 20%;">Price</th>
              <th style="text-align: right; width: 20%;">Total</th>
            </tr>
          </thead>
          <tbody>
            ${itemsHtml}
          </tbody>
        </table>

        <div class="totals">
          <div class="total-row">
            <span>Subtotal</span>
            <span>Rs. ${subtotal.toFixed(2)}</span>
          </div>
          <div class="total-row">
            <span>Tax (8%)</span>
            <span>Rs. ${tax.toFixed(2)}</span>
          </div>
          <div class="total-row final-total">
            <span>Total</span>
            <span>Rs. ${total.toFixed(2)}</span>
          </div>
        </div>

        <div class="footer">
          <p>Thank you for shopping with SwiftCart AI</p>
          <p>This is an automated receipt.</p>
        </div>
      </div>
    </body>
    </html>
  `;
}
