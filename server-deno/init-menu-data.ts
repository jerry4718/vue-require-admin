import { open, save } from "https://deno.land/x/sqlite/mod.ts";

// Open a database
const db = await open("data.db");

let id = 0;
const gen = {
  get id () {
    return ++id;
  },
};

interface Menu {
  id: number,
  parentId?: number,
  moduleUrl?: string,
  moduleName?: string,
  moduleDescribe?: string,
  moduleSequence?: number,
  childList?: Menu[],
}

const menuTree: Menu[] = [
  {
    id: gen.id,
    moduleUrl: '',
    moduleName: '用户管理',
    moduleDescribe: '管理用户数据',
    moduleSequence: 1,
    childList: [
      {
        id: gen.id,
        moduleUrl: '',
        moduleName: '用户管理',
        moduleDescribe: '用户列表数据',
        moduleSequence: 1,
        childList: [
          {
            id: gen.id,
            moduleUrl: 'user/normalList',
            moduleName: '用户列表',
            moduleDescribe: '用户信息一览',
            moduleSequence: 1,
            childList: [],
          },
          {
            id: gen.id,
            moduleUrl: 'user/businessList',
            moduleName: '商家用户',
            moduleDescribe: '商家用户管理',
            moduleSequence: 2,
            childList: [],
          },
          {
            id: gen.id,
            moduleUrl: 'user/blackList',
            moduleName: '黑名单',
            moduleDescribe: '黑名单用户管理',
            moduleSequence: 3,
            childList: [],
          },
        ],
      },
    ],
  },
  {
    id: gen.id,
    moduleUrl: '',
    moduleName: '订单管理',
    moduleDescribe: '管理订单数据',
    moduleSequence: 2,
    childList: [
      {
        id: gen.id,
        moduleUrl: '',
        moduleName: '订单管理',
        moduleDescribe: '订单信息管理',
        moduleSequence: 3,
        childList: [
          {
            id: gen.id,
            moduleUrl: 'order/normalList',
            moduleName: '订单列表',
            moduleDescribe: '订单信息查看',
            moduleSequence: 3,
            childList: [],
          },
          {
            id: gen.id,
            moduleUrl: 'order/overList',
            moduleName: '已完成订单',
            moduleDescribe: '已完成订单查看',
            moduleSequence: 3,
            childList: [],
          },
        ],
      },
      {
        id: gen.id,
        moduleUrl: '',
        moduleName: '订单审核',
        moduleDescribe: '审核管理',
        moduleSequence: 3,
        childList: [
          {
            id: gen.id,
            moduleUrl: 'order/verifyList',
            moduleName: '审核列表',
            moduleDescribe: '查看/审核订单',
            moduleSequence: 3,
            childList: [],
          },
        ],
      },
    ],
  },
  {
    id: gen.id,
    moduleUrl: '',
    moduleName: '系统管理',
    moduleDescribe: '管理系统配置信息',
    moduleSequence: 3,
    childList: [
      {
        id: gen.id,
        moduleUrl: '',
        moduleName: '权限管理',
        moduleDescribe: '调整权限配置信息',
        moduleSequence: 3,
        childList: [
          {
            id: gen.id,
            moduleUrl: 'menu/menuList',
            moduleName: '菜单列表',
            moduleDescribe: '调整菜单配置信息',
            moduleSequence: 3,
            childList: [],
          },
          {
            id: gen.id,
            moduleUrl: 'role/roleList',
            moduleName: '角色列表',
            moduleDescribe: '角色管理',
            moduleSequence: 3,
            childList: [],
          },
          {
            id: gen.id,
            moduleUrl: 'account/accountList',
            moduleName: '帐号列表',
            moduleDescribe: '帐号管理',
            moduleSequence: 3,
            childList: [],
          },
        ],
      },
      {
        id: gen.id,
        moduleUrl: '',
        moduleName: '配置管理',
        moduleDescribe: '调整系统配置信息',
        moduleSequence: 3,
        childList: [
          {
            id: gen.id,
            moduleUrl: 'config/localConfigList',
            moduleName: '配置列表',
            moduleDescribe: '配置管理',
            moduleSequence: 3,
            childList: [],
          },
        ],
      },
      {
        id: gen.id,
        moduleUrl: '',
        moduleName: '第三方配置管理',
        moduleDescribe: '调整第三方配置信息',
        moduleSequence: 3,
        childList: [
          {
            id: gen.id,
            moduleUrl: 'config/thirdConfigList/AliyunOSS',
            moduleName: '阿里云配置',
            moduleDescribe: '阿里云配置调整',
            moduleSequence: 3,
            childList: [],
          },
          {
            id: gen.id,
            moduleUrl: 'config/thirdConfigList/QiniuCloud',
            moduleName: '七牛云配置',
            moduleDescribe: '七牛云配置调整',
            moduleSequence: 3,
            childList: [],
          },
        ],
      },
      {
        id: gen.id,
        moduleUrl: '',
        moduleName: '日志管理',
        moduleDescribe: '查看日志信息',
        moduleSequence: 3,
        childList: [
          {
            id: gen.id,
            moduleUrl: 'log/logList',
            moduleName: '日志列表',
            moduleDescribe: '日志管理',
            moduleSequence: 3,
            childList: [],
          },
        ],
      },
    ],
  },
];

const menuData: Menu[] = [];

function tiling (parent: Menu = {id: 0, childList: menuTree}) {
  parent.childList?.forEach(m => {
    const {id, moduleUrl, moduleName, moduleDescribe, moduleSequence} = m;
    menuData.push({
      id, moduleUrl, moduleName, moduleDescribe, moduleSequence,
      parentId: parent.id,
    });
    tiling(m);
  });
}

tiling();

for (let menu of menuData) {
  let keys = Object.keys(menu) as ((keyof Menu)[]);
  let values = keys.map(k => menu[k]);
  // Run a simple query
  db.query(`
    INSERT INTO Menu (${keys.join(', ')}) 
    VALUES (${keys.map(k => '?').join(', ')})`,
    values);
}

// Save and close connection
await save(db);
db.close();
