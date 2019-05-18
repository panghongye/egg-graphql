---
    ### error code

    - 200-500: http错误
    - 10000 - 10999: 系统内部操作错误, 如DB, REDIS

    | 状态码  | 含义          | 说明             |
    | ---- | ----------- | ---------------- |
    | 200  | success     | 请求成功             |
    | 204  | no content  | 请求成功，但是没有返回内容    |
    | 304  | redirect    | 重定向              |
    | 400  | bad request | 参数错误，msg中有错误字段提示 |
    | 403  | forbidden   | 没有登录或者没有管理员权限 |
    | 404  | not found   | 接口不存在            |
    | 500  | error       | 服务器错误            |
    | 10001  | basic error       | 数据库DB操作失败 |
 



  返回前端的错误提示信息
   ```javascript
    ctx.errors = {
        message:"用户提示信息"
        field:"其他信息"
    }
   ```
        
       
       
  
      


