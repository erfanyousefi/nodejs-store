
/**
 * @swagger
 *  components:
 *      schemas:
 *          Save-Discount:
 *              type: object
 *              required: 
 *                  -   courseID
 *                  -   code
 *                  -   value
 *              properties:
 *                  courseID:
 *                      type: string
 *                      description: the id of course              
 *                  code:
 *                      type: string
 *                      description: the code of discount
 *                      example: کد تخفیف                
 *                  value:
 *                      type: integer
 *                      description: the value of discount
 *                      example: 50               
 */
/**
 * @swagger
 *  /admin/discount/add:
 *      post:
 *          tags: [Discount(AdminPanel)]
 *          summary: create and save discount
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/Save-Discount'
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Save-Discount'
 *          
 *          responses:
 *              201:
 *                  description: created new course
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/publicDefinition'
 * 
 */

/**
 * @swagger
 *  /admin/discount/delete/{id}:
 *      delete:
 *          tags: [Discount(AdminPanel)]
 *          summary: edit and save course
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true      
 *          responses:
 *              200:
 *                  description: deleted discount
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/publicDefinition'
 * 
 */

/**
 * @swagger
 *  /admin/discount/list:
 *      get:
 *          tags: [Discount(AdminPanel)]
 *          summary: get all of discounts
 *          responses :
 *              200:
 *                  description: success
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/ListOfCourses'
 */
