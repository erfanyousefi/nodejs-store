/**
 * @swagger
 *  tags:
 *      -   name : Support
 *          description :
 */
/**
 * @swagger
 *  components:
 *      schemas:
 *          Namespace:
 *              type: object
 *              required:
 *                  -   title
 *                  -   endpoint
 *              properties:
 *                  title:
 *                      type: string
 *                      description: the title of namespace
 *                  endpoint:
 *                      type: string
 *                      description: the endpoint of namespace
 *          Room:
 *              type: object
 *              required:
 *                  -   name
 *                  -   description
 *                  -   namespace
 *              properties:
 *                  name:
 *                      type: string
 *                      description: the title of category
 *                  description:
 *                      type: string
 *                      description: the description of text of blog
 *                  image:
 *                      type: file
 *                      description: the index picture of blog
 *                  namespace:
 *                      type: string
 *                      description: namespace of conversation
 */ 


/**
 * @swagger
 *  /support/namespace/add:
 *      post:
 *          tags: [Support]
 *          summary: add namespaces for chatroom
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/Namespace'
 *          responses:
 *              201:
 *                  description: success
 */
/**
 * @swagger
 *  /support/room/add:
 *      post:
 *          tags: [Support]
 *          summary: add room in namespaces for chatroom
 *          requestBody:
 *              required: true
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: '#/components/schemas/Room'
 *          responses:
 *              201:
 *                  description: success
 */