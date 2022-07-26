/**
 * @swagger
 *  components:
 *      schemas:
 *          DiscountPayment:
 *              type: object
 *              required:
 *                  -   discountCode
 *              properties:
 *                  discountCode:
 *                      type: string
 *                      description: the discountCode of course
 */

/**
 * @swagger
 *  /payment:
 *      post:
 *          tags: [Payment]
 *          summary: payment gateway for courses and products
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/DiscountPayment'
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/DiscountPayment'
 *          responses:
 *              200:
 *                  description: success
 */