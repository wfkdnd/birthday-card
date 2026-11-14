# 生日快乐 · 静态动画贺卡

直接双击 `index.html` 即可打开，无需安装依赖、构建或联网。

- 五根蜡烛从左到右对应二进制 `10101`：点亮时仅第 1、3、5 根有烛光，代表十进制 `21`。许愿后点击吹灭蜡烛，触发彩纸动画。
- 点击唯一的信封打开 GPT 与 DS 的共同生日祝福，支持 Esc 关闭；信封不写收件人称呼。
- GPT 与 DS 的形象缩小固定在左下角，上方标注「联合制作」，手机端进一步缩小。
- 点击「联合制作」依次显示「其实是一作和二作」、「AI这么强咋办啊」、「（其实还是一股AI味）」，第四次点击收起，之后重新循环。
- 署名彩蛋：大写 `WFK` 的十六进制 ASCII 为 `57 46 4B`，逐字节与 `0xBF` 异或，得到 `E8 F9 F4`。署名分为两行：第一行 `GPT,DS`，第二行 `& Master of AI Agents: E8F9F4`，点击密文输入网页底部的钥匙 `0xBF`（也接受 `BF` 或 `bf`），即可将密文还原为大写 `WFK`。这是生日小谜题。
- 已移除生日音乐。右上角「放礼花」按钮与吹灭蜡烛操作会触发短促的礼花音效，只有点击后才播放，无循环背景音乐。
- 适配手机和桌面；跟随系统的减少动态效果设置。

修改祝福文字：编辑 `index.html` 中的标题、祝福弹窗和副标题。
修改颜色：编辑 `style.css` 开头的 CSS 变量。

页面采用原生 HTML、CSS、JavaScript。两个形象使用 165px 宽的 WebP 小图，合计 20,926 字节，已内嵌到 HTML，可离线显示，不依赖额外图片请求、外部字体或服务。原始 PNG 文件仍保留在 assets。


## GPT 龙娘图片来源

- 改编图作者：ApprenTice（AI 辅助派生图）
- 参考角色设计：ZipZipPipe
- 原图：https://github.com/Apprentice-Geo/AI-Fanworks/blob/ee1f5176710f3bcfd60ee5cb0af00f77ed96748e/ApprenTice/AI-Girls-and-Chibis/ChatGPT-Chibi.png
- 作者许可声明：https://github.com/Apprentice-Geo/AI-Fanworks/blob/ee1f5176710f3bcfd60ee5cb0af00f77ed96748e/ApprenTice/AI-Girls-and-Chibis/README.md
- 图片许可：CC BY-NC-SA 4.0（署名、非商业、相同方式共享），https://creativecommons.org/licenses/by-nc-sa/4.0/
- 图片文件：assets/gpt-dragon-chibi.png。保留原图字节，网页仅通过 CSS 排版显示，未修改原始图片。
- 本地来源记录：assets/gpt-dragon-source.json。

这是非官方同人形象。贺卡中的两份祝福已合并为一封共同署名的信。


## DeepSeek 鲸鱼娘图片来源

- Q 版形象作者：YunYueSama（「大肥鱼／鲸鱼娘」Q 版正面全身）
- 来源仓库：https://github.com/YunYueSama/codex-deepseek-pet
- 原图：`assets/whale/portrait.png`（1024×1024 透明底），本仓库按透明像素包围盒裁剪为正面全身 Q 版
- 许可：大肥鱼项目署名许可 1.0（自定义许可，非标准 MIT），须保留「作者：YunYueSama；仓库：https://github.com/YunYueSama/codex-deepseek-pet」
- 图片文件：assets/deepseek-whale-chibi.png；本地来源记录：assets/deepseek-whale-source.json

这是围绕 DeepSeek 鲸鱼娘的社区二创，不是 DeepSeek 官方产品；底层社区角色参考（上善无形、ZipZipPipe 等）仍归各自权利人，详见仓库的 ASSET_LICENSE.md。

原有 DeepSeek 祝福中的出发、靠岸与按自己节奏前进的心意，已融入合并后的生日信。


## GitHub Pages 部署

1. 在 `wfkdnd` 账号下创建 `birthday-card` 仓库。
2. 将本目录中的 `index.html`、`style.css`、`script.js`、`.nojekyll` 和 `assets/` 上传到仓库根目录，保留 README 中的素材署名与许可说明。
3. 仓库 Settings → Pages → Build and deployment 中选择 Deploy from a branch，分支选择 main、目录选择 / (root)，保存。
4. 等待 GitHub Pages 构建完成，通过设置页给出的 Visit site 链接查看网页。

页面底部仅保留仓库链接 `https://github.com/wfkdnd/birthday-card`，不附带关注文案。


## 图片加载优化

原始两张 PNG 合计 2,529,021 字节；网页实际使用的 WebP 小图合计 20,926 字节，体积减少 99.17%。

- `assets/gpt-dragon-mini.webp`：由原 PNG 等比缩小至 165px 宽，WebP quality 82，沿用原图 CC BY-NC-SA 4.0 条款及署名。
- `assets/deepseek-whale-mini.webp`：由原 PNG 等比缩小至 165px 宽，保留透明度，WebP quality 82，沿用原图作者许可和署名。
- 小图以 data URL 内嵌到 `index.html`。原始 PNG 文件与来源记录保持保留。
