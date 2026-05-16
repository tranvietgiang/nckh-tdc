# Sử dụng node
FROM node:20-alpine

# Tạo thư mục app
WORKDIR /app

# Copy package.json trước để cache
COPY package*.json ./

# Cài dependencies
RUN npm install

# Copy toàn bộ source
COPY . .

# Build React (Vite)
RUN npm run build

# Cài serve
RUN npm install -g serve

# Port
EXPOSE 3000

# Run app
CMD ["serve", "-s", "dist", "-l", "3000"]