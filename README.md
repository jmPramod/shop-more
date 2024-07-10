#
## Simple Ecommerce  MERN Project(Next JS +Node JS)





I created an ecommerce platform using Next.js and Tailwind CSS for a responsive frontend, optimizing SEO and user experience. Node.js powers the backend, supported by Handlebars for efficient templating and Swagger for API documentation. The admin panel, built with Handlebars, facilitates seamless product and order management through intuitive CRUD operations. Key features include responsive design, secure API integrations, comprehensive analytics, and robust authentication for secure transactions. .



## Features
As an User, I can perform [Click to View](https://shop-more-fe.netlify.app/)

- Users can easily create an account, recover forgotten passwords via email reset links, and receive SMS notifications upon booking a product.
- They can browse through product listings, add items to their cart, and securely complete payments.
- Users can track the status of their orders in real-time and view their complete order history, providing transparency and convenience.

As a ADMIN I can do [Click to View](https://shop-more.vercel.app/login)

 - Admins can perform CRUD operations on products, including creating new products, updating existing ones, and deleting obsolete items from the inventory.
 - Super Admins have the authority to manage user roles, such as promoting users to admin status or demoting admins to regular users, ensuring proper access control and management hierarchy
 - They have access to comprehensive lists of all products, facilitating inventory management and strategic decision-making regarding stock levels and product offerings.
 - Admins can view and manage lists of both users and fellow administrators, allowing for efficient oversight and administration of the platform's user base.



## Tech

Food API uses a number of open source projects to work properly:

- [Node.js, Express] -Twilio, mongoose, Docker, Cloudinary, Multer, Swagger.[Click to View Backend hosted website](https://shop-more.vercel.app/login)
- [Next JS] - Axios, Redux toolkit, Tailwind CSS.[Click to View front end website](https://shop-more-fe.netlify.app/)



## Installation

Dillinger requires [Node.js](https://nodejs.org/) v10+ to run.

Install the dependencies and devDependencies and start the server.
For FrontEnd
```sh
cd client 
npm i
npm run dev
```
For Backend
```sh
cd server 
npm i
npm start
```



#### Building for source

For Frontend Build:

```sh
npm run build
```

for Backend Build
```sh
npm run build
```

## Docker

Dillinger is very easy to install and deploy in a Docker container.

By default, the Docker will expose port 8080, so change this within the
Dockerfile if necessary. When ready, simply use the Dockerfile to
build the image.

```sh
cd server
docker build -t <youruser>/dillinger:${package.json.version} .
```

This will create the dillinger image and pull in the necessary dependencies.
Be sure to swap out `${package.json.version}` with the actual
version of Dillinger.

Once done, run the Docker image and map the port to whatever you wish on
your host. In this example, we simply map port 8000 of the host to
port 8080 of the Docker (or whatever port was exposed in the Dockerfile):

```sh
docker run -d -p 8000:8080 --restart=always --cap-add=SYS_ADMIN --name=dillinger <youruser>/dillinger:${package.json.version}
```

> Note: `--capt-add=SYS-ADMIN` is required for PDF rendering.

Verify the deployment by navigating to your server address in
your preferred browser.

```sh
127.0.0.1:8000
```

   [PlGd]: <https://github.com/joemccann/dillinger/tree/master/plugins/googledrive/README.md>
   [PlOd]: <https://github.com/joemccann/dillinger/tree/master/plugins/onedrive/README.md>
   [PlMe]: <https://github.com/joemccann/dillinger/tree/master/plugins/medium/README.md>
   [PlGa]: <https://github.com/RahulHP/dillinger/blob/master/plugins/googleanalytics/README.md>


## Images of FrontEnd Project(Next js)
![image](https://github.com/jmPramod/shop-more/assets/107529743/333018c3-8520-4230-8b68-b83d5e6891cf)
![image](https://github.com/jmPramod/shop-more/assets/107529743/d6d05595-b852-4bed-a901-500ed9e0ff20)
![image](https://github.com/jmPramod/shop-more/assets/107529743/7708cc6a-c84b-46fe-80de-98cecfcb14ec)



















   
## Images of Backend Project( Handlebars)

![image](https://github.com/jmPramod/shop-more/assets/107529743/be0a58e3-c10b-485a-aef1-0d276315afcc)
![image](https://github.com/jmPramod/shop-more/assets/107529743/c76b242c-f31a-418c-8807-22adc7193e3d)
![image](https://github.com/jmPramod/shop-more/assets/107529743/ece8823f-fab9-4160-8843-135740ac037e)
![image](https://github.com/jmPramod/shop-more/assets/107529743/40ffbeb0-68e0-46cd-9021-05517fb3797b)
![image](https://github.com/jmPramod/shop-more/assets/107529743/5ca43e97-f68f-4f0e-aa74-9a46898d4b5f)


