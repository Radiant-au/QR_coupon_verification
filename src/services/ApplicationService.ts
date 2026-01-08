// src/services/ApplicationService.ts

export class ApplicationService {
    async votingstatus() {
        // We mock this as "OPEN" so the middleware lets your requests through
        return {
            status: "OPEN",
            message: "Service is active"
        };
    }
}