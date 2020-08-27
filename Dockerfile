FROM registry.cn-hangzhou.aliyuncs.com/xinchao-test/nginx:1.13.8-alpine-perl
ADD ./dist/ /data/wwwroot/
ADD ./nginx.conf /etc/nginx/nginx.conf
ADD ./run.sh /data
RUN chmod a+x /data/run.sh
WORKDIR /data/
ENTRYPOINT sh /data/run.sh
