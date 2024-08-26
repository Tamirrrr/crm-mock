# crm-mock (Laravel + React) SPA

## Requirements
- Docker
- Git
- WSL2 (For database schema migrations). Otherwise `crm` schema needs to be created manually

## Installation
```
1. Clone repository from git@github.com:Tamirrrr/crm-mock.git

2. Run the following command to start the environment
    sudo docker compose up -d
    
3. Run laravel migrations
    sudo docker exec crm-mock-backend-1 php artisan migrate
    
3. Manage all your customers at http://localhost
```

## Possible Improvements for Scalability and Maintainability
### Backend
- Add unit tests and e2e test for the full system integration and functionality
- Add more error handling and logging for both services and the API
- Add a better validation input for requests and implement custom messages for specific validation rules
- Implement better and more secure JWT authentication with DB to allow auditing and tracking of user's login history and activity monitoring
    This also helps to invalidate tokens. Another way would be to use an existing composer package such as tymon/jwt-auth
- Implement cache service with multiple cache drivers (abstract factory). This will allow
    caching responses and data in a more scalable way removing the need to query the database for the customers table for example.

### Frontend
- Add tests cases using React Test Library and also integration tests
- Add more error handling and logging for the frontend
- Validation inputs for the authentication forms and customer dialog form
- Add a better way to handle the user's session and authentication (using secure cookies instead of local storage for storing the access token)
- Implement refresh token mechanism to allow users to stay logged in
- Restructure the components to be more reusable and maintainable
- Use an SSR framework like Next.js to improve SEO and performance
- Add loading screens and skeletons to improve the user experience

### Infrastructure
- Improve current dockerfiles as they are not production ready
- Add migration tool such as Liquibase or Goose to have a centralized schema migrations
- Add nginx as a reverse proxy to handle the incoming requests and distribute them to the backend services