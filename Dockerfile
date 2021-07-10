FROM node:14.17.3
WORKDIR /vite-backen-admin
COPY . /vite-backen-admin
RUN npm install vite -s
CMD npm run dev