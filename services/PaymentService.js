const axios = require("axios");

class PaymentService {
  async createPayment(articulo, correo, cantidad, precio) {
    const url = "https://api.mercadopago.com/checkout/preferences";

    const body = {
      payer_email: correo,
      items: [
        {
          title: articulo,
          description: articulo,
          picture_url: "http://www.myapp.com/myimage.jpg",
          category_id: "Lubricante",
          quantity: Number(cantidad),
          currency_id: "CLP",
          unit_price: Number(precio) //precio unitario // Mercado pago convierte
        }
      ],
      back_urls: {
        failure: "https://wa.me/56932273198?text=ayuda",
        pending: "https://wa.me/56932273198?text=Pendiente de Pago!",
        success: "https://wa.me/56932273198?text=¡Gracias Pago realizado!"
      }
    };

    const payment = await axios.post(url, body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.ACCESS_TOKEN}`
      }
    });

    return payment.data;
  }

  async createSubscription() {
    const url = "https://api.mercadopago.com/preapproval";

    const body = {
      reason: "Suscripción de ejemplo",
      auto_recurring: {
        frequency: 1,
        frequency_type: "months",
        transaction_amount: 10,
        currency_id: "CLP"
      },
      back_url: "https://wa.me/56932273198?text=hola",
      payer_email: "test_user_22631142@testuser.com"
    };

    const subscription = await axios.post(url, body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.ACCESS_TOKEN}`
      }
    });

    return subscription.data;
  }
}

module.exports = PaymentService;
