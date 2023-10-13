# SustainablePantry
SustainablePantry is a comprehensive full-stack web application designed to empower users in their mission to reduce food waste. With this user-friendly platform, individuals can easily catalog and manage their food inventory, keeping track of items and quantities. By simply providing their email address, users set themselves on a path to more sustainable consumption. SustainablePantry ensures that users stay informed and efficient by sending timely notifications when food items need to be replenished.

Beyond food inventory management, SustainablePantry offers an added layer of convenience by presenting users with a map of nearby grocery stores. This feature streamlines the process of restocking essential items, promoting conscious consumption while minimizing the need for wasteful last-minute trips.

## Tech Stack
#### Front-End
- React
- JavaScript
- React Router DOM for Client-Side Rendering
- HTML/CSS

#### Back-End
- Node.js
- Express
- MongoDB

#### Libraries and APIs Used
- MapBox API
- Overpass API
- Axios
- Nodemailer
- Google SMTP

## Usage
#### Enter an Email
Upon rendering, the user is asked to enter an email address where they can be notified when they have run out of an item. I achieved this by setting up nodemailer in the server and creating a transporter with gmail. The transporter is configured with a fixed email address that will be used to send an email to the user-entered email address. 


#### Add a Food Item
Clicking on the bottom right button will trigger a modal that prompts the user to enter an Item name, Description, and Quantity. This data is sent to the backend server which then adds it to the MongoDB database. I set the item model schema so that the Description property is optional and that Item name and Quantity are required to be successsfully added to the database. 

#### Track your Pantry
In the home page, you can view all of your food items, reduce the quanity, increase the quantity, and delete it altogether. To improve visual design, I leveraged reusable React components for the item cards and styled them using flex. Each item card has an ID that is ultimately sent to the backend to handle reduction, addition, or deletion and update the appropriate item in the MongoDB database.

#### Email notification
To allow for email notification, I set up a useEffect hook in the client side that pays attention to changes in item quantity. When an item quantity is reduced to 0, the client side sends the item data and the user's email to the server. There, the server extracts the item name to create a custom email message that is sent to the user's email. 

In the left hand side of the image, you can see that the quantity for Avocados is 0. So an email is automatically sent as shown on the right hand side of the image. 

#### Mapping Feature
We can navigate to the Discover page to view nearby grocery stores using the drop down menu that I configured with react router. 

This feature required a combination of steps to be achieved. First I used navigator.geolocation to get the user's coordinates obtained from the browser. Then, I interpolated the longitude and latitude points into a custom parameter string to call the Overpass API and get the coordinates for all nearby grocery stores. Finally, I used the MapBox API to plot each grocery store location and display a map to the user.