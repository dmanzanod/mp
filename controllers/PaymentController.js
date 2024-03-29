class PaymentController {
  constructor(subscriptionService) {
    this.subscriptionService = subscriptionService;
  }

  async getPaymentLink(req, res) {
    try {

      const articulo = req.query.articulo;
      const correo = req.query.correo;
      const cantidad = req.query.cantidad;
      const precio = req.query.precio;
      const rut = req.query.rut;
      const IDventa_ = req.query.idventa;

      
      const payment = await this.subscriptionService.createPayment(articulo, correo, cantidad, precio, rut, IDventa_);

      return res.json(payment);
    } catch (error) {
      console.log(error);

      return res
        .status(500)
        .json({ error: true, msg: "Failed to create payment" });
    }
  }

  async getSubscriptionLink(req, res) {
    try {
      const subscription = await this.subscriptionService.createSubscription();

      return res.json(subscription);
    } catch (error) {
      console.log(error);

      return res
        .status(500)
        .json({ error: true, msg: "Failed to create subscription" });
    }
  }
}

module.exports = PaymentController;
