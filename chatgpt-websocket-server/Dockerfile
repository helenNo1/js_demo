# 基于镜像基础
FROM python:3.9.13
WORKDIR /app

# 复制文件到容器中
COPY . /app
 
# 工作目录 /app
RUN chmod +x *.sh 
RUN /app/install.sh
CMD /app/startup.sh
