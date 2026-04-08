import { USE_MOCK_API, API_BASE_URL } from "./config.js";
import { mockAPI } from "./mockAPI.js";

// Initialize the application
export function initApp() {
    // Any global initialization can go here
    console.log("App initialized with API base URL:", API_BASE_URL);
}

// Notes API functions
export const api = {
    async getNotes(search="", minDate=null, maxDate=null, sortBy=null, sortOrder=null, page=1, pageSize=10){
        //parameters: search, minDate, maxDate, sortBy, sortOrder, page: Number(page), pageSize: Number(pageSize)
        if (USE_MOCK_API){
            return mockAPI.getNotes();
        } else {
        const response = await fetch(`${API_BASE_URL}/notes?search=${encodeURIComponent(search)}&minDate=${encodeURIComponent(minDate)}&maxDate=${encodeURIComponent(maxDate)}&sortBy=${encodeURIComponent(sortBy)}&sortOrder=${encodeURIComponent(sortOrder)}&page=${page}&pageSize=${pageSize}`);
        return response.json();
    }
    },

    async getNoteByID(id){
        if (USE_MOCK_API){
            return mockAPI.getNoteByID(id);
        } else {
        const response = await fetch(`${API_BASE_URL}/notes/${id}`,
            {method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }}
        );
        return response.json();
    }},

    async createNote(title, body){
        if (USE_MOCK_API){
            return mockAPI.createNote(title, body);
        } else {
        const response = await fetch(`${API_BASE_URL}/notes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, body })
        });
        return response.json();
    }},

    async updateNote(id, title, body){
        if (USE_MOCK_API){
            return mockAPI.updateNote(id, title, body);
        } else {
        const response = await fetch(`${API_BASE_URL}/notes/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, body })
        });
        return response.json();
    }},

    async deleteNote(id){
        if (USE_MOCK_API){
            return mockAPI.deleteNote(id);
        } else {
            const reponse = await fetch(`${API_BASE_URL}/notes/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            return reponse.status === 204;
        }
    }
};
