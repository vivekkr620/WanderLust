# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.



## COMPLETED
✔ React Setup
✔ Routing
✔ MainLayout
✔ Navbar
✔ Search
✔ Categories
✔ Listings
✔ ListingCard

## REMAINING
1. Listing Details Page
2. Login Page
3. Signup Page
4. Become a Host Page
5. Add Listing Page
6. Edit Listing Page
7. Profile Page
8. Wishlist Page
9. Booking UI
10. Footer


## FOLDER STRUCTURE
pages/

├── HomePage.jsx
├── SearchResultPage.jsx
├── ListingDetailsPage.jsx   ← NEW
├── LoginPage.jsx
├── SignupPage.jsx
├── BecomeHostPage.jsx
├── AddListingPage.jsx
└── EditListingPage.jsx

## SEARCH LOGIC
User types
      │
      ▼
"United States"
      │
      ▼
filter()
      │
      ▼
Har listing check hogi

Title?
Location?
Country?
      │
      ▼
Agar kisi bhi field me match mila
      │
      ▼
Return true
      │
      ▼
filteredListings
      │
      ▼
map()
      │
      ▼
ListingCard


## DEVELOPMENT PHASE 
Frontend

1. ✅ Home Page
2. ✅ Search Page
3. 🔜 Listing Details Page
4. 🔜 Login Page
5. 🔜 Signup Page
6. 🔜 Become a Host Page
7. 🔜 Add Listing Page
8. 🔜 Edit Listing Page

↓

Backend Integration

↓

Testing

↓

UI Polish

## FOR THE SINGLE LISTING CARD PAGE
components/
│
├── Navbar/
├── Categories/
├── Listings/
│
└── ListingDetails/
    ├── ListingHero.jsx
    ├── ListingInfo.jsx
    ├── ListingDescription.jsx
    └── BookingCard.jsx


## ListingInfo.jsx 

Title              

Location

Price

Host

## 3️⃣ ListingDescription.jsx
About this place
Lorem ipsum...

Baad me:

Amenities
Rules
Reviews

bhi yahin add kar sakte hain.

## 4️⃣ BookingCard.jsx
₹2500 / night

Reserve

Check-in

Check-out

Guests

## data flow
ListingDetailsPage
        │
        │ listing={listing}
        ▼
ListingInfo
        │
        ▼
{ listing }
        │
        ▼
listing.title
listing.location
listing.price


## AUTHENTICATION 
src/

components/
    Auth/
        AuthLayout.jsx
        AuthInput.jsx
        SocialLoginButton.jsx

pages/
    LoginPage.jsx
    SignupPage.jsx
    BecomeHostPage.jsx