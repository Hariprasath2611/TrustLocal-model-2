**TrustLocal**

TrustLocal is a B2C on-demand service platform that connects customers with nearby local technicians using a live lead-dispatch model, similar to ride-hailing platforms like Ola or Rapido, but designed for local services.

The platform focuses on trust, speed, and low friction, allowing customers to request services without paying online and enabling technicians to receive real-time job leads.

**🚩 Problem Statement**
Finding a reliable local service provider is often difficult. Existing platforms suffer from:

Fake or unreliable reviews

Unverified technicians

High friction due to upfront online payments

Poor response time for urgent local services

At the same time, skilled local technicians struggle to get consistent work and visibility.

**💡 Solution**

TrustLocal solves this by using a live lead-dispatch system:

Customers raise a service request without making any payment in the app

Requests are broadcast in real time to nearby, verified technicians who are online

Any technician can accept the lead and complete the job

Customers pay technicians directly in cash (COD)

The platform earns through a commission model from technicians, similar to ride-hailing apps

This model reduces customer hesitation, improves trust, and ensures faster service delivery.

**🔁 How It Works**

Customer logs in and creates a service request

The request becomes an open lead

Online technicians with matching service categories receive the lead instantly

One technician accepts the lead

Service is completed and confirmed

Customer pays the technician in cash

Platform records commission for the completed job

Customer can leave a verified review

**👥 User Roles**

**Customer**

Register and log in

Request local services

Track service status

Confirm job completion

Leave reviews (only after completion)

**Technician**

Register and create a profile

Upload verification documents

Toggle online/offline availability

Receive live service leads

Accept and complete jobs

Pay commission to the platform

**Admin**

Verify technician profiles

Monitor service requests

Track completed jobs

Manage commission records

**🧱 Tech Stack**

**Frontend**

React + Vite

JavaScript

Tailwind CSS

**Backend**
Node.js

Express.js

**Database & Services**

Firebase Authentication

Firebase Firestore

Firebase Storage

**📦 Firestore Data Model (Overview)**

users – user roles and basic info

technicians – technician profile, verification, availability

serviceRequests – customer requests and job status

reviews – verified reviews linked to completed jobs

**🚫 Out of Scope**

To keep the project hackathon-ready and focused:

No payment gateway integration

No in-app chat

No notifications

No AI / ML features

**▶️ Demo**
A short demo video (≈44 seconds) showcases:

Service request creation

Live lead dispatch to technicians

Lead acceptance and job completion flow

**🚀 Future Enhancements**

Mobile app (React Native / Flutter)

Real-time notifications

GPS-based technician matching

Online commission payment integration

In-app chat between customer and technician

**🧠 Hackathon Note**

This project was built as a hackathon MVP with emphasis on:

Clear problem understanding

Realistic business model

Clean and working core flow

Scalability and advanced optimizations can be added in future iterations.

**👤 Author**

**Hariprasath D**
**Solo Participant **– Hackathon Project
