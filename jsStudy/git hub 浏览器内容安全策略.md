content-security-policy响应头，内容安全策略，对html页面（即里面的js的行为）生效。不是对css或js生效。
default-src 'none'

base-uri 'self'

block-all-mixed-content 不能加载混合内容，即https页面加载http内容

connect-src 'self' uploads.github.com www.githubstatus.com collector.githubapp.com api.github.com github-cloud.s3.amazonaws.com github-production-repository-file-5c1aeb.s3.amazonaws.com github-production-upload-manifest-file-7fdce7.s3.amazonaws.com github-production-user-asset-6210df.s3.amazonaws.com cdn.optimizely.com logx.optimizely.com/v1/events wss://alive.github.com github.githubassets.com
  可以连接哪些服务器

font-src github.githubassets.com 可以加载来自哪里的字体

form-action 'self' github.com gist.github.com 表单可以提交到哪里

frame-ancestors 'none' 可以有谁做为本页面的frame祖先，none表示没有，即这个页面不能放入任何页面的iframe里

frame-src render.githubusercontent.com 可以嵌套哪里的页面在自己的frame里

img-src 'self' data: github.githubassets.com identicons.github.com collector.githubapp.com github-cloud.s3.amazonaws.com *.githubusercontent.com customer-stories-feed.github.com spotlights-feed.github.com

manifest-src 'self'

media-src github.githubassets.com

script-src github.githubassets.com

style-src 'unsafe-inline' github.githubassets.com

worker-src github.com/socket-worker-5029ae85.js gist.github.com/socket-worker-5029ae85.js