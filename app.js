const Koa = require("koa");
const body = require("koa-body");
const router = require("koa-router")();
const utility = require("utility"); //用于md5 加密
const fs = require("fs");
const path = require("path");
const os = require("os");
const koaStatic = require("koa-static");
const app = new Koa();
let dotenv = require("dotenv");
dotenv.config("./env");
const views = require("koa-views");

app.use(koaStatic(path.resolve(__dirname, "images")));
app.use(koaStatic(path.resolve(__dirname, "bundle")));

// 注册模板文件，指定相应文件夹
app.use(views(path.resolve(__dirname, "bundle")));

app.use(async (ctx, next) => {
  if (ctx.request.path.startsWith("/ps")) {
    await ctx.render("index");
  }
  await next();
});

/**
 * 判断上传文件夹是否存在
 */
app.use(async (ctx, next) => {
  const images_dir = path.resolve(__dirname, "images");
  fs.existsSync(images_dir) || fs.mkdirSync(images_dir);
  await next();
});

//用于解析 formData
router.use(body({ multipart: true }));

// 保存图片
router.post("/upload", (ctx, next) => {
  //获取 multipart 中 formData 文件信息
  let data = ctx.request.files.file;
  //创建图片名称
  let fileName = utility.md5(new Date().getTime() + " ");

  const render = fs.createReadStream(data.path);
  const image_dir = path.resolve(__dirname, "images");
  const image_name = fileName + "." + data.name.split(".")[1];
  let filePath = image_dir + "/" + image_name;

  // 创建写入流
  const upStream = fs.createWriteStream(filePath);
  render.pipe(upStream);

  // let address = os.networkInterfaces().WLAN[1].address;
  console.log(os.networkInterfaces().WLAN)
  filePath = `http://127.0.0.1:${process.env.PORT}/${image_name}`;

  ctx.body = filePath;
});

// 动态路由
// 获取图片 将图片转化成二进制发送给前端
router.get("/public/images/:imgName", (ctx, next) => {
  let path = ctx.url.slice(1);
  let data = fs.readFileSync(`${path}`, "binary");

  ctx.res.writeHead("200");
  ctx.res.write(data, "binary");
  ctx.res.end();
});

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(process.env.PORT, () => {
  console.log(`server run: http://127.0.0.1:${process.env.PORT}`);
});
