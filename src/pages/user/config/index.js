/*
 * @Author         : your name
 * @Date           : 2022-03-12 22:19:04
 * @LastEditTime   : 2022-04-05 19:48:40
 * @LastEditors    : Please set LastEditors
 * @Description    : 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath       : /jinnian-cms-admin/src/pages/user/config/index.js
 */

import moment from "moment";

import {utils} from "src/boot/utils"

export const columns = [
  { name: "id", align: "left", label: "ID", field: "id" },
  {
    name: "name",
    required: true,
    label: "名字",
    align: "left",
    field: (row) => row.name,
    format: (val) => `${val}`,
  },
  { name: "password", align: "left", label: "密码", field: "password" },
  { name: "mark", align: "left", label: "备注", field: "mark" ,format: utils.default_format_substring },



  {
    name: "createdAt",
    align: "left",
    label: "创建时间",
    field: "createdAt",

    format: (val) => val? moment(val).format("YYYY-MM-DD HH:mm:ss "):'',
  },
  {
    name: "updatedAt",
    align: "left",
    label: "更新时间",
    field: "updatedAt",
    format: (val) => val? moment(val).format("YYYY-MM-DD HH:mm:ss "):'',
  },

  {
    name: "handle",
    align: "left",
    label: "操作",
    field: "handle",
    style: "width: 160px",
  },
];
