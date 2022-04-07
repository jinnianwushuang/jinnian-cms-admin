/*
 * @Author         : your name
 * @Date           : 2022-03-12 22:19:04
 * @LastEditTime   : 2022-04-05 17:11:38
 * @LastEditors    : Please set LastEditors
 * @Description    : 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath       : /jinnian-cms-admin/src/pages/articleTopic/config/index.js
 */

import moment from "moment";

export const columns = [
  { name: "id", align: "left", label: "ID", field: "id" },
  { name: "sid", align: "left", label: "SID", field: "sid" },
  {
    name: "name_zn",

    label: "名字中文",
    align: "left",
    field: "name_zn"
  },
  {
    name: "name_en",

    label: "名字英文",
    align: "left",
    field: "name_en"
  },
  {
    name: "status",
    align: "left",
    label: "状态",
    field: "status",

  },
  {
    name: "order",
    align: "left",
    label: "排序",
    field: "order",

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
