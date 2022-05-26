/**
 * @swagger
 *  components:
 *      schemas:
 *          AddEpisode:
 *              type: object
 *              required:
 *                  -   courseID
 *                  -   chapterID
 *                  -   title       
 *                  -   text       
 *                  -   time       
 *                  -   type       
 *              properties:
 *                  courseID:
 *                      type: string
 *                      example: 62822e4ff68cdded54aa928d
 *                  chapterID: 
 *                      type: string
 *                      example: 628dd482330688179ab88203
 *                  title:
 *                      type: string
 *                      description: the title of episode
 *                      example: ویدیو شماره یک - متغیر ها
 *                  text: 
 *                      type: string
 *                      description: the describe about this episode
 *                      example: توی این قسمت بطور کامل دررابطه با .... گفته شده
 *                  type: 
 *                      type: string
 *                      description: the episode type (unlock or lock)
 *                      enum:
 *                          -   unlock
 *                          -   lock
 *                  time: 
 *                      type: string
 *                      description: the time of video (HH:mm:ss)
 *                      example: 00:07:24
 */
/**
 * @swagger
 *  /admin/episode/add:
 *      post:
 *          tags: [Episode(AdminPanel)]
 *          summary: create new Chapter for courses
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded: 
 *                      schema:
 *                          $ref: '#/components/schemas/AddEpisode'
 *                  application/json: 
 *                      schema:
 *                          $ref: '#/components/schemas/AddEpisode'
 *          responses:
 *              200:
 *                  description: success
 *                  content:
 *                      application/json:
 *                          schema: 
 *                              $ref: '#/definitions/publicDefinition'
 */
