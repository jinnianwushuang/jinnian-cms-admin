/*
 * @Author         : your name
 * @Date           : 2022-03-12 22:19:04
 * @LastEditTime   : 2022-04-05 20:15:47
 * @LastEditors    : Please set LastEditors
 * @Description    : 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath       : /jinnian-cms-admin/src/pages/faq/config/index.js
 */

import moment from "moment";

export const columns = [
  { name: "id", align: "left", label: "ID", field: "id" },
  { name: "title_zn", align: "left", label: "标题中文", field: "title_zn"   ,    },
  { name: "title_en", align: "left", label: "标题英文", field: "title_en" ,  },



  {
    name: "status",
    align: "left",
    label: "状态",
    field: "status",

  },
  {
    name: "is_top",
    align: "left",
    label: "置顶",
    field: "is_top",
    format: (val) => val?'是':''  ,
  },


  {
    name: "createdAt",
    align: "left",
    label: "创建时间",
    field: "createdAt",

    format: (val) => (val ? moment(val).format("YYYY-MM-DD HH:mm:ss ") : ""),
  },
  {
    name: "updatedAt",
    align: "left",
    label: "更新时间",
    field: "updatedAt",
    format: (val) => (val ? moment(val).format("YYYY-MM-DD HH:mm:ss ") : ""),
  },

  {
    name: "handle",
    align: "left",
    label: "操作",
    field: "handle",
    style: "width: 160px",
  },
];
