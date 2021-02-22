content-security-policy: 
内容安全策略
default-src 'none'; base-uri 'self'; 
block-all-mixed-content;
 connect-src 'self' uploads.github.com www.githubstatus.com collector.githubapp.com api.github.com github-cloud.s3.amazonaws.com github-production-repository-file-5c1aeb.s3.amazonaws.com github-production-upload-manifest-file-7fdce7.s3.amazonaws.com github-production-user-asset-6210df.s3.amazonaws.com 
 cdn.optimizely.com logx.optimizely.com/v1/events wss://alive.github.com github.githubassets.com; 
 font-src github.githubassets.com;
  form-action 'self' github.com gist.github.com;
   frame-ancestors 'none'; frame-src render.githubusercontent.com;
    img-src 'self' data: github.githubassets.com 
    identicons.github.com collector.githubapp.com
     github-cloud.s3.amazonaws.com *.githubusercontent.com customer-stories-feed.github.com spotlights-feed.github.com; manifest-src 'self';
media-src github.githubassets.com;
  script-src github.githubassets.com;
   style-src 'unsafe-inline' github.githubassets.com;
    worker-src github.com/socket-worker-5029ae85.js gist.github.com/socket-worker-5029ae85.js