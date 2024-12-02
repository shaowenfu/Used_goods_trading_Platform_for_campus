// pages/admin/admin.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentMenu: '', // 当前选中的菜单项
    pageTitle: '欢迎使用管理后台',
    submenuOpen: {
      products: false,
      users: false,
      orders: false,
      content: false,
      system: false
    },
    // 添加数据存储
    productList: [], // 商品列表
    orderList: [], // 订单列表
    userList: [], // 用户列表
    statistics: {}, // 统计数据
    // 分页相关
    currentPage: 1,
    pageSize: 10,
    total: 0,
    // 搜索条件
    searchForm: {
      name: '',
      categoryId: '',
      status: ''
    },
    statusOptions: [
      { value: '', label: '全部' },
      { value: '1', label: '在售' },
      { value: '0', label: '下架' }
    ],
    overview: {
      userCount: 0,
      orderCount: 0,
      productCount: 0,
      totalAmount: '0.00',
      todayNewUsers: 0,
      todayNewOrders: 0,
      todayAmount: '0.00',
      orderCompletionRate: '0'
    },
    productForm: {
      name: '',
      categoryId: '',
      price: '',
      amount: '',
      image: '',
      description: ''
    },
    categoryForm: {
      name: '',
      sort: ''
    },
    categories: [],
    userSearchForm: {
      name: '',
      phone: ''
    },
    marketerSearchForm: {
      name: '',
      phone: ''
    },
    userCurrentPage: 1,
    marketerCurrentPage: 1,
    userTotal: 0,
    marketerTotal: 0,
    orderSearchForm: {
      keyword: '',
      status: ''
    },
    orderStatusOptions: [
      { value: '', label: '全部状态' },
      { value: '1', label: '待付款' },
      { value: '2', label: '已付款' },
      { value: '3', label: '交易中' },
      { value: '4', label: '已完成' },
      { value: '5', label: '已取消' }
    ],
    orderStatusMap: {
      1: '待付款',
      2: '已付款',
      3: '交易中',
      4: '已完成',
      5: '已取消'
    },
    currentOrderId: null,
    orderDetail: null,
    newsList: [],
    commentList: [],
    commentSearchForm: {
      keyword: ''
    },
    addressSearchForm: {
      keyword: ''
    },
    cartSearchForm: {
      keyword: ''
    },
    addressList: [],
    cartList: [],
    addressCurrentPage: 1,
    cartCurrentPage: 1,
    addressTotal: 0,
    cartTotal: 0
  },
  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 加载初始数据
    this.loadStatisticsData();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },

  // 切换菜单项
  switchMenu(e) {
    const menu = e.currentTarget.dataset.menu;
    this.setData({
      currentMenu: menu,
      pageTitle: this.getPageTitle(menu),
      currentPage: 1 // 重置分页
    });

    // 根据菜单加载对应数据
    switch(menu) {
      case 'dashboard':
        this.loadOverviewData();
        break;
      case 'productList':
        this.loadProductList();
        break;
      case 'allOrders':
        this.loadOrderList();
        break;
      case 'userList':
        this.loadUserList();
        break;
      case 'statistics':
        this.loadStatisticsData();
        break;
    }
  },

  // 切换子菜单显示状态
  toggleSubmenu(e) {
    const group = e.currentTarget.dataset.group;
    const submenuOpen = this.data.submenuOpen;
    submenuOpen[group] = !submenuOpen[group];
    
    this.setData({
      submenuOpen
    });
  },

  // 处理子菜单项点击
  handleSubmenuItem(e) {
    const menu = e.currentTarget.dataset.menu;
    this.setData({
      currentMenu: menu,
      pageTitle: this.getPageTitle(menu)
    });
  },

  // 获取页面标题
  getPageTitle(menu) {
    const titles = {
      dashboard: '平台概览',
      // 商品管理
      productList: '商品列表',
      addProduct: '添加商品',
      categoryList: '分类管理',
      // 学生管理
      userList: '用户列表',
      marketerList: '商家列表',
      // 订单管理
      orderList: '订单列表',
      orderDetail: '订单明细',
      // 内容管理
      newsList: '新闻管理',
      commentList: '评论管理',
      // 系统设置
      addressList: '地址管理',
      cartList: '购物车管理'
    };
    return titles[menu] || '欢迎使用管理后台';
  },

  // 退出登录
  handleLogout() {
    wx.showModal({
      title: '提示',
      content: '确定要退出登录吗？',
      success: (res) => {
        if (res.confirm) {
          // 执行退出登录操作
          wx.redirectTo({
            url: '/pages/index/index'
          });
        }
      }
    });
  },

  // 加载统计数据
  async loadStatisticsData() {
    try {
      const res = await wx.request({
        url: '/admin/order/statistics',
        method: 'GET'
      });
      if(res.data.code === 200) {
        this.setData({
          statistics: res.data.data
        });
      }
    } catch(err) {
      console.error('加载统计数据失败:', err);
    }
  },

  // 加载商品列表
  async loadProductList() {
    try {
      const { currentPage, pageSize, searchForm } = this.data;
      const res = await wx.request({
        url: '/admin/thing/page',
        method: 'GET',
        data: {
          page: currentPage,
          pageSize,
          name: searchForm.name,
          categoryId: searchForm.categoryId,
          status: searchForm.status
        }
      });
      if(res.data.code === 200) {
        this.setData({
          productList: res.data.data.records,
          total: res.data.data.total
        });
      }
    } catch(err) {
      console.error('加载商品列表失败:', err);
    }
  },

  // 加载订单列表
  async loadOrderList() {
    try {
      const { currentPage, pageSize, orderSearchForm } = this.data;
      const res = await wx.request({
        url: '/admin/order/page',
        method: 'GET',
        data: {
          page: currentPage,
          pageSize,
          keyword: orderSearchForm.keyword,
          status: orderSearchForm.status
        }
      });
      if(res.data.code === 200) {
        this.setData({
          orderList: res.data.data.records,
          total: res.data.data.total
        });
      }
    } catch(err) {
      console.error('加载订单列表失败:', err);
    }
  },

  // 加载用户列表
  async loadUserList() {
    try {
      const { userCurrentPage, pageSize, userSearchForm } = this.data;
      const res = await wx.request({
        url: '/admin/user/page',
        method: 'GET',
        data: {
          page: userCurrentPage,
          pageSize,
          name: userSearchForm.name,
          phone: userSearchForm.phone
        }
      });
      if(res.data.code === 200) {
        this.setData({
          userList: res.data.data.records,
          userTotal: res.data.data.total
        });
      }
    } catch(err) {
      console.error('加载用户列表失败:', err);
    }
  },

  // 搜索商品
  handleSearch() {
    this.setData({ currentPage: 1 });
    this.loadProductList();
  },

  // 分页切换
  handlePageChange(e) {
    const page = e.detail;
    this.setData({ currentPage: page });
    
    // 根据当前页面重新加载数据
    const { currentMenu } = this.data;
    switch(currentMenu) {
      case 'productList':
        this.loadProductList();
        break;
      case 'allOrders':
        this.loadOrderList();
        break;
      case 'userList':
        this.loadUserList();
        break;
    }
  },

  // 处理状态选择
  handleStatusChange(e) {
    const status = e.detail.value;
    this.setData({
      'searchForm.status': status
    });
  },

  // 重置搜索条件
  handleReset() {
    this.setData({
      searchForm: {
        name: '',
        categoryId: '',
        status: ''
      },
      currentPage: 1
    });
    this.loadProductList();
  },

  // 加载平台概览数据
  async loadOverviewData() {
    try {
      // 加载总体统计数据
      const overviewRes = await wx.request({
        url: '/admin/workspace/businessData',
        method: 'GET'
      });

      // 加载商品概览数据
      const productRes = await wx.request({
        url: '/admin/workspace/overviewDishes',
        method: 'GET'
      });

      // 加载订单概览数据
      const orderRes = await wx.request({
        url: '/admin/workspace/overviewOrders',
        method: 'GET'
      });

      if (overviewRes.data.code === 200 && 
          productRes.data.code === 200 && 
          orderRes.data.code === 200) {
        
        const businessData = overviewRes.data.data;
        const productData = productRes.data.data;
        const orderData = orderRes.data.data;

        this.setData({
          overview: {
            userCount: orderData.allOrders || 0,
            orderCount: orderData.completedOrders || 0,
            productCount: productData.sold || 0,
            totalAmount: businessData.turnover || '0.00',
            todayNewUsers: orderData.unsolvedOrders || 0,
            todayNewOrders: orderData.tradingOrders || 0,
            todayAmount: businessData.turnover || '0.00',
            orderCompletionRate: (businessData.orderCompletionRate * 100).toFixed(1) || '0'
          }
        });
      }
    } catch(err) {
      console.error('加载平台概览数据失败:', err);
      wx.showToast({
        title: '加载数据失败',
        icon: 'none'
      });
    }
  },

  // 加载分类列表
  async loadCategories() {
    try {
      const res = await wx.request({
        url: '/admin/category/page',
        method: 'GET',
        data: {
          page: 1,
          pageSize: 100
        }
      });
      if(res.data.code === 200) {
        this.setData({
          categories: res.data.data.records
        });
      }
    } catch(err) {
      console.error('加载分类列表失败:', err);
    }
  },

  // 选择图片
  async chooseImage() {
    try {
      const res = await wx.chooseImage({
        count: 1,
        sizeType: ['compressed'],
        sourceType: ['album', 'camera']
      });
      // 这里应该先上传图片到服务器，获取URL
      this.setData({
        'productForm.image': res.tempFilePaths[0]
      });
    } catch(err) {
      console.error('选择图片失败:', err);
    }
  },

  // 添加商品
  async handleAddProduct(e) {
    const formData = e.detail.value;
    try {
      const res = await wx.request({
        url: '/admin/thing',
        method: 'POST',
        data: {
          ...formData,
          image: this.data.productForm.image,
          categoryId: this.data.productForm.categoryId
        }
      });
      if(res.data.code === 200) {
        wx.showToast({
          title: '添加成功',
          icon: 'success'
        });
        this.resetProductForm();
      }
    } catch(err) {
      console.error('添加商品失败:', err);
    }
  },

  // 添加分类
  async handleAddCategory() {
    try {
      const res = await wx.request({
        url: '/admin/category',
        method: 'POST',
        data: this.data.categoryForm
      });
      if(res.data.code === 200) {
        wx.showToast({
          title: '添加成功',
          icon: 'success'
        });
        this.loadCategories();
        this.resetCategoryForm();
      }
    } catch(err) {
      console.error('添加分类失败:', err);
    }
  },

  // 加载商家列表
  async loadMarketerList() {
    try {
      const { marketerCurrentPage, pageSize, marketerSearchForm } = this.data;
      const res = await wx.request({
        url: '/admin/marketer/page',
        method: 'GET',
        data: {
          page: marketerCurrentPage,
          pageSize,
          name: marketerSearchForm.name,
          phone: marketerSearchForm.phone
        }
      });
      if(res.data.code === 200) {
        this.setData({
          marketerList: res.data.data.records,
          marketerTotal: res.data.data.total
        });
      }
    } catch(err) {
      console.error('加载商家列表失败:', err);
    }
  },

  // 编辑用户
  async editUser(e) {
    const userId = e.currentTarget.dataset.id;
    // 实现编辑用户逻辑
  },

  // 编辑商家
  async editMarketer(e) {
    const marketerId = e.currentTarget.dataset.id;
    // 实现编辑商家逻辑
  },

  // 切换商家状态
  async toggleMarketerStatus(e) {
    const { id, status } = e.currentTarget.dataset;
    try {
      const res = await wx.request({
        url: `/admin/marketer/status/${status === 1 ? 0 : 1}`,
        method: 'POST',
        data: { id }
      });
      if(res.data.code === 200) {
        wx.showToast({
          title: '操作成功',
          icon: 'success'
        });
        this.loadMarketerList();
      }
    } catch(err) {
      console.error('切换商家状态失败:', err);
    }
  },

  // 删除商家
  async deleteMarketer(e) {
    const marketerId = e.currentTarget.dataset.id;
    wx.showModal({
      title: '提示',
      content: '确定要删除该商家吗？',
      success: async (res) => {
        if(res.confirm) {
          try {
            const res = await wx.request({
              url: `/admin/marketer/${marketerId}`,
              method: 'DELETE'
            });
            if(res.data.code === 200) {
              wx.showToast({
                title: '删除成功',
                icon: 'success'
              });
              this.loadMarketerList();
            }
          } catch(err) {
            console.error('删除商家失败:', err);
          }
        }
      }
    });
  },

  // 加载订单详情
  async loadOrderDetail(orderId) {
    try {
      const res = await wx.request({
        url: `/admin/order/detail/${orderId}`,
        method: 'GET'
      });
      if(res.data.code === 200) {
        this.setData({
          orderDetail: res.data.data
        });
      }
    } catch(err) {
      console.error('加载订单详情失败:', err);
    }
  },

  // 查看订单详情
  viewOrderDetail(e) {
    const orderId = e.currentTarget.dataset.id;
    this.setData({
      currentMenu: 'orderDetail',
      currentOrderId: orderId
    });
    this.loadOrderDetail(orderId);
  },

  // 处理订单
  async handleOrder(e) {
    const { id, action } = e.currentTarget.dataset;
    try {
      const res = await wx.request({
        url: `/admin/order/${action}/${id}`,
        method: 'PUT'
      });
      if(res.data.code === 200) {
        wx.showToast({
          title: '操作成功',
          icon: 'success'
        });
        this.loadOrderList();
      }
    } catch(err) {
      console.error('处理订单失败:', err);
    }
  },

  // 加载新闻列表
  async loadNewsList() {
    try {
      const res = await wx.request({
        url: '/admin/news/page',
        method: 'GET'
      });
      if(res.data.code === 200) {
        this.setData({
          newsList: res.data.data.records
        });
      }
    } catch(err) {
      console.error('加载新闻列表失败:', err);
    }
  },

  // 加载评论列表
  async loadCommentList() {
    try {
      const { commentSearchForm } = this.data;
      const res = await wx.request({
        url: '/admin/remark/page',
        method: 'GET',
        data: {
          keyword: commentSearchForm.keyword
        }
      });
      if(res.data.code === 200) {
        this.setData({
          commentList: res.data.data.records
        });
      }
    } catch(err) {
      console.error('加载评论列表失败:', err);
    }
  },

  // 删除新闻
  async deleteNews(e) {
    const newsId = e.currentTarget.dataset.id;
    wx.showModal({
      title: '提示',
      content: '确定要删除该新闻吗？',
      success: async (res) => {
        if(res.confirm) {
          try {
            const res = await wx.request({
              url: `/admin/news/${newsId}`,
              method: 'DELETE'
            });
            if(res.data.code === 200) {
              wx.showToast({
                title: '删除成功',
                icon: 'success'
              });
              this.loadNewsList();
            }
          } catch(err) {
            console.error('删除新闻失败:', err);
          }
        }
      }
    });
  },

  // 切换新闻状态
  async toggleNewsStatus(e) {
    const { id, status } = e.currentTarget.dataset;
    try {
      const res = await wx.request({
        url: `/admin/news/status/${status === 1 ? 0 : 1}`,
        method: 'PUT',
        data: { id }
      });
      if(res.data.code === 200) {
        wx.showToast({
          title: '操作成功',
          icon: 'success'
        });
        this.loadNewsList();
      }
    } catch(err) {
      console.error('切换新闻状态失败:', err);
    }
  },

  // 删除评论
  async deleteComment(e) {
    const commentId = e.currentTarget.dataset.id;
    wx.showModal({
      title: '提示',
      content: '确定要删除该评论吗？',
      success: async (res) => {
        if(res.confirm) {
          try {
            const res = await wx.request({
              url: `/admin/remark/${commentId}`,
              method: 'DELETE'
            });
            if(res.data.code === 200) {
              wx.showToast({
                title: '删除成功',
                icon: 'success'
              });
              this.loadCommentList();
            }
          } catch(err) {
            console.error('删除评论失败:', err);
          }
        }
      }
    });
  },

  // 加载地址列表
  async loadAddressList() {
    try {
      const { addressCurrentPage, pageSize, addressSearchForm } = this.data;
      const res = await wx.request({
        url: '/admin/address_book/page',
        method: 'GET',
        data: {
          page: addressCurrentPage,
          pageSize,
          keyword: addressSearchForm.keyword
        }
      });
      if(res.data.code === 200) {
        this.setData({
          addressList: res.data.data.records,
          addressTotal: res.data.data.total
        });
      }
    } catch(err) {
      console.error('加载地址列表失败:', err);
    }
  },

  // 加载购物车列表
  async loadCartList() {
    try {
      const { cartCurrentPage, pageSize, cartSearchForm } = this.data;
      const res = await wx.request({
        url: '/admin/shopping_cart/page',
        method: 'GET',
        data: {
          page: cartCurrentPage,
          pageSize,
          keyword: cartSearchForm.keyword
        }
      });
      if(res.data.code === 200) {
        this.setData({
          cartList: res.data.data.records,
          cartTotal: res.data.data.total
        });
      }
    } catch(err) {
      console.error('加载购物车列表失败:', err);
    }
  },

  // 编辑地址
  async editAddress(e) {
    const addressId = e.currentTarget.dataset.id;
    try {
      const res = await wx.request({
        url: `/admin/address_book/${addressId}`,
        method: 'GET'
      });
      if(res.data.code === 200) {
        // 显示编辑地址弹窗
        this.showEditAddressModal(res.data.data);
      }
    } catch(err) {
      console.error('获取地址详情失败:', err);
    }
  },

  // 处理地址分页
  handleAddressPageChange(e) {
    const page = e.currentTarget.dataset.page;
    this.setData({
      addressCurrentPage: page
    });
    this.loadAddressList();
  },

  // 处理购物车分页
  handleCartPageChange(e) {
    const page = e.currentTarget.dataset.page;
    this.setData({
      cartCurrentPage: page
    });
    this.loadCartList();
  },

  // 统一错误处理
  handleError(err, message = '操作失���') {
    console.error(message, err);
    wx.showToast({
      title: err.message || message,
      icon: 'none'
    });
  },

  // 使用示例
  async loadData() {
    try {
      const data = await this.loadProductList();
      this.setData({
        productList: data.records,
        total: data.total
      });
    } catch (err) {
      this.handleError(err, '加载商品列表失败');
    }
  }
})