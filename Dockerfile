# syntax=docker/dockerfile:1.7
# Static portfolio (single index.html + public/) served by nginx.
FROM nginx:1.27-alpine

# Replace default site with the portfolio.
RUN rm -rf /usr/share/nginx/html/*
COPY index.html /usr/share/nginx/html/
COPY public/ /usr/share/nginx/html/public/

EXPOSE 80
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -qO- http://localhost/ >/dev/null 2>&1 || exit 1

CMD ["nginx", "-g", "daemon off;"]
