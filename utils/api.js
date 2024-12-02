/**
 * API接口配置文件
 * 包含所有管理后台使用的接口地址
 * BASE_URL: 需要与后端确认具体的服务器地址
 */

export const API = {
  // 管理员接口
  ADMIN: {
    /**
     * 登录接口
     * Method: POST
     * @param {string} username - 用户名
     * @param {string} password - 密码
     * @returns {object} 包含token的响应对象
     * @note 需要确认返回的token格式和有效期
     */
    LOGIN: '/admin/login',

    /**
     * 退出登录接口
     * Method: POST
     * @requires Authorization
     * @note 需要确认是否需要在后端清除token
     */
    LOGOUT: '/admin/logout',

    /**
     * 获取平台概览数据
     * Method: GET
     * @requires Authorization
     * @returns {object} 包含以下字段：
     * - userCount: 用户总数
     * - orderCount: 订单总数
     * - productCount: 商品总数
     * - totalAmount: 总交易额
     * - todayNewUsers: 今日新增用户
     * - todayNewOrders: 今日新增订单
     * - todayAmount: 今日交易额
     * - orderCompletionRate: 订单完成率
     */
    OVERVIEW: '/admin/workspace/businessData',

    // 商品管理相关接口
    PRODUCT: {
      /**
       * 获取商品列表
       * Method: GET
       * @param {number} page - 页码
       * @param {number} pageSize - 每页数量
       * @param {string} [name] - 商品名称(可选)
       * @param {string} [categoryId] - 分类ID(可选)
       * @param {number} [status] - 商品状态(可选): 1-在售, 0-下架
       * @note 需要确认是否支持多状态同时筛选
       */
      LIST: '/admin/thing/page',

      /**
       * 添加商品
       * Method: POST
       * @param {object} data
       * - name: 商品名称
       * - categoryId: 分类ID
       * - price: 价格
       * - amount: 数量
       * - image: 图片地址
       * - description: 商品描述
       * @note 需要确认图片上传的具体流程和格式要求
       */
      ADD: '/admin/thing',

      /**
       * 更新商品信息
       * Method: PUT
       * @param {string} id - 商品ID
       * @param {object} data - 与ADD接口相同的字段
       * @note 需要确认是否支持部分字段更新
       */
      UPDATE: '/admin/thing',

      /**
       * 删除商品
       * Method: DELETE
       * @param {string} id - 商品ID
       * @note 需要确认是否支持批量删除
       */
      DELETE: '/admin/thing'
    },

    // 订单管理相关接口
    ORDER: {
      /**
       * 获取订单列表
       * Method: GET
       * @param {number} page - 页码
       * @param {number} pageSize - 每页数量
       * @param {string} [keyword] - 搜索关键词(可选)
       * @param {number} [status] - 订单状态(可选):
       * - 1: 待付款
       * - 2: 已付款
       * - 3: 交易中
       * - 4: 已完成
       * - 5: 已取消
       */
      LIST: '/admin/order/page',

      /**
       * 获取订单详情
       * Method: GET
       * @param {string} id - 订单ID
       * @returns {object} 包含订单详细信息和商品列表
       */
      DETAIL: '/admin/order/detail',

      /**
       * 更新订单状态
       * Method: PUT
       * @param {string} id - 订单ID
       * @param {number} status - 新状态
       * @note 需要确认状态流转的具体规则
       */
      UPDATE_STATUS: '/admin/order/status'
    },

    // 新闻管理相关接口
    NEWS: {
      /**
       * 获取新闻列表
       * Method: GET
       * @param {number} page - 页码
       * @param {number} pageSize - 每页数量
       * @note 需要确认是否支持按时间范围筛选
       */
      LIST: '/admin/news/list',

      /**
       * 添加新闻
       * Method: POST
       * @param {object} data
       * - detail: 新闻内容
       * - image: 图片地址
       * - sort: 排序值
       * @note 需要确认图片的尺寸要求
       */
      ADD: '/admin/news',

      /**
       * 更新新闻
       * Method: PUT
       * @param {string} id - 新闻ID
       * @param {object} data - 与ADD接口相同的字段
       */
      UPDATE: '/admin/news',

      /**
       * 删除新闻
       * Method: DELETE
       * @param {string} id - 新闻ID
       */
      DELETE: '/admin/news',

      /**
       * 更新新闻状态
       * Method: PUT
       * @param {string} id - 新闻ID
       * @param {number} status - 状态值: 1-启用, 0-禁用
       */
      UPDATE_STATUS: '/admin/news/status'
    },

    // 评论管理相关接口
    REMARK: {
      /**
       * 获取评论列表
       * Method: GET
       * @param {number} page - 页码
       * @param {number} pageSize - 每页数量
       * @param {string} [keyword] - 搜索关键词(可选)
       * @note 需要确认是否支持按评论时间筛选
       */
      LIST: '/admin/remark/page',

      /**
       * 删除评论
       * Method: DELETE
       * @param {string} id - 评论ID
       * @note 需要确认删除后是否影响相关统计数据
       */
      DELETE: '/admin/remark'
    },

    // 地址管理相关接口
    ADDRESS: {
      /**
       * 获取地址列表
       * Method: GET
       * @param {number} page - 页码
       * @param {number} pageSize - 每页数量
       * @note 需要确认是否支持按用户ID筛选
       */
      LIST: '/admin/address_book/list',

      /**
       * 更新地址信息
       * Method: PUT
       * @param {string} id - 地址ID
       * @param {object} data - 地址信息
       * @note 需要确认是否支持设置默认地址
       */
      UPDATE: '/admin/address_book'
    },

    // 购物车管理相关接口
    CART: {
      /**
       * 获取购物车列表
       * Method: GET
       * @param {number} page - 页码
       * @param {number} pageSize - 每页数量
       * @note 需要确认是否支持按用户ID筛选
       */
      LIST: '/admin/shopping_cart/list'
    }
  }
};

/**
 * 全局注意事项：
 * 1. 所有接口的响应格式需要统一，建议使用：
 *    {
 *      code: number,   // 状态码：200成功，其他表示失败
 *      msg: string,    // 响应信息
 *      data: any       // 响应数据
 *    }
 * 
 * 2. 分页接口的响应格式建议统一为：
 *    {
 *      records: array,    // 数据列表
 *      total: number,     // 总记录数
 *      size: number,      // 每页大小
 *      current: number    // 当前页码
 *    }
 * 
 * 3. 权限验证：
 *    - 需要确认token的传递方式（建议使用请求头Authorization）
 *    - 需要确认token的刷新机制
 *    - 需要确认权限不足时的响应格式
 * 
 * 4. 错误处理：
 *    - 需要确认各种错误情况的状态码
 *    - 需要确认错误信息的格式
 * 
 * 5. 文件上传：
 *    - 需要确认文件上传的大小限制
 *    - 需要确认支持的文件类型
 *    - 需要确认文件存储和访问策略
 */ 