FROM node:18


WORKDIR /app

# انسخ ملفات البروجكت
COPY package*.json ./
RUN npm install

# انسخ باقي الملفات (server.js وغيره)
COPY . .

# حدد البورت
EXPOSE 3000

# شغّل التطبيق
CMD ["node", "server.js"]
