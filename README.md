Mini Instagram Clone

A full-stack Instagram-style social media application where users can sign up, log in, create posts, like and comment on posts, follow other users, and view profiles.
This project was built as part of a backend + frontend task to demonstrate REST APIs, authentication, and dynamic UI rendering.

#Live Demo
https://anurag910955-tru-ei-gtech-task-inst.vercel.app

#Tech Stack
Frontend
1.React (Vite)
2.React Router
3.Axios
4.Inline CSS (custom, responsive UI)

Backend
1.Node.js
2.Express.js
3.MongoDB 
4.JWT Authentication
5.bcryptjs

#Deployment
1.Frontend: Vercel
2.Backend: Render
3.Database: MongoDB Atlas

#Features
Authentication
1.User Signup
2.User Login
3.Password hashing using bcrypt
4.JWT-based authentication for protected routes

#Follow System
1.Follow / Unfollow users
2.View followers & following count
3.Popup list to see followers/following
4.Click a user to visit their profile

#Posts
1.Create a post (image URL + caption)
2.View posts in a feed
3.View posts on user profiles
4.Post detail page with full view

#Likes

1.Like / Unlike a post
2.Like count visible on feed & profile
3.View list of users who liked a post

#Comments
1.Add comments on posts
2.View comments with commenter username
3.Comment count visible on profile grid

#Feed
1.Shows posts from:
All users (for first-time experience)
Followed users
Own posts
2.Sorted by latest posts

#Search
1.Search users by username
2.Navigate to user profiles directly

#Project Structure

├── backend
│   ├── models
│   ├── routes
│   ├── middleware
│   ├── config
│   └── server.js
│
├── frontend
│   ├── src
│   │   ├── pages
│   │   ├── components
│   │   ├── api.js
│   │   └── App.jsx
│   └── main.jsx

#screenshots
<img width="1718" height="814" alt="image" src="https://github.com/user-attachments/assets/8845021b-be29-466a-8931-0f182184a5bd" />
<img width="1410" height="802" alt="image" src="https://github.com/user-attachments/assets/b60c3d00-efff-4cde-885b-261d55286e1d" />
<img width="1847" height="792" alt="image" src="https://github.com/user-attachments/assets/b7af8b6c-292f-4365-ad8e-89a2bc8e1423" />
<img width="1843" height="861" alt="image" src="https://github.com/user-attachments/assets/1b2c4ca3-a429-4b0b-8940-84cd58656b22" />
<img width="1840" height="774" alt="image" src="https://github.com/user-attachments/assets/591c2b68-b296-4b2d-8176-0edf4902f4f6" />
<img width="1825" height="683" alt="image" src="https://github.com/user-attachments/assets/9daf9615-b21b-4bab-87c4-1e7fd9322145" />


#How to Run Locally
1.Backend
cd backend
npm install
npm start

2.Frontend
cd frontend
npm install
npm run dev

#Key Learning Outcomes
1.REST API design
2.JWT authentication & authorization
3.MongoDB relationships (users, posts, likes, comments)
4.Full-stack integration
5.Deployment and CORS handling
6.State management and UI updates without page refresh

#Future Improvements
1.Image/video upload using multer
2.Real-time notifications
3.Chat / messaging feature
4.Better UI animations
5.Mobile-first UI refinement

#Author
Anurag Sen
Final Year B.Tech CSE
Full-Stack Web Developer
