FROM nginxinc/nginx-unprivileged:alpine

# Copy static website files to the default Nginx html serving directory
COPY index.html projects.html tools.html /usr/share/nginx/html/
COPY assets/ /usr/share/nginx/html/assets/

# Expose port 8080 (OpenShift router forwards to standard unprivileged port 8080 by default)
EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
