# 小程序项目文档

## 项目简介
该项目是一个微信小程序项目管理员界面，用于校园二手物品交易平台的管理和运营。

## 更新日志
<details>
 <summary>日志详情</summary>
- 项目初始化
- 基础页面结构搭建
  - logs页面实现
  - utils工具类创建
- 管理后台界面实现
  - 创建admin页面
  - 实现响应式布局
  - 完成顶部导航栏和左侧菜单设计
- 管理后台界面优化
  - 调整导航栏宽度比例（16%）
  - 更新界面配色方案
  - 优化菜单层级结构
  - 完善二级菜单功能
  - 改进整体视觉效果
- 管理后台功能完善
  - 实现菜单交互功能
  - 添加下拉菜单动画效果
  - 完善页面标题动态更新
  - 添加退出登录功能
- 管理后台问题修复
  - 修复页面布局混乱问题
  - 优化菜单切换逻辑
  - 改进内容区显示效果
  - 完善子菜单展开机制
- 管理后台样式优化
  - 修复子菜单点击时的布局问题
  - 优化Flex布局的宽度计算
  - 改进内容区域的溢出控制
  - 完善盒模型计算方式
- 管理后台数据功能实现
  - 添加数据加载和展示功能
  - 实现商品列表页面
  - 添加搜索和分页功能
  - 优化表格展示效果
- 商品列表界面优化
  - 改进搜索表单布局
  - 优化表格展示效果
  - 美化状态标签和按钮
  - 完善分页器样式
  - 统一界面配色方案
- 管理后台菜单优化
  - 重构导航菜单结构
  - 优化功能分组
  - 添加新功能模块
  - 完善菜单命名
  - 调整功能层级
- 平台概览页面实现
  - 添加数据概览卡片
  - 实现今日数据统计
  - 设计响应式布局
  - 优化视觉展示效果
  - 完善数据加载逻辑
- 平台概览页面布局优化
  - 调整为纵向卡片布局
  - 优化组件尺寸和间距
  - 改进移动端适配
  - 完善布局稳定性
  - 统一视觉风格
- 商品和分类管理实现
  - 添加商品表单设计
  - 分类管理界面开发
  - 移动端适配优化
  - 表单交互完善
  - 数据流程对接
- 学生管理功能实现
  - 用户管理界面开发
  - 商家管理界面开发
  - 完善数据交互
  - 优化移动端布局
  - 添加操作反馈
- 用户和商家管理界面优化
  - 改进移动端适配
  - 优化列表布局设计
  - 调整操作按钮样式
  - 完善信息展示方式
  - 增强视觉反馈效果
- 订单管理功能实现
  - 订单列表页面开发
  - 订单详情页面开发
  - 订单状态管理
  - 移动端布局优化
  - 订单操作功能
- 内容管理功能实现
  - 新闻管理界面开发
  - 评论管理界面开发
  - 新闻发布和编辑
  - 评论审核功能
  - 移动端布局优化
- 系统设置功能实现
  - 地址管理界面开发
  - 购物车管理界面开发
  - 搜索和分页功能
  - 移动端布局优化
  - 数据展示完善
- API接口优化
  - 统一API请求处理
  - 添加请求/响应拦截器
  - 完善错误处理机制
  - 规范化API路径配置
  - 添加接口文档对照
</details>

## 功能实现记录

### 日志系统
- 位置：`pages/logs`
- 功能：记录并展示用户操作日志
- 实现文件：
  - logs.js：日志页面逻辑
  - logs.wxml：日志页面结构
  - utils/util.js：工具函数

### 管理后台
- 位置：`pages/admin`
- 功能：提供管理员操作界面
- 实现文件：
  - admin.wxml：页面结构
  - admin.wxss：页面样式
- 主要功能：
  - 响应式布局设计
  - 顶部导航栏（高度优化）
  - 左侧菜单栏（宽度占比20%）
  - 右侧内容展示区（含欢迎页面）
- 配色方案：
  - 主色：深蓝色 (#1a237e)
  - 次要色：浅蓝色 (#3949ab)
  - 背景色：白色和浅灰色 (#f5f5f5)
- 字体方案：
  - 使用现代系统字体栈
  - 优化字体大小层级

### API文档说明
- 接口配置文件：`utils/api.js`
- 包含接口说明、参数定义和注意事项
- 需要与后端确认的内容已在注释中标注
- 建议定期同步更新接口文档

## 待办事项
- [ ] 完善项目文档
- [ ] 添加更多功能模块
- [ ] 优化用户体验
- [ ] 实现管理后台的具体功能
- [ ] 添加数据管理接口

## 项目结构
